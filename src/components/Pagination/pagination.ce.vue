<template>
  <div
    v-if="!loading && Array.length && (page != 1 || moreResults)"
    class="flex gap-3"
  >
    <button
      @click="loadPage(this.page - 1)"
      v-show="PreviousResults"
      aria-label="Previous page"
    >
      <FontAwesomeIcon icon="fas fa-chevron-left" class="h-4 w-4" />
    </button>
    <button @click="loadPage(this.page - 1)" v-show="previousResults">
      <p class="px-2 py-2">{{ this.page - 1 }}</p>
    </button>
    <button @click="loadPage(this.page)">
      <p :class="{ 'bg-mustard': this.page == this.page }" class="px-2 py-2">
        {{ this.page }}
      </p>
    </button>
    <button @click="loadPage()" v-show="moreResults">
      <p class="px-2 py-2">{{ this.page + 1 }}</p>
    </button>
    <button @click="loadPage()" v-show="moreResults" aria-label="Next page">
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
  props: {
    loading: Boolean,
    array: {
      type: Array,
      default() {
        return [];
      },
    },
    loadPage: {
      type: Function,
      default() {
        return () => {};
      },
    },
    page: {
      type: Number,
      default: 1,
    },
    moreResults: Boolean,
    previousResults: Boolean,
  },
  components: {
    FontAwesomeIcon,
  },
};
</script>
