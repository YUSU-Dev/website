<template>
  <div class="expanding-button-container">
    <button
      :id="buttonId"
      class="btn-primary rounded p-4 transition-[width] duration-500 ease-in-out"
      :class="isExpanded ? 'w-full rounded-b-none' : collapsedWidth"
      @click="toggleExpanded"
      :aria-expanded="isExpanded"
      :aria-controls="contentId"
      :aria-label="`${isExpanded ? 'Close' : 'Open'} ${buttonTitle}`"
      type="button"
    >
      <slot name="button">
        {{ buttonTitle }}
      </slot>
    </button>
    <div
      :id="contentId"
      class="rounded-b border bg-white transition-all duration-500 ease-in-out"
      :class="
        isExpanded
          ? 'max-h-[100vh] w-full overflow-x-auto p-6'
          : `max-h-0 overflow-hidden border-none ${collapsedWidth}`
      "
      :aria-hidden="!isExpanded"
      :aria-labelledby="buttonId"
    >
      <slot v-if="renderContent"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExpandingButton",
  props: {
    buttonTitle: {
      type: String,
      default: "Toggle Content",
    },
    buttonId: {
      type: String,
      default: "expanding-button",
    },
    contentId: {
      type: String,
      default: "expanding-content",
    },
    collapsedWidth: {
      type: String,
      default: "w-48",
    },
    initiallyExpanded: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["toggle", "expanded", "collapsed"],
  data() {
    return {
      isExpanded: this.initiallyExpanded,
      renderContent: this.initiallyExpanded,
    };
  },
  methods: {
    toggleExpanded() {
      this.isExpanded = !this.isExpanded;

      if (this.isExpanded) {
        this.renderContent = true;
      } else {
        setTimeout(() => {
          this.renderContent = false;
        }, 500);
      }

      this.$emit("toggle", this.isExpanded);
      this.$emit(this.isExpanded ? "expanded" : "collapsed");
    },
  },
};
</script>
