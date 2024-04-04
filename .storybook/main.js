/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: [
    "../**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {
      docgen: "vue-component-meta",
    },
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');
    const { default: vue } = await import("@vitejs/plugin-vue");
    return mergeConfig(config, {
      plugins: [
        vue()
      ]
    });
  }
};
export default config;
