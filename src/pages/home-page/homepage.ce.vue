<template>
  <div id="skiptocontent"><a href="#maincontent">skip to main content</a></div>
  <HeroHeader :homepage="true" />
  <div
    id="maincontent"
    class="min-h-mvh container mx-auto flex flex-col items-center justify-center py-20"
  >
    <div class="flex justify-center text-center">
      <h2 class="pb-16 text-3xl font-bold">How can we help today?</h2>
    </div>
    <QuickLinks />
  </div>
  <div class="bg-beige">
    <div class="container mx-auto py-20">
      <News :embedded="true" :homepage="true" />
    </div>
  </div>
  <div class="container mx-auto py-20">
    <Sabbs />
  </div>
  <div class="bg-beige">
    <div class="container mx-auto bg-beige py-20">
      <Adverts />
    </div>
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
  props: {
    title: { type: String, default: "" },
    componenttitle: { type: String, default: "" },
    selectedparents: { type: String, default: "" },
  },
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
