<template>
  <div class="flex flex-col bg-gray-200 p-4">
    <h2 class="mb-2 text-2xl font-bold">Charity Donation</h2>
    <p class="mb-2">
      Would you like to add a £1 charity donation to your order?
    </p>
    <!-- <div
              class="wrap-anywhere"
              v-html="charityDonation.description"
            ></div> -->
    <div class="flex items-center justify-between gap-2">
      <div v-if="loading" class="h-full w-full">
        <Loading :loading="loading" text white />
      </div>
      <p v-else class="font-bold">{{ charityDonation.name }}</p>
      <!-- checkbox -->
      <div>
        <input
          type="checkbox"
          aria-label="Charity Donation"
          v-model="charityDonation.checked"
          @change="toggleDonation"
          class="h-6 w-6"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../_common/axios.mjs";
import { addToBasketHandler } from "../shop/shop-index/shop.basket.js";
import { removeItemHandler } from "../shop/shop-index/shop.gateway.js";
import Loading from "../loading/loading.ce.vue";
export default {
  name: "CharityDonation",
  emits: ["donation-updated"],
  props: {
    basketItems: {
      type: Array,
      default: () => [],
    },
    charityId: {
      type: String,
      default: null,
    },
    donationBasketId: {
      type: String,
      default: null,
    },
  },
  components: {
    Loading,
  },
  data() {
    return {
      charityDonation: {
        type: Array,
        default: () => [],
      },
      loading: false,
    };
  },
  created() {
    this.getDonationProduct();
  },
  watch: {
    basketItems: {
      handler() {
        this.checkDonationInBasket();
      },
      immediate: true,
    },
  },
  methods: {
    checkDonationInBasket() {
      const donationInBasket = this.basketItems.some(
        (item) => item.product_id === this.charityId,
      );
      if (this.charityDonation) {
        this.charityDonation.checked = donationInBasket;
      }
    },
    async getDonationProduct() {
      this.loading = true;
      await axios
        .get(`https://pluto.sums.su/api/products/` + this.charityId, {
          headers: {
            "X-Site-Id": self.siteid,
          },
        })
        .then((response) => {
          this.charityDonation = response.data;
          this.checkDonationInBasket();
        })
        .catch((error) => {
          console.error(error);
        });
      this.loading = false;
    },
    toggleDonation() {
      const isChecked = this.charityDonation.checked;

      if (isChecked) {
        addToBasketHandler(this.charityDonation.id)
          .then((response) => {
            if (!response["success"]) {
              console.log(
                "There was an error adding the product to the basket: " +
                  response.error_message,
              );
              return;
            } else {
              // Emit event to refresh basket
              this.$emit("donation-updated");
            }
          })
          .catch((response) => {
            if (response.error_message != "undefined") {
              console.log(
                "There was an error adding the product to the basket: " +
                  response.error_message,
              );
            } else {
              console.log("Undefined error adding product to basket");
            }
          });
      } else {
        removeItemHandler(this.donationBasketId)
          .then((response) => {
            if (!response["success"]) {
              console.log(
                "There was an error removing the product from the basket: " +
                  response.error_message,
              );
              return;
            } else {
              // Emit event to refresh basket
              this.$emit("donation-updated");
            }
          })
          .catch((response) => {
            if (response.error_message != "undefined") {
              console.log(
                "There was an error removing the product from the basket: " +
                  response.error_message,
              );
            } else {
              console.log("Undefined error removing product from basket");
            }
          });
      }
    },
  },
};
</script>
