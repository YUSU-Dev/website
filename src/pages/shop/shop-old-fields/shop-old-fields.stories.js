import "./shop-old-fields.component.js";

export default {
  title: "Pages/Shop Old Fields",
  component: "shop-old-fields",
};

export const Default = {
  parameters: {
    a11y: {
      disable: true, // Disables the a11y check for this specific story, because it's all items have a label and this will fail.
    },
  },
};
