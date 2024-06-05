<template>
  <div class="flex min-h-screen flex-col">
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
