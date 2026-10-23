import { defineConfig, fontProviders } from "astro/config";
import embeds from "@astro-community/astro-embed-integration";
import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import rehypeUnwrapImages from "rehype-unwrap-images";
import config from "./config/website";
import duotoneDark from "./src/styles/duotone-dark.json";

export default defineConfig({
  site: config.siteUrl,
  // Matches the canonical URLs the Gatsby site published; vercel.json redirects "/foo/" to "/foo".
  trailingSlash: "never",
  // embeds() turns bare tweet/YouTube URLs into components and must come before mdx().
  integrations: [embeds(), mdx(), sitemap()],
  markdown: {
    // unified() rather than the default Sätteri processor: astro-embed adds a remark plugin.
    processor: unified({ rehypePlugins: [rehypeUnwrapImages] }),
    // Same palette as prism-react-renderer's default theme, which the Gatsby site used.
    shikiConfig: { theme: { ...duotoneDark, type: "dark" } },
  },
  // Self-hosted at build time, with metric-matched fallbacks to avoid layout shift.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Big Shoulders Display",
      cssVariable: "--font-display",
      weights: [800],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "IBM Plex Sans",
      cssVariable: "--font-body",
      weights: [400, 600],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["sans-serif"],
    },
    {
      provider: fontProviders.fontsource(),
      name: "IBM Plex Mono",
      cssVariable: "--font-mono",
      weights: [400, 500],
      subsets: ["latin"],
      fallbacks: ["monospace"],
    },
  ],
  image: {
    // Constrained images scale down with their container.
    responsiveStyles: true,
  },
});
