<template>
  <a
    class="btn group flex w-fit items-center"
    :class="{
      'btn-primary': primaryButton,
      'btn-secondary': secondaryButton,
      'btn-student-life': studentLifeButton,
      'btn-student-voice': studentVoiceButton,
      'btn-advice-support': adviceAndSupportButton,
    }"
    :href="url"
  >
    <div v-if="arrow" class="mr-2">
      <FontAwesomeIcon icon="fa-solid fa-arrow-left" class="h-4 w-4" />
    </div>
    {{ title }}
    <FontAwesomeIcon
      v-if="isTertiary"
      icon="fa-solid fa-arrow-right"
      class="ml-2 h-4 w-4"
      :class="{ 'btn-tertiary': isTertiary }"
    />
  </a>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowLeft, faArrowRight);

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    isPrimary: Boolean,
    isStudentLife: Boolean,
    isStudentVoice: Boolean,
    isAdviceAndSupport: Boolean,
    isActivitiesView: Boolean,
    isSecondary: Boolean,
    arrow: Boolean,
    isTertiary: Boolean,
    url: {
      type: String,
      default: "javascript:;",
    },
    type: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      primaryButton: false,
      studentLifeButton: false,
      adviceAndSupportButton: false,
      studentVoiceButton: false,
      secondaryButton: false,
    };
  },
  components: {
    FontAwesomeIcon,
  },
  mounted() {
    if (this.isPrimary || this.type === "primary") {
      this.primaryButton = true;
    } else if (this.isStudentLife || this.type === "student-life") {
      this.studentLifeButton = true;
    } else if (this.isAdviceAndSupport || this.type === "advice-support") {
      this.adviceAndSupportButton = true;
    } else if (this.isStudentVoice || this.type === "student-voice") {
      this.studentVoiceButton = true;
    } else if (this.isSecondary || this.type === "secondary") {
      this.secondaryButton = true;
    }
  },
};
</script>
