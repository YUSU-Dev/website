<template>
  <Button
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
export default {
  name: "InterestButton",
  components: {
    Button,
    Modal,
    Toast,
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
    },
    doToggleInterest(activityId) {
      if (this.interested) {
        this.doUnregisterInterest(activityId);
      } else {
        this.doRegisterInterest(activityId);
      }
    },
  },
};
</script>
