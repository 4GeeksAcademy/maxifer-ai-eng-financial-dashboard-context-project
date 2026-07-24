# Tech Stack

## Arquitectura general

El proyecto esta separado en dos servicios:

- `frontend`: SPA React servida por Vite en el puerto `5173`.
- `backend`: API FastAPI servida por Uvicorn en el puerto `8000`.

`docker-compose.yml` construye ambos servicios y define que `frontend` depende de `backend`. En desarrollo, `frontend/vite.config.ts` redirige llamadas `/api` hacia `http://backend:8000`.

No se verifico base de datos, cache, cola de trabajos, servicio de autenticacion ni almacenamiento externo.

## Frontend

- React: responsabilidad de construir la UI del dashboard. Evidencia: `frontend/package.json`, `frontend/src/main.tsx`, `frontend/src/App.tsx`.
- React DOM: responsabilidad de montar la app en el DOM. Evidencia: `frontend/src/main.tsx`.
- TypeScript: responsabilidad de tipar el codigo frontend y los contratos locales de datos financieros. Evidencia: `frontend/package.json`, `frontend/tsconfig*.json`, `frontend/src/lib/financial-types.ts`.
- Vite: responsabilidad de ejecutar, compilar y servir el frontend; tambien configura el proxy `/api`. Evidencia: `frontend/package.json`, `frontend/vite.config.ts`.
- Tailwind CSS: responsabilidad de estilos utilitarios y tokens CSS. Evidencia: `frontend/package.json`, `frontend/vite.config.ts`, `frontend/src/index.css`.
- Recharts: responsabilidad de renderizar graficos de lineas. Evidencia: `frontend/package.json`, `frontend/src/components/dashboard/income-outcome-chart.tsx`, `frontend/src/components/dashboard/profit-percent-chart.tsx`.
- Lucide React: responsabilidad de iconos en KPIs y encabezado. Evidencia: `frontend/package.json`, `dashboard-header.tsx`, `kpi-row.tsx`.
- clsx y tailwind-merge: responsabilidad de componer clases CSS. Evidencia: `frontend/package.json`, `frontend/src/lib/utils.ts`, `frontend/src/components/dashboard/kpi-card.tsx`.
- class-variance-authority: esta listada como dependencia en `frontend/package.json`, pero no se verifico uso directo en los archivos inspeccionados.

## Backend

- FastAPI: responsabilidad de definir la aplicacion HTTP, middleware CORS, router y endpoints. Evidencia: `backend/requirements.txt`, `backend/app/main.py`, `backend/app/routes.py`.
- Pydantic: responsabilidad de modelos de request/response usados por FastAPI. Evidencia: `backend/app/routes.py` importa `BaseModel` y define modelos como `FinancialMovement`, `MetricsFacets`, `MetricsSummaryItem`, `TopCategoryItem`, `MetricsComparison` y `MetricsAlert`.
- Uvicorn: responsabilidad de servir la aplicacion ASGI. Evidencia: `backend/requirements.txt`, `backend/Dockerfile`.
- debugpy: responsabilidad de debugging remoto en el contenedor backend. Evidencia: `backend/requirements.txt`, `backend/Dockerfile`.
- Python standard library: `random`, `collections.defaultdict`, `datetime`, `typing.Literal` se usan para generar mocks, agrupar datos y tipar literales. Evidencia: `backend/app/routes.py`.

## Infraestructura

- Docker Compose: responsabilidad de orquestar frontend y backend en local. Evidencia: `docker-compose.yml`.
- Dockerfile frontend: usa `node:24-alpine`, instala dependencias y ejecuta `npm run dev` exponiendo `5173`. Evidencia: `frontend/Dockerfile`.
- Dockerfile backend: usa `python:3.13-slim`, instala `requirements.txt` y ejecuta Uvicorn con `debugpy` y `--reload`, exponiendo `8000` y `5678`. Evidencia: `backend/Dockerfile`.
- Variables de entorno frontend: `VITE_API_BASE_URL` permite apuntar a otro origen de backend. Evidencia: `frontend/.env.example`, `frontend/src/App.tsx`.

No se verifico infraestructura productiva, CI/CD, hosting, balanceador, observabilidad ni secretos.

## Dependencias principales

- `react` / `react-dom`: UI y renderizado.
- `vite` / `@vitejs/plugin-react`: servidor de desarrollo, build y soporte React.
- `typescript`: chequeo y compilacion TypeScript.
- `tailwindcss` / `@tailwindcss/vite`: sistema de estilos.
- `recharts`: visualizacion de series financieras.
- `lucide-react`: iconografia.
- `clsx` / `tailwind-merge`: composicion de `className`.
- `fastapi`: API HTTP.
- `uvicorn[standard]`: servidor ASGI.
- `debugpy`: debugger remoto en backend.
- `pytest`, `pytest-cov`, `httpx`: pruebas backend.
- `vitest`, `@vitest/coverage-v8`: pruebas frontend.
- `eslint`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`: lint frontend.

## Herramientas de testing

- Backend: `pytest` con `fastapi.testclient.TestClient`; pruebas en `backend/tests/test_routes.py`.
- Backend coverage: `pytest-cov` esta listado en `backend/requirements.txt`; no se verifico comando dedicado de coverage.
- Frontend: `vitest run` mediante script `npm run test`; pruebas en `frontend/src/lib/financial-utils.test.ts`.
- Frontend coverage: `vitest run --coverage` mediante script `npm run test:coverage`.

## Herramientas de desarrollo

- `docker compose up --build`: ejecucion local documentada en README.
- `npm run dev`: servidor Vite.
- `npm run build`: `tsc -b && vite build`.
- `npm run lint`: ESLint.
- `npm run preview`: preview Vite.
- `npm run test` y `npm run test:watch`: Vitest.
- `uvicorn` con `--reload`: servidor backend de desarrollo.
- `debugpy`: debugging remoto del backend.

## Archivos utilizados como evidencia

- `README.md`
- `README.es.md`
- `docker-compose.yml`
- `frontend/package.json`
- `frontend/package-lock.json`
- `frontend/Dockerfile`
- `frontend/vite.config.ts`
- `frontend/.env.example`
- `frontend/tsconfig.json`
- `frontend/tsconfig.app.json`
- `frontend/tsconfig.node.json`
- `frontend/eslint.config.js`
- `frontend/components.json`
- `frontend/src/main.tsx`
- `frontend/src/App.tsx`
- `frontend/src/index.css`
- `frontend/src/lib/utils.ts`
- `frontend/src/lib/financial-types.ts`
- `frontend/src/lib/financial-utils.ts`
- `frontend/src/lib/financial-utils.test.ts`
- `frontend/src/components/dashboard/*.tsx`
- `frontend/src/components/ui/card.tsx`
- `frontend/src/components/ui/skeleton.tsx`
- `backend/requirements.txt`
- `backend/Dockerfile`
- `backend/app/main.py`
- `backend/app/routes.py`
- `backend/tests/conftest.py`
- `backend/tests/test_routes.py`
