---
title: "Mantener Documentacion Operativa Sincronizada"
description: "Actualizar README, AGENTS y documentos de reglas cuando cambien comandos, contratos, variables o convenciones del proyecto."
globs:
  - "README.md"
  - "README.es.md"
  - "AGENTS.md"
  - "REGISTRO_REGLAS.md"
  - "VALIDACION_REGLAS.md"
  - ".agents/rules/**/*.md"
  - "docker-compose.yml"
  - "backend/**/*.py"
  - "frontend/package.json"
  - "frontend/src/**/*.ts"
  - "frontend/src/**/*.tsx"
applicationType: autoAttached
content: |
  Trata ./.agents/rules como la fuente operativa principal de reglas activas.

  Trata REGISTRO_REGLAS.md y VALIDACION_REGLAS.md como documentos informativos, salvo que indiquen explicitamente lo contrario.

  Mantiene AGENTS.md apuntando al directorio real de reglas activas.

  Actualiza README.md y README.es.md cuando cambien comandos, endpoints, variables de entorno, puertos o el flujo de ejecucion local.

  Mantiene los ejemplos de API alineados con los endpoints reales bajo /api/metrics.

  Documenta decisiones que creen una convencion nueva para backend, frontend, Docker o agentes.

  Guarda README y documentos del proyecto como UTF-8 valido.
