# Financial Metrics Dashboard

<!-- hide -->

By [@marcogonzalo](https://github.com/marcogonzalo) and [other contributors](https://github.com/4GeeksAcademy/ai-eng-financial-dashboard-context-project/graphs/contributors) at [4Geeks Academy](https://4geeksacademy.com/)

[![build by developers](https://img.shields.io/badge/build_by-Developers-blue)](https://4geeks.com)
[![4Geeks Academy](https://img.shields.io/twitter/follow/4geeksacademy?style=social&logo=x)](https://x.com/4geeksacademy)

_Estas instrucciones están [disponibles en español](./README.es.md)._

**Before you start**: 📗 [Read the instructions](https://4geeks.com/lesson/how-to-start-a-project) on how to start a coding project.

<!-- endhide -->

---

_Financial metrics dashboard with a React + TypeScript frontend and a FastAPI backend._

## Recommended steps

1. Fork this repository to your account.
2. Open your fork in GitHub Codespaces or clone it and run it in your local environment.
3. Run your AI agent to inspect both frontend and backend.
4. Document the proposed rules and memory bank in your fork.
5. Refine and validate the rules until they fit the project's real workflow.

## Expected agents directory structure

```text
./.agents
└─ /rules
   └─ <rule-name>.md
└─ /skills
   └─ /<skill-name>
      └─ /SKILL.md
```

## How to run locally

```bash
docker compose up --build
```

The frontend uses the Vite proxy for `/api` by default, so no extra environment variables are required in local development or Codespaces.
If you need to target a different backend origin, copy `frontend/.env.example` to `.env` and set `VITE_API_BASE_URL`.

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API documentation: http://localhost:8000/docs

## Frontend deployment performance

The `vercel-react-best-practices` audit targets this React + Vite SPA, not Next.js.
There is one page: its title and description live in `frontend/index.html`.
There are no content images or downloaded fonts, so `next/image` and `next/font`
do not apply. The dashboard uses system fonts without external font requests.

Charts load in a separate JavaScript chunk while the header and KPIs render.
Chart placeholders retain the real headings and 280px plot height; KPI placeholders
retain labels and helper text to reduce layout shift. Chart loading/rendering errors
show a reload action. The HTML applies the dark theme before React mounts.

From `frontend`, run `npm ci`, `npm run build`, and `npm run preview` to inspect the
production output. Configure the production host to forward `/api` to the backend,
or set `VITE_API_BASE_URL` before building; the Vite development proxy is not part
of the production bundle. Measure Lighthouse performance and CLS against this
production preview with the API available; a successful build is not a Lighthouse score.

## Accessibility

The dashboard applies the `accessibility` skill: charts have accessible names and
instructions, tooltips announce values, and keyboard focus uses a high-contrast
outline. The outcome series uses a dashed line so it does not rely on color alone.
Loading and error states are announced without moving focus.

To check, use Tab and Shift+Tab between charts, Left/Right arrows to explore
months, and Escape to dismiss the tooltip. Repeat the Lighthouse Accessibility
audit with loaded data; a score of 100 does not guarantee WCAG conformance or
replace screen reader testing.

---

This and many other projects are built by students as part of the [Career Programs](https://4geeksacademy.com/compare-programs) at [4Geeks Academy](https://4geeksacademy.com). By [@marcogonzalo](https://github.com/marcogonzalo) and [other contributors](https://github.com/4GeeksAcademy/ai-eng-financial-dashboard-context-project/graphs/contributors). Find out more about [AI Engineering](https://4geeksacademy.com/en/coding-bootcamps/ai-engineering), [Data Science & Machine Learning](https://4geeksacademy.com/en/coding-bootcamps/data-science-ml), [Cybersecurity](https://4geeksacademy.com/en/coding-bootcamps/cybersecurity) and [Full-Stack Software Developer with AI](https://4geeksacademy.com/en/coding-bootcamps/full-stack-developer).
