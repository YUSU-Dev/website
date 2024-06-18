<template>
  <HeroHeader
    :homepage="true"
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_Student_Life.jpg"
  />
  <div class="py-20">
    <QuickLinks />
  </div>
  <div class="bg-beige py-20">
    <News embedded="true" />
  </div>
  <div class="py-20">
    <Sabbs />
  </div>
  <div class="bg-beige py-20">
    <Adverts />
  </div>
  <Footer />
</template>
<script>
import HeroHeader from "../../components/HeroHeader/heroheader.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import QuickLinks from "../../components/quickLinks/quickLinks.ce.vue";
import News from "../../components/news/news.ce.vue";
import Sabbs from "../../components/Sabbs/sabbs.ce.vue";
import Adverts from "../../components/Adverts/adverts.ce.vue";
export default {
  props: ["title", "componenttitle", "selectedparents"],
  components: {
    HeroHeader,
    Footer,
    QuickLinks,
    News,
    Sabbs,
    Adverts,
  },
  methods: {},
};
</script>
