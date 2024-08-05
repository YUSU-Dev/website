<template>
  <div class="flex flex-col shadow">
    <button
      class="flex-1 px-2 py-4 text-center shadow hover:bg-primary-pink"
      :class="{
        'bg-primary-pink': openTab == true,
        'bg-mustard': openTab == false,
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
  },
  data() {
    return {
      openTab: false,
    };
  },
};
</script>
