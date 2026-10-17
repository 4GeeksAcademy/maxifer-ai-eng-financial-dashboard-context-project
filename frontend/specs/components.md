# Especificación de componentes

Este documento describe la interfaz prevista. No implementa componentes React ni llamadas HTTP.

## Filtro de fechas

### `DateRangeControls`

**Props**

- `facets: FacetsResponse`: rango completo disponible (`min_date`, `max_date`) mostrado junto a los controles.
- `value: DateRangeFilter`: valores seleccionados; cada extremo puede estar vacío.
- `onChange: (range: DateRangeFilter) => void`: comunica cambios sin convertir fechas a otro formato.

**Comportamiento**

- Renderiza dos inputs de fecha, uno para inicio y otro para fin.
- No limita ni reescribe un extremo para compensar el otro. Cada valor no vacío se envía como `YYYY-MM-DD` y los límites son inclusivos.
- Si ambos están vacíos, solicita todos los datos disponibles. Si solo uno tiene valor, envía solo ese límite.
- Si el intervalo está invertido o no intersecta el dataset, conserva los valores elegidos y la pantalla de datos muestra el estado vacío correspondiente.
- `facets` informa el rango de referencia general; no debe cambiar al aplicar el filtro.

## Alertas de gasto

### `AlertsTable`

**Props**

- `alerts: AlertsResponse`: filas del endpoint de alertas para el umbral, fechas y agrupación actuales.
- `threshold: number`: umbral configurado; la interfaz restringe el valor a `0.01..1.0` y usa `0.3` por defecto.
- `loading: boolean`: muestra estado de carga mientras se actualizan los datos.
- `error?: string`: muestra un mensaje visible si falla la consulta.

**Comportamiento**

- Muestra las columnas periodo, outcome registrado, baseline promedio e incremento porcentual. `increase_ratio` se presenta como porcentaje multiplicándolo por 100.
- `baseline_average` representa el promedio de todos los periodos anteriores incluidos en la consulta, no una media móvil de tres periodos. No debe rotularse como promedio móvil.
- Si `alerts` está vacío, mantiene la tabla y muestra un mensaje explícito de que no hay anomalías para los filtros actuales.
- El filtrado de fechas se aplica antes de agrupar. Si cambia fecha, agrupación o umbral, las filas visibles corresponden a la respuesta resultante, no a datos previos.

## Categorías por segmento

### `TopCategoriesTable`

**Props**

- `businessType: BusinessType`: segmento que identifica la tabla, `B2B` o `B2C`.
- `categories: TopCategoriesResponse`: máximo cinco categorías de ingreso del segmento.
- `incomeTotal: number`: total de ingresos del mismo segmento y rango, derivado de la respuesta de summary.
- `loading: boolean`: muestra estado de carga.
- `error?: string`: muestra un mensaje visible si falla la consulta.

**Comportamiento**

- Muestra nombre de categoría, total de ingresos y porcentaje del ingreso del segmento.
- El porcentaje no viene en `TopCategoriesResponse`; se calcula como `total_amount / incomeTotal * 100`. Si `incomeTotal` es cero, no calcula un porcentaje y presenta `-`.
- El endpoint devuelve hasta cinco filas. Si devuelve entre una y cuatro, muestra solo esas filas; no crea filas ficticias para completar el top cinco.
- Si la respuesta está vacía, conserva el título del segmento y muestra un estado vacío explícito.

## Comparativa B2B vs B2C

### `BusinessComparisonView`

**Props**

- `facets: FacetsResponse`: rango disponible y valores generales para informar controles y validar los segmentos conocidos.
- `dateRange: DateRangeFilter`: filtro compartido por ambas tablas y el gráfico.
- `b2bCategories: TopCategoriesResponse`: top de ingresos obtenido con `business_type=B2B`.
- `b2cCategories: TopCategoriesResponse`: top de ingresos obtenido con `business_type=B2C`.
- `b2bSummary: MetricsSummaryResponse`: series de summary filtradas con `business_type=B2B`.
- `b2cSummary: MetricsSummaryResponse`: series de summary filtradas con `business_type=B2C`.

**Comportamiento**

- Presenta las dos tablas en paralelo y un único gráfico global de ingresos por periodo con las series B2B y B2C.
- Deriva cada porcentaje respecto al total `income` de su propio segmento y rango, sumando los periodos de summary. No mezcla denominadores entre segmentos.
- Usa `period` de summary como clave temporal compartida; no hardcodea meses o años.
- `facets.categories` es una lista global, no un mapa de categorías por segmento. La disponibilidad real por segmento se infiere de las respuestas top filtradas.
- Mantiene ambos paneles visibles aunque uno no tenga resultados; muestra el estado vacío en el panel afectado y continúa mostrando el otro.
- Si el intervalo está vacío para ambos segmentos, muestra el estado vacío en ambas tablas y en el gráfico.

## Estados compartidos

- Loading: indicar que los datos se están actualizando sin presentar una respuesta anterior como si correspondiera al nuevo filtro.
- Error: informar que no se pudieron cargar los datos; no convertir un error en una lista vacía.
- Empty: distinguir una respuesta exitosa sin filas de una carga pendiente o fallida.