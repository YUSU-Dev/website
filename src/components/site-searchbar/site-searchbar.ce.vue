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
  props: {
    initialSearchValue: {
      type: String,
      default: null,
      required: false,
    },
  },
};
</script>
