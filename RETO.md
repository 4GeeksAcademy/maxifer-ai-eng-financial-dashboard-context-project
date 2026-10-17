Aquí tienes el contenido completo y detallado del archivo `RETO.md` estructurado específicamente para guiar paso a paso a tu agente de IA en la realización e implementación de este reto. Puedes copiarlo directamente y guardarlo en la raíz de tu repositorio como `RETO.md`.

---

# RETO: Aplicando desarrollo guiado por especificaciones - Dashboard financiero

Este documento detalla todas las instrucciones del proyecto, las directrices del Tech Lead y los criterios de evaluación necesarios para que el agente de IA ejecute las especificaciones técnicas requeridas, sin implementar código de componentes ni llamadas de API.

---

## 1. Contexto y Enfoque del Tech Lead

Continúas en el mismo dashboard financiero heredado del proyecto de contexto. El equipo de finanzas del cliente solicita tres capacidades nuevas. La directriz absoluta de tu Tech Lead es:

> *"Primero la especificación. Luego construimos."*

Una especificación bien escrita define qué ve el usuario, qué datos necesita cada componente y qué reglas rigen cada campo. El enfoque de trabajo es el siguiente:

* **Stack-agnostic:** El repo ya tiene frontend y backend predefinidos. No necesitas dominar de antemano interfaces TypeScript u OpenAPI. El agente de IA debe explorar `/docs` y los patrones frontend existentes; tú lo diriges, verificas cada tipo y regla contra evidencia de la API en vivo y rechazas suposiciones.
* **Regla de oro:** **No** implementes componentes React ni llamadas a la API en este proyecto. El entregable consiste estrictamente en especificaciones y tipos.

---

## 2. Instrucciones para la Rama y Estructura

1. Abre tu fork del dashboard financiero (`ai-eng-financial-dashboard-context-project`) en tu agente de código.
2. Confirma que `memory-bank/` y `.agents/rules` del trabajo previo estén commiteados y actualizados.
3. Crea y cámbiate a la rama de trabajo: `git switch -c feature/frontend-specs`.
4. Crea el directorio `frontend/specs/` donde se ubicarán todos los archivos de especificación.

---

## 3. Fases de Desarrollo del Reto

### Fase 1 — Explorar la API (Con el agente)

* Con el backend en marcha, pide al agente mapear los endpoints, formas de respuesta y parámetros de query de las tres funcionalidades usando `/docs`.
* Contrasta con los patrones de fetch existentes en el repositorio cuando sea útil.
* Anota desajustes entre el lenguaje del PM y los campos reales de la API; resuélvelos en la especificación y no en la implementación.
* Opcional: Mantén un rastro corto de verificación en los mensajes de commit o en un archivo `verification.md`.

### Fase 2 — Tipos TypeScript (El agente redacta, tú verificas)

* Haz que el agente redacte `frontend/specs/api-types.ts` con interfaces estrictas para las respuestas de las tres funcionalidades:
* `FacetsResponse`: referencia de rango de fechas y vista B2B vs B2C.
* `AlertEntry` y `AlertsResponse`: tabla de anomalías.
* `CategoryEntry` y `TopCategoriesResponse`: tabla comparativa B2B vs B2C.


* Haz que el agente redacte `frontend/specs/param-types.ts` con los tipos de parámetros de query:
* `DateRangeFilter`: fechas opcionales de inicio y fin como string en formato `YYYY-MM-DD`.
* `AlertsParams`: umbral (`threshold`) más el filtro de fechas.
* `TopCategoriesParams`: tipo de operación, límite y filtro de fechas.


* Verifica cada nombre y tipo de propiedad estrictamente contra `/docs`. TypeScript estricto: **sin `any`, sin `object**`.
* Cada propiedad necesita documentación JSDoc que indique su significado, valores válidos y formato cuando aplique.
* **Commit:** Tipos verificados contra OpenAPI.

### Fase 3 — Especificación de Componentes (El agente redacta, tú verificas)

* Haz que el agente redacte `frontend/specs/components.md` detallando la estructura por funcionalidad:
* Alinea las props de los componentes con los tipos definidos en la Fase 2 y resuelve ambigüedades dejadas abiertas por el PM.


* **Commit:** Specs de componentes.

### Fase 4 — Documentación del Contrato de Datos

* Haz que el agente redacte `frontend/specs/README.md` cubriendo exhaustivamente las tres funcionalidades:
* Endpoint(s) que consume cada funcionalidad (rutas verificadas en `/docs`).
* Tipos TypeScript de cada petición y respuesta.
* Valores válidos y restricciones de cada parámetro.
* Al menos **2 casos límite por funcionalidad** y qué debe mostrar la interfaz de usuario (UI) en cada caso.


* Léelo como si se lo entregaras a una sesión nueva del agente y corrige cualquier aspecto que pudiera generar preguntas de seguimiento.
* Ejecuta `npx tsc --noEmit` y corrige cualquier error de tipos.
* **Commit:** README de contrato de datos.

---

## 4. Detalle de las Funcionalidades a Especificar

### Funcionalidad 1 — Filtro de rango de fechas en el dashboard principal

* **Objetivo:** Añadir dos inputs de fecha en la parte superior (inicio y fin) para filtrar todos los datos mostrados en la página.
* **Formato y reglas:** Las fechas se envían a la API en formato `YYYY-MM-DD`. Ambos inputs son opcionales; vacíos por defecto muestran todos los datos.
* **Referencia:** El rango de fechas disponible (mínima y máxima del dataset) debe mostrarse cerca de los inputs para guiar al usuario.
* **Endpoint relevante:** `GET /api/metrics/facets` (para obtener el rango de fechas disponible) y la extensión de filtros sobre el endpoint de métricas existente.

### Funcionalidad 2 — Tabla de alertas de anomalías en el dashboard principal

* **Objetivo:** Añadir bajo los gráficos una tabla que destaque periodos con aumentos inesperados de gasto.
* **Columnas de la tabla:** Periodo, outcome registrado, media móvil de los 3 periodos anteriores e incremento porcentual.
* **Configuración:** Umbral de alerta configurable por el usuario mediante input numérico (ratio entre `0.01` y `1.0`, por defecto `0.3`).
* **Estado vacío:** Si no hay anomalías para el umbral actual, mostrar un mensaje explícito de estado vacío (no ocultar la tabla).
* **Filtros:** Debe respetar el rango de fechas establecido en la Funcionalidad 1 si está activo.
* **Endpoint relevante:** `GET /api/metrics/alerts?threshold=<ratio>`.

### Funcionalidad 3 — Vista comparativa B2B vs B2C

* **Objetivo:** Crear una nueva página en el dashboard para comparar ingresos entre líneas B2B y B2C.
* **Estructura visual:** Dos secciones en paralelo. Cada una muestra una tabla con las 5 categorías principales de ingreso (nombre, total de ingresos y porcentaje sobre el grupo). Abajo, un único gráfico comparativo global B2B vs B2C.
* **Filtros y datos:** Filtrable por rango de fechas (`YYYY-MM-DD`). Las categorías disponibles de cada grupo se obtienen del endpoint de facetas.
* **Endpoints relevantes:** `GET /api/metrics/categories/top?operation_type=income&limit=5` y `GET /api/metrics/facets`.

---

## 5. Criterios de Evaluación (Checklist de Validación)

Comprueba que se cumpla cada uno de los siguientes puntos antes de dar por finalizado el trabajo del agente:

* [x] Evidencia clara de exploración de API: tipos y endpoints trazables a `/docs`, sin nombres de campos inventados.
* [x] Todas las interfaces de respuesta coinciden exactamente con OpenAPI en vivo, estrictamente sin usar `any`.
* [x] `DateRangeFilter` define ambos campos como opcionales, tipados como string con documentación JSDoc indicando el formato `YYYY-MM-DD`.
* [x] `AlertsParams` y `TopCategoriesParams` extienden o incluyen correctamente a `DateRangeFilter`.
* [x] `components.md` nombra cada componente, detalla sus props con tipos y especifica el renderizado condicional por funcionalidad.
* [x] El estado vacío de la tabla de anomalías se encuentra especificado de forma explícita.
* [x] El comportamiento de la interfaz ante un único input de fecha definido está especificado explícitamente.
* [x] Ambos paneles B2B vs B2C especifican el comportamiento de renderizado para cuando el top-5 esté vacío.
* [x] `frontend/specs/README.md` cubre las tres funcionalidades con sus respectivos endpoints, tipos, parámetros y al menos 2 casos límite cada una.
* [x] TypeScript compila sin errores ejecutando `npx tsc --noEmit`.
* [x] Trabajo realizado en la rama `feature/frontend-specs` con commits limpios y significativos; las especificaciones reflejan un trabajo riguroso asistido por IA y verificado.
* [x] **Restricción estricta respetada:** Sin componentes React, sin llamadas fetch de implementación y sin cambios en el backend.