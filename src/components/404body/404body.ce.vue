<script>
import Searchbar from "../searchbar/searchbar.ce.vue";
import Button from "../button/button.ce.vue";
import QuickLinks from "../quickLinks/quickLinks.ce.vue";
import "../../main.css";
export default {
  components: {
    QuickLinks,
    Button,
    Searchbar,
  },
  methods: {
    doSearch(value) {
      window.location.href = `/search?q=${value}`;
    },
  },
};
</script>

<template>
  <main
    class="m-auto px-4 py-14 text-center min-h-96 flex flex-col gap-12 justify-center items-center"
  >
    <div>
      <h1 class="text-6xl mb-6">Oops! Page Not Found</h1>
      <p class="text-2xl text-gray-600 max-w-prose">
        We're sorry, but the page you are looking for cannot be found. It seems
        that the link you clicked may be outdated, or the page may have been
        removed.
      </p>
    </div>
    <div class="w-full">
      <Searchbar
        :submit-search-callback="doSearch"
        placeholder="Search for something..."
        class="max-w-sm m-auto"
      />
    </div>
    <div>
      <h2 class="text-lg mb-6">
        Here are a few popular pages you might be interested in:
      </h2>
      <QuickLinks />
    </div>
    <div>
      <h2 class="text-lg mb-6">
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
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
