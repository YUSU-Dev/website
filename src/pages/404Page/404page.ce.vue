<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
<template>
  <Navbar />
  <Error404Body :submit-search-callback="doSearch" />
  <Footer />
</template>
<script>
import Error404Body from "../../components/404body/404body.ce.vue";
import Navbar from "../../components/Navbar/navbar.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
export default {
  components: {
    Footer,
    Navbar,
    Error404Body,
  },
  methods: {
    doSearch(value) {
      console.log("Search value: ", value);
    },
  },
};
</script>
