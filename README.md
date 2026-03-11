# CMS Components

A lightweight component library for CMS sites where you only control the header/footer include.

## How it works

Each component lives in `/components/<name>/`. On every push to `main`, GitHub Actions runs `build.js` which concatenates all component CSS and JS into two single files:

- `dist/components.css`
- `dist/components.js`

These are served via jsDelivr CDN automatically.

## Header Include (paste once, never touch again)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/YOUR_USER/YOUR_REPO@main/dist/components.css">
<script defer src="https://cdn.jsdelivr.net/gh/YOUR_USER/YOUR_REPO@main/dist/components.js"></script>
```

## Adding a new component

1. Create `/components/my-component/my-component.css`
2. Create `/components/my-component/my-component.js`
3. Push to `main` — GitHub Actions rebuilds `dist/` automatically ✅

## Components

| Component    | Description                                          |
|-------------|------------------------------------------------------|
| `popup`     | Overlay popup triggered by `data-popup-target` attr  |
| `navigation`| Responsive nav bar with mobile hamburger menu        |
| `banner`    | Dismissible top announcement bar                     |

## Local development

```bash
node build.js
# Then open demo.html in your browser
```
