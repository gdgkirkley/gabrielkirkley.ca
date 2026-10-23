import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import config from "./config/website";

export default defineConfig({
  site: config.siteUrl,
  integrations: [mdx(), sitemap()],
});
