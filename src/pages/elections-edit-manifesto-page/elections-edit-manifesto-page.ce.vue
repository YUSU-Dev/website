<template>
  <Navbar />
  <div class="container mx-auto">
    <ElectionsManifesto />
  </div>
  <Footer />
</template>

<script>
import Navbar from "../../components/Navbar/navbar.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import ElectionsManifesto from "../../components/elections-manifesto/elections-manifesto.ce.vue";
export default {
  name: "ElectionsEditManifestoPage",
  components: {
    Footer,
    Navbar,
    ElectionsManifesto,
  },
};
</script>
