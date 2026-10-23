# Gatsby → Astro Migration

Tracking the port of gabrielkirkley.ca from Gatsby 2 to Astro, and the move
from Netlify to Vercel hosting.

## Branching and deploys

- All work happens on the long-lived `astro-migration` branch (or short
  branches merged into it). `main` keeps deploying the Gatsby site on Netlify.
- Steps are **not** independently safe to ship to production: the site is
  incomplete until step 8. Use Vercel preview deploys of `astro-migration`
  to review progress.
- Merge `astro-migration` → `main` once, after parity checks pass, then cut
  DNS over to Vercel.
- Gatsby page sources lived in `legacy/pages/` as reference while porting
  (removed in step 5).

## Decisions

- **TypeScript:** strict mode. Every ported file is written as `.ts`/`.tsx`/`.astro`
  with typed props; collection schemas type all frontmatter. `npm run build`
  runs `astro check` first, so type errors fail the build.
- **Hosting:** Vercel, static output (no adapter needed).
- **Contact form:** Netlify Forms won't work on Vercel. Replacement TBD
  (e.g. Formspree/Web3Forms, or a Vercel function + email API).

- **Styling:** move off styled-components to global CSS (existing CSS custom
  properties from `layout.js`) plus scoped `<style>` in `.astro` components.
- **React only where interactive:** layout, cards, post previews, author, and SEO
  become `.astro`. React islands stay for the Skunk game and linked-list
  challenges. Boop, the dark-mode toggle, and the hamburger menu are vanilla JS.
- **URL parity:** routes are driven by the frontmatter `slug` field so every
  existing URL is preserved and no redirects are needed.

## Tasks

### 1. Scaffold

- [x] Create the `astro-migration` branch
- [x] Add `astro`, `@astrojs/mdx`, `@astrojs/sitemap` (`@astrojs/react` deferred to step 7; it needs React ≥ 17)
- [x] Remove Gatsby packages (Gatsby 2 doesn't install/build on Node 22)
- [x] Create `astro.config.mjs` with `site` (replaces Netlify URL logic in `gatsby-config.js`)
- [x] Convert `config/website.js` → `config/website.ts` (ESM; `package.json` is now `"type": "module"`)
- [x] TypeScript setup: strict `tsconfig.json`, `astro.config.ts`, `@astrojs/check` + TypeScript 6 (checker doesn't support TS 7 yet), `check` script run before `build`
- [x] Move `fonts/` → `public/fonts/` and `global/fonts.css` → `src/styles/fonts.css`
- [x] Move Gatsby `src/pages` → `legacy/pages`; add placeholder `src/pages/index.astro`
- [x] Ignore `dist/`, `.astro/`, `.vercel/`; un-ignore `public/` (was Gatsby output)
- [x] Update `package.json` scripts (`dev`, `build`, `preview`); add `engines` and `.nvmrc` (Node 22)
- [ ] Create Vercel project linked to the repo; confirm preview deploy of `astro-migration`
- [ ] Confirm Vercel's Node 22 runtime is ≥ 22.23.4 (Astro 7 minimum)

### 2. Content collections

- [x] Create `src/content.config.ts` with `posts` and `portfolio` collections and Zod schemas (use `image()` for `image` fields)
- [x] Entry IDs derived from the frontmatter `slug` (`/blog/foo` → `foo`); slugs validated by regex
- [x] Move `posts/*` → `src/content/posts/`; frontmatter template → `src/content/posts/_template.md` (excluded from the collection)
- [x] Move portfolio MDX and images → `src/content/portfolio/` (out of the routed pages dir)
- [x] Keep filters: posts shown unless `published: false`; portfolio shown only if `published: true` (`src/lib/content.ts`)
- [x] Keep sorting: posts by date desc; portfolio by `sortOrder`, entries without one last
- [x] Fix `imageCredt` → `imageCredit` typo (was in 3 posts and the template)
- [x] Drop Gatsby-only `templateKey` frontmatter
- [x] Temporarily comment out `<SkunkGame />` and `<LinkedListChallenges />` in MDX (they need React; restore in step 7)

### 3. Layout and global styles

- [x] Create `BaseLayout.astro` (global CSS, footer) to replace `layout.js`; `head` slot for step 4
- [x] Port `GlobalStyle` to `src/styles/global.css`; theme values (`fontSize.*`, `maxWidth`, colours) are CSS variables
- [x] Drop unused `colour`/`invert` layout props and never-passed header hover-colour props
- [x] Dark mode: inline `<head>` script reading `gabrielkirkley.ca_darkmode` from localStorage, applied to `<html>` before paint (same storage key/format, so saved preferences carry over)
- [x] Header: active nav link via `Astro.url.pathname` (Portfolio/Blog also active on child pages)
- [x] Header: mobile menu below 1245px (replaces `hamburger-react`), with `aria-expanded` and scroll lock
- [x] Header: theme toggle (sun/moon swap via CSS) and social links
- [x] `Boop.astro`: vanilla JS + CSS rewrite of the React Boop (pulled forward from step 7)
- [x] Visually compared header/menu against the live site at desktop and mobile widths, light and dark

### 4. SEO and meta

- [x] `Seo.astro` replaces `seo.js` / `react-helmet` (title template, canonical, OG, Twitter, keywords, icons); `BaseLayout` takes its props
- [x] Canonical URL is each page's own URL (Gatsby pointed every non-post page at the homepage)
- [x] No trailing slashes, matching the canonical URLs/sitemap Gatsby published: `trailingSlash: "never"` + `vercel.json` redirect
- [x] Port JSON-LD from `schema-org.js`, fixing page URL, post image, and `datePublished` (all were wrong/missing)
- [x] OG images via `getImage()` (max 1200px JPEG); default `Gabe-Headshotbw.jpg`
- [x] `excerpt()` helper replaces Gatsby's 160-char `excerpt` for post descriptions
- [x] Sitemap via `@astrojs/sitemap`; `/sitemap.xml` → `/sitemap-index.xml` redirect in `vercel.json`
- [x] Static `public/robots.txt` pointing at the new sitemap
- [x] Static `manifest.webmanifest`, favicon, apple-touch-icon, and icons from `images/gk.png` (128px source; larger sizes are upscaled, as before)
- [ ] Verify the `vercel.json` redirects on a preview deploy

### 5. Pages and routes

- [x] Port `index`, `about`, `blog`, `contact`, `portfolio`, and `404` to `.astro`
- [x] `src/pages/blog/[slug].astro` (replaces `templates/post.js` + `gatsby-node.js`)
- [x] `src/pages/portfolio/[slug].astro` (replaces `templates/example.js`)
- [x] Replace `usePosts` / `useExamples` / `useSiteMetadata` with `getCollection()` and `config/website.ts`
- [x] Replace `gatsby-image` with `<Image>` (responsive WebP `srcset`); SVG imports are Astro SVG components
- [x] Port shared components: `Button`, `Columns`, `Card`, `PostPreview`, `Author`, `ContactForm`, `SourceUnavailable`
- [x] Cards no longer nest the "Code" link inside the card link (invalid HTML); the "View" link covers the card instead
- [x] Twitter share is a plain tweet-intent link (replaces `react-share`)
- [x] Convert `src/lib/dates.js` to TypeScript; delete unused `src/data/portfolio.js` and `techskill.js`
- [x] Delete ported Gatsby sources (`legacy/`, `src/templates/`, `src/hooks/`, old components, `gatsby-*.js`) and unused packages
- [x] URL check against the live sitemap: same pages; Gatsby's duplicate `/portfolio/x/x/` pages redirect to `/portfolio/x` via `vercel.json`
- [x] Visual comparison against the live site: home, portfolio, Readingly, React and M1 posts (during step 6)
- [ ] Visual comparison of the remaining pages (about, blog list, contact, 404) and dark mode — fold into step 8

### 6. MDX and markdown features

- [x] Replace `prism-react-renderer` CodeBlock with Shiki, using a custom theme with prism's duotone-dark palette (what the old site actually rendered) and CSS line numbers
- [x] Bare Twitter/YouTube URL embeds via `astro-embed` (replaces `gatsby-remark-embedder` and `gatsby-plugin-twitter`); tweets are static, no Twitter JS
- [x] Posts renamed `.md` → `.mdx` (astro-embed only works in MDX)
- [x] Use the `unified()` Markdown processor (Astro 7 defaults to Sätteri; astro-embed needs remark)
- [x] `rehype-unwrap-images` (successor to `remark-unwrap-images`)
- [x] MDX 3 parses all content; no syntax fixes needed
- [x] Fix missing spaces next to links (Astro's HTML compression drops newline whitespace) on home, about, and author box
- [x] Visual comparison with the live site: code blocks and embeds
- [ ] Decide what to do with the deleted @gelliottmorris tweet in "How I Learned to Code" (now renders nothing)

### 7. Interactive islands

- [ ] `SkunkGame` as a `client:visible` React island, styled-components removed
- [ ] `LinkedListChallenges` as a `client:visible` React island, styled-components removed
- [x] Boop: rewritten as `Boop.astro` (done in step 3); remove `react-spring`
- [ ] Add `@astrojs/react` and upgrade React to 19
- [ ] Restore the `TODO(astro-migration step 7)` component imports in `skunkgame.mdx` and `linkedlist.mdx`
- [ ] Convert `challenges/SKUNK.js` and `challenges/LinkedList/*` to TypeScript
- [ ] Choose a contact form backend that works on Vercel and rebuild the form against it
- [x] Replace `react-share` Twitter button with a plain tweet-intent link (done in step 5)

### 8. Parity checks

- [ ] Diff HTML file lists from Gatsby `public/` vs Astro `dist/` to confirm no URL changes
- [ ] Visual check of every page in light and dark mode, desktop and mobile
- [ ] Check embeds, code blocks, games, 404 page, and OG tags on a post
- [ ] Vercel preview: send a test contact form submission and confirm it arrives

### 9. Launch on Vercel

- [ ] Merge `astro-migration` → `main`
- [ ] Add `gabrielkirkley.ca` (and `www`) as Vercel domains; update DNS
- [ ] Verify production: HTTPS, canonical URLs, sitemap, contact form
- [ ] Disconnect or delete the Netlify site

### 10. Cleanup

- [x] Remove `gatsby-*.js`, `legacy/`, `src/templates/`, and `src/hooks/` (done in step 5)
- [x] Remove Gatsby packages and React-era libraries no longer imported (done in steps 1 and 5)
- [ ] Remove `styled-components` and its types once step 7 drops the last users
- [ ] Delete images in `images/` that nothing references
- [ ] Upgrade Prettier, add `prettier-plugin-astro`, and add `astro,mdx` to the `format` glob
- [ ] Update README

## Notes

- Order: 1 → 2 → 3, then 4/5/6 in parallel, then 7 → 8 → 9 → 10.
- Biggest risks: MDX 1 → 3 syntax changes and replacing styled-components.
