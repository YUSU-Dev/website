/** @type { import('@storybook/vue3-vite').StorybookConfig } */
import path from "path";
import { fileURLToPath } from "url";

const config = {
  stories: ["../**/**/*.stories.@(js|jsx|mjs|ts|tsx)", "../**/*.mdx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
    "@storybook/addon-coverage",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/web-components-vite",
    options: {
      docgen: "vue-component-meta",
    },
  },
  core: {
    builder: "@storybook/builder-vite",
  },
  docs: {},
  async viteFinal(config) {
    const { mergeConfig } = await import("vite");
    const { default: vue } = await import("@vitejs/plugin-vue");

    // Resolve the PostCSS config path using ES module syntax
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    return mergeConfig(config, {
      plugins: [vue()],
      css: {
        postcss: path.resolve(__dirname, "../postcss.config.mjs"),
      },
    });
  },
};
export default config;
