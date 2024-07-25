<template>
  <Searchbar
    :submit-search-callback="doSearch"
    :initial-search-value="initialSearchValue"
  />
</template>

<script>
import Searchbar from "../searchbar/searchbar.ce.vue";
export default {
  name: "SiteSearchbar",
  components: {
    Searchbar,
  },
  methods: {
    doSearch(value) {
      window.location.href = `/search?q=${value}`;
    },
  },
  mounted() {
    if (this.value) {
      this.initialSearchValue = this.value;
    } else {
      const params = new URLSearchParams(window.location.search);
      this.initialSearchValue = params.get("q");
    }
  },
  props: {
    value: {
      type: String,
      default: null,
      required: false,
    },
  },
  data() {
    return {
      initialSearchValue: null,
    };
  },
};
</script>
