import Error404Body from "./404body.ce.vue";
import { fn } from "@storybook/test";

export default {
  title: "Components/404Body",
  component: Error404Body,
  parameters: {},
};

export const Default = {
  args: {
    submitSearchCallback: fn(),
  },
};
