/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ["../**/**/*.stories.@(js|jsx|mjs|ts|tsx)", "../**/*.mdx"],
  addons: [
    "@storybook/addon-links",
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-themes",
    "@storybook/addon-coverage",
    "@storybook/addon-docs",
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
    return mergeConfig(config, {
      plugins: [vue()],
      css: {
        postcss: require.resolve("../postcss.config.mjs"),
      },
    });
  },
};
export default config;
