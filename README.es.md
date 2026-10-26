# Panel de Métricas Financieras

<!-- hide -->

Por [@marcogonzalo](https://github.com/marcogonzalo) y [otros contribuidores](https://github.com/4GeeksAcademy/ai-eng-financial-dashboard-context-project/graphs/contributors) en [4Geeks Academy](https://4geeksacademy.com/)

[![build by developers](https://img.shields.io/badge/build_by-Developers-blue)](https://4geeks.com)
[![4Geeks Academy](https://img.shields.io/twitter/follow/4geeksacademy?style=social&logo=x)](https://x.com/4geeksacademy)

_These instructions are [available in English](./README.md)._

**Antes de empezar**: 📗 [Lee las instrucciones](https://4geeks.com/es/lesson/como-comenzar-un-proyecto-de-codificacion) sobre cómo comenzar un proyecto de programación.

<!-- endhide -->

---

_Dashboard de métricas financieras con frontend en React + TypeScript y backend en FastAPI._

## Pasos recomendados

1. Haz un fork de este repositorio a tu cuenta.
2. Abre tu fork en GitHub Codespaces o clónalo y ejecútalo en tu entorno local.
3. Ejecuta tu agente de IA para inspeccionar frontend y backend.
4. Documenta las reglas propuestas y el banco de memoria en tu fork.
5. Ajusta y valida las reglas hasta que sean aplicables al flujo real del proyecto.

## Estructura esperada del directorio para agentes

```text
./.agents
└─ /rules
   └─ <nombre-regla>.md
└─ /skills
   └─ /<nombre-skill>
      └─ /SKILL.md
```

## Cómo ejecutar en local

```bash
docker compose up --build
```

El frontend usa por defecto el proxy de Vite para `/api`, así que no necesitas variables de entorno extra ni en desarrollo local ni en Codespaces.
Si necesitas apuntar a otro backend, copia `frontend/.env.example` como `.env` y define `VITE_API_BASE_URL`.

- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Documentación API: http://localhost:8000/docs

## Rendimiento del frontend para despliegue

La auditoría `vercel-react-best-practices` se aplica a esta SPA React + Vite, no a
Next.js. Hay una sola página: su título y descripción están en `frontend/index.html`.
No hay imágenes de contenido ni fuentes descargadas, por lo que `next/image` y
`next/font` no aplican. El dashboard usa fuentes del sistema sin solicitudes externas.

Los gráficos cargan en un chunk JavaScript separado mientras se muestran el
encabezado y los KPIs. Los placeholders conservan los encabezados reales y los
280px del área de gráficos; los KPIs conservan etiquetas y textos auxiliares para
reducir saltos de diseño. Los errores de carga/renderizado de gráficos muestran
una acción de recarga. El HTML aplica el tema oscuro antes de montar React.

Desde `frontend`, ejecuta `npm ci`, `npm run build` y `npm run preview` para revisar
la salida de producción. Configura el hosting para redirigir `/api` al backend o
define `VITE_API_BASE_URL` antes del build; el proxy de desarrollo de Vite no forma
parte del bundle productivo. Mide Lighthouse y CLS en esta preview de producción
con la API disponible; un build correcto no equivale a una puntuación Lighthouse.

## Accesibilidad

El dashboard aplica la skill `accessibility`: los gráficos tienen nombres e
instrucciones accesibles, sus tooltips anuncian valores y el foco de teclado usa
un contorno de alto contraste. La serie de egresos usa una línea discontinua para
no depender solo del color. Los estados de carga y error se anuncian sin mover el foco.

Para comprobarlo, usa Tab y Mayús+Tab entre gráficos, las flechas izquierda/derecha
para explorar meses y Escape para ocultar el tooltip. Repite la auditoría de
Lighthouse Accessibility con datos cargados; una puntuación de 100 no garantiza
conformidad WCAG ni sustituye las pruebas con lector de pantalla.

---

Este y muchos otros proyectos son construidos por estudiantes como parte de los [Coding Bootcamps](https://4geeksacademy.com/) de 4Geeks Academy. Encuentra más acerca de los [cursos](https://4geeksacademy.com/es/comparar-programas) de [Ingeniería de IA](https://4geeksacademy.com/es/coding-bootcamps/ingenieria-ia), [Data Science & Machine Learning](https://4geeksacademy.com/es/coding-bootcamps/curso-datascience-machine-learning), [Ciberseguridad](https://4geeksacademy.com/es/coding-bootcamps/curso-ciberseguridad) y [Full-Stack Software Developer con IA](https://4geeksacademy.com/es/coding-bootcamps/programador-full-stack).
