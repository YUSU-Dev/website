<template>
  <div id="skiptocontent"><a href="#maincontent">skip to main content</a></div>
  <HeroHeader
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_Student_Life.jpg"
    title="News"
  />
  <div
    id="maincontent"
    class="container mx-auto flex flex-col items-center justify-center py-20"
  >
    <News />
  </div>
  <Footer />
</template>
<script>
import HeroHeader from "../../components/HeroHeader/heroheader.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import News from "../../components/news/news.ce.vue";
export default {
  props: ["title", "componenttitle", "selectedparents"],
  components: {
    HeroHeader,
    Footer,
    News,
  },
  methods: {},
};
</script>
