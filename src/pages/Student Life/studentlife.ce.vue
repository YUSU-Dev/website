<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
<template>
  <HeroHeader
    title="Student Life"
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_Student_Life.jpg"
  />
  <Activities siteid="tZyLG9BX9f4hdTp2HLva5c" selectedparents="2,24,39" />
  <Footer />
</template>
<script>
import HeroHeader from "../../components/HeroHeader/heroheader.ce.vue";
import Activities from "../../components/activities/activities.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
export default {
  props: {},
  components: {
    HeroHeader,
    Activities,
    Footer,
  },
  methods: {},
};
</script>
