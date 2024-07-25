<template>
  <HeroHeader
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_General.jpg"
    :title="title"
  />
  <div id="maincontent" class="container mx-auto flex flex-col pb-20">
    <!-- Section links would go here -->
    <VenuePage
      :additional_page_content="additional_page_content"
      :page_class="page_class"
      :title="title"
      :page_content="page_content"
      :page_key_image="page_key_image"
    >
    </VenuePage>
  </div>
  <Footer />
</template>
<!-- eslint-disable vue/prop-name-casing -->
<script>
import HeroHeader from "../../components/HeroHeader/heroheader.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import VenuePage from "../../components/venue-page/venue-page.ce.vue";
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
    VenuePage,
  },
};
</script>
