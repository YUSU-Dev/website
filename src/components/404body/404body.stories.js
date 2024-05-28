import Error404Body from "./404body.ce.vue";
import { fn } from "@storybook/test";

export default {
  title: "Components/404Body",
  component: Error404Body,
  parameters: {},
};

export const Default = {
  // args: {
  //   title: "Placeholder",
  //   image:
  //     "https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_Student_Voice.jpg",
  // },
  args: {
    submitSearchCallback: fn(),
  },
};
