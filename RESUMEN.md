# Resumen Arquitectónico — Financial Metrics Dashboard

> Generado tras inspección completa del repositorio.
> Cada afirmación está respaldada por evidencia directa del código.

---

## 1. Estructura del Proyecto

```
maxifer-ai-eng-financial-dashboard-context-project/
├── AGENTS.md                          # Guía para agentes de IA
├── README.md                          # Documentación en inglés
├── README.es.md                       # Documentación en español
├── RESUMEN.md                         # Este archivo
├── docker-compose.yml                 # Orquestación Docker
├── .gitignore                         # Exclusiones globales
│
├── backend/
│   ├── Dockerfile                     # Imagen del backend
│   ├── requirements.txt               # Dependencias Python
│   ├── app/
│   │   ├── __init__.py                # Marca el directorio como paquete
│   │   ├── main.py                    # Entry point de FastAPI
│   │   └── routes.py                  # Todos los endpoints + lógica
│   └── tests/
│       ├── conftest.py                # Configuración de pytest
│       └── test_routes.py             # Tests del backend
│
└── frontend/
    ├── Dockerfile                     # Imagen del frontend
    ├── package.json                   # Dependencias y scripts npm
    ├── index.html                     # HTML de entrada
    ├── vite.config.ts                 # Configuración de Vite
    ├── tsconfig.json                  # TS proyecto (referencias)
    ├── tsconfig.app.json              # TS app (src/)
    ├── tsconfig.node.json             # TS node (vite.config)
    ├── eslint.config.js               # Configuración ESLint
    ├── components.json                # Configuración shadcn/ui
    ├── .env.example                   # Variables de entorno (opcional)
    ├── .gitignore                     # Exclusiones frontend
    ├── public/
    │   └── favicon.svg                # Favicon
    └── src/
        ├── main.tsx                   # Entry point React
        ├── App.tsx                    # Componente raíz
        ├── index.css                  # Tailwind + variables CSS
        ├── assets/
        │   └── hero.png               # Imagen decorativa
        ├── lib/
        │   ├── utils.ts               # Función cn() (clsx + tailwind-merge)
        │   ├── financial-types.ts     # Tipos compartidos (KPI, Movement, etc.)
        │   ├── financial-utils.ts     # Lógica: computeKPIs, computeMonthlyData, formatters
        │   ├── financial-utils.test.ts# Tests unitarios de financial-utils
        │   └── mock-data.ts           # Datos mock estáticos (NO USADO)
        └── components/
            ├── ui/
            │   ├── card.tsx           # Componentes Card (shadcn)
            │   └── skeleton.tsx       # Componente Skeleton (shadcn)
            └── dashboard/
                ├── dashboard-header.tsx   # Encabezado del dashboard
                ├── kpi-card.tsx           # Tarjeta individual de KPI
                ├── kpi-row.tsx            # Fila de 4 KPIs
                ├── income-outcome-chart.tsx # Gráfico ingresos vs egresos
                └── profit-percent-chart.tsx # Gráfico margen de ganancia
```

**Evidencia**: `read()` del directorio raíz y `glob("**/*")`.

---

## 2. Identificación de Componentes

### Carpetas principales

| Carpeta | Propósito |
|---------|-----------|
| `backend/` | API REST en FastAPI (Python 3.13) |
| `backend/app/` | Código de la aplicación FastAPI |
| `backend/tests/` | Tests del backend |
| `frontend/` | SPA en React + TypeScript + Vite |
| `frontend/src/` | Código fuente del frontend |
| `frontend/src/lib/` | Utilidades, tipos, lógica financiera |
| `frontend/src/components/ui/` | Componentes base (shadcn/ui) |
| `frontend/src/components/dashboard/` | Componentes de negocio del dashboard |
| `frontend/public/` | Archivos estáticos |

### Frontend

- **Framework**: React 19 via `package.json:19` (`"react": "^19.2.4"`)
- **Lenguaje**: TypeScript 6.0 via `package.json:39` (`"typescript": "~6.0.2"`)
- **Build tool**: Vite 8 via `package.json:41` (`"vite": "^8.0.4"`)
- **Estilos**: Tailwind CSS 4 via `package.json:38` (`"tailwindcss": "^4.2.2"`) y `vite.config.ts:3`
- **UI Library**: shadcn/ui (config en `components.json`) con componentes Card, Skeleton
- **Gráficos**: Recharts 3.8 via `package.json:21` (`"recharts": "^3.8.1"`)
- **Testing**: Vitest 4 via `package.json:42` (`"vitest": "^4.1.4"`)
- **Linting**: ESLint 9 + typescript-eslint via `eslint.config.js`

### Backend

- **Framework**: FastAPI via `requirements.txt:1`
- **Runtime**: Python 3.13-slim via `backend/Dockerfile:1`
- **Server**: Uvicorn via `requirements.txt:2` (`uvicorn[standard]`)
- **Testing**: pytest + pytest-cov + httpx via `requirements.txt:4-6`
- **Debugging**: debugpy via `requirements.txt:3`
- **Arquitectura**: Sin base de datos. Todo es generación de datos mock en memoria.

### Servicios (Docker Compose)

- **frontend**: Puerto 5173, construido desde `./frontend/Dockerfile`
- **backend**: Puerto 8000 (y 5678 para debug), construido desde `./backend/Dockerfile`
- **Proxy Vite**: `vite.config.ts:11-16` redirige `/api` a `http://backend:8000`

### Entry points

| Entry point | Archivo | Propósito |
|-------------|---------|-----------|
| HTML | `frontend/index.html:10-11` | Carga `<div id="root">` y script `main.tsx` |
| React | `frontend/src/main.tsx:6-9` | `createRoot` renderiza `<App />` con `StrictMode` |
| App | `frontend/src/App.tsx` | Componente raíz, fetch de datos, layout |
| FastAPI | `backend/app/main.py:6` | `app = FastAPI(...)`, middleware CORS, router |
| Router | `backend/app/routes.py` | Define 9 endpoints REST |
| Docker | `docker-compose.yml` | Orquestación de servicios |
| Backend Docker | `backend/Dockerfile:12` | `CMD: python -m debugpy ... uvicorn ...` |
| Frontend Docker | `frontend/Dockerfile:12` | `CMD: npm run dev -- --host 0.0.0.0 --port 5173` |

### Configuración

| Archivo | Propósito |
|---------|-----------|
| `vite.config.ts` | Proxy `/api`, plugin React + Tailwind, alias `@/` |
| `tsconfig.app.json` | TS para src/ (sin strict mode) |
| `tsconfig.node.json` | TS para vite.config.ts |
| `components.json` | Config shadcn/ui (New York style) |
| `eslint.config.js` | Reglas ESLint (recommended, react-hooks, react-refresh) |
| `.env.example` | `VITE_API_BASE_URL` (opcional) |
| `.gitignore` (raíz) | Exclusiones globales del repo |
| `.gitignore` (frontend) | Exclusiones del frontend |

### Scripts (frontend)

| Script | Comando |
|--------|---------|
| `dev` | `vite` |
| `build` | `tsc -b && vite build` |
| `lint` | `eslint .` |
| `preview` | `vite preview` |
| `test` | `vitest run` |
| `test:watch` | `vitest` |
| `test:coverage` | `vitest run --coverage` |

**Evidencia**: `frontend/package.json:7-13`.

### Testing

| Aspecto | Detalle |
|---------|---------|
| Backend | pytest con `TestClient` de FastAPI |
|          | 11 tests en `backend/tests/test_routes.py` |
|          | `conftest.py` agrega backend/ al sys.path |
| Frontend | Vitest |
|          | 4 tests en `frontend/src/lib/financial-utils.test.ts` |
|          | Cubre computeKPIs, computeMonthlyData, formatCurrency, formatPercent |

### Librerías Principales

| Librería | Uso | Archivo evidencia |
|----------|-----|-------------------|
| react, react-dom 19 | UI Framework | `package.json:19-20` |
| recharts 3.8 | Gráficos (LineChart) | `package.json:21` |
| tailwindcss 4 | Estilos utilitarios | `package.json:38` |
| lucide-react | Iconos | `package.json:18` |
| clsx + tailwind-merge | className condicional | `package.json:16-17,22` |
| class-variance-authority | Variantes de componentes | `package.json:16` |
| fastapi | Framework web Python | `requirements.txt:1` |
| uvicorn | Servidor ASGI | `requirements.txt:2` |
| pytest + httpx | Tests HTTP | `requirements.txt:4-6` |
| debugpy | Debug remoto | `requirements.txt:3` |

---

## 3. Flujo General de Ejecución

```
Usuario abre http://localhost:5173
        │
        ▼
[Docker Compose]
  frontend (5173)  ◄── proxy /api ──►  backend (8000)
        │
        ▼
index.html carga → main.tsx → <App />
        │
        ▼
App.tsx useEffect()
  → fetch("/api/metrics")
  → [Vite proxy] → http://backend:8000/api/metrics
      → FastAPI GET /api/metrics
          → generate_mock_movements(seed=42)  ← genera 360 movimientos
          → filter_movements()                 ← sin filtros devuelve todo
          → ensure_chronological_order()
          → JSON response
  → computeKPIs(movements)          ← totalIncome, totalOutcome, profit, profitPercent
  → computeMonthlyData(movements)   ← agrupación por mes
        │
        ▼
Renderiza:
  DashboardHeader("2024 — Full Year")
  KPIRow → 4x KPICard (Total Income, Total Outcome, Profit, Profit Margin)
  IncomeOutcomeChart (LineChart con 2 líneas: income/outcome)
  ProfitPercentChart (LineChart con 1 línea: profitPercent + ReferenceLine en 0)
```

**Evidencia**: `App.tsx:15-43`, `routes.py:248-259`, `financial-utils.ts:21-67`.

---

## 4. Resumen del Sistema

El sistema es un **dashboard financiero de una sola página (SPA)** que:

1. **Backend** expone 9 endpoints REST (`/api/metrics*`) que generan datos financieros mock de forma determinística (semilla 42). Los datos simulan 12 meses de movimientos (30 por mes = 360 registros) con tipos de operación (income/outcome), categorías (suppliers, sales, operational, administrative, others) y tipos de negocio (B2B/B2C). El backend no tiene base de datos ni persistencia — todos los datos se generan en memoria en cada request.

2. **Frontend** obtiene los datos del endpoint `/api/metrics` al cargar, calcula KPIs locales mediante funciones puras (`computeKPIs`, `computeMonthlyData`) y renderiza un dashboard con 4 tarjetas KPI y 2 gráficos de líneas (Recharts).

3. **Infraestructura** usa Docker Compose con 2 servicios. Vite actúa como proxy inverso para `/api` hacia el backend durante desarrollo.

4. **Testing**: El backend tiene 11 tests de integración (HTTP + funciones auxiliares). El frontend tiene 4 tests unitarios (cálculos financieros).

### Endpoints del Backend (`backend/app/routes.py:243-391`)

| Método | Ruta | Propósito |
|--------|------|-----------|
| GET | `/health` | Health check |
| GET | `/api/metrics` | Lista movimientos (filtrable por fecha, categoría, tipo) |
| GET | `/api/metrics/facets` | Opciones de filtro disponibles y rango de fechas |
| GET | `/api/metrics/summary` | Agregación por día/semana/mes |
| GET | `/api/metrics/categories/top` | Top categorías por tipo de operación |
| GET | `/api/metrics/comparison` | Comparación período-over-período |
| GET | `/api/metrics/alerts` | Detección de anomalías en picos de egresos |
| GET | `/api/metrics/b2b` | Movimientos solo B2B |
| GET | `/api/metrics/b2c` | Movimientos solo B2C |

---

## 5. Resumen Ejecutivo

> **Financial Metrics Dashboard** es una aplicación web full-stack para visualización de indicadores financieros. Consta de un frontend en React 19 + TypeScript 6 + Vite 8 + Tailwind CSS 4 con gráficos Recharts, y un backend en FastAPI (Python 3.13) que genera datos mock determinísticos. Se ejecuta mediante Docker Compose. La aplicación muestra 4 KPIs (Ingresos, Egresos, Ganancia Neta, Margen de Ganancia) y 2 gráficos (Ingresos vs Egresos y Margen % mensual). El frontend obtiene datos del backend vía API REST, calcula métricas localmente y renderiza el dashboard. No hay base de datos ni persistencia — los datos se generan en memoria. Incluye tests unitarios (Vitest) y de integración (pytest). Es un proyecto educativo de 4Geeks Academy para un bootcamp de Ingeniería de IA.

---

## 6. Verificación contra el Código Real

| Afirmación | Evidencia | Verificado |
|------------|-----------|:----------:|
| Frontend React 19 | `package.json:19` `"react": "^19.2.4"` | ✔️ |
| TypeScript 6 | `package.json:39` `"typescript": "~6.0.2"` | ✔️ |
| Vite 8 | `package.json:41` `"vite": "^8.0.4"` | ✔️ |
| Tailwind 4 | `package.json:38` `"tailwindcss": "^4.2.2"` | ✔️ |
| shadcn/ui Card + Skeleton | `components/ui/card.tsx`, `skeleton.tsx` | ✔️ |
| Recharts 3.8 | `package.json:21` `"recharts": "^3.8.1"` | ✔️ |
| FastAPI | `requirements.txt:1` `fastapi` | ✔️ |
| Python 3.13 | `backend/Dockerfile:1` `python:3.13-slim` | ✔️ |
| 9 endpoints REST | `routes.py:243-391` (9 funciones con `@router.get`) | ✔️ |
| Datos mock seed=42 | `routes.py:95-96` `random.seed(seed)` | ✔️ |
| 360 movimientos | `routes.py:99-102` 12 meses × 30 días | ✔️ |
| Sin base de datos | No hay imports de DB, no hay models de SQL | ✔️ |
| 4 KPIs | `financial-types.ts:13-18` `KPIMetrics` con 4 campos | ✔️ |
| 2 gráficos | `income-outcome-chart.tsx`, `profit-percent-chart.tsx` | ✔️ |
| Docker Compose 2 servicios | `docker-compose.yml:1-22` (frontend + backend) | ✔️ |
| Vite proxy /api | `vite.config.ts:11-16` | ✔️ |
| 11 tests backend | `test_routes.py` — 11 funciones `test_*` | ✔️ |
| 4 tests frontend | `financial-utils.test.ts` — 4 tests en 3 `describe` | ✔️ |
| Proyecto 4Geeks Academy | `README.md:5` "By @marcogonzalo... at 4Geeks Academy" | ✔️ |
| debugpy para debug remoto | `requirements.txt:3`, `backend/Dockerfile:12` | ✔️ |

---

## 7. Afirmaciones Sin Evidencia (evitadas)

| Afirmación evitada | Motivo |
|--------------------|--------|
| "El frontend usa React Router" | No hay `react-router-dom` en `package.json` ni imports |
| "Hay autenticación" | No hay login, JWT, ni middleware de auth |
| "El sistema tiene caché" | No hay Redis, `lru_cache`, ni store de datos compartido |
| "Los gráficos interactúan con filtros" | No hay controles de filtro en el frontend |
| "Hay persistencia de datos" | No hay base de datos, ORM, ni archivos de almacenamiento |

---

## 8. Inconsistencias Identificadas

| # | Inconsistencia | Archivos | Detalle |
|---|----------------|----------|---------|
| 1 | **`mock-data.ts` no utilizado** | `frontend/src/lib/mock-data.ts` | 73 movimientos estáticos que no se importan en ningún archivo. `App.tsx` solo usa fetch a la API. |
| 2 | **`__pycache__` no ignorado por `.gitignore`** | `.gitignore:30`, `backend/app/__pycache__/` | El patrón `backend/__pycache__/` no cubre `backend/app/__pycache__/` |
| 3 | **`strict: true` ausente en TypeScript** | `tsconfig.app.json` | No hay modo estricto de TypeScript |
| 4 | **Mensaje de error en español, UI en inglés** | `App.tsx:37` | "No se pudo cargar la informacion financiera..." en medio de UI inglés |
| 5 | **Parámetros asimétricos en comparación** | `routes.py:307-308` vs `routes.py:250-253` | `/api/metrics/comparison` usa `start_date` y `end_date` requeridos; los demás endpoints los tienen opcionales |
| 6 | **Directorios de agente faltantes** | `AGENTS.md:5-13` | Referencia `.agents/rules/`, `.agents/skills/`, `memory-bank/` que no existen |
| 7 | **CORS permisivo** | `main.py:9` | `allow_origins=["*"]` |

---

## Checklist Final

| Requisito | Estado |
|-----------|:------:|
| ✔️ Estructura comprendida | ✔️ |
| ✔️ Entry points identificados | ✔️ |
| ✔️ Flujo identificado | ✔️ |
| ✔️ Resumen validado | ✔️ |
| ✔️ Inconsistencias encontradas | ✔️ |
