<template>
  <div v-if="hasStock">
    <h2 class="text-xl font-bold">Additional Information</h2>
    <form class="py-4">
      <div v-for="field in fields" :key="field.id">
        <div
          class="flex items-center text-wrap bg-light-blue p-2 text-sm md:text-base"
          v-if="field.id == 10"
        >
          <svg
            class="mr-2 h-4 w-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"
            />
          </svg>
          This is your University of York Student ID / Enrolment Number and not
          your UCAS number.
        </div>
        <div class="mb-2">
          <label :for="field.id"
            >{{ field.name }}
            <span v-if="field.required" class="text-red-600">* Required</span>
          </label>
          <textarea
            v-model="formData[field.id]"
            :id="field.id"
            class="form-input"
            :name="'field[' + field.id + ']'"
            type="text"
            :min="field.min"
            :max="field.nax"
            v-if="field.type == 'A' || field.type == 'S' || field.type == 'Y'"
            :required="field.required"
          ></textarea>
          <small class="mt-4 font-thin" v-if="field.type == 'S'"
            >Only characters a-z, A-Z and spaces are permitted.</small
          >
          <input
            v-model="formData[field.id]"
            v-if="field.type == 'E'"
            :id="field.id"
            class="form-input"
            :name="'field[' + field.id + ']'"
            type="email"
            :min="field.min"
            :max="field.nax"
            :required="field.required"
          />
          <input
            v-if="field.type == 'N'"
            v-model="formData[field.id]"
            :id="field.id"
            class="form-input"
            :name="'field[' + field.id + ']'"
            type="number"
            :min="field.min"
            :max="field.nax"
            :required="field.required"
          />
          <small class="mt-4 font-thin" v-if="field.type == 'N'"
            >A number between {{ field.min }} and {{ field.nax }}.</small
          >
          <div v-if="field.type == 'D'">
            <select
              :id="field.id"
              v-model="formData[field.id]"
              :name="'field[' + field.id + ']'"
              class="form-select"
              :aria-label="field.name"
              :required="field.required"
            >
              <option
                v-for="value in field.values"
                :value="value.id"
                :key="value.id"
              >
                {{ value.value }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="mt-2">
        <Button
          :is-primary="true"
          @click="addToBasket(productId)"
          title="Add to Basket"
        />
      </div>
    </form>
  </div>
  <div v-else>
    <AddToBasket :has-stock="false" :product-id="productId" :signed-in="true" />
  </div>
  <Modal
    :signed-in="signedIn"
    :title="'Basket Error!'"
    :error-description="ErrorDescription"
    :modal-closed="ModalClosed"
    @close="ModalClosed = true"
  />
</template>

<script>
import AddToBasket from "../../components/add-to-basket/add-to-basket.ce.vue";
import Modal from "../modal/modal.ce.vue";
import Button from "../button/button.ce.vue";
import { addToBasketHandler, addFieldsToBasket } from "../shop/shop.basket.js";

export default {
  name: "ShopProductFields",
  components: {
    AddToBasket,
    Modal,
    Button,
  },
  props: {
    fields: {
      type: Array,
      default: null,
    },
    productId: {
      type: Number,
      default: null,
    },
    productName: {
      type: String,
      default: null,
    },
    hasStock: {
      type: Boolean,
      default: true,
    },
    signedIn: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      ModalClosed: true,
      ErrorDescription: "",
      formData: {},
    };
  },
  created() {
    const fields = this.fields;
    for (let i = 0; i < fields.length; i++) {
      if (fields[i].type == "D") {
        this.formData[fields[i].id] = fields[i].values[0].id;
      } else {
        this.formData[fields[i].id] = "";
      }
      this.formData.do = "post";
    }
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
            addFieldsToBasket(productId, self.formData).then(function () {
              window.location.assign("/shop/basket");
            });
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
