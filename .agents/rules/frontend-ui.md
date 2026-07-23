# Frontend Y UI

## Nombre
Componentes enfocados, estados explicitos y formatos centralizados.

## Alcance
Aplica a `frontend/src`, especialmente `App.tsx`, `components/dashboard`, `components/ui`, `lib/financial-types.ts`, `lib/financial-utils.ts` y flujos que consumen `/api/metrics`.

## Razon
Un dashboard financiero debe ser consistente, facil de escanear y robusto ante datos remotos incompletos o fallidos.

## Reglas
- Mantener llamadas API fuera de componentes presentacionales de `components/dashboard`.
- Mantener transformaciones financieras en `frontend/src/lib/financial-utils.ts` o helpers equivalentes, no embebidas en JSX.
- Mantener tipos de datos financieros en `frontend/src/lib/financial-types.ts`.
- Procurar que componentes React no superen aproximadamente 80 lineas de codigo. Si un componente supera ese umbral, evaluar extraer tooltips, estados de loading/empty, configuracion de chart o subcomponentes.
- No aplicar el umbral de 80 lineas a tests, datos mock, CSS o archivos de configuracion.
- Usar estados explicitos de `loading`, `error` y `empty` para vistas que dependen de datos remotos.
- Centralizar formateadores de moneda, porcentaje y fecha.
- Usar tokens CSS existentes para colores, radios y estados visuales antes de introducir valores arbitrarios.
- No ocultar errores de API: mostrar un mensaje util al usuario y preservar detalle tecnico suficiente para debugging.
