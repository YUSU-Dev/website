import "./shop-basket.component.js";

export default {
  title: "Components/Shop/Shop Basket",
  component: "shop-basket",
};

export const Default = {
  args: {
    shopBasket: [
      {
        basket_items: "6",
        sub_total: "126.25",
        booking_fee: "0.00",
        delivery_fee: "0.00",
        total: "126.25",
        items: [
          {
            id: "113001",
            product_id: "7870",
            url_name: "delivery",
            product_name: "DELIVERY",
            price_single: "14.50",
            price_total: "14.50",
            item_remove: "0",
          },
          {
            id: "112998",
            product_id: "9788",
            price_single: "15.95",
            price_total: "15.95",
            item_remove: "1",
          },
          {
            id: "112996",
            product_id: "9771",
            url_name: "Longboi-hoodie",
            product_name: "LONG BOI HOODIE",
            price_single: "23.95",
            price_total: "23.95",
            item_remove: "1",
          },
          {
            id: "113000",
            product_id: "9771",
            url_name: "Longboi-hoodie",
            product_name: "LONG BOI HOODIE",
            price_single: "23.95",
            price_total: "23.95",
            item_remove: "1",
          },
          {
            id: "113005",
            product_id: "9771",
            url_name: "Longboi-hoodie",
            product_name: "LONG BOI HOODIE",
            price_single: "23.95",
            price_total: "23.95",
            item_remove: "1",
          },
          {
            id: "113006",
            product_id: "9771",
            url_name: "Longboi-hoodie",
            product_name: "LONG BOI HOODIE",
            price_single: "23.95",
            price_total: "23.95",
            item_remove: "1",
          },
        ],
      },
    ],
  },
};

export const EmptyBasket = {
  args: {
    shopBasket: [
      {
        basket_items: "0",
        sub_total: "0",
        booking_fee: "0.00",
        delivery_fee: "0.00",
        total: "0",
        items: [],
      },
    ],
  },
};

export const WithCharityDonation = {
  args: {
    shopBasket: [
      {
        basket_items: "6",
        sub_total: "126.25",
        booking_fee: "0.00",
        delivery_fee: "0.00",
        total: "126.25",
        items: [
          {
            id: "113001",
            product_id: "7870",
            url_name: "delivery",
            product_name: "DELIVERY",
            price_single: "14.50",
            price_total: "14.50",
            item_remove: "0",
          },
          {
            id: "112998",
            product_id: "9788",
            price_single: "15.95",
            price_total: "15.95",
            item_remove: "1",
          },
          {
            id: "112996",
            product_id: "9771",
            url_name: "Longboi-hoodie",
            product_name: "LONG BOI HOODIE",
            price_single: "23.95",
            price_total: "23.95",
            item_remove: "1",
          },
          {
            id: "113000",
            product_id: "9771",
            url_name: "Longboi-hoodie",
            product_name: "LONG BOI HOODIE",
            price_single: "23.95",
            price_total: "23.95",
            item_remove: "1",
          },
          {
            id: "113005",
            product_id: "9771",
            url_name: "Longboi-hoodie",
            product_name: "LONG BOI HOODIE",
            price_single: "23.95",
            price_total: "23.95",
            item_remove: "1",
          },
          {
            id: "113006",
            product_id: "9771",
            url_name: "Longboi-hoodie",
            product_name: "LONG BOI HOODIE",
            price_single: "23.95",
            price_total: "23.95",
            item_remove: "1",
          },
          {
            id: "253750",
            product_id: "14498",
            url_name: "charity-donation",
            product_name: "Charity Donation",
            price_single: "1.00",
            price_total: "1.00",
            item_remove: "1",
          },
        ],
      },
    ],
    charityId: "14498",
  },
};
