import "./event-product-tile.component.js";

export default {
  title: "Components/Events/Event Product Tile",
  component: "event-product-tile",
};

export const Default = {
  args: {
    product_name: "Test Product",
    product_description: "Test Description",
    product_price: "0",
    product_inventory: 10,
  },
};

export const soldOut = {
  args: {
    product_name: "Test Product",
    product_description: "Test Description",
    product_price: "1",
    product_inventory: 0,
  },
};
