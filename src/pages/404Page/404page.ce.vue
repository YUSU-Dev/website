<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <Error404Body />
    <Footer />
  </div>
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
};
</script>
