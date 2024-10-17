<template>
  <div class="flex flex-col shadow">
    <Button
      class="btn w-full flex-1 px-2 py-4 text-center shadow"
      :type="buttonType"
      @click="selected = !selected"
      :title="label"
    >
    </Button>
    <div v-show="selected">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Button from "../button/button.ce.vue";
export default {
  name: "Accordion",
  props: {
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: null,
    },
    isPrimary: Boolean,
    isStudentLife: Boolean,
    isStudentVoice: Boolean,
    isAdviceAndSupport: Boolean,
    isActivitiesView: Boolean,
    isSecondary: Boolean,
  },
  components: {
    Button,
  },
  data() {
    return {
      selected: false,
      buttonType: "",
    };
  },
  created() {
    if (this.isPrimary || this.type === "primary") {
      this.buttonType = "primary";
    } else if (this.isStudentLife || this.type === "student-life") {
      this.buttonType = "student-life";
    } else if (this.isAdviceAndSupport || this.type === "advice-support") {
      this.buttonType = "advice-support";
    } else if (this.isStudentVoice || this.type === "student-voice") {
      this.buttonType = "student-voice";
    } else if (this.isSecondary || this.type === "secondary") {
      this.buttonType = "secondary";
    } else {
      this.buttonType = "primary";
    }
  },
};
</script>
