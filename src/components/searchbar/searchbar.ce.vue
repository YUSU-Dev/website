<script>
export default {
  props: {
    submitSearchCallback: {
      type: Function,
      required: true,
    },
    initialSearchValue: {
      type: String,
      default: null,
      required: false,
    },
    placeholder: {
      type: String,
      default: "Search...",
      required: false,
    },
  },
  data() {
    return {
      formSearchElement: null,
    };
  },
  async mounted() {
    await this.awaitMountPromise;
    this.formSearchElement = this.$refs.search;
  },
  methods: {
    submitSearch() {
      this.submitSearchCallback(
        this.formSearchElement.value === ""
          ? null
          : this.formSearchElement.value,
      );
    },
  },
};
</script>

<template>
  <div class="input-group flex border-black border-[1px]">
    <input
      ref="search"
      name="search"
      :placeholder="this.placeholder"
      :value="this.initialSearchValue"
      class="search form-control w-full p-2"
      @keyup.enter="submitSearch"
    />
    <div class="input-group-append">
      <button
        type="submit"
        aria-label="Submit"
        class="btn btn-block btn-secondary bg-black w-full h-full px-1"
        @click="submitSearch"
      >
        <i class="fas fa-search text-white p-2"></i>
      </button>
    </div>
  </div>
</template>
