import "./shop.component.js";

export default {
  title: "Components/Shop/Shop Index",
  component: "shop",
  tags: ["!autodocs"],
};

export const Default = {
  args: {
    title: "",
    selectedgroup: "",
  },
};

export const HiddenFilter = {
  args: {
    title: "",
    hidefilter: "true",
    selectedgroup: "",
  },
};

export const FeatureShop = {
  args: {
    title: "Feature Shop",
    featuredshop: "true",
    selectedgroup: "",
  },
};

export const FeatureShopWithIcon = {
  args: {
    title: "Feature Shop",
    featuredshop: "true",
    selectedgroup: "",
    icon: true,
  },
};
