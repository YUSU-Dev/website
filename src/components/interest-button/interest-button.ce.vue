<template>
  <Button
    v-if="interested"
    title="Unregister interest"
    class="flex w-full justify-center text-center"
    is-primary
    @click="doUnregisterInterest(activityId)"
  />
  <Button
    v-else
    title="Register interest"
    class="flex w-full justify-center text-center"
    is-primary
    @click="doRegisterInterest(activityId)"
  />
  <Modal
    :signed-in="signedIn"
    :title="'Sign in!'"
    :error-description="ErrorDescription"
    :modal-closed="ModalClosed"
    @close="ModalClosed = true"
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
export default {
  name: "InterestButton",
  components: {
    Button,
    Modal,
  },
  data() {
    return {
      interested: false,
      signedIn: false,
      ErrorDescription: "Please sign in to register your interest.",
      ModalClosed: true,
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
      if (this.signedIn) {
        registerInterest(activityId);
      } else {
        this.ModalClosed = false;
      }
    },
    doUnregisterInterest(activityId) {
      unregisterInterest(activityId);
    },
  },
};
</script>
