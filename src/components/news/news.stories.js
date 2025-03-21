import "./news.component.js";

export default {
  title: "Components/News/Index",
  component: "news",
};

export const Default = {};

export const Embedded = {
  args: {
    embedded: true,
  },
};

export const EmbeddedWithSearch = {
  args: {
    embedded: true,
    search: true,
  },
};

export const selectedCategories = {
  args: {
    embedded: true,
    selectedCategories: "33, 26, 43, 53",
  },
};
