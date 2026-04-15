# API Bank SPV — Landing Page

Landing page para **API Bank by Banco Supervielle**, orientada a PSPs, marketplaces, retailers, gestoras y fintechs que quieran integrar pagos bancarios (CVU, Debin, QR, Transferencia Pull, Movimientos) sin licencia bancaria propia.

Demo pública: **https://gonzalezmarcosdamian.github.io/openbankspv/**

> Proyecto de aprendizaje / demo. Los datos, endpoints y flujos son ilustrativos y no representan un producto real de Banco Supervielle.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16 (App Router) |
| Estilos | Tailwind CSS 4 |
| Export | Static (`output: "export"`) |
| Deploy | GitHub Pages vía GitHub Actions |
| Docs interactivas | Swagger UI (CDN, iframe) |
| PDF | Generado con reportlab (Python) |
| OpenAPI | Spec v1.yaml (OpenAPI 3.0.3) |
| Tests pre-deploy | Python (`scripts/test_build.py`) |

---

## Estructura del proyecto

```
app/
  page.tsx              # Home — orden: Hero, SocialProof, WhoIsItFor,
  │                     #   Differentiator, ProductModules, HowItWorks,
  │                     #   DocSection, ContactForm, Footer
  docs/page.tsx         # Página de documentación (iframe Swagger)
  globals.css           # scroll-behavior: smooth global

components/
  Navbar.tsx            # Navbar fija — links absolutos sin onClick
  Hero.tsx
  SocialProof.tsx
  WhoIsItFor.tsx
  Differentiator.tsx
  ProductModules.tsx
  HowItWorks.tsx
  DocSection.tsx
  ContactForm.tsx
  Footer.tsx

public/
  swagger.html          # Swagger UI standalone (CDN unpkg)
  openapi/v1.yaml       # Spec OpenAPI 3.0.3 completa
  documentacion-api-bank-spv.pdf
  llms.txt              # Contexto estructurado para LLMs
  AGENTS.md             # Guía para coding agents (Copilot, Cursor, Claude)

scripts/
  test_build.py         # 42 checks pre-deploy (ver abajo)
  gen_pdf.py            # Genera el PDF de ejemplo con reportlab

.github/workflows/
  deploy.yml            # CI/CD → GitHub Pages
```

---

## Comandos

```bash
# Desarrollo local
npm run dev

# Build de producción (genera /out)
npm run build

# Test pre-deploy (debe pasar antes de cualquier push)
py scripts/test_build.py

# Generar PDF de ejemplo
py scripts/gen_pdf.py
```

---

## Deploy

GitHub Actions detecta push a `main`, buildea y despliega automáticamente.

**Importante:** el deploy tarda 3–5 minutos. Si la página falla justo después de un push, esperá el ✅ verde en la pestaña Actions antes de testear. Después hacer Ctrl+Shift+R (hard refresh).

```
git add <archivos>
git commit -m "..."
git push   # dispara el workflow automáticamente
```

---

## Tests pre-deploy (`scripts/test_build.py`)

42 checks organizados en 10 grupos. Bloquea el deploy si hay errores.

| # | Grupo | Qué verifica |
|---|-------|-------------|
| 1 | Archivos críticos | index.html, docs/index.html, swagger.html, v1.yaml, PDF, llms.txt, AGENTS.md |
| 2 | Links en home | basePath `/openbankspv` en todos los hrefs |
| 3 | Links en docs | iframe, YAML, PDF con basePath |
| 4 | Swagger HTML | CDN correcto, spec apuntado, tryItOut deshabilitado |
| 5 | OpenAPI spec | Versión 3.0.3, endpoints CVU/Debin/QR/Movimientos, auth Bearer |
| 6 | PDF | Existe, tamaño razonable (10 KB – 5 MB) |
| 7 | Disclaimers | Textos ilustrativos visibles en home y docs |
| 8 | Regresión basePath | Sin href="/docs" ni href="/documentacion..." sin prefijo |
| 9 | Navbar paths absolutos | Todos los links de nav usan `/openbankspv/#section` — tanto en home como en docs |
| 10 | Secciones de destino | Los IDs `#producto`, `#como-funciona`, `#documentacion`, `#contacto` existen en home |

---

## Decisiones técnicas y aprendizajes

### Static export con basePath
Next.js genera el output en `/out`. GitHub Pages sirve ese directorio desde `github.io/openbankspv/`.
El `basePath: "/openbankspv"` en `next.config.ts` hace que todos los assets internos (_next/...) usen ese prefijo.
**Todos los hrefs internos deben ser absolutos:** `href="/openbankspv/..."` — nunca relativos como `href="/docs"` o `href="#section"`.

### trailingSlash: true
Sin esta opción, Next.js genera `docs.html` en lugar de `docs/index.html`. GitHub Pages no redirige automáticamente, así que `/docs/` devuelve 404. Con `trailingSlash: true`, Next.js genera `docs/index.html` y la URL `/docs/` funciona.

### Swagger UI: npm package vs iframe
`swagger-ui-react` usa `require()` que no es compatible con static export de Next.js (falla en build o en runtime). Solución definitiva: `public/swagger.html` standalone con Swagger UI desde CDN unpkg, embebido como `<iframe>`. No requiere ningún paquete npm.

### Navegación en navbar (lección principal)
**Problema recurrente:** los links del navbar fallaban al navegar desde `/docs` a secciones de la home.

Intentos fallidos:
- `usePathname()` — devuelve `/openbankspv/` en lugar de `/` en static export con basePath
- `useState(false)` + `useEffect` para detectar la página — race condition: el usuario podía clickear antes de que el efecto corriera
- Lazy initializer `useState(() => window.location...)` — hydration mismatch entre server render y cliente

**Solución definitiva:** todos los hrefs son paths absolutos fijos (`/openbankspv/#contacto`) sin ningún `onClick` para navegación. El CSS `scroll-behavior: smooth` (en `globals.css`) maneja el scroll suave en la home. Desde docs, el browser navega normalmente. Zero JavaScript en la lógica de navegación.

**Regla:** si un link de navegación necesita JavaScript para funcionar, es una señal de que el href está mal. Los hrefs absolutos funcionan sin JS, en cualquier página, siempre.

### Active section en navbar
El único JavaScript del navbar es `IntersectionObserver` para destacar el link de la sección visible. Es puramente decorativo — si falla, la navegación sigue funcionando.

### Anchors sueltos `href="#section"`
En componentes como Hero, Differentiator y Footer había `href="#contacto"` sin basePath. En la home funcionan (misma página), pero si alguno de esos componentes se mueve o se reutiliza, falla silenciosamente. Todos unificados a `/openbankspv/#section` para consistencia.

### Múltiples pushes rápidos y GitHub Pages
Con `concurrency: cancel-in-progress: true` en el workflow, pushes rápidos cancelan deploys anteriores. GitHub Pages puede quedar en estado inconsistente (archivos JS nuevos con HTML viejo). Siempre esperar el ✅ Actions + Ctrl+Shift+R antes de testear en producción.

---

## Contenido ilustrativo

- **PDF:** generado con reportlab (`scripts/gen_pdf.py`), lorem ipsum. No usar el PDF oficial para evitar conflictos legales.
- **OpenAPI spec:** endpoints reales de Banco Supervielle pero con datos de ejemplo ficticios.
- **llms.txt / AGENTS.md:** contexto real sobre la estructura de la API para herramientas de IA.
- **Sandbox:** referenciado como real pero el acceso real requiere contacto con el equipo.
