<template>
  <div v-if="isVisible" class="w-full bg-mustard">
    <div class="relative flex w-full items-center justify-center px-4 py-1">
      <slot></slot>
      <button
        class="notice-close absolute"
        aria-label="Close notice"
        @click="closeNotice"
      >
        <svg
          class="h-3 w-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoticeBar",
  data() {
    return {
      isVisible: true,
    };
  },
  methods: {
    closeNotice() {
      this.isVisible = false;
    },
  },
};
</script>
