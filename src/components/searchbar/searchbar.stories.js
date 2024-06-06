import "./searchbar.component.js";
import { fn } from "@storybook/test";

export default {
  title: "Elements/Searchbar",
  component: "searchbar",
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
