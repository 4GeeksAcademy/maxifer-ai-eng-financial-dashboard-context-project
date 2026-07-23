# Reglas Del Proyecto

Este documento define reglas accionables para preservar los patrones utiles detectados en el proyecto y mitigar riesgos de arquitectura, seguridad, testing, DX, documentacion y contratos API.

## Arquitectura

- Separar el backend por capas cuando crezca la funcionalidad:
  - `schemas` para modelos Pydantic y tipos de entrada/salida.
  - `services` para reglas de negocio y calculos financieros.
  - `data` o `repositories` para origenes de datos, incluyendo mocks.
  - `routes` para endpoints FastAPI delgados.
- Mantener los endpoints como coordinadores: validar parametros, llamar servicios y devolver modelos tipados.
- Mantener la logica financiera en funciones puras, sin dependencias directas de HTTP, UI o estado global.
- Evitar endpoints duplicados cuando un filtro explicito cubre el caso. Por ejemplo, preferir `business_type=B2B` sobre crear rutas paralelas con la misma logica.
- Definir un unico duenio para cada agregacion financiera. Si el backend calcula summaries, comparisons o alerts, el frontend no debe reimplementar la misma regla salvo que haya una justificacion documentada.

## Seguridad Y Configuracion

- Separar configuracion de desarrollo y produccion.
- No usar CORS abierto en produccion. Definir origenes permitidos mediante variables de entorno.
- No combinar `allow_origins=["*"]` con credenciales habilitadas.
- No exponer `debugpy`, `--reload` ni puertos de debugging en imagenes o comandos de produccion.
- Mantener secretos, origenes externos y flags de runtime fuera del codigo fuente; usar variables de entorno documentadas.

## Contratos Y Datos

- Documentar todo cambio de contrato API que afecte al frontend: campos, tipos, filtros, formatos de fecha y significado de metricas.
- Mantener consistencia entre modelos Pydantic del backend y tipos TypeScript del frontend.
- Validar respuestas API en runtime en el frontend o generar un cliente tipado desde el contrato backend cuando el contrato deje de ser trivial.
- Evitar fechas, periodos o labels hardcodeados si pueden derivarse de los datos reales.
- Mantener datos mock aislados del routing para que puedan reemplazarse por persistencia real sin reescribir endpoints.

## Testing

- Toda funcion financiera nueva debe incluir tests unitarios con casos normales y bordes relevantes.
- Todo endpoint nuevo debe tener tests de respuesta exitosa, validacion de parametros y resultado vacio.
- Cubrir filtros combinados cuando haya mas de un filtro publico para la misma entidad.
- Cubrir errores de red, estados vacios y estados de carga en flujos frontend que consumen la API.
- Ejecutar, como minimo, tests backend, tests frontend, lint y build antes de considerar listo un cambio de comportamiento.

## DX Y Reproducibilidad

- Mantener scripts estandar y documentados para desarrollo, test, lint, build y coverage.
- Usar `npm ci` en Docker o CI cuando exista `package-lock.json`.
- Fijar versiones de dependencias Python para builds reproducibles.
- Separar Dockerfiles o comandos de desarrollo y produccion si requieren flags distintos.
- Evitar configuraciones implicitas que solo funcionan en una maquina local; documentar puertos, proxies y variables de entorno.

## Documentacion

- Mantener README y documentos del proyecto en UTF-8 valido.
- Actualizar la documentacion cuando cambien comandos, endpoints, variables de entorno o flujo de ejecucion local.
- Documentar decisiones arquitectonicas que creen una convencion nueva para el proyecto.
- Mantener ejemplos de uso alineados con el contrato real de la API.
- Si existen instrucciones para agentes, mantenerlas sincronizadas con estas reglas o enlazarlas desde un unico punto claro.

## UI Y Frontend

- Separar componentes visuales, transformaciones de datos y llamadas API.
- Mantener componentes de dashboard pequenos y enfocados en una responsabilidad.
- Usar estados explicitos de loading, error y empty para vistas que dependen de datos remotos.
- Centralizar formateadores de moneda, porcentaje y fecha para evitar inconsistencias.
- Mantener tokens de diseno para colores, radios y estados visuales, en lugar de duplicar valores arbitrarios en componentes.
- No ocultar errores de API: mostrar mensajes utiles al usuario y conservar detalle tecnico suficiente para debugging.
