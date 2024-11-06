import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import sitemap from "@astrojs/sitemap";
import { SITE } from "./src/config";

import AutoImport from "astro-auto-import";
import mdx from "@astrojs/mdx";
import embeds from "astro-embed/integration";
// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  integrations: [
    embeds(),
    AutoImport({
      components: ["YouTube"],
      imports: [
        /**
         * Generates:
         * import Intro from './src/components/Intro.astro';
         */
        "./src/components/Header.astro",
        "./src/layouts/Layout.astro",
        "./src/layouts/PostDetails.astro",
        "./src/layouts/Main.astro",
        /**
         * Generates:
         * import { YouTube } from 'astro-embed';
         */
        { "astro-embed": ["YouTube"] },
      ],
    }),
    mdx(),
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    react(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});
