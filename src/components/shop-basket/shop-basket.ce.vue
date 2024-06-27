<template>
  <div class="">
    <div class="my-4">
      <Button :is-primary="true" title="Back to Shop" arrow :url="'/shop'" />
    </div>
    <div class="flex flex-wrap md:flex-row">
      <div class="md:w-2/3">
        <div>
          <h1 class="text-2xl font-bold">Basket</h1>
          <div>
            <div
              v-for="(item, index) in items"
              :key="index"
              class="my-2 flex gap-4"
            >
              <div class="w-2/12">
                <img
                  class="object-cover"
                  :alt="item.title"
                  :src="productImages[item.product_id]"
                />
              </div>
              <div class="flex w-3/4 flex-col gap-2">
                <h2 class="text-xl">{{ item.product_name }}</h2>
                <div class="gap-2">
                  <p>Item Price: £{{ item.price_total }}</p>
                  <p>Quantity: {{ item.quantity }}</p>
                  <p>
                    Total Price:{{
                      formatPrice(item.quantity * item.price_total)
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button title="Empty basket" :is-primary="true" />
      </div>
      <div class="flex flex-col gap-2 md:ml-4 md:w-2/12">
        <div class="bg-gray-200 p-4">
          <h2 class="mb-2 text-2xl font-bold">Summary</h2>
          <div class="flex justify-between text-lg">
            <p>Subtotal</p>
            <p>£{{ shopBasket[0].sub_total }}</p>
          </div>
          <div class="flex justify-between text-lg">
            <p>Postage</p>
            <p>£{{ shopBasket[0].delivery_fee }}</p>
          </div>
          <div class="flex justify-between text-lg">
            <p>Booking Fee</p>
            <p>£{{ shopBasket[0].booking_fee }}</p>
          </div>
          <div class="mt-2 flex justify-between text-lg">
            <h3 class="text-xl font-bold">Total £{{ shopBasket[0].total }}</h3>
          </div>
        </div>
        <Button title="Go to checkout" :is-primary="true" />
        <p class="mt-2">
          All events tickets are non-refundable. If you do require help with
          your order after purchasing please contact
          <a class="text-blue-800 underline" href="mailto:finance@yorksu.org"
            >finance@yorksu.org</a
          >
          or the student group running the event.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../button/button.ce.vue";
import axios from "../../_common/axios.mjs";

export default {
  name: "ShopBasket",
  components: {
    Button,
  },
  props: {
    errorMessage: {
      type: String,
      default: null,
    },
    shopBasket: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      subtotal: {
        type: Number,
        value: 0,
      },
      total: {
        type: Number,
        value: 0,
      },
      booking_fee: {
        type: Number,
        value: 0,
      },
      delivery_fee: {
        type: Number,
        value: 0,
      },
      items: {
        type: Array,
        value: [],
      },
      productImages: {
        type: Array,
        value: [],
      },
    };
  },
  created() {
    console.log(this.shopBasket[0].total);
  },
  mounted() {
    this.getBasketItems();
    console.log(this.items);
    console.log(this.productImages);
  },
  methods: {
    getProductImages() {
      let self = this;
      let items = this.shopBasket[0].items;
      items.forEach((item) => {
        axios
          .get(`https://pluto.sums.su/api/products/` + item.product_id, {
            headers: {
              "X-Site-Id": self.siteid,
            },
          })
          .then((response) => {
            self.productImages[item.product_id] =
              response.data.title ??
              "https://assets-cdn.sums.su/YU/IMG/NewBrand/500x500_Blue.jpg";
          })
          .catch((error) => {
            console.error(error);
          });
      });
    },
    getBasketItems() {
      let items = this.shopBasket[0].items;
      this.getProductImages();
      // add quantity to items
      let newItems = [];
      items.forEach((item) => {
        let index = newItems.findIndex(
          (newItem) => newItem.product_id === item.product_id,
        );
        if (index === -1) {
          newItems.push(item);
          newItems[newItems.length - 1].quantity = 1;
        } else {
          newItems[index].quantity += 1;
        }
      });
      this.items = newItems;
    },
    formatPrice(price) {
      return price.toLocaleString("en-GB", {
        style: "currency",
        currency: "GBP",
      });
    },
  },
};
</script>
