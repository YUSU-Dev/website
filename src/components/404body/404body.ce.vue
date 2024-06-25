<script>
import Searchbar from "../searchbar/searchbar.ce.vue";
import Button from "../button/button.ce.vue";
import QuickLinks from "../quickLinks/quickLinks.ce.vue";
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
    class="m-auto flex min-h-96 flex-col items-center justify-center gap-12 px-4 py-14 text-center"
  >
    <div>
      <h1 class="mb-6 text-6xl">Oops! Page Not Found</h1>
      <p class="max-w-prose text-2xl text-gray-600">
        We're sorry, but the page you are looking for cannot be found. It seems
        that the link you clicked may be outdated, or the page may have been
        removed.
      </p>
    </div>
    <div class="w-full">
      <Searchbar
        :submit-search-callback="doSearch"
        placeholder="Search for something..."
        class="m-auto max-w-sm"
      />
    </div>
    <div>
      <h2 class="mb-6 text-lg">
        Here are a few popular pages you might be interested in:
      </h2>
      <QuickLinks />
    </div>
    <div>
      <h2 class="mb-6 text-lg">
        If you're not sure where to go next, you can always return to our
        homepage:
      </h2>
      <div class="inline-flex">
        <Button
          title="Return Home"
          is-primary="True"
          class="px-10 text-center"
          url="/"
        />
      </div>
    </div>
  </main>
</template>
