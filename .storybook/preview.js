import DocsTemplate from "../src/docs/DocsTemplate.mdx";

/** @type { import('@storybook/vue3').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "fullscreen",
    docs: {
      page: DocsTemplate,
    },
  },
  tags: ["autodocs"],
};

import "../src/main.css";

export default preview;
