<template>
  <a
    class="btn group flex w-fit items-center justify-center"
    :class="{
      'btn-primary': primaryButton,
      'btn-secondary': secondaryButton,
      'btn-student-life': studentLifeButton,
      'btn-student-voice': studentVoiceButton,
      'btn-advice-support': adviceAndSupportButton,
      'btn-primary-active': primarySelected,
      'btn-secondary-active': secondarySelected,
      'btn-student-life-active': studentLifeSelected,
      'btn-student-voice-active': studentVoiceSelected,
      'btn-advice-support-active': adviceAndSupportSelected,
    }"
    :href="url"
    :target="target"
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
    selected: Boolean,
    url: {
      type: String,
      default: "javascript:;",
    },
    type: {
      type: String,
      default: null,
    },
    target: {
      type: String,
      default: "_self",
    },
  },
  data() {
    return {
      primaryButton: false,
      studentLifeButton: false,
      adviceAndSupportButton: false,
      studentVoiceButton: false,
      secondaryButton: false,
      primarySelected: false,
      studentLifeSelected: false,
      adviceAndSupportSelected: false,
      studentVoiceSelected: false,
      secondarySelected: false,
    };
  },
  components: {
    FontAwesomeIcon,
  },
  mounted() {
    const type =
      this.type ||
      (this.isPrimary
        ? "primary"
        : this.isStudentLife
          ? "student-life"
          : this.isAdviceAndSupport
            ? "advice-support"
            : this.isStudentVoice
              ? "student-voice"
              : this.isSecondary
                ? "secondary"
                : null);

    if (this.selected) {
      switch (type) {
        case "primary":
          this.primarySelected = true;
          break;
        case "student-life":
          this.studentLifeSelected = true;
          break;
        case "advice-support":
          this.adviceAndSupportSelected = true;
          break;
        case "student-voice":
          this.studentVoiceSelected = true;
          break;
        case "secondary":
          this.secondarySelected = true;
          break;
      }
    } else {
      switch (type) {
        case "primary":
          this.primaryButton = true;
          break;
        case "student-life":
          this.studentLifeButton = true;
          break;
        case "advice-support":
          this.adviceAndSupportButton = true;
          break;
        case "student-voice":
          this.studentVoiceButton = true;
          break;
        case "secondary":
          this.secondaryButton = true;
          break;
      }
    }
  },
};
</script>
