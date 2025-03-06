<template>
  <div v-if="isVisible">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TimeLock",
  props: {
    visibleFrom: {
      type: String,
      default: "",
    },
    visibleUntil: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  mounted() {
    const now = new Date();
    const visibleFrom = new Date(this.visibleFrom);
    const visibleUntil = new Date(this.visibleUntil);
    if (now >= visibleFrom && now <= visibleUntil) {
      this.isVisible = true;
    }
  },
};
</script>
