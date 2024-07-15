<template>
  <div class="flex flex-col">
    <div
      class="flex-1 bg-green-500 py-4 text-center"
      @click="open('completed')"
    >
      <h2>Completed</h2>
    </div>
    <div v-if="openTab == 'completed'">
      <slot name="completed">All clear!</slot>
    </div>

    <div
      class="flex-1 bg-yellow-500 py-4 text-center"
      @click="open('progress')"
    >
      <h2>In Progress</h2>
    </div>
    <div v-if="openTab == 'progress'">
      <slot name="progress">All clear!</slot>
    </div>

    <div class="flex-1 bg-red-500 py-4 text-center" @click="open('blocked')">
      <h2>Blocked</h2>
    </div>
    <div v-if="openTab == 'blocked'">
      <slot name="blocked">All clear!</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SabbAccordion",
  data() {
    return {
      openTab: "",
    };
  },
  methods: {
    open(tab) {
      if (this.openTab != tab) {
        this.openTab = tab;
      } else {
        this.openTab = "";
      }
    },
  },
};
</script>
