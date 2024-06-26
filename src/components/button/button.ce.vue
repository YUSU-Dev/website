<template>
  <a
    class="btn group flex w-fit items-center"
    :class="{
      'btn-primary': isPrimary,
      'btn-secondary': isSecondary,
      'btn-student-life': isStudentLife,
      'btn-student-voice': isStudentVoice,
      'btn-advice-support': isAdviceAndSupport,
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
  },
  components: {
    FontAwesomeIcon,
  },
};
</script>
