# Documentacion

## Nombre
Documentacion sincronizada con reglas, comandos y contratos.

## Alcance
Aplica a `README.md`, `README.es.md`, `AGENTS.md`, `REGISTRO_REGLAS.md`, `VALIDACION_REGLAS.md`, ejemplos de uso, decisiones arquitectonicas e instrucciones para agentes.

## Razon
La documentacion es parte del contrato operativo del proyecto. Si queda desactualizada, los agentes y desarrolladores toman decisiones con supuestos incorrectos.

## Reglas
- Las reglas activas viven en `./.agents/rules`. Documentos como `REGISTRO_REGLAS.md` son informativos y no deben usarse como fuente operativa principal.
- Mantener `AGENTS.md` apuntando al directorio real de reglas activas.
- Actualizar README en ingles y espanol cuando cambien comandos, endpoints, variables de entorno, puertos o flujo de ejecucion local.
- Mantener ejemplos de API alineados con los endpoints reales bajo `/api/metrics`.
- Documentar decisiones arquitectonicas que creen una convencion nueva para backend, frontend o Docker.
- Mantener README y documentos del proyecto en UTF-8 valido.
- Si se agrega un nuevo documento de reglas historicas o auditoria, aclarar explicitamente si es informativo u operativo.
