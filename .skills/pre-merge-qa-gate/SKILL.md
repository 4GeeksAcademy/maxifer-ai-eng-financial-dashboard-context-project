---
name: pre-merge-qa-gate
description: Verifica que un cambio esté listo para merge en este repo: checks de QA obligatorios, sincronía del contrato /api/metrics (backend, tipos TS, docs) y formato de commits. Úsala antes de commit/PR.
---

# Pre-Merge QA Gate

## Objetivo
Decidir de forma accionable si un cambio puede mergearse, aplicando `.agents/rules/testing-and-quality.md` y `.agents/rules/api-contracts-and-data.md`, que ninguna skill comunitaria (a11y, UI, performance) cubre.

## Inputs
- Diff a revisar: `git status --short` y `git diff --name-only <base>...HEAD`.
- Tipo de cambio: comportamiento, contrato API, solo docs o solo UI.
- Mensaje de commit propuesto (opcional).

## Pasos
1. Clasificar los archivos cambiados (`backend/app`, `backend/tests`, `frontend/src/lib`, `frontend/src/components`, `README*`).
2. Ejecutar, según aplique (cambio de comportamiento = todos):
   - Backend: `cd backend && python -m pytest -q` (requiere `pip install -r requirements.txt pytest httpx`)
   - Frontend: `cd frontend && npm test && npm run lint && npm run build`
3. Revisar el contrato (si cambió un campo, enum, filtro o formato de fecha de `/api/metrics`): deben cambiar en la misma tarea los modelos Pydantic, `frontend/src/lib/financial-types.ts`, los tests y `README.md` + `README.es.md`. Los campos usan snake_case y las fechas son ISO `YYYY-MM-DD`.
4. Revisar la cobertura de tests:
   - Función financiera nueva: caso normal, vacío/cero y un borde (división por cero, fechas límite o negativos).
   - Endpoint nuevo: éxito, parámetro inválido y resultado vacío.
   - Filtro nuevo o cambiado: solo y combinado con otro.
   - Llamada API nueva en frontend: estados loading, error y empty.
5. Validar el commit con Conventional Commits en inglés (`feat|fix|docs|perf|refactor|test|chore(scope): resumen en imperativo`, ≤72 caracteres).
6. Si una verificación no se puede ejecutar, anotar comando intentado, razón y riesgo residual.

## Output esperado
Informe breve:
- Tabla de checks: comando | resultado (PASS/FAIL/NO EJECUTADO).
- Lista de brechas de contrato o tests, con archivo y acción concreta.
- Veredicto: `LISTO PARA MERGE` o `BLOQUEADO` con los pasos mínimos para desbloquear.
- Mensaje de commit sugerido.

## Criterios de aceptación
- Se ejecutaron o justificaron los 4 checks (pytest, vitest, lint, build).
- Cada brecha tiene archivo y acción concreta, sin consejos genéricos.
- El veredicto es coherente con los resultados.
- No se modificó código fuera del alcance del cambio revisado.
