<template>
  <HeroHeader
    title="Welcome Fair"
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_Student_Life.jpg"
  />
  <div class="container mx-auto">
    <WelcomeFair />
  </div>
  <Footer />
</template>

<script>
import HeroHeader from "../../components/HeroHeader/heroheader.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import WelcomeFair from "../../components/welcome-fair/welcome-fair.ce.vue";
export default {
  name: "WelcomeFairPage",
  components: {
    HeroHeader,
    Footer,
    WelcomeFair,
  },
};
</script>
