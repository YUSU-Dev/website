<template>
  <div class="">
    <div class="my-4">
      <Button :is-primary="true" title="Back to Shop" arrow :url="'/shop'" />
    </div>
    <h1 class="mb-2 text-2xl font-bold">Basket</h1>
    <div class="flex grid-cols-4 flex-col gap-y-6 md:grid">
      <div class="col-span-3 mb-2">
        <!-- <div> -->
        <div v-if="items.length > 0" class="mb-6 flex flex-col gap-y-4">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="grid grid-cols-4 gap-x-3 lg:gap-x-10"
          >
            <div class="col-span-1 flex items-center justify-center">
              <img class="object-cover" alt="" :src="item.image" />
            </div>
            <div class="col-span-3">
              <div class="flex h-full flex-col justify-between">
                <h2 class="text-xl font-bold">{{ item.product_name }}</h2>

                <div class="flex flex-col gap-y-1 xs:gap-y-2 md:gap-y-3">
                  <div class="grid grid-cols-2 items-center md:grid-cols-3">
                    <p>Item Price:</p>
                    <p>£{{ item.price_total }}</p>
                  </div>
                  <div class="grid grid-cols-2 items-center md:grid-cols-3">
                    <p>Quantity:</p>
                    <div class="flex items-center">
                      <a
                        @click="removeItem(item.id)"
                        href="javascript:;"
                        :aria-label="
                          'Remove' + item.product_name + 'from basket'
                        "
                        class="btn-primary p-2"
                      >
                        <FontAwesomeIcon icon="fas fa-minus" class="h-3 w-3" />
                      </a>
                      <div class="bg-gray-200 px-4">
                        <p class="text-lg">{{ item.quantity }}</p>
                      </div>
                      <a
                        :href="
                          '/shop/product/' +
                          item.product_id +
                          '-' +
                          item.url_name
                        "
                        :aria-label="
                          'Add another' + item.product_name + 'to basket'
                        "
                        class="btn-primary p-2"
                      >
                        <FontAwesomeIcon icon="fas fa-plus" class="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                  <div
                    class="grid grid-cols-2 items-center font-semibold md:grid-cols-3"
                  >
                    <p>Total:</p>
                    <p>{{ formatPrice(item.quantity * item.price_total) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="Loading">
          <Loading :loading="Loading" text />
        </div>
        <div v-else class="my-4 text-center text-lg">
          <p>There are no items in your basket. Why not check out our shop?</p>
        </div>
        <!-- </div> -->
        <Button
          @click="emptyBasket()"
          title="Empty basket"
          :is-primary="true"
          v-if="items.length > 0"
        />
      </div>

      <div class="col-span-1 mb-4">
        <div class="flex max-w-96 flex-col gap-2 md:ml-4">
          <div class="bg-gray-200 p-4">
            <h2 class="mb-2 text-2xl font-bold">Summary</h2>
            <div class="flex justify-between text-lg">
              <p>Subtotal</p>
              <p>£{{ shopFullBasket.sub_total }}</p>
            </div>
            <div class="flex justify-between text-lg">
              <p>Postage</p>
              <p>£{{ shopFullBasket.delivery_fee }}</p>
            </div>
            <div class="flex justify-between text-lg">
              <p>Booking Fee</p>
              <p>£{{ shopFullBasket.booking_fee }}</p>
            </div>
            <div class="mt-2 flex justify-between text-lg">
              <h3 class="text-xl font-bold">
                Total £{{ shopFullBasket.total }}
              </h3>
            </div>
          </div>
          <Button
            @click="payNow()"
            title="Go to checkout"
            :is-primary="true"
            :disabled="Loading"
          />
          <Button
            @click="emptyBasket()"
            title="Empty basket"
            :is-primary="true"
            v-if="Loading"
          />
          <p class="mt-2">
            All events tickets are non-refundable. If you do require help with
            your order after purchasing please contact
            <a class="text-blue-800 underline" href="mailto:finance@yorksu.org"
              >finance@yorksu.org</a
            >
            or the student group running the event.
          </p>
          <p class="mt-2">
            For memberships you can view how we use your data on our
            <a
              class="text-blue-800 underline"
              href="/documents/student-privacy-policy"
              >Privacy Statement</a
            >.
          </p>
        </div>
      </div>
    </div>
  </div>
  <Modal
    signed-in
    :title="'Basket Error!'"
    :error-description="ErrorDescription"
    :modal-closed="ModalClosed"
    @close="ModalClosed = true"
  />
</template>

<script>
import Button from "../button/button.ce.vue";
import Modal from "../modal/modal.ce.vue";
import axios from "../../_common/axios.mjs";
import Loading from "../loading/loading.ce.vue";
import { randomImageUrl } from "../../_common/randomImage.mjs";
import {
  removeItemHandler,
  emptyBasketHandler,
  payNowHandler,
} from "../shop/shop.gateway.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faMinus,
  faTrashCan,
  faX,
} from "@fortawesome/free-solid-svg-icons";
library.add(faPlus);
library.add(faMinus);
library.add(faTrashCan);
library.add(faX);

export default {
  name: "ShopBasket",
  components: {
    Button,
    FontAwesomeIcon,
    Modal,
    Loading,
  },
  props: {
    errorMessage: {
      type: String,
      default: null,
    },
    shopBasket: {
      type: Array,
      default() {
        return [];
      },
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
      shopFullBasket: {
        type: Array,
        value: [],
      },
      ModalClosed: true,
      ErrorDescription: "",
      Loading: true,
    };
  },
  created() {
    this.getBasketItems();
  },
  mounted() {},
  methods: {
    async getBasketItems() {
      let self = this;
      self.Loading = true;
      if (this.shopBasket.length === 0) {
        await axios
          .get("https://yorksu.org/shop/basket-api-v2")
          .then((response) => {
            let jsonData = {};
            try {
              var cleanedData = response.data.replace(/,\s*]/, "]");
              jsonData = JSON.parse(cleanedData);
            } catch {
              var jsonString = JSON.stringify(response.data);
              var errorCleaned = jsonString.replace(/,\s*]/, "]");
              jsonData = JSON.parse(errorCleaned);
            }
            this.shopFullBasket = jsonData;
          });
      } else {
        this.shopFullBasket = this.shopBasket[0];
      }
      console.log(this.shopFullBasket);
      let basketItems = this.shopFullBasket.items;
      console.log(basketItems);
      if (basketItems.length === 0) {
        self.Loading = false;
        return;
      }

      let products = [];
      let product = {};
      for (const item of basketItems) {
        await axios
          .get(`https://pluto.sums.su/api/products/` + item.product_id, {
            headers: {
              "X-Site-Id": self.siteid,
            },
          })
          .then((response) => {
            product = {};
            product.image =
              response.data.image != ""
                ? response.data.image
                : randomImageUrl("primary");
            product.url_name = response.data.url_name;
            product.product_name = response.data.name;
            product.items_remove = item.item_remove;
            product.price_total = item.price_total;
            product.price_single = item.price_single;
            product.id = item.id;
            product.product_id = item.product_id;
            let index = products.findIndex(
              (products) => products.product_id === product.product_id,
            );
            if (index === -1) {
              products.push(product);
              products[products.length - 1].quantity = 1;
            } else {
              products[index].quantity += 1;
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
      self.items = products;
      self.Loading = false;
    },
    formatPrice(price) {
      return price.toLocaleString("en-GB", {
        style: "currency",
        currency: "GBP",
      });
    },
    removeItem(itemId) {
      let self = this;
      removeItemHandler(itemId)
        .then(function (response) {
          if (!response["success"]) {
            var data = response.error_message;
            self.ErrorDescription = data;
            self.ModalClosed = false;
            return;
          } else {
            self.getBasketItems();
          }
        })
        .catch(function (response) {
          if (response.error_message != "undefined") {
            console.log(
              "There was an error adding the product to the basket: " +
                response.error_message,
            );
            self.ErrorDescription = response.error_message;
            self.ModalClosed = false;
          } else {
            console.log("Undefined error adding product to basket");
            self.ErrorDescription = response.error_message;
            self.ModalClosed = false;
          }
        });
    },
    emptyBasket() {
      let self = this;
      emptyBasketHandler()
        .then(function (response) {
          if (!response["success"]) {
            var data = response.error_message;
            self.ErrorDescription = data;
            self.ModalClosed = false;
            return;
          } else {
            self.getBasketItems();
          }
        })
        .catch(function (response) {
          if (response.error_message != "undefined") {
            console.log(
              "There was an error clearing the basket: " +
                response.error_message,
            );
            self.ErrorDescription = response.error_message;
            self.ModalClosed = false;
          } else {
            console.log("Undefined error clearing the basket");
            self.ErrorDescription = response.error_message;
            self.ModalClosed = false;
          }
        });
    },
    payNow() {
      let self = this;
      payNowHandler()
        .then(function (response) {
          if (!response["success"]) {
            var data = response.error_message;
            self.ErrorDescription = data;
            self.ModalClosed = false;
            return;
          } else {
            self.getBasketItems();
            location.href = response.url;
          }
        })
        .catch(function (response) {
          if (response.error_message != "undefined") {
            console.log(
              "There was an error clearing the basket: " +
                response.error_message,
            );
            self.ErrorDescription = response.error_message;
            self.ModalClosed = false;
          } else {
            console.log("Undefined error clearing the basket");
            self.ErrorDescription = response.error_message;
            self.ModalClosed = false;
          }
        });
    },
  },
};
</script>
