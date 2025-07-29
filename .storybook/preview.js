import { INITIAL_VIEWPORTS, MINIMAL_VIEWPORTS } from "storybook/viewport";

/** @type { import('@storybook/vue3-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "fullscreen",
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      },
      defaultViewport: "iphone14",
    },
    options: {
      storySort: {
        order: [
          "Intro",
          "Elements",
          "Core Components",
          "Components",
          ["Page Content", "Pages"],
        ],
      },
    },
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
  initialGlobals: {
    a11y: {
      manual: true,
    },
  },
};

export default preview;
