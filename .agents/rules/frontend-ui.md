---
title: "Separar UI, Datos Y Formateo En Frontend"
description: "Mantener componentes React enfocados, estados remotos explicitos y formato financiero centralizado."
globs:
  - "frontend/src/App.tsx"
  - "frontend/src/components/**/*.tsx"
  - "frontend/src/lib/**/*.ts"
  - "frontend/src/index.css"
applicationType: autoAttached
content: |
  Mantiene llamadas API fuera de componentes presentacionales en frontend/src/components/dashboard.

  Mantiene transformaciones financieras en frontend/src/lib/financial-utils.ts o en helpers equivalentes, no embebidas en JSX.

  Mantiene tipos de datos financieros en frontend/src/lib/financial-types.ts.

  Usa estados explicitos loading, error y empty para vistas que dependen de datos remotos.

  Centraliza formateadores de moneda, porcentaje y fecha.

  Usa tokens CSS existentes para colores, radios y estados visuales antes de introducir valores arbitrarios.

  No ocultes errores de API: muestra un mensaje util al usuario y conserva detalle tecnico suficiente para debugging.

  Si un componente React supera aproximadamente 80 lineas de codigo, revisa si conviene extraer tooltips, estados de loading o empty, configuracion de charts o subcomponentes. No apliques este umbral a tests, datos mock, CSS ni archivos de configuracion.
