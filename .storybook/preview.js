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
  },
  tags: ["autodocs"],
  decorators: [
    (storyFn, context) => {
      if (typeof context.component === "string") {
        context.component = `yorksu-${context.component}`;
      }
      return storyFn();
    },
  ],
};

export default preview;
