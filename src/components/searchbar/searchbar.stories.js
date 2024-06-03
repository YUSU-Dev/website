import Searchbar from "./searchbar.ce.vue";
import { fn } from "@storybook/test";

export default {
  title: "Elements/Searchbar",
  component: Searchbar,
  parameters: {},
};

export const Default = {
  args: {
    submitSearchCallback: fn(),
    initialSearchValue: null,
    placeholder: "Search articles...",
  },
  argTypes: {
    submitSearchCallback: { action: "submitSearchCallback" },
    initialSearchValue: { control: "text" },
  },
};
