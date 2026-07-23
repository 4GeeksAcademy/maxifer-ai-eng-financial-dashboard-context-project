# Validacion De Reglas

Este documento valida si las reglas activas en `./.agents/rules` pueden guiar tareas reales en este repositorio.

## Veredicto General

Las reglas son aplicables al proyecto y cubren superficies reales: backend FastAPI, frontend React, contratos API, testing, Docker, dependencias y documentacion. No son reglas abstractas; varias senalan problemas existentes o limites concretos que pueden orientar refactors futuros.

## Revision De Formato 2026-07-23

Las reglas activas en `./.agents/rules` fueron normalizadas al formato con `title`, `description`, `globs`, `applicationType` y `content`.

Cada archivo mantiene un proposito principal, usa lenguaje imperativo y concreto, y define globs para activar la regla solo sobre las superficies relevantes del repositorio.

## Validacion Aplicada 2026-07-23

Se aplicaron las reglas activas de `./.agents/rules` contra el estado actual del repositorio.

### Comandos Ejecutados

- `python -m pytest` en `backend`: paso, 15 tests OK. Queda 1 warning de `StarletteDeprecationWarning` por `fastapi.testclient`/`httpx`.
- `npm run test` en `frontend`: paso, 1 archivo y 5 tests OK. El primer intento dentro del sandbox fallo por `EPERM` al resolver `C:\Users\maxif`; se repitio fuera del sandbox.
- `npm run lint` en `frontend`: paso sin errores.
- `npm run build` en `frontend`: paso. Vite aviso que el chunk principal supera 500 kB despues de minificar.

### Resultado Por Regla

- **Testing y calidad:** validada operativamente. La suite minima definida por la regla pudo ejecutarse completa y queda verde.
- **DX y reproducibilidad:** parcialmente aplicada. Para ejecutar las verificaciones fue necesario instalar dependencias con `npm ci` y `python -m pip install -r requirements.txt`. Persisten deudas: `frontend/Dockerfile` usa `npm install` aunque existe `package-lock.json`, y `backend/requirements.txt` no fija versiones.
- **Seguridad y configuracion:** la regla detecta deuda vigente. `backend/app/main.py` combina `allow_origins=["*"]` con `allow_credentials=True`; `backend/Dockerfile` expone `5678` y arranca con `debugpy` y `--reload`.
- **Arquitectura por capas:** la regla sigue siendo aplicable. `backend/app/routes.py` concentra contrato, mocks, filtros, calculos y endpoints, por lo que un proximo cambio grande deberia extraer `schemas.py`, `services.py` y `data.py`.
- **Contratos API y datos:** validada por tests existentes de filtros, facets, summary, comparison y alerts. No se hicieron cambios de contrato en esta pasada.
- **Frontend y UI:** validada sin cambios funcionales. Los tests de utilidades financieras, lint y build pasan; queda como deuda futura cubrir automaticamente estados `loading`, `error` y `empty` si se modifica el consumo de API.
- **Documentacion:** parcialmente aplicada al dejar esta evidencia. Las reglas activas estan en `./.agents/rules` y `REGISTRO_REGLAS.md` queda como documento informativo.

### Hallazgos Abiertos

- `npm ci` reporto 5 vulnerabilidades auditables en dependencias frontend: 1 baja y 4 altas.
- Vite reporto un chunk de `584.26 kB` minificado; no bloquea el build, pero conviene revisar code splitting si el dashboard crece.
- La configuracion Docker/backend parece orientada a desarrollo; si se publica como produccion, contradice las reglas de seguridad y reproducibilidad.

## Arquitectura Por Capas

**Regla validada:** si.

**Evidencia:** `backend/app/routes.py` concentra modelos Pydantic, generacion de datos mock, filtros, calculos financieros y endpoints. Esto confirma que la regla guia una tarea real: separar `schemas`, `services` y `data` cuando el backend siga creciendo.

**Accion que guia:** extraer modelos, calculos y mocks fuera de `routes.py`; reducir endpoints a validacion, coordinacion y respuesta.

**Observacion:** la regla sobre evitar endpoints duplicados tambien aplica: existen rutas especificas para `/api/metrics/b2b` y `/api/metrics/b2c`, mientras otros endpoints ya usan `business_type` como filtro.

## Contratos API Y Datos

**Regla validada:** si.

**Evidencia:** el backend define modelos Pydantic en `backend/app/routes.py` y el frontend mantiene tipos equivalentes en `frontend/src/lib/financial-types.ts`. La consistencia entre ambos es necesaria para `FinancialMovement`, `OperationType`, `Category` y `BusinessType`.

**Accion que guia:** cada cambio de campos, enums, filtros o fechas debe reflejarse en backend, frontend, tests y documentacion.

**Observacion:** el frontend confia en `response.json()` sin validacion runtime. La regla no exige resolverlo ya, pero define claramente cuando agregar validacion o cliente tipado.

## Seguridad Y Configuracion

**Regla validada:** si.

**Evidencia:** `backend/app/main.py` usa `allow_origins=["*"]` junto con `allow_credentials=True`. `backend/Dockerfile` expone `5678` y ejecuta `debugpy` con `--reload`. Estas son condiciones concretas cubiertas por la regla.

**Accion que guia:** separar configuracion de desarrollo y produccion, parametrizar CORS, retirar debugging de imagenes o comandos productivos y documentar variables de entorno.

**Observacion:** esta regla es especialmente util porque detecta riesgos actuales, no solo futuros.

## Testing Y Calidad

**Regla validada:** si.

**Evidencia:** existen tests backend en `backend/tests/test_routes.py` y tests frontend de utilidades financieras en `frontend/src/lib/financial-utils.test.ts`. Tambien existen scripts frontend para `test`, `lint`, `build` y `coverage`.

**Accion que guia:** al agregar endpoints, filtros o funciones financieras, ampliar tests de respuesta exitosa, parametros invalidos, resultados vacios y combinaciones de filtros.

**Observacion:** la regla de estados frontend remotos aplica a `App.tsx`, que ya contempla `loading` y `error`; faltaria asegurar cobertura automatizada para estados `empty` y errores de red si se modifica ese flujo.

## Frontend Y UI

**Regla validada:** si.

**Evidencia:** el frontend ya separa tipos en `frontend/src/lib/financial-types.ts`, calculos/formateadores en `frontend/src/lib/financial-utils.ts` y componentes visuales en `frontend/src/components`. La regla de aproximadamente 80 lineas tambien aplica: `income-outcome-chart.tsx` y `profit-percent-chart.tsx` superan las 100 lineas.

**Accion que guia:** extraer tooltips, estados de chart vacio/loading o configuracion comun de Recharts cuando los componentes crezcan.

**Observacion:** el limite de 80 lineas debe seguir siendo orientativo. Un componente puede superar ese tamano si la cohesion sigue siendo clara, pero en este repo ya sirve como alerta concreta.

## DX Y Reproducibilidad

**Regla validada:** si.

**Evidencia:** `frontend/package.json` tiene scripts estandar. `frontend/package-lock.json` existe, pero `frontend/Dockerfile` usa `npm install` en vez de `npm ci`. `backend/requirements.txt` no fija versiones. Docker y README documentan puertos principales.

**Accion que guia:** usar installs reproducibles, fijar dependencias Python y separar comandos de dev/produccion cuando difieran por flags.

**Observacion:** la regla guia mejoras pequenas pero importantes para CI y onboarding.

## Documentacion

**Regla validada:** si.

**Evidencia:** `AGENTS.md` apunta a `./.agents/rules`, `README.md` y `README.es.md` documentan ejecucion local, estructura esperada para agentes, proxy de Vite y variable `VITE_API_BASE_URL`. `REGISTRO_REGLAS.md` conserva el registro informativo de reglas propuestas.

**Accion que guia:** mantener README, instrucciones de agentes y ejemplos sincronizados cuando cambien endpoints, comandos, variables o convenciones.

**Observacion:** esta regla evita que `REGISTRO_REGLAS.md` vuelva a confundirse con las reglas activas.

## Ajustes Recomendados A Futuro

- No endurecer el limite de 80 lineas; mantenerlo como senal de revision.
- Considerar una regla adicional de "prioridad de reglas activas" si en el futuro aparecen documentos historicos similares a `REGISTRO_REGLAS.md`.
- Cuando se haga un refactor backend, aplicar primero las reglas de arquitectura, contratos y testing juntas, porque estan acopladas en `routes.py`.
