# Contrato de datos de las nuevas funcionalidades

Este documento es la especificación para una sesión nueva de implementación. Define contratos verificados y decisiones de interfaz; no añade componentes, llamadas HTTP ni cambios de backend.

## Verificación del contrato

Los nombres y esquemas se contrastaron con `GET http://localhost:8000/openapi.json` y los modelos de FastAPI disponibles durante esta tarea. FastAPI serializa fechas como strings `YYYY-MM-DD`. Los contratos TypeScript están en [`api-types.ts`](./api-types.ts) y los parámetros de consulta en [`param-types.ts`](./param-types.ts).

Los tipos describen respuestas existentes. Si un requisito de producto no está respaldado por la API, se señala como derivación de UI o brecha, no como campo de respuesta.

## Tipos compartidos

- `OperationType`: `income | outcome`.
- `BusinessType`: `B2B | B2C`.
- `Category`: `suppliers | sales | operational | administrative | others`.
- `GroupBy`: `day | week | month`.
- `DateRangeFilter`: `start_date?` y `end_date?`, opcionales e inclusivos, strings `YYYY-MM-DD`.
- Los parámetros omitidos mantienen el default del servidor. Los parámetros opcionales no se vuelven obligatorios por tener un default.
- Fechas inválidas o valores fuera de un literal permitido se rechazan con HTTP 422. El backend no valida que `start_date <= end_date`.

## Funcionalidad 1: filtro de rango de fechas

**Objetivo de interfaz**

Dos inputs opcionales de fecha en la parte superior del dashboard y una referencia del rango disponible junto a ellos.

**Endpoints y datos**

- `GET /api/metrics/facets` devuelve `FacetsResponse`: `operation_types`, `business_types`, `categories`, `min_date` y `max_date`. No recibe filtros; el rango informado describe el dataset completo de esa respuesta.
- `GET /api/metrics` acepta los parámetros `DateRangeFilter` y devuelve movimientos con `create_date`, `amount`, `operation_type`, `category` y `business_type`. Las fechas se aplican inclusivamente.
- El dashboard aplica el mismo rango a cada fuente que presenta: movimientos, alertas, top de categorías y summary utilizados en la comparativa.

**Parámetros**

`start_date` y `end_date` se omiten cuando sus inputs están vacíos. Si ambos están vacíos, se solicitan todos los datos. Cada extremo puede enviarse por separado; el backend filtra desde la fecha inicial o hasta la final, inclusive.

**Casos límite**

1. Solo se define fecha inicial: enviar `start_date`, omitir `end_date` y mostrar movimientos desde ese día en adelante.
2. Solo se define fecha final: enviar `end_date`, omitir `start_date` y mostrar movimientos hasta ese día inclusive.
3. Ambos límites están vacíos: mostrar el dataset completo y conservar `min_date`/`max_date` como referencia.
4. Rango invertido o fuera de los datos disponibles: el servidor no aplica validación de orden; si no hay movimientos, mostrar estado vacío y no un error de carga.

## Funcionalidad 2: alertas de anomalías

**Endpoint**

`GET /api/metrics/alerts`

**Parámetros**

| Parámetro | Tipo y valores | Default y restricciones |
| --- | --- | --- |
| `threshold` | número, razón relativa | API: `0.3`, mínimo `0`, sin máximo declarado. UI: `0.3`, rango permitido `0.01..1.0`. |
| `group_by` | `day`, `week` o `month` | `month` |
| `start_date`, `end_date` | opcionales, `YYYY-MM-DD` | inclusivos |
| `business_type` | `B2B` o `B2C` | omitido para ambos |

`AlertsParams` extiende `DateRangeFilter`. Las respuestas son `AlertsResponse`, una lista de `AlertEntry` con `period`, `outcome_total`, `baseline_average` e `increase_ratio`.

`period` tiene formato `YYYY-MM-DD` para día, `YYYY-Www` para semana ISO o `YYYY-MM` para mes. `increase_ratio` es una razón decimal: `0.3` equivale a 30%. La alerta se incluye solo cuando el incremento supera estrictamente el threshold.

**Brecha de media móvil**

El requisito de producto pide el promedio de los tres periodos anteriores. El endpoint actual usa el promedio de todos los outcomes previos dentro del summary ya filtrado; no implementa una ventana de tres periodos. `baseline_average` refleja ese comportamiento existente. La interfaz no debe presentarlo como media móvil de tres periodos.

**Casos límite**

1. La lista es vacía: mantener la tabla y mostrar explícitamente que no hay anomalías para el rango, agrupación y umbral actuales.
2. Hay menos de dos periodos agregados: no existe baseline previo suficiente para emitir una alerta; mostrar el estado vacío.
3. El primer periodo del rango no tiene baseline dentro del resultado filtrado; por tanto no genera alerta aunque tenga gastos.
4. Umbral `0.01` y `1.0`: ambos son válidos para la UI. Un valor inferior a `0.01` o superior a `1.0` no debe enviarse desde el control, aunque la API acepte cualquier valor numérico mayor o igual a cero.

## Funcionalidad 3: comparativa B2B vs B2C

**Endpoints**

- `GET /api/metrics/facets` devuelve el rango, las categorías y los tipos de negocio presentes. `categories` es global, no está separado por segmento.
- `GET /api/metrics/categories/top?operation_type=income&limit=5&business_type=B2B` devuelve `TopCategoriesResponse` para B2B. Repetir con `business_type=B2C` para la otra tabla.
- `GET /api/metrics/summary?group_by=month&business_type=B2B` devuelve `MetricsSummaryResponse` para la serie B2B. Repetir con `business_type=B2C`; incluir el mismo `DateRangeFilter` en las cuatro consultas.

`TopCategoriesParams` extiende `DateRangeFilter`. En el top, `operation_type` acepta `income | outcome` y el default de API es `outcome`; la vista debe enviar explícitamente `income`. `limit` tiene default 5 y rango 1..20. `business_type` es opcional en API pero requerido para separar las dos consultas de esta vista.

Cada fila de categoría contiene `category`, `operation_type` y `total_amount`. La respuesta no incluye porcentaje. Para cumplir la vista, la interfaz deriva el porcentaje con `total_amount / totalIncomeDelSegmento * 100`, donde `totalIncomeDelSegmento` es la suma de `income` en el summary del mismo segmento y rango. Si el denominador es cero, mostrar `-` en vez de dividir por cero.

El gráfico único compara los campos `income` de las dos respuestas de summary por su `period`. No usar `/api/metrics/comparison` como comparador B2B/B2C: ese endpoint compara el neto de un periodo con el neto del periodo anterior y requiere `start_date` y `end_date`.

**Casos límite**

1. Un segmento devuelve una lista top vacía: mantener ambos paneles; el vacío de uno no oculta los datos del otro.
2. Un segmento devuelve menos de cinco categorías: mostrar únicamente las filas recibidas, sin completar el top con categorías inventadas.
3. No hay ingresos para un segmento en el rango: mostrar sus categorías vacías y `-` para porcentajes no calculables; no dividir por cero.
4. `summary` de ambos segmentos está vacío: mostrar el estado vacío del gráfico y mantener los estados de tabla independientes.

## Reglas de visualización comunes

- Distinguir loading, error y empty. Un fallo HTTP debe mostrarse como error, no como respuesta vacía.
- Cuando cambien las fechas, todas las solicitudes que alimentan el dashboard deben usar exactamente los mismos límites.
- No fijar etiquetas de periodo por año; derivarlas de `period`.
- La UI puede aplicar restricciones de producto más estrictas que la API, pero la documentación debe mantener clara esa diferencia.