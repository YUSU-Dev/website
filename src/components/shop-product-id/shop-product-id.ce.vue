<template>
  <div class="">
    <div class="my-4">
      <Button :is-primary="true" title="Back to Shop" arrow :url="'/shop'" />
    </div>
    <div class="flex flex-wrap md:flex-row">
      <div class="md:w-1/2">
        <img class="object-cover" :alt="title" :src="image" />
      </div>
      <div class="flex flex-col gap-2 md:ml-4 md:w-5/12">
        <h1 class="text-2xl font-bold">{{ title }}</h1>
        <h2 class="text-xl">{{ price }}</h2>
        <AddToBasket
          v-if="!fields.length"
          :has-stock="hasStock"
          :product-id="productId"
          :signed-in="signedIn"
        />
        <article class="mt-2" v-html="description"></article>
        <ShopProductFields
          v-if="fields.length"
          :has-stock="hasStock"
          :fields="fields"
          :product-id="productId"
          :signed-in="signedIn"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AddToBasket from "../../components/add-to-basket/add-to-basket.ce.vue";
import Button from "../../components/button/button.ce.vue";
import ShopProductFields from "../../components/shop-product-fields/shop-product-fields.ce.vue";
import axios from "../../_common/axios.mjs";

export default {
  name: "ShopProductId",
  components: {
    AddToBasket,
    Button,
    ShopProductFields,
  },
  props: {
    image: {
      type: String,
      default:
        "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Blue.webp",
    },
    productId: {
      type: Number,
      default: null,
    },
    signedIn: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      title: "Product not Found",
      price: "Not found",
      description: "",
      fields: [],
      hasStock: true,
    };
  },
  created() {
    const self = this;
    axios
      .get(`https://pluto.sums.su/api/products/` + self.productId, {
        headers: {
          "X-Site-Id": self.siteid,
        },
      })
      .then((response) => {
        self.title = response.data.name;
        if (response.data.price == 0) {
          self.price = "Free";
        } else {
          self.price = "£" + response.data.price;
        }
        self.description = response.data.description;
        self.fields = response.data.fields;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>
