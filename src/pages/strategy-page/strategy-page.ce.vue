<template>
  <div id="skiptocontent"><a href="#maincontent">skip to main content</a></div>
  <HeroHeader
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_General.jpg"
    title="YUSU Strategy"
  />
  <div id="maincontent" class="flex flex-col items-center justify-center">
    <Strategy />
  </div>
  <Footer />
</template>
<script>
import HeroHeader from "../../components/HeroHeader/heroheader.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import Strategy from "../../components/strategy/strategy.ce.vue";
export default {
  props: {
    title: { type: String, default: "" },
  },
  components: {
    HeroHeader,
    Footer,
    Strategy,
  },
  methods: {},
};
</script>
