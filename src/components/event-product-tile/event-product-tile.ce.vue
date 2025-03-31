<template>
  <div
    class="flex max-w-[282px] flex-col justify-between gap-y-6 border-[0.5px] p-4 shadow-sm"
  >
    <div class="flex flex-col gap-y-4">
      <p class="text-xl font-bold">{{ product_name }}</p>
      <div
        v-if="product_description"
        class="break-words"
        v-html="product_description"
      ></div>
      <div v-else class="break-words"><slot></slot></div>
    </div>
    <div class="flex items-center justify-between gap-2">
      <p v-if="product_price > 0" class="text-xl font-semibold">
        £{{ product_price }}
      </p>
      <p v-else class="text-lg font-semibold">Free</p>
      <add-to-basket
        :product-id="product_id"
        :signed-in="signed_in"
        :has-stock="product_inventory > 0"
      />
    </div>
  </div>
</template>
<!-- eslint-disable vue/prop-name-casing -->
<script>
import AddToBasket from "../../components/add-to-basket/add-to-basket.ce.vue";
export default {
  name: "EventDateTile",
  props: {
    product_name: { type: String, default: "" },
    product_price: { type: String, default: "" },
    product_inventory: { type: String, default: "" },
    product_id: { type: Number, default: 0 },
    product_description: { type: String, default: null },
    signed_in: { type: Boolean, default: false },
  },
  components: {
    AddToBasket,
  },
  computed: {
    date() {
      return new Date(this.u_start_date * 1000).getDate();
    },
    month() {
      return new Date(this.u_start_date * 1000).toLocaleString("default", {
        month: "long",
      });
    },
    year() {
      return new Date(this.u_start_date * 1000).getFullYear();
    },
    time() {
      return new Date(this.u_start_date * 1000).toLocaleString("default", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    },
  },
};
</script>
