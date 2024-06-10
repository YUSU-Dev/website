<template>
  <a
    class="btn group"
    :class="{
      'btn-primary': isPrimary,
      'btn-secondary': isSecondary,
      'btn-student-life': isStudentLife,
      'btn-student-voice': isStudentVoice,
      'btn-advice-support': isAdviceAndSupport,
    }"
  >
    <i v-if="arrow" class="fa-solid fa-arrow-left mr-2"></i>
    {{ title }}
    <i
      v-if="isTertiary"
      class="fa-solid fa-arrow-right ml-2"
      :class="{ 'btn-tertiary': isTertiary }"
    ></i>
  </a>
</template>
<script>
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
    isSecondary: Boolean,
    arrow: Boolean,
    isTertiary: Boolean,
  },
};
</script>
