# Arquitectura Por Capas

## Nombre
Arquitectura por capas y endpoints delgados.

## Alcance
Aplica a cambios en `backend/app`, especialmente `routes.py`, nuevos endpoints bajo `/api/metrics`, calculos financieros, agregaciones y reorganizacion de datos mock o persistidos.

## Razon
Mantener separadas las responsabilidades evita duplicar logica entre rutas, servicios y frontend. Tambien permite reemplazar mocks por persistencia real sin reescribir el contrato HTTP.

## Reglas
- Mantener endpoints FastAPI como coordinadores: leer parametros `Query`, llamar una funcion de servicio y devolver un modelo `response_model`.
- No agregar nuevas reglas de negocio directamente dentro de handlers si ya existe una funcion pura que puede extenderse.
- Si `backend/app/routes.py` supera responsabilidades dificiles de revisar, extraer en este orden:
  - `schemas.py` para modelos Pydantic y literales de contrato.
  - `services.py` para filtros, summaries, comparisons, alerts y calculos financieros.
  - `data.py` o `repositories.py` para `generate_mock_movements` y futuros origenes de datos.
- Evitar nuevas rutas por segmento de negocio cuando `business_type` pueda resolverlo como filtro.
- No crear nuevas rutas tipo `/api/metrics/<segmento>` sin justificar por que no alcanza con `/api/metrics?business_type=...`.
- Definir un unico duenio por agregacion financiera. Si el backend entrega `summary`, `comparison` o `alerts`, el frontend debe consumir ese resultado o documentar por que calcula una version local.
