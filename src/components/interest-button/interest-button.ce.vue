<template>
  <button
    v-if="isHeart"
    class="flex h-8 w-8 items-center justify-center rounded-full bg-beige"
    @click="doToggleInterest(activityId)"
  >
    <!-- Can't get fa-regular to work so had to use stroke path in CSS as workaround for the border -->
    <FontAwesomeIcon
      icon="fa-solid fa-heart"
      class="h-5 w-5"
      :class="[title === 'Register Interest' ? 'text-white' : 'text-red-500']"
    />
  </button>
  <Button
    v-else
    :title="title"
    class="flex w-full justify-center text-center"
    is-primary
    @click="doToggleInterest(activityId)"
  />
  <Modal
    :signed-in="signedIn"
    :title="'Sign in!'"
    :error-description="ErrorDescription"
    :modal-closed="ModalClosed"
    @close="ModalClosed = true"
  />
  <Toast
    :message="toastMessage"
    :toast-closed="toastClosed"
    @close="doClearToast()"
    @undo="doToggleInterest(activityId)"
    @dismiss="doDismiss()"
    dismiss-text="Wishlist"
  />
</template>

<script>
import Button from "../button/button.ce.vue";
import {
  registerInterest,
  unregisterInterest,
} from "../interest-button/interested-members.js";
import axios from "../../_common/axios.mjs";
import Modal from "../modal/modal.ce.vue";
import Toast from "../toast/toast.ce.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

library.add(faHeart);
export default {
  name: "InterestButton",
  components: {
    Button,
    Modal,
    Toast,
    FontAwesomeIcon,
  },
  data() {
    return {
      title: "Register Interest",
      interested: false,
      signedIn: false,
      ErrorDescription: "Please sign in to register your interest.",
      ModalClosed: true,
      toastClosed: true,
      toastMessage: "",
      timeout: { type: Function },
    };
  },
  props: {
    activityId: {
      type: String,
      default: "",
    },
    isHeart: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.checkInterest();
  },
  methods: {
    doLoadToast(message) {
      var self = this;
      this.doClearToast();
      this.toastMessage = message;
      this.toastClosed = false;
      this.timeout = setTimeout(() => {
        self.toastClosed = true;
      }, 5000);
    },
    doClearToast() {
      clearTimeout(this.timeout);
      this.toastClosed = true;
    },
    async checkInterest() {
      var self = this;
      await axios
        .get(
          "https://yorksu.org/wishlist/wishlist-activity-api/" +
            self.activityId,
        )
        .then((response) => {
          let jsonData = JSON.stringify(response.data);
          jsonData = JSON.parse(jsonData);
          self.interested = jsonData.registered;
          self.signedIn = jsonData.signed_in;
          self.title = self.interested
            ? "Unregister Interest"
            : "Register Interest";
        });
    },
    doRegisterInterest(activityId) {
      var self = this;
      if (this.signedIn) {
        registerInterest(activityId).then(() => {
          self.interested = true;
          self.title = "Unregister Interest";
          self.doLoadToast("You have successfully registered interest.");
        });
        this.$emit("register");
      } else {
        this.ModalClosed = false;
      }
    },
    doUnregisterInterest(activityId) {
      var self = this;
      unregisterInterest(activityId).then(() => {
        self.interested = false;
        self.title = "Register Interest";
        self.doLoadToast("You have successfully unregistered interest.");
      });
      this.$emit("unregister", activityId);
    },
    doToggleInterest(activityId) {
      if (this.interested) {
        this.doUnregisterInterest(activityId);
      } else {
        this.doRegisterInterest(activityId);
      }
    },
    doDismiss() {
      window.location.href = "/wishlist";
    },
  },
  emits: ["unregister", "register"],
};
</script>
