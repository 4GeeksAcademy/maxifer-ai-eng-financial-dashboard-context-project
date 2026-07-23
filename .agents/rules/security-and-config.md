# Seguridad Y Configuracion

## Nombre
Configuracion explicita y segura por entorno.

## Alcance
Aplica a `backend/app/main.py`, `backend/Dockerfile`, `frontend/Dockerfile`, `docker-compose.yml`, variables de entorno, scripts de ejecucion y diferencias entre desarrollo y produccion.

## Razon
Separar desarrollo de produccion reduce el riesgo de exponer debugging, CORS abierto, secretos o flags inseguros en entornos reales.

## Reglas
- CORS abierto solo puede existir en configuracion local de desarrollo.
- No combinar `allow_origins=["*"]` con `allow_credentials=True`; si se necesitan credenciales, usar origenes explicitos.
- Leer origenes permitidos desde variable de entorno cuando el backend se prepare para produccion.
- Mantener `debugpy`, `--reload` y el puerto `5678` fuera de imagenes o comandos productivos.
- Si Docker se usa para desarrollo, dejarlo nombrado como tal en README o separar Dockerfile/comando de produccion.
- No hardcodear secretos, origenes externos ni flags sensibles en codigo fuente.
- Toda variable de entorno nueva debe aparecer en un archivo `.env.example` o README con su proposito.
