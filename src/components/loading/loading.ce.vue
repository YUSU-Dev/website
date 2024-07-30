<template>
  <div v-if="loading && text" class="animate-pulse">
    <div class="flex-1 space-y-6 px-5 py-5">
      <div class="sr-only">Loading</div>
      <div class="h-2 rounded bg-slate-200"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-2 h-2 rounded bg-slate-200"></div>
          <div class="col-span-1 h-2 rounded bg-slate-200"></div>
        </div>
        <div class="h-2 rounded bg-slate-200"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    text: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
