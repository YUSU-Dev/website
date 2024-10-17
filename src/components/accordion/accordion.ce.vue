<template>
  <div class="flex flex-col shadow">
    <button
      class="btn flex-1 px-2 py-4 text-center shadow"
      :class="{
        'btn-primary': primaryButton,
        'btn-secondary': secondaryButton,
        'btn-student-life': studentLifeButton,
        'btn-student-voice': studentVoiceButton,
        'btn-advice-support': adviceAndSupportButton,
      }"
      @click="openTab = !openTab"
    >
      <h2 class="mb-0">{{ label }}</h2>
    </button>
    <div v-if="openTab">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Accordion",
  props: {
    label: {
      type: String,
      default: "",
    },
    isPrimary: Boolean,
    isStudentLife: Boolean,
    isStudentVoice: Boolean,
    isAdviceAndSupport: Boolean,
    isActivitiesView: Boolean,
    isSecondary: Boolean,
  },
  data() {
    return {
      openTab: false,
      primaryButton: false,
      studentLifeButton: false,
      adviceAndSupportButton: false,
      studentVoiceButton: false,
      secondaryButton: false,
    };
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
    } else {
      this.primaryButton = true;
    }
  },
};
</script>
