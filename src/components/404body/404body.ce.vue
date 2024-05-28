<script>
import Searchbar from "../searchbar/searchbar.ce.vue";
import Button from "../button/button.ce.vue";
export default {
  components: {
    Button,
    Searchbar,
  },
  props: {
    submitSearchCallback: {
      type: Function,
      required: true,
    },
  },
  methods: {
    doSearch(value) {
      this.submitSearchCallback(value);
    },
  },
};
</script>

<template>
  <main
    class="m-auto px-4 py-14 text-center max-w-3xl min-h-96 flex flex-col gap-8"
  >
    <h1 class="text-6xl">Oops! Page Not Found</h1>
    <p class="text-xl text-gray-500">
      We're sorry, but the page you are looking for cannot be found. It seems
      that the link you clicked may be outdated, or the page may have been
      removed.
    </p>
    <!--    <h2>Search Our Site:</h2>-->
    <div>
      <!--      <h2 class="text-base py-2">Use the search bar below to find what you're looking for:</h2>-->
      <!--      <h2 class="text-base py-2">Search what you're looking for:</h2>-->
      <Searchbar
        :submit-search-callback="doSearch"
        placeholder="Search for something..."
        class="max-w-sm m-auto"
      />
    </div>
    <div>
      <h2 class="text-base py-4">
        Here are a few popular pages you might be interested in:
      </h2>
    </div>
    <div>
      <h2 class="text-base py-4">
        If you're not sure where to go next, you can always return to our
        homepage:
      </h2>
      <a href="/" class="inline-flex">
        <Button
          title="Return Home"
          isPrimary="True"
          class="px-10 text-center"
        />
      </a>
    </div>
  </main>
</template>
