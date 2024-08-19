<template>
  <Button
    v-if="registered"
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
</template>

<script>
import Button from "../button/button.ce.vue";
import {
  registerInterest,
  unregisterInterest,
} from "../interest-button/interested-members.js";
export default {
  name: "InterestButton",
  components: {
    Button,
  },
  props: {
    registered: {
      type: Boolean,
      default: false,
    },
    activityId: {
      type: String,
      default: "",
    },
  },
  methods: {
    doRegisterInterest(activityId) {
      registerInterest(activityId);
    },
    doUnregisterInterest(activityId) {
      unregisterInterest(activityId);
    },
  },
};
</script>
