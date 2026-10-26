# Progress

## Skills aplicadas

| Skill | Origen | Aplicación | Commit |
|---|---|---|---|
| `accessibility` | `addyosmani/web-quality-skills` | Auditoría WCAG del dashboard; skip link y `<main>` enfocable en `frontend/src/App.tsx` | `f870fcf` |
| `vercel-react-best-practices` | `vercel-labs/agent-skills` | Auditoría de rendimiento y despliegue del frontend | `e55fc59` |
| `pre-merge-qa-gate` | Interna | Probada sobre el cambio de a11y sin commitear en `App.tsx` | Sin commit |

Las skills externas están registradas en `skills-lock.json` y cargadas en `.agents/skills/`.

## Cambios verificados

Resultado de `pre-merge-qa-gate` sobre el cambio de `frontend/src/App.tsx`:

- `python -m pytest -q` en `backend`: 15 tests PASS (se instalaron `pytest` y `httpx`).
- `npm test` en `frontend`: 5 tests PASS.
- `npm run lint`: PASS.
- `npm run build`: PASS.
- El contrato `/api/metrics` no cambió, por lo que no hubo que sincronizar modelos, tipos ni README.
- Brecha previa pendiente: `App.tsx` no tiene un estado `empty` explícito para datos remotos, como exige `.agents/rules/frontend-ui.md` y `.agents/rules/testing-and-quality.md`.

Commit sugerido para el cambio de a11y: `fix(a11y): add skip link and focusable main landmark`.

## Skill del ecosistema elegida

**`web-design-guidelines`** (`vercel-labs/agent-skills`), registrada en `skills-lock.json`.

Justificación:
- Completa las dos skills entregadas por el Tech Lead: revisa UI, UX y consistencia visual, no solo accesibilidad ni rendimiento.
- Es relevante para un dashboard con tarjetas KPI y gráficos, y sirve como revisión previa al merge de cambios en `frontend/src/components`.
- Es compatible con las reglas locales de UI y no se solapa con `accessibility`.

## Skill interna creada

**`pre-merge-qa-gate`**, en `.skills/pre-merge-qa-gate/SKILL.md`.

- **Gap que cubre:** ninguna skill comunitaria aplica las reglas locales de QA y contrato API de este repo.
- **Contenido:** comandos de pytest, vitest, lint y build; sincronía de `/api/metrics` entre Pydantic, `financial-types.ts` y READMEs; cobertura mínima de tests; formato de commits.
- **Output:** tabla de checks, brechas con archivo y acción, veredicto `LISTO PARA MERGE` o `BLOQUEADO`, y commit sugerido.

## Pendiente

- Agregar el estado `empty` en `App.tsx`.
- Los problemas conocidos de `current-state.md` siguen abiertos.
