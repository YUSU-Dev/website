import Shop from "./shop.vue";

export default {
  title: "Components/Shop",
  component: Shop,
};

export const Default = {
  args: {
    title: "",
    featuredshop: false,
    hidefilter: false,
    selectedgroup: "",
  },
};
