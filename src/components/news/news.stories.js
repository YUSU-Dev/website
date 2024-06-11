import "./news.component.js";

export default {
  title: "Components/News",
  component: "news",
};

export const Default = {};

export const Embedded = {
  args: {
    embedded: true,
  },
};

export const selectedCategories = {
  args: {
    embedded: true,
    selectedCategories: "33, 26, 43, 53",
  },
};
