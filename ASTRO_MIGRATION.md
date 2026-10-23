# Gatsby → Astro Migration

Tracking the port of gabrielkirkley.ca from Gatsby 2 to Astro.

## Decisions

- **Styling:** move off styled-components to global CSS (existing CSS custom
  properties from `layout.js`) plus scoped `<style>` in `.astro` components.
- **React only where interactive:** layout, cards, post previews, author, and SEO
  become `.astro`. React islands stay for the Skunk game, linked-list challenges,
  and (optionally) Boop. Dark-mode toggle and hamburger menu become vanilla JS.
- **URL parity:** routes are driven by the frontmatter `slug` field so every
  existing URL is preserved and no redirects are needed.

## Tasks

### 1. Scaffold

- [ ] Create a migration branch
- [ ] Add `astro`, `@astrojs/mdx`, `@astrojs/react`, `@astrojs/sitemap`
- [ ] Create `astro.config.mjs` with `site` (replaces Netlify URL logic in `gatsby-config.js`)
- [ ] Move `fonts/` and `global/fonts.css` into `public/` / `src/styles/`
- [ ] Add `.astro/` and `dist/` to `.gitignore`
- [ ] Update `package.json` scripts (`dev`, `build`, `preview`)
- [ ] Update Netlify build command (`astro build`) and publish dir (`dist`)

### 2. Content collections

- [ ] Create `src/content.config.ts` with `posts` and `portfolio` collections and Zod schemas (use `image()` for `image` fields)
- [ ] Move `posts/*` into the `posts` collection
- [ ] Move `src/pages/portfolio/*/*.mdx` and images into the `portfolio` collection (out of `src/pages`)
- [ ] Keep filters: posts shown unless `published: false`; portfolio shown only if `published: true`
- [ ] Keep sorting: posts by date desc; portfolio by `sortOrder`
- [ ] Fix `imageCredt` → `imageCredit` typo in `where-to-learn-react.md`

### 3. Layout and global styles

- [ ] Create `BaseLayout.astro` (global CSS, footer) to replace `layout.js`
- [ ] Convert `props.theme` usages (`fontSize.*`, `maxWidth`, colours) to CSS variables
- [ ] Dark mode: inline `<head>` script reading `gabrielkirkley.ca_darkmode` from localStorage, applied before paint
- [ ] Header: active nav link via `Astro.url.pathname`
- [ ] Header: mobile menu (replaces `hamburger-react`)
- [ ] Header: theme toggle and social links

### 4. SEO and meta

- [ ] Create `BaseHead.astro` to replace `seo.js` / `react-helmet` (title template, canonical, OG, Twitter, keywords)
- [ ] Port JSON-LD from `schema-org.js`
- [ ] OG images via `getImage()`; default to `Gabe-Headshotbw.jpg`
- [ ] Sitemap via `@astrojs/sitemap`
- [ ] Static `public/robots.txt`
- [ ] Static `manifest.webmanifest` with icons generated from `images/gk.png`

### 5. Pages and routes

- [ ] Port `index` to `.astro`
- [ ] Port `about` to `.astro`
- [ ] Port `blog` to `.astro`
- [ ] Port `contact` to `.astro`
- [ ] Port `portfolio` to `.astro`
- [ ] Port `404` to `.astro`
- [ ] `src/pages/blog/[...slug].astro` (replaces `templates/post.js` + `gatsby-node.js`)
- [ ] `src/pages/portfolio/[...slug].astro` (replaces `templates/example.js`)
- [ ] Replace `usePosts` / `useExamples` / `useSiteMetadata` with `getCollection()` and `config/website.js`
- [ ] Replace `gatsby-image` with `<Image>` / `<Picture>`
- [ ] Switch SVG imports (fox, tech logos) to Astro SVG components

### 6. MDX and markdown features

- [ ] Replace `prism-react-renderer` CodeBlock with built-in Shiki; pick a theme matching the `#061526` background
- [ ] Bare Twitter/YouTube URL embeds via `astro-embed` (replaces `gatsby-remark-embedder` and `gatsby-plugin-twitter`)
- [ ] Add `remark-unwrap-images` to MDX remark plugins
- [ ] Fix MDX 1 → MDX 3 syntax issues flagged by the build
- [ ] Update component import paths in `skunkgame.mdx` and `linkedlist.mdx`

### 7. Interactive islands

- [ ] `SkunkGame` as a `client:visible` React island, styled-components removed
- [ ] `LinkedListChallenges` as a `client:visible` React island, styled-components removed
- [ ] Boop: upgrade `react-spring` or rewrite as CSS/vanilla JS
- [ ] Contact form as static HTML in `.astro` so Netlify detects `data-netlify="true"`
- [ ] Replace `react-share` Twitter button with a plain tweet-intent link

### 8. Parity checks

- [ ] Diff HTML file lists from Gatsby `public/` vs Astro `dist/` to confirm no URL changes
- [ ] Visual check of every page in light and dark mode, desktop and mobile
- [ ] Check embeds, code blocks, games, 404 page, and OG tags on a post
- [ ] Netlify deploy preview: confirm the form appears in the Forms tab and a test submission arrives

### 9. Cleanup

- [ ] Remove `gatsby-config.js`, `gatsby-node.js`, `gatsby-browser.js`, `gatsby-ssr.js`
- [ ] Remove `src/templates/` and `src/hooks/`
- [ ] Remove Gatsby deps, `@hot-loader/react-dom`, `react-helmet`, `styled-components`, `babel-plugin-styled-components`, and unused `gatsby-plugin-transition-link` / `gatsby-plugin-offline`
- [ ] Add `prettier-plugin-astro` and update Prettier config
- [ ] Update README

## Notes

- Order: 1 → 2 → 3, then 4/5/6 in parallel, then 7 → 8 → 9. Roughly one PR per section.
- Biggest risks: MDX 1 → 3 syntax changes and replacing styled-components.
