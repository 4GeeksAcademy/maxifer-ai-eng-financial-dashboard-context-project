---
title: "Separar Configuracion Segura Por Entorno"
description: "Evitar CORS inseguro, secretos hardcodeados y herramientas de debug en configuraciones productivas."
globs:
  - "backend/app/main.py"
  - "backend/**/*.py"
  - "backend/Dockerfile"
  - "frontend/Dockerfile"
  - "docker-compose.yml"
  - "backend/.env.example"
  - "frontend/.env.example"
  - "README.md"
  - "README.es.md"
applicationType: autoAttached
content: |
  Usa CORS abierto solo en configuracion local de desarrollo.

  No combines allow_origins=["*"] con allow_credentials=True. Si se necesitan credenciales, usa origenes explicitos.

  Lee origenes permitidos desde una variable de entorno cuando el backend se prepare para produccion.

  Mantiene debugpy, --reload y el puerto 5678 fuera de imagenes o comandos productivos.

  Si Docker se usa para desarrollo, nombralo como desarrollo en README o separa Dockerfile y comando de produccion.

  No hardcodees secretos, origenes externos ni flags sensibles en codigo fuente.

  Documenta toda variable de entorno nueva en un archivo .env.example o README con su proposito.
