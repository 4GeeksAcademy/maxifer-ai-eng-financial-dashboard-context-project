---
title: "Cubrir Comportamiento Financiero Y API"
description: "Agregar pruebas enfocadas para calculos financieros, endpoints, filtros publicos y estados frontend remotos."
globs:
  - "backend/app/**/*.py"
  - "backend/tests/**/*.py"
  - "frontend/src/lib/**/*.ts"
  - "frontend/src/**/*.test.ts"
  - "frontend/src/**/*.test.tsx"
  - "frontend/src/App.tsx"
  - "frontend/src/components/**/*.tsx"
  - "frontend/package.json"
applicationType: autoAttached
content: |
  Toda funcion financiera nueva debe tener tests unitarios para un caso normal, una lista vacia o resultado cero cuando aplique, y un borde relevante como division por cero, fechas limite o valores negativos.

  Todo endpoint nuevo debe tener tests para respuesta exitosa, parametro invalido cuando el endpoint tenga filtros o limites, y resultado vacio cuando el filtro pueda no encontrar datos.

  Si agregas o cambias un filtro publico, cubre ese filtro solo y combinado con al menos otro filtro del mismo endpoint.

  Si el frontend consume una nueva llamada API, cubre o verifica manualmente los estados loading, error y empty.

  Antes de considerar listo un cambio de comportamiento, ejecuta como minimo tests backend, tests frontend, lint frontend y build frontend.

  Si una verificacion no puede ejecutarse, documenta el comando intentado, la razon y el riesgo residual.
