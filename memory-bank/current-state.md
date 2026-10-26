# Current State

## Funcionalidades implementadas

- Aplicacion React que carga datos desde `/api/metrics` al iniciar.
- Estado de carga mientras se obtiene la informacion financiera.
- Mensaje de error si falla la llamada a la API.
- Calculo cliente de total income, total outcome, profit y profit margin.
- Agregacion cliente de datos mensuales para graficos.
- Dashboard con encabezado, cuatro tarjetas KPI y dos graficos.
- API FastAPI con health check.
- API FastAPI con endpoints para movimientos, facets, summary, top categories, comparison, alerts, B2B y B2C.
- Filtros backend por fecha, categoria, tipo de operacion y, en endpoints especificos, tipo de negocio.
- Datos mock generados en memoria de forma deterministica con `seed=42`.
- Pruebas backend para generacion, filtros y endpoints.
- Pruebas frontend para calculos financieros y formateadores.
- Docker Compose para levantar frontend y backend en local.

## Problemas conocidos

- El frontend muestra `DashboardHeader period="2024 - Full Year"` en `frontend/src/App.tsx`, pero el backend genera fechas segun `date.today()` en `backend/app/routes.py`; por lo tanto el periodo visible puede no coincidir con los datos generados.
- `frontend/src/lib/mock-data.ts` contiene datos estaticos, pero no se verifico uso en el flujo actual.
- El backend usa `allow_origins=["*"]` junto con `allow_credentials=True` en `backend/app/main.py`.
- El contenedor backend expone `5678` y ejecuta `debugpy` con `--reload` en `backend/Dockerfile`; esto esta orientado a desarrollo.
- `backend/app/routes.py` concentra modelos Pydantic, generacion de datos, filtros, calculos y endpoints.
- `backend/app/routes.py` expone rutas especificas `/api/metrics/b2b` y `/api/metrics/b2c`, aunque la regla activa de arquitectura prefiere resolver segmentos con el filtro `business_type`.
- El frontend consume solo `/api/metrics`; los endpoints agregados del backend no estan integrados en la UI verificada.
- `frontend/src/App.tsx` maneja estados `loading` y `error`, pero no un estado `empty` explicito cuando la API devuelve una lista vacia; esto incumple la regla activa de frontend para vistas con datos remotos.
- El mensaje de error de carga esta en espanol mientras la UI principal esta en ingles.
- `README.md` muestra mojibake en texto visible y en el arbol de directorios, por lo que aun no cumple la regla de documentacion UTF-8 valida.
- `README.es.md` debe mantenerse revisado junto con `README.md` para conservar documentacion operativa sincronizada.
- `frontend/package-lock.json` existe, pero `frontend/Dockerfile` usa `npm install` en vez de `npm ci`.
- `backend/requirements.txt` no fija versiones de paquetes.

## Riesgos

- Riesgo de inconsistencia de contrato porque el backend define modelos Pydantic y el frontend mantiene tipos TypeScript manuales equivalentes.
- Riesgo de confusion funcional porque algunos calculos existen en backend (`summary`, `comparison`, `alerts`) mientras la UI calcula KPIs y series mensuales localmente.
- Riesgo de comportamiento ambiguo en filtros porque conviven endpoints segmentados B2B/B2C con endpoints filtrables por `business_type`.
- Riesgo de experiencia incompleta si `/api/metrics` devuelve una lista vacia, porque la UI no tiene estado `empty` explicito.
- Riesgo de configuracion insegura si la configuracion actual de CORS, debugpy y reload se reutiliza fuera de desarrollo.
- Riesgo de reproducibilidad por dependencias Python sin version fija y uso de `npm install` en Docker pese a existir lockfile.
- Riesgo de que el periodo mostrado por la UI sea incorrecto respecto a los datos reales entregados por la API.
- Riesgo de confusion en onboarding por caracteres mojibake visibles en `README.md`.

## Deuda tecnica

- Separar responsabilidades de `backend/app/routes.py` en contratos, datos y servicios si el backend crece.
- Reemplazar o documentar las rutas `/api/metrics/b2b` y `/api/metrics/b2c` frente al filtro `business_type`, para alinear el contrato con la regla activa de arquitectura.
- Definir un unico duenio para agregaciones financieras que hoy existen en backend y frontend.
- Sincronizar tipos frontend con modelos backend o agregar validacion runtime si el contrato crece.
- Agregar estado `empty` explicito en el flujo remoto de `frontend/src/App.tsx` y cubrirlo si se modifica el consumo de API.
- Alinear documentacion y archivos Markdown a UTF-8 valido.
- Diferenciar explicitamente configuracion de desarrollo y produccion.
- Cubrir estados frontend remotos con pruebas si cambia el flujo de carga de datos.

## Funcionalidades pendientes

No se verifico un backlog formal, TODOs o issues dentro del repositorio.

Pendiente solo en terminos de integracion observada:

- No se verifico UI para consumir facets, summary, top categories, comparison, alerts, B2B o B2C.
- No se verifico persistencia de datos.
- No se verifico autenticacion.
- No se verifico carga de datos reales.
- No se verifico exportacion de reportes.
- No se verifico deploy productivo.

## Proximas prioridades

Estas prioridades documentan trabajo necesario para estabilizar el estado existente; no agregan funcionalidades nuevas:

1. Validar que el periodo mostrado por el dashboard derive de los datos o quede documentado como texto fijo.
2. Alinear el uso de agregaciones entre frontend y backend para evitar reglas financieras duplicadas.
3. Separar configuracion de desarrollo de cualquier configuracion productiva.
4. Mejorar reproducibilidad de dependencias y builds.
5. Mantener documentacion en UTF-8 valido y sincronizada con endpoints, puertos y variables actuales.

## Como validar el estado

Comandos verificados por configuracion del repositorio:

- Levantar todo en local: `docker compose up --build`
- Frontend dev: desde `frontend`, `npm run dev`
- Frontend tests: desde `frontend`, `npm run test`
- Frontend lint: desde `frontend`, `npm run lint`
- Frontend build: desde `frontend`, `npm run build`
- Backend tests: desde `backend`, `python -m pytest`

Validaciones manuales conectadas al codigo:

- Abrir `http://localhost:5173` y confirmar que se renderizan el encabezado, 4 KPIs y 2 graficos.
- Abrir `http://localhost:8000/health` y confirmar `{"status":"ok"}`.
- Consultar `http://localhost:8000/api/metrics` y confirmar que devuelve movimientos con `create_date`, `amount`, `operation_type`, `category` y `business_type`.
- Revisar `http://localhost:8000/docs` para confirmar los endpoints FastAPI expuestos.

No se ejecutaron comandos de test o build durante la generacion de este memory bank; la validacion realizada fue por inspeccion de archivos y trazabilidad con el codigo real.

## Skill adicional aplicada

- Se busco con `npx skills find performance` y `npx skills find accessibility`. Se agrego `web-design-guidelines` de `vercel-labs/agent-skills`, ademas de las skills de React y accesibilidad que ya estaban presentes.
- Se eligio porque sus guias de interfaz incluyen accesibilidad de teclado y recomiendan enlaces para saltar al contenido principal, una mejora pertinente para este dashboard SPA.
- Se aplico agregando un enlace "Skip to main content" visible al recibir foco y un destino enfocable en el `<main>` de `frontend/src/App.tsx`.
