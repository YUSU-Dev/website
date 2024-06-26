import "./shop-product-fields.component.js";

export default {
  title: "Components/Shop Product Fields",
  component: "shop-product-fields",
};

export const Default = {
  args: {
    productId: 9771,
    productName: "LongBoi Hoodie",
    fields: [
      {
        id: 1,
        name: "Delivery Address",
        type: "Y",
        min: 4,
        nax: 200,
        required: false,
        values: [],
      },
      {
        id: 4,
        name: "Size (S,M,L,XL,2XL)",
        type: "D",
        min: 0,
        nax: 0,
        required: true,
        values: [
          {
            id: 753,
            value: "Small",
          },
          {
            id: 754,
            value: "Medium",
          },
          {
            id: 755,
            value: "Large",
          },
          {
            id: 756,
            value: "Extra Large",
          },
          {
            id: 757,
            value: "2x Extra Large",
          },
        ],
      },
      {
        id: 21,
        name: "Delivery/Collection",
        type: "D",
        min: 0,
        nax: 0,
        required: true,
        values: [
          {
            id: 786,
            value: "Delivery",
          },
          {
            id: 787,
            value: "Collection from YUSU Helpdesk",
          },
        ],
      },
      {
        id: 27,
        name: "Colour (LongBoi Hoodie)",
        type: "D",
        min: 0,
        nax: 0,
        required: true,
        values: [
          {
            id: 518,
            value: "Pacific (Green)",
          },
          {
            id: 519,
            value: "Grey",
          },
          {
            id: 520,
            value: "Burgundy",
          },
        ],
      },
    ],
  },
};
