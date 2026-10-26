# 🎯 RETO: Mejorando el desarrollo con skills de agentes - Dashboard financiero

## 📋 Contexto y Estado Actual
- **Proyecto:** Dashboard financiero heredado (mismo repositorio y tech stack del proyecto de contexto anterior).
- **Base configurada:** `memory-bank/` verificado, reglas en `.agents/rules/` y setup local ya descubierto por el agente.
- **Feedback del Tech Lead:** *"Buena base. Antes de hacer merge de los próximos cambios, sube el nivel en dos frentes: accesibilidad y buenas prácticas de despliegue. Te comparto dos skills que puedes cargar directamente en tu coding agent — guiarán la auditoría y las correcciones sin que memorices cada regla. Una vez aplicadas, explora el ecosistema de skills y mira qué encaja en este repo. Luego captura una skill interna que el equipo reutilizará aquí — commits, despliegue, testing, o algo específico de este dashboard. Documenta lo que aprendiste."*

---

## 🛠️ Instrucciones Operativas para el Agente de IA
1. **Acción guiada por Skills:** No apliques correcciones masivas a ciegas ni copies checklists de memoria. Cada cambio debe estar guiado y justificado por las instrucciones de una skill cargada.
2. **Trazabilidad:** Pide explicaciones y referencias a archivos reales antes de aceptar cualquier modificación propuesta por el agente.
3. **Verificación:** Valida siempre los resultados ejecutando la app y el comando de build/test correspondiente documentado en el repositorio.
4. **Rama de trabajo:** Todo el desarrollo debe realizarse sobre la rama `feature/agent-skills`.

---

## 📝 Tareas a Ejecutar (Step-by-Step)

### 1. Descubrir y Cargar las Skills Proporcionadas
- [ ] Ejecutar `npx skills find accessibility` y revisar qué cubre la skill.
- [ ] Ejecutar `npx skills find vercel-react-best-practices` y revisar su contenido.
- [ ] Cargar ambas skills en el coding agent para habilitar sus instrucciones.

### 2. Aplicar la Skill `accessibility`
- [ ] Auditar el dashboard utilizando la skill cargada para detectar problemas (atributos `aria-label` faltantes, gestión deficiente del foco, texto `alt` ausente y bajo contraste en elementos interactivos).
- [ ] Proponer y aplicar correcciones estrictamente ligadas a la skill.
- [ ] Verificar navegación por teclado, roles/atributos `aria-*` correctos, imágenes con `alt` y contraste adecuado.
- [ ] Realizar un commit específico cuyo mensaje haga referencia a la skill `accessibility`.

### 3. Aplicar la Skill `vercel-react-best-practices`
- [ ] Auditar patrones frontend orientados a despliegue (uso correcto de `next/image`, `next/font`, prevención de *layout shift*, metadatos por página y anti-patrones de Lighthouse).
- [ ] Aplicar las correcciones correspondientes.
- [ ] Ejecutar el comando de build del frontend del repositorio para confirmar que compila correctamente y sin advertencias nuevas injustificadas.
- [ ] Realizar un commit específico cuyo mensaje haga referencia a la skill `vercel-react-best-practices`.

### 4. Explorar el Ecosistema de Skills
- [ ] Ejecutar `npx skills find <tema>` en al menos dos temas relevantes (ej. `performance`, `seo`, `forms`, `typescript`, `testing`).
- [ ] Seleccionar y aplicar al menos una skill adicional que aporte valor real al proyecto.
- [ ] Justificar la elección de la skill en el `memory-bank` o notas del pull request.

### 5. Escribir una Skill Interna del Proyecto
- [ ] Identificar un gap específico de este repositorio heredado que las skills comunitarias no cubran (ej. convenciones de commits, pasos de despliegue, checks de testing/QA antes del merge, reglas de formateo, patrones de API o convenciones UI).
- [ ] Redactar el archivo de la skill bajo la estructura estándar:
  - **Objetivo claro**
  - **Inputs definidos**
  - **Output esperado**
  - **Criterios de aceptación**
- [ ] Guardar la skill creada en la carpeta `.skills/`.
- [ ] Cargarla y verificar que produce una guía accionable en una tarea real dentro del repositorio.

### 6. Actualizar el Memory Bank
- [ ] Actualizar `memory-bank/progress.md` (o archivo equivalente) documentando:
  - Skills aplicadas.
  - Cambios verificados.
  - Skill del ecosistema elegida y su justificación.
  - La skill interna creada.

---

## ✅ Checklist de Evaluación (Criterios de Aprobación)

- [x] Las skills `accessibility` y `vercel-react-best-practices` fueron cargadas y aplicadas de forma visible y trazable.
- [ ] Resultados de accesibilidad verificados (navegación por teclado, atributos `aria-*`, textos `alt` y contraste). **Parcial:** hay revisión estática y mejoras visibles, pero falta verificar navegación por teclado y contraste en la interfaz renderizada.
- [x] El build del frontend pasa exitosamente usando el comando documentado del repositorio, sin advertencias nuevas injustificadas.
- [x] Se descubrió mediante `npx skills find` y se aplicó al menos una skill adicional con su respectiva justificación.
- [x] Existe una skill interna correctamente estructurada (objetivo, inputs, outputs, criterios de aceptación) guardada en `.skills/` con directrices específicas del proyecto.
- [x] El `memory-bank` refleja con precisión y detalle el trabajo realizado durante toda la sesión.
- [ ] Los cambios en la rama `feature/agent-skills` cuentan con commits limpios y claros (idealmente un commit por cada skill aplicada). **Parcial:** existen commits específicos para accesibilidad y React best practices, pero quedan cambios sin commit en el árbol de trabajo.
- [x] El flujo de trabajo demuestra mejora dirigida por agente sobre código heredado, validada de forma crítica (sin ediciones masivas ciegas).

### Evidencia de esta verificación

- `cd backend && python -m pytest -q`: 15 tests aprobados; muestra una advertencia deprecada de Starlette/httpx.
- `cd frontend && npm test`: 5 tests aprobados; `npm run lint` y `npm run build`: aprobados. El build no mostró advertencias.
- Se comprobó que el servidor local responde con el HTML de la aplicación. No se hizo una prueba interactiva con navegador ni una medición de contraste, por lo que la casilla de accesibilidad permanece pendiente.
- Los commits específicos encontrados son `f870fcf` (accessibility) y `e55fc59` (vercel-react-best-practices). `git status --short` muestra cambios sin commit, por lo que el criterio de commits queda parcial.