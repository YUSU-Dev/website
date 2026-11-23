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
        <article class="body-style mt-2" v-html="description"></article>
        <ShopProductFields
          v-if="fields.length"
          :has-stock="hasStock"
          :fields="fields"
          :product-id="productId"
          :signed-in="signedIn"
        />
        <p v-for="note in ruleNotes" :key="note" class="mt-2 text-sm font-bold">
          {{ note }}
        </p>
        <div v-if="adminFeeText" class="mt-2 text-sm">
          <p>{{ adminFeeText }}</p>
          <p class="mt-1 italic">
            The final fee is based on your total basket: {{ adminFeeBands }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddToBasket from "../../add-to-basket/add-to-basket.ce.vue";
import Button from "../../button/button.ce.vue";
import ShopProductFields from "../shop-product-fields/shop-product-fields.ce.vue";
import axios from "../../../_common/axios.mjs";

const ADMIN_FEE_BANDS =
  "50p for a total basket value up to £9.99, 75p for £10.00 to £19.99, and £1.00 for £20.00 or more.";

// SUMS shop rules that add another item to the basket.
// Update the prices when the AU fees change.
const BASKET_RULES = {
  22: { name: "Black Level AU fee", price: "£30" },
  23: { name: "Gold Level AU fee", price: "£15" },
};

function getRuleNotes(product) {
  return (product.rules || [])
    .map((rule) => BASKET_RULES[rule.id])
    .filter(Boolean)
    .map(
      (rule) =>
        "This product also requires the " +
        rule.name +
        " (" +
        rule.price +
        "), which will be added to your basket.",
    );
}

// Admin fee line from the SUMS API, empty if the product has no fee
function getAdminFeeText(product) {
  if (!product.booking_fee) return "";
  // Free items aren't charged the fee
  if (!product.variable_price && !(Number(product.price) > 0)) return "";
  const fee = Number(product.fee_value);
  if (!product.variable_price && Number(product.price) > 0 && fee > 0) {
    const amount = fee < 1 ? Math.round(fee * 100) + "p" : "£" + fee.toFixed(2);
    return "Admin fee for this product: " + amount + " if bought on its own.";
  }
  return "An admin fee applies to this product.";
}

export default {
  name: "ShopProductId",
  components: {
    AddToBasket,
    Button,
    ShopProductFields,
  },
  props: {
    productId: {
      type: Number,
      default: null,
    },
    signedIn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      title: "Product not Found",
      price: "Not found",
      description: "",
      fields: [],
      hasStock: true,
      image: "",
      adminFeeText: "",
      adminFeeBands: ADMIN_FEE_BANDS,
      ruleNotes: [],
    };
  },
  created() {
    const self = this;
    axios
      .get(`https://pluto.sums.digital/api/products/` + self.productId, {
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
        self.adminFeeText = getAdminFeeText(response.data);
        self.ruleNotes = getRuleNotes(response.data);
        self.description = response.data.description;
        self.fields = response.data.fields;
        if (response.data.image) {
          self.image = response.data.image;
        } else {
          self.image =
            "https://assets-cdn.sums.digital/YU/website/img/placeholders/500x500_Red.webp";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>
