# Testing Y Calidad

## Nombre
Cobertura minima para comportamiento financiero y API.

## Alcance
Aplica a nuevas funciones financieras, endpoints de FastAPI, filtros de `/api/metrics`, estados frontend que consumen API, formateadores y cambios de comportamiento en backend o frontend.

## Razon
Los calculos financieros y contratos API son superficie critica del producto. Tests enfocados reducen regresiones en metricas, filtros y estados de usuario.

## Reglas
- Toda funcion financiera nueva debe tener tests unitarios con:
  - caso normal.
  - lista vacia o resultado cero cuando aplique.
  - borde relevante como division por cero, fechas limite o valores negativos.
- Todo endpoint nuevo debe tener tests para:
  - respuesta exitosa.
  - parametro invalido cuando el endpoint tenga filtros o limites.
  - resultado vacio cuando el filtro pueda no encontrar datos.
- Si se agrega o cambia un filtro publico, cubrirlo solo y combinado con al menos otro filtro del mismo endpoint.
- Si el frontend consume una nueva llamada API, cubrir o verificar manualmente estados `loading`, `error` y `empty`.
- Antes de considerar listo un cambio de comportamiento, ejecutar como minimo:
  - tests backend.
  - tests frontend.
  - lint frontend.
  - build frontend.
- Si una verificacion no puede ejecutarse, documentar el comando intentado, la razon y el riesgo residual.
