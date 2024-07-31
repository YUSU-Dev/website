<template>
  <div class="flex flex-col">
    <div
      class="flex-1 py-4 text-center hover:bg-primary-pink"
      :class="{
        'bg-primary-pink': openTab == true,
        'bg-mustard': openTab == false,
      }"
      @click="openTab = !openTab"
    >
      <h2>{{ label }}</h2>
    </div>
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
