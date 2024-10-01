<template>
  <Button
    :is-primary="true"
    @click="addToBasket(productId)"
    title="Add to Basket"
    v-if="hasStock"
  />
  <Button class="bg-gray-300" title="Sold out" v-else disabled="true" />
  <Modal
    :signed-in="signedIn"
    :title="'Basket Error!'"
    :error-description="ErrorDescription"
    :modal-closed="ModalClosed"
    @close="ModalClosed = true"
  />
</template>

<script>
import { addToBasketHandler } from "../shop/shop-index/shop.basket.js";
import Button from "../button/button.ce.vue";
import Modal from "../modal/modal.ce.vue";

export default {
  name: "AddToBasket",
  props: {
    productId: {
      type: Number,
      required: true,
      default: 0,
    },
    signedIn: {
      type: Boolean,
      default: false,
    },
    hasStock: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      ModalClosed: true,
      ErrorDescription: "",
    };
  },
  components: {
    Button,
    Modal,
  },
  methods: {
    addToBasket(productId) {
      let self = this;
      addToBasketHandler(productId)
        .then(function (response) {
          if (!response["success"]) {
            var data = response.error_message;
            self.ErrorDescription = data;
            self.ModalClosed = false;
            return;
          }
          if (typeof response.fields != "undefined") {
            window.location.assign("/shop/fields/" + productId);
          } else {
            window.location.assign("/shop/basket");
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
  },
};
</script>
