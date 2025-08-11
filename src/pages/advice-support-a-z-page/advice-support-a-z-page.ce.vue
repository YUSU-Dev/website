<template>
  <div id="skiptocontent"><a href="#maincontent">skip to main content</a></div>
  <HeroHeader
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_Advice_Support.jpg"
    title="York SU Advice & Support"
  />
  <div id="maincontent" class="container mx-auto py-20">
    <div class="body-style flex flex-col gap-y-10">
      <div class="flex flex-col">
        <AdviceAZ :apiurl="apiurl" />
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import HeroHeader from "../../components/HeroHeader/heroheader.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import AdviceAZ from "../../components/advice-a-z/advice-a-z.ce.vue";
export default {
  name: "AdviceSupportAZPage",
  components: {
    HeroHeader,
    Footer,
    AdviceAZ,
  },
  data() {
    return {
      apiurl: "https://yorksu.org/advice-support/support-api-test",
    };
  },
};
</script>
