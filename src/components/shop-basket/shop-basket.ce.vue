<template>
  <div class="">
    <div class="my-4">
      <Button :is-primary="true" title="Back to Shop" arrow :url="'/shop'" />
    </div>
    <div class="flex flex-wrap md:flex-row">
      <div class="mb-2 md:w-2/3">
        <div>
          <h1 class="text-2xl font-bold">Basket</h1>
          <div>
            <div
              v-for="(item, index) in items"
              :key="index"
              class="my-2 flex gap-4"
            >
              <div class="flex w-2/12 items-center justify-center">
                <img
                  class="object-cover"
                  alt=""
                  :src="productImages[item.product_id]"
                />
              </div>
              <div class="w-3/4 grid-cols-5 gap-2 md:grid">
                <div class="col-span-3">
                  <h2 class="text-xl">{{ item.product_name }}</h2>
                  <div class="gap-2">
                    <p>Item Price: £{{ item.price_total }}</p>
                    <div class="flex items-center gap-2">
                      <p>Quantity:</p>
                      <a @click="removeItem(item.id)" href="javascript:;">
                        <FontAwesomeIcon icon="fas fa-minus" class="h-3 w-3" />
                      </a>
                      <p class="text-lg">{{ item.quantity }}</p>
                      <a
                        :href="
                          '/shop/product/' +
                          item.product_id +
                          '-' +
                          item.url_name
                        "
                        aria-label=""
                      >
                        <FontAwesomeIcon icon="fas fa-plus" class="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col-span-2 grid grid-cols-subgrid">
                  <div class="mb-2 flex items-end justify-end">
                    <p class="text-xl">Total:&nbsp;</p>
                    <p class="text-xl">
                      {{ formatPrice(item.quantity * item.price_total) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Button
          @click="emptyBasket()"
          title="Empty basket"
          :is-primary="true"
        />
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
        <Button @click="payNow()" title="Go to checkout" :is-primary="true" />
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
      ModalClosed: true,
      ErrorDescription: "",
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
              response.data.image != ""
                ? response.data.image
                : randomImageUrl("primary");
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
