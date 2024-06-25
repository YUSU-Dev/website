<template>
  <Button
    :is-primary="true"
    @click="addToBasket(productId)"
    :title="'Add to Basket'"
  />
  <Modal
    :signed-in="signedIn"
    :title="'Basket Error!'"
    :error-description="ErrorDescription"
    :modal-closed="ModalClosed"
    @close="ModalClosed = true"
  />
</template>

<script>
import { addToBasketHandler } from "../shop/shop.basket.js";
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
            window.location.replace("/shop/fields/" + productId);
          } else {
            window.location.replace("/shop/basket");
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
