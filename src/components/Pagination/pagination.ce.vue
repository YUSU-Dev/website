<template>
  <div v-if="!loading && Array.length" class="flex gap-3 pl-3">
    <button
      @click="loadPage(this.Page - 1)"
      v-if="PreviousResults"
      aria-label="Previous page"
    >
      <i class="fa-solid fa-chevron-left"></i>
    </button>
    <button @click="loadPage(this.Page - 1)" v-if="PreviousResults">
      <p class="px-2 py-2">{{ this.Page - 1 }}</p>
    </button>
    <button @click="loadPage(this.Page)">
      <p :class="{ 'bg-mustard': this.Page == this.Page }" class="px-2 py-2">
        {{ this.Page }}
      </p>
    </button>
    <button @click="loadPage()" v-if="MoreResults">
      <p class="px-2 py-2">{{ this.Page + 1 }}</p>
    </button>
    <button @click="loadPage()" v-if="MoreResults" aria-label="Next page">
      <i class="fa-solid fa-chevron-right"></i>
    </button>
  </div>
</template>
<script>
import "../../main.css";
export default {
  props: [
    "loading",
    "Array",
    "loadPage",
    "Page",
    "MoreResults",
    "PreviousResults",
  ],
};
</script>
