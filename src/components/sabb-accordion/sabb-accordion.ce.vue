<template>
  <div class="flex flex-col">
    <div
      class="flex-1 bg-green-500 py-4 text-center"
      :class="{
        'bg-yellow-500': label == 'In Progress',
        'bg-red-500': label == 'Blocked',
      }"
      @click="openTab = !openTab"
    >
      <h2>{{ label }}</h2>
    </div>
    <div v-if="openTab">
      <slot>All clear!</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SabbAccordion",
  props: {
    label: {
      type: String,
      default: "Completed",
    },
  },
  data() {
    return {
      openTab: false,
    };
  },
};
</script>
