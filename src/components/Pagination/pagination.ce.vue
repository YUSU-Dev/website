<template>
  <div v-if="!loading && Array.length" class="flex gap-3 pl-3">
    <button
      @click="loadPage(this.Page - 1)"
      v-if="PreviousResults"
      aria-label="Previous page"
    >
      <FontAwesomeIcon icon="fas fa-chevron-left" class="h-4 w-4" />
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
      <FontAwesomeIcon icon="fas fa-chevron-right" class="h-4 w-4" />
    </button>
  </div>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

library.add(faChevronLeft, faChevronRight);

export default {
  props: [
    "loading",
    "Array",
    "loadPage",
    "Page",
    "MoreResults",
    "PreviousResults",
  ],
  components: {
    FontAwesomeIcon,
  },
};
</script>
