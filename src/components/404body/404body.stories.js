import "./404body.component.js";
import { fn } from "@storybook/test";

export default {
  title: "Page Content/404 Body",
  component: "404body",
  parameters: {},
};

export const Default = {
  args: {
    submitSearchCallback: fn(),
  },
};
