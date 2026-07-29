# Personal Portfolio — Semantic HTML5 & Accessibility Skeleton

A four-page portfolio built for a semantic-HTML5 / WCAG accessibility
exercise. No build tools — open any `.html` file directly, or serve the
folder with any static host (GitHub Pages, Netlify, Vercel, etc.).

## Pages

- `index.html` — home: hero, about, featured projects, skills snapshot
- `projects.html` — full project list, one `<article>` per project
- `resume.html` — education timeline (`<ol>`), skills, resume download link
- `contact.html` — accessible, tab-navigable contact form

## Structure & semantics

Every page shares the same landmark skeleton:

```
<header>              (site-wide, sticky)
  <a class="skip-link">
  <nav aria-label="Primary">
<main id="main-content">
  <section>, <article>, <aside>  (page content)
<footer>
  <nav aria-label="Footer">
  <nav aria-label="Social media">
```

- One `<h1>` per page; headings step down without skipping levels.
- `<nav>` elements are always given a distinguishing `aria-label` since a
  page has more than one.
- Decorative/duplicate visual labels (like link icons) use
  `.visually-hidden` text or `aria-hidden="true"` rather than being left
  ambiguous for screen readers.
- Focus is never hidden: see `:focus-visible` rules in `style.css`.

## Contact form accessibility

- Every input has a real, bound `<label for="">`.
- Required fields are marked with `required`/`aria-required="true"` **and**
  visible text — never color alone.
- Hints and error messages are wired up with `aria-describedby`.
- Field-level errors use `role="alert"`; the overall submit status uses
  `role="status"` with `aria-live="polite"`.
- The form works with JavaScript disabled: native `required`, `type`, and
  `minlength` constraints still validate on submit. `assets/js/main.js`
  only upgrades the messaging — it doesn't gate core functionality.
- Fully operable by keyboard (Tab / Shift+Tab / Enter / Space); no
  mouse-only interactions anywhere on the site.

## SEO

Each page ships its own `<title>`, meta description, canonical URL, Open
Graph tags, and Twitter card. `index.html` includes `Person` JSON-LD.
`robots.txt` and `sitemap.xml` are included at the project root.

**Before deploying**, replace every `https://example.com/...` URL (in
`<link rel="canonical">`, Open Graph/Twitter tags, JSON-LD, `robots.txt`,
and `sitemap.xml`) with your real domain, and swap the placeholder name,
bio, project links, and social URLs for your own.

## Customizing content

Search each `.html` file for:

- `Aanya Kulkarni` → your name
- `Pune, India` / semester and course details → your own
- `github.com/example`, `linkedin.com/in/example`, `hello@example.com` →
  your real links
- Project cards in `index.html` / `projects.html` → your own projects
- `assets/aanya-kulkarni-resume.pdf` → add your actual resume PDF at that
  path, or update the link

## Running a Lighthouse audit

1. Deploy the folder (or run `python3 -m http.server` locally and open
   `http://localhost:8000`).
2. Open Chrome DevTools → Lighthouse tab.
3. Run the Accessibility and SEO categories.
4. Common things that would drop a score after you edit content: images
   without `alt` text, buttons/links without discernible text, and
   removing the meta description/title on a page — keep those intact as
   you customize.
