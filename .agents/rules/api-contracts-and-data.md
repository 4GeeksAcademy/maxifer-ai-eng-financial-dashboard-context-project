---
title: "Sincronizar Contratos API Y Datos Financieros"
description: "Mantener alineados los modelos backend, tipos frontend, filtros publicos y formatos de datos usados por /api/metrics."
globs:
  - "backend/app/**/*.py"
  - "backend/tests/**/*.py"
  - "frontend/src/lib/financial-types.ts"
  - "frontend/src/lib/mock-data.ts"
  - "frontend/src/**/*.tsx"
  - "README.md"
  - "README.es.md"
applicationType: autoAttached
content: |
  Cuando cambie un campo, enum, filtro, formato de fecha o significado de una metrica de /api/metrics, actualiza en la misma tarea los modelos Pydantic, los tipos TypeScript, los tests afectados y la documentacion publica correspondiente.

  Usa nombres snake_case en el contrato HTTP. Convierte esos nombres a etiquetas de interfaz solo en la capa de UI.

  Representa las fechas de API como strings ISO con formato YYYY-MM-DD.

  No agregues labels de periodos hardcodeados en componentes si pueden derivarse de create_date o del campo period entregado por el backend.

  Mantiene los datos mock fuera de handlers nuevos. Si modificas generate_mock_movements, evalua moverlo a data.py antes de agregar mas responsabilidades a routes.py.

  Cubre filtros combinados cuando un endpoint tenga mas de un filtro publico.

  Agrega validacion runtime en el frontend o genera un cliente tipado si el frontend empieza a consumir mas de una respuesta API compleja ademas de /api/metrics.
