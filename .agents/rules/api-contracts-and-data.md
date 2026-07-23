# Contratos API Y Datos

## Nombre
Contratos API consistentes entre backend y frontend.

## Alcance
Aplica a endpoints bajo `/api/metrics`, modelos Pydantic de `backend/app`, tipos TypeScript de `frontend/src/lib/financial-types.ts`, filtros publicos, formatos de fecha, metricas financieras y datos mock.

## Razon
El dashboard depende de que backend y frontend compartan el mismo significado de campos, filtros y metricas. Las divergencias silenciosas generan bugs dificiles de detectar.

## Reglas
- Cuando cambie un campo, enum, filtro, formato de fecha o significado de metrica, actualizar en la misma tarea:
  - modelos Pydantic del backend.
  - tipos TypeScript del frontend.
  - tests backend o frontend afectados.
  - README si cambia el uso publico de la API o variables relacionadas.
- Mantener los nombres de campos del contrato API en `snake_case`; transformar a nombres de UI solo fuera del contrato.
- Mantener fechas de API como strings ISO `YYYY-MM-DD`.
- No agregar labels de periodos hardcodeados en UI si pueden derivarse de `create_date` o de campos `period` del backend.
- Mantener datos mock fuera de handlers nuevos. Si se toca `generate_mock_movements`, considerar moverlo a `data.py`.
- Cubrir filtros combinados cuando haya mas de un filtro publico para el mismo endpoint.
- Agregar validacion runtime en el frontend o generar cliente tipado si el frontend empieza a consumir mas de una respuesta API compleja ademas de `/api/metrics`.
