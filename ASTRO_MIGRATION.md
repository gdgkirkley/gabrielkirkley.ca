# Gatsby → Astro Migration

Tracking the port of gabrielkirkley.ca from Gatsby 2 to Astro, and the move from
Netlify to Vercel hosting.

## Branching and deploys

- All work happens on the long-lived `astro-migration` branch (or short branches
  merged into it). `main` keeps deploying the Gatsby site on Netlify.
- Steps are **not** independently safe to ship to production: the site is
  incomplete until step 8. Use Vercel preview deploys of `astro-migration` to
  review progress.
- Merge `astro-migration` → `main` once, after parity checks pass, then cut DNS
  over to Vercel.
- Gatsby page sources lived in `legacy/pages/` as reference while porting
  (removed in step 5).

## Decisions

- **TypeScript:** strict mode. Every ported file is written as
  `.ts`/`.tsx`/`.astro` with typed props; collection schemas type all
  frontmatter. `npm run build` runs `astro check` first, so type errors fail the
  build.
- **Hosting:** Vercel, static output (no adapter needed).
- **Contact form:** removed (Netlify Forms won't work on Vercel). The Contact
  page links to LinkedIn instead.

- **Styling:** move off styled-components to global CSS (existing CSS custom
  properties from `layout.js`) plus scoped `<style>` in `.astro` components.
- **No React:** everything is `.astro` plus small vanilla TypeScript scripts.
  The Skunk game was already vanilla DOM code behind a thin React wrapper, and
  the linked-list challenge was small enough to rewrite, so no islands needed.
- **URL parity:** routes are driven by the frontmatter `slug` field so every
  existing URL is preserved and no redirects are needed.

## Tasks

### 1. Scaffold

- [x] Create the `astro-migration` branch
- [x] Add `astro`, `@astrojs/mdx`, `@astrojs/sitemap` (`@astrojs/react` deferred
      to step 7; it needs React ≥ 17)
- [x] Remove Gatsby packages (Gatsby 2 doesn't install/build on Node 22)
- [x] Create `astro.config.mjs` with `site` (replaces Netlify URL logic in
      `gatsby-config.js`)
- [x] Convert `config/website.js` → `config/website.ts` (ESM; `package.json` is
      now `"type": "module"`)
- [x] TypeScript setup: strict `tsconfig.json`, `astro.config.ts`,
      `@astrojs/check` + TypeScript 6 (checker doesn't support TS 7 yet),
      `check` script run before `build`
- [x] Move `fonts/` → `public/fonts/` and `global/fonts.css` →
      `src/styles/fonts.css`
- [x] Move Gatsby `src/pages` → `legacy/pages`; add placeholder
      `src/pages/index.astro`
- [x] Ignore `dist/`, `.astro/`, `.vercel/`; un-ignore `public/` (was Gatsby
      output)
- [x] Update `package.json` scripts (`dev`, `build`, `preview`); add `engines`
      and `.nvmrc` (Node 22)
- [x] Create Vercel project linked to the repo; confirm preview deploy of
      `astro-migration`
- [x] Confirm Vercel's Node 22 runtime is ≥ 22.23.4 (Astro 7 minimum; preview
      builds succeed)

### 2. Content collections

- [x] Create `src/content.config.ts` with `posts` and `portfolio` collections
      and Zod schemas (use `image()` for `image` fields)
- [x] Entry IDs derived from the frontmatter `slug` (`/blog/foo` → `foo`); slugs
      validated by regex
- [x] Move `posts/*` → `src/content/posts/`; frontmatter template →
      `src/content/posts/_template.md` (excluded from the collection)
- [x] Move portfolio MDX and images → `src/content/portfolio/` (out of the
      routed pages dir)
- [x] Keep filters: posts shown unless `published: false`; portfolio shown only
      if `published: true` (`src/lib/content.ts`)
- [x] Keep sorting: posts by date desc; portfolio by `sortOrder`, entries
      without one last
- [x] Fix `imageCredt` → `imageCredit` typo (was in 3 posts and the template)
- [x] Drop Gatsby-only `templateKey` frontmatter
- [x] Temporarily comment out `<SkunkGame />` and `<LinkedListChallenges />` in
      MDX (they need React; restore in step 7)

### 3. Layout and global styles

- [x] Create `BaseLayout.astro` (global CSS, footer) to replace `layout.js`;
      `head` slot for step 4
- [x] Port `GlobalStyle` to `src/styles/global.css`; theme values (`fontSize.*`,
      `maxWidth`, colours) are CSS variables
- [x] Drop unused `colour`/`invert` layout props and never-passed header
      hover-colour props
- [x] Dark mode: inline `<head>` script reading `gabrielkirkley.ca_darkmode`
      from localStorage, applied to `<html>` before paint (same storage
      key/format, so saved preferences carry over)
- [x] Header: active nav link via `Astro.url.pathname` (Portfolio/Blog also
      active on child pages)
- [x] Header: mobile menu below 1245px (replaces `hamburger-react`), with
      `aria-expanded` and scroll lock
- [x] Header: theme toggle (sun/moon swap via CSS) and social links
- [x] `Boop.astro`: vanilla JS + CSS rewrite of the React Boop (pulled forward
      from step 7)
- [x] Visually compared header/menu against the live site at desktop and mobile
      widths, light and dark

### 4. SEO and meta

- [x] `Seo.astro` replaces `seo.js` / `react-helmet` (title template, canonical,
      OG, Twitter, keywords, icons); `BaseLayout` takes its props
- [x] Canonical URL is each page's own URL (Gatsby pointed every non-post page
      at the homepage)
- [x] No trailing slashes, matching the canonical URLs/sitemap Gatsby published:
      `trailingSlash: "never"` + `vercel.json` redirect
- [x] Port JSON-LD from `schema-org.js`, fixing page URL, post image, and
      `datePublished` (all were wrong/missing)
- [x] OG images via `getImage()` (max 1200px JPEG); default
      `Gabe-Headshotbw.jpg`
- [x] `excerpt()` helper replaces Gatsby's 160-char `excerpt` for post
      descriptions
- [x] Sitemap via `@astrojs/sitemap`; `/sitemap.xml` → `/sitemap-index.xml`
      redirect in `vercel.json`
- [x] Static `public/robots.txt` pointing at the new sitemap
- [x] Static `manifest.webmanifest`, favicon, apple-touch-icon, and icons from
      `images/gk.png` (128px source; larger sizes are upscaled, as before)
- [x] Verify the `vercel.json` redirects on a preview deploy (see step 8)

### 5. Pages and routes

- [x] Port `index`, `about`, `blog`, `contact`, `portfolio`, and `404` to
      `.astro`
- [x] `src/pages/blog/[slug].astro` (replaces `templates/post.js` +
      `gatsby-node.js`)
- [x] `src/pages/portfolio/[slug].astro` (replaces `templates/example.js`)
- [x] Replace `usePosts` / `useExamples` / `useSiteMetadata` with
      `getCollection()` and `config/website.ts`
- [x] Replace `gatsby-image` with `<Image>` (responsive WebP `srcset`); SVG
      imports are Astro SVG components
- [x] Port shared components: `Button`, `Columns`, `Card`, `PostPreview`,
      `Author`, `ContactForm`, `SourceUnavailable`
- [x] Cards no longer nest the "Code" link inside the card link (invalid HTML);
      the "View" link covers the card instead
- [x] Twitter share is a plain tweet-intent link (replaces `react-share`)
- [x] Convert `src/lib/dates.js` to TypeScript; delete unused
      `src/data/portfolio.js` and `techskill.js`
- [x] Delete ported Gatsby sources (`legacy/`, `src/templates/`, `src/hooks/`,
      old components, `gatsby-*.js`) and unused packages
- [x] URL check against the live sitemap: same pages; Gatsby's duplicate
      `/portfolio/x/x/` pages redirect to `/portfolio/x` via `vercel.json`
- [x] Visual comparison against the live site: home, portfolio, Readingly, React
      and M1 posts (during step 6)
- [x] Visual comparison of the remaining pages and dark mode (done in step 8)

### 6. MDX and markdown features

- [x] Replace `prism-react-renderer` CodeBlock with Shiki, using a custom theme
      with prism's duotone-dark palette (what the old site actually rendered)
      and CSS line numbers
- [x] Bare Twitter/YouTube URL embeds via `astro-embed` (replaces
      `gatsby-remark-embedder` and `gatsby-plugin-twitter`); tweets are static,
      no Twitter JS
- [x] Posts renamed `.md` → `.mdx` (astro-embed only works in MDX)
- [x] Use the `unified()` Markdown processor (Astro 7 defaults to Sätteri;
      astro-embed needs remark)
- [x] `rehype-unwrap-images` (successor to `remark-unwrap-images`)
- [x] MDX 3 parses all content; no syntax fixes needed
- [x] Fix missing spaces next to links (Astro's HTML compression drops newline
      whitespace) on home, about, and author box
- [x] Visual comparison with the live site: code blocks and embeds
- [x] Remove the deleted @gelliottmorris tweet from "How I Learned to Code"

### 7. Interactive components

- [x] Skunk game: `SkunkGame.astro` + `src/scripts/skunk.ts` (no React wrapper
      needed)
- [x] Convert the Skunk game to TypeScript (strict, 0 errors); two type errors
      were real bugs and are fixed: the "S" (scores) command crashed, and the
      3-dice triple bonus never applied
- [x] Linked list challenge: `LinkedListChallenges.astro` +
      `src/scripts/linked-list.ts` (original algorithm, now typed); portfolio
      "View Code" link updated to the new path
- [x] Restore the `TODO(astro-migration step 7)` components in `skunkgame.mdx`
      and `linkedlist.mdx`
- [x] Boop: rewritten as `Boop.astro` (done in step 3)
- [x] Replace `react-share` Twitter button with a plain tweet-intent link (done
      in step 5)
- [x] Remove the contact form; Contact page links to LinkedIn
- [x] Remove `react`, `react-dom`, `styled-components`
- [x] Browser-tested the Skunk game (setup, rolling, scores command, sitting)
      and the linked list (add, remove duplicates, reset)
- [x] Fix Skunk gameplay bugs: double-skunk soft-lock, play-again starting at
      round 2, quit not quitting, valid controls reported as invalid, rules
      always saying 2 dice, final-round computer logic, empty input accepted,
      stray "undefined" lines, upper-cased player name, "Computer 0", board
      bounds off-by-one, debug logs

### 8. Parity checks

- [x] URL list vs the live sitemap: every page present; trailing-slash and
      duplicate portfolio URLs handled by `vercel.json` redirects
- [x] Unpublished posts/projects and the frontmatter template 404 on both sites;
      manifest, robots.txt, and favicon serve
- [x] Visual check against the live site: home, about, blog list, posts,
      portfolio and entries, contact, 404 (desktop and mobile; dark mode on
      post, author box, and portfolio)
- [x] Embeds, code blocks, Skunk game, and linked list work
- [x] Vercel preview builds succeed on every commit (Node version is fine)
- [x] Verify `vercel.json` redirects on the preview: `/blog/` → `/blog`,
      `/sitemap.xml` → `/sitemap-index.xml`, `/portfolio/x/x` → `/portfolio/x`;
      custom 404 served with status 404

### 9. Launch on Vercel

- [x] Merge `astro-migration` → `main` (PR #4)
- [x] Add `gabrielkirkley.ca` and `www` as Vercel domains (`www` → apex 308);
      DNS moved to Vercel
- [x] Verify production: HTTPS (Let's Encrypt), HTTP → HTTPS, `www` → apex,
      canonical URLs, sitemap, `vercel.json` redirects, 404
- [ ] Disconnect or delete the Netlify site

### 10. Cleanup

- [x] Remove `gatsby-*.js`, `legacy/`, `src/templates/`, and `src/hooks/` (done
      in step 5)
- [x] Remove Gatsby packages and React-era libraries no longer imported (done in
      steps 1 and 5)
- [x] Remove `styled-components`, React, and their types (done in step 7)
- [x] Delete images nothing references (10 files, ~58 MB); keep `gk.png` as the
      icon source
- [x] Upgrade Prettier to 3, add `prettier-plugin-astro`, and format the repo
      (`npm run format` / `format:check`)
- [x] Update README and the post frontmatter template

## Notes

- Order: 1 → 2 → 3, then 4/5/6 in parallel, then 7 → 8 → 9 → 10.
- Biggest risks: MDX 1 → 3 syntax changes and replacing styled-components (both
  done).
