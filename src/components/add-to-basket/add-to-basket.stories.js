import "./add-to-basket.component.js";

export default {
  title: "Components/Add To Basket",
  component: "add-to-basket",
};

export const Default = {
  args: {
    productId: 1234,
    hasStock: true,
  },
};

export const soldOut = {
  args: {
    productId: 1234,
    hasStock: false,
  },
};
