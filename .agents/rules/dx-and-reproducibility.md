# DX Y Reproducibilidad

## Nombre
Comandos y builds reproducibles.

## Alcance
Aplica a `frontend/package.json`, `frontend/package-lock.json`, Dockerfiles, `backend/requirements.txt`, `docker-compose.yml`, puertos, proxy de Vite y variables de entorno.

## Razon
El proyecto debe poder ejecutarse y validarse en otra maquina o CI sin depender de configuraciones locales implicitas.

## Reglas
- Mantener scripts en `frontend/package.json` para `dev`, `test`, `lint`, `build` y `test:coverage`.
- Usar `npm ci` en Docker o CI cuando exista `frontend/package-lock.json`.
- Fijar versiones en `backend/requirements.txt` antes de tratar el backend como reproducible o listo para CI.
- Documentar puertos expuestos por Docker y URLs locales en README cuando cambien.
- Mantener documentado el proxy de Vite para `/api` y cualquier cambio en `VITE_API_BASE_URL`.
- Separar comandos de desarrollo y produccion cuando cambien flags como reload, host, debugging o montaje de volumenes.
- Evitar instrucciones que dependan de rutas absolutas o configuracion personal de una maquina.
