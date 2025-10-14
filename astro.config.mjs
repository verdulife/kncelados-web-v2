// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import { extras, episodes, generateSlug, shorts } from "./src/lib/utils";

const BASE_URL = "https://www.kncelados.com";
const episodesPages = episodes.map(({ title }) => `${BASE_URL}/podcast/${generateSlug(title)}`);
const extrasPages = extras.map(({ title }) => `${BASE_URL}/podcast/${generateSlug(title)}`);
const shortsPages = shorts.map(({ title }) => `${BASE_URL}/shorts/${generateSlug(title)}`);
const customPages = [...episodesPages, ...extrasPages, ...shortsPages];

const pt_opts = {
  config: {
    forward: ["dataLayer.push"]
  }
};

export default defineConfig({
  site: BASE_URL,
  output: "server",
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [sitemap({ customPages }), partytown(pt_opts)]
});