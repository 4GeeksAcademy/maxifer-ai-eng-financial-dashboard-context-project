---
title: "Asegurar Comandos Y Builds Reproducibles"
description: "Mantener scripts, dependencias, Docker, puertos y variables documentados para desarrollo y CI."
globs:
  - "frontend/package.json"
  - "frontend/package-lock.json"
  - "frontend/Dockerfile"
  - "backend/Dockerfile"
  - "backend/requirements.txt"
  - "docker-compose.yml"
  - "README.md"
  - "README.es.md"
  - "frontend/.env.example"
  - "backend/.env.example"
applicationType: autoAttached
content: |
  Mantiene scripts en frontend/package.json para dev, test, lint, build y test:coverage.

  Usa npm ci en Docker o CI cuando exista frontend/package-lock.json.

  Fija versiones en backend/requirements.txt antes de tratar el backend como reproducible o listo para CI.

  Documenta los puertos expuestos por Docker y las URLs locales cuando cambien.

  Mantiene documentado el proxy de Vite para /api y cualquier cambio en VITE_API_BASE_URL.

  Separa comandos de desarrollo y produccion cuando cambien flags como reload, host, debugging o montaje de volumenes.

  No agregues instrucciones que dependan de rutas absolutas o configuracion personal de una maquina.
