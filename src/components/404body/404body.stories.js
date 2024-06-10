import "./404body.component.js";
import { fn } from "@storybook/test";

export default {
  title: "PageContent/404Body",
  component: "404body",
  parameters: {},
};

export const Default = {
  args: {
    submitSearchCallback: fn(),
  },
};
