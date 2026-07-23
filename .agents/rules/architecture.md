---
title: "Mantener Endpoints FastAPI Delgados"
description: "Separar routing, contratos, calculos financieros y origenes de datos cuando se cambie el backend."
globs:
  - "backend/app/**/*.py"
  - "backend/tests/**/*.py"
applicationType: autoAttached
content: |
  Mantiene cada endpoint FastAPI como coordinador: lee parametros Query, llama funciones de servicio y devuelve un modelo response_model.

  No agregues reglas de negocio directamente en handlers cuando exista una funcion pura que pueda extenderse.

  Si routes.py acumula responsabilidades dificiles de revisar, extrae en este orden:
  1. schemas.py para modelos Pydantic y literales del contrato.
  2. services.py para filtros, summaries, comparisons, alerts y calculos financieros.
  3. data.py o repositories.py para generate_mock_movements y futuros origenes de datos.

  No crees rutas /api/metrics/<segmento> nuevas si el filtro business_type cubre el caso.

  Define un unico duenio por agregacion financiera. Si el backend entrega summary, comparison o alerts, el frontend debe consumir ese resultado o documentar por que calcula una version local.
