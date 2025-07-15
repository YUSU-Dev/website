<template>
  <div id="skiptocontent"><a href="#maincontent">skip to main content</a></div>
  <HeroHeader
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_Advice_Support.jpg"
    title="York SU Advice & Support"
  />
  <div id="maincontent" class="container mx-auto py-20">
    <div class="flex flex-col">
      <h2 class="text-3xl font-bold">Advice & Support staff</h2>
      <AdviceHeadshots />
    </div>
  </div>
  <Footer />
</template>

<script>
import HeroHeader from "../../components/HeroHeader/heroheader.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import AdviceHeadshots from "../../components/advice-headshots/advice-headshots.ce.vue";
export default {
  name: "AdviceSupportPage",
  components: {
    HeroHeader,
    Footer,
    AdviceHeadshots,
  },
};
</script>
