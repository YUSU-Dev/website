<script>
import "../../main.css";
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
  <div class="input-group flex border-[1px] border-black">
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
        class="btn btn-block btn-secondary h-full w-full bg-black px-1"
        @click="submitSearch"
      >
        <i class="fas fa-search p-2 text-white"></i>
      </button>
    </div>
  </div>
</template>
