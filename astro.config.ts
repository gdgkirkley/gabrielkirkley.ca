import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import config from "./config/website";

export default defineConfig({
  site: config.siteUrl,
  // Matches the canonical URLs the Gatsby site published; vercel.json redirects "/foo/" to "/foo".
  trailingSlash: "never",
  integrations: [mdx(), sitemap()],
});
