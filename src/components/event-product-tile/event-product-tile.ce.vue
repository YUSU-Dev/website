<template>
  <div
    class="grid w-full grid-cols-1 justify-between gap-y-4 border-[0.5px] p-4 shadow xxs:grid-cols-4 sm:grid-cols-3 md:flex 3xl:grid-cols-1"
  >
    <div
      class="order-2 flex flex-col items-center justify-center text-center xxs:col-span-2 sm:order-1 sm:col-span-1"
    >
      <p class="">{{ product_name }}</p>
    </div>
    <div
      class="order-1 flex flex-col items-center justify-center text-center xxs:col-span-4 sm:order-2 sm:col-span-1"
    >
      <p v-if="product_price > 0" class="">£{{ product_price }}</p>
      <p v-else class="">Free</p>
    </div>
    <div
      class="order-3 flex items-center justify-center xxs:col-span-2 sm:col-span-1"
    >
      <Button
        v-if="product_inventory == 0"
        class="h-min bg-gray-300"
        disabled="true"
        title="Sold Out"
      />
      <Button v-else class="h-min" :is-primary="true" title="Add to basket" />
    </div>
  </div>
</template>
<!-- eslint-disable vue/prop-name-casing -->
<script>
import Button from "../../components/button/button.ce.vue";
export default {
  name: "EventDateTile",
  props: {
    product_name: { type: String, default: "" },
    product_price: { type: String, default: "" },
    product_inventory: { type: String, default: "" },
  },
  components: {
    Button,
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
