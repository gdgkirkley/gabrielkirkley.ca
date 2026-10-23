# Gabe Kirkley's personal site

My personal website, built with [Astro](https://astro.build) and TypeScript and
hosted on Vercel.

## Installation and Setup

If you want to, feel free to clone this repo. You will need Node 22 (see
`.nvmrc`) and `npm` on your machine.

Installation:

```
npm install
```

To start a dev server at http://localhost:4321:

```
npm run dev
```

Other scripts:

- `npm run build`: type-check with `astro check`, then build to `dist/`
- `npm run preview`: serve the built site
- `npm run format`: format with Prettier

## Writing content

- Blog posts live in `src/content/posts/<folder>/<post>.mdx`, with images next
  to them. Copy `src/content/posts/_template.md` for the frontmatter.
- Portfolio entries live in `src/content/portfolio/<folder>/<entry>.mdx`.
- Frontmatter is validated by the schemas in `src/content.config.ts`. The `slug`
  field sets the URL.
- A tweet or YouTube URL on its own line becomes an embed.

## Contributing

Spotted a typo or a correction? Create a PR!
