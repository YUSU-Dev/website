<template>
  <HeroHeader
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_General.jpg"
    :title="title"
  />
  <div id="maincontent" class="container mx-auto flex flex-col pb-20">
    <!-- Section links would go here -->
    <div class="mb-10 flex justify-center">
      <img :src="page_key_image" :alt="title + ' logo'" />
    </div>
    <main>
      <article v-html="page_content"></article>
    </main>
    <Events :venueid="page_class" title="Events" icon class="" />
    <article v-html="additional_page_content"></article>
  </div>
  <Footer />
</template>
<!-- eslint-disable vue/prop-name-casing -->
<script>
import HeroHeader from "../../components/HeroHeader/heroheader.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import Events from "../../components/Events/events.ce.vue";
export default {
  name: "Venues",
  props: {
    title: {
      type: String,
      default: "",
    },
    page_key_image: {
      type: String,
      default: "",
    },
    page_content: {
      type: String,
      default: "",
    },
    page_class: {
      type: String,
      default: "",
    },
    additional_page_content: {
      type: String,
      default: "",
    },
  },
  components: {
    HeroHeader,
    Footer,
    Events,
  },
};
</script>
