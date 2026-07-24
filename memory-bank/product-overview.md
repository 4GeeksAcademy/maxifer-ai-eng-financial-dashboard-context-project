# Product Overview

## Que es el producto

Financial Metrics Dashboard es una aplicacion web full-stack para visualizar metricas financieras. La descripcion esta verificada en `README.md` y `README.es.md`, que la presentan como un dashboard de metricas financieras con frontend React + TypeScript y backend FastAPI.

La pantalla principal verificada muestra un dashboard llamado "Financial Overview" con KPIs y graficos financieros.

## Que problema resuelve

Permite consultar una vista resumida de ingresos, egresos, ganancia y margen de ganancia a partir de movimientos financieros. Esto se verifica en:

- `frontend/src/components/dashboard/kpi-row.tsx`: renderiza Total Income, Total Outcome, Profit y Profit Margin.
- `frontend/src/components/dashboard/income-outcome-chart.tsx`: grafica ingresos contra egresos por mes.
- `frontend/src/components/dashboard/profit-percent-chart.tsx`: grafica margen de ganancia mensual.
- `frontend/src/lib/financial-utils.ts`: calcula KPIs y agregaciones mensuales.

No se verifico que resuelva conciliacion contable, presupuesto, forecast, autenticacion, reportes exportables o gestion transaccional.

## Flujo principal

1. El usuario abre el frontend en `http://localhost:5173`, segun `README.md`, `README.es.md` y `docker-compose.yml`.
2. `frontend/src/main.tsx` monta la aplicacion React.
3. `frontend/src/App.tsx` ejecuta `fetchFinancialData()` y llama a `/api/metrics`.
4. En desarrollo con Docker, `frontend/vite.config.ts` proxya `/api` hacia `http://backend:8000`.
5. `backend/app/routes.py` responde `GET /api/metrics` generando movimientos mock con `generate_mock_movements(seed=42)`.
6. `App.tsx` calcula `computeKPIs()` y `computeMonthlyData()` en el cliente.
7. La UI renderiza un encabezado, cuatro tarjetas KPI y dos graficos.

## Funcionalidades verificadas

- Health check backend en `GET /health`.
- Listado de movimientos financieros en `GET /api/metrics`.
- Filtros backend por `start_date`, `end_date`, `category` y `operation_type` para `/api/metrics`.
- Endpoints backend para facets, summary, top categories, comparison, alerts, B2B y B2C.
- Generacion deterministica de datos mock con seed `42`.
- Datos modelados con `create_date`, `amount`, `operation_type`, `category` y `business_type`.
- Dashboard frontend con estados `loading` y `error`.
- KPIs de total income, total outcome, profit y profit margin.
- Grafico de income vs outcome.
- Grafico de profit margin.
- Formateo de moneda USD y porcentaje.
- Tests backend para endpoints y filtros en `backend/tests/test_routes.py`.
- Tests frontend para calculos y formateadores en `frontend/src/lib/financial-utils.test.ts`.

## Funcionalidades no verificadas

- Autenticacion, autorizacion o usuarios registrados.
- Base de datos o persistencia.
- Carga de datos reales externos.
- Escritura, edicion o eliminacion de movimientos financieros.
- Filtros interactivos en el frontend.
- Uso frontend de `/api/metrics/facets`, `/api/metrics/summary`, `/api/metrics/categories/top`, `/api/metrics/comparison`, `/api/metrics/alerts`, `/api/metrics/b2b` o `/api/metrics/b2c`.
- Exportacion de reportes.
- Deploy productivo.
- Monitoreo productivo.
- Internacionalizacion completa.

## Usuarios

No se verificaron usuarios finales concretos en el codigo. La UI usa textos como "Executive metrics dashboard" en `frontend/src/components/dashboard/dashboard-header.tsx`, pero eso solo evidencia el tono de la pantalla, no un rol de usuario formal.

## Fuente de datos

La fuente de datos usada por el flujo principal es el backend FastAPI. En cada request, `backend/app/routes.py` genera datos mock en memoria mediante `generate_mock_movements(seed=42)`.

No se verifico una base de datos, ORM, archivo persistente ni API externa. Existe `frontend/src/lib/mock-data.ts` con datos estaticos, pero `rg` no encontro imports de `mockMovements`; por lo tanto no se verifico que forme parte del flujo actual.

## Evidencia utilizada

- `README.md`
- `README.es.md`
- `docker-compose.yml`
- `frontend/vite.config.ts`
- `frontend/src/main.tsx`
- `frontend/src/App.tsx`
- `frontend/src/components/dashboard/dashboard-header.tsx`
- `frontend/src/components/dashboard/kpi-row.tsx`
- `frontend/src/components/dashboard/kpi-card.tsx`
- `frontend/src/components/dashboard/income-outcome-chart.tsx`
- `frontend/src/components/dashboard/profit-percent-chart.tsx`
- `frontend/src/lib/financial-types.ts`
- `frontend/src/lib/financial-utils.ts`
- `frontend/src/lib/mock-data.ts`
- `frontend/src/lib/financial-utils.test.ts`
- `backend/app/main.py`
- `backend/app/routes.py`
- `backend/tests/test_routes.py`
