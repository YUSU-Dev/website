<template>
  <Navbar />
  <Carousel v-if="homepage" />
  <HeroBanner v-else :title="title" :image="image" />
  <Breadcrumb v-if="!homepage" />
</template>
<script>
import Navbar from "../Navbar/navbar.ce.vue";
import HeroBanner from "../HeroBanner/herobanner.ce.vue";
import Breadcrumb from "../breadcrumb/breadcrumb.ce.vue";
import Carousel from "../Carousel/carousel.ce.vue";
export default {
  props: {
    homepage: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
  },
  components: {
    Navbar,
    HeroBanner,
    Breadcrumb,
    Carousel,
  },
  data() {
    return {};
  },
  methods: {
    wrapURL(URL) {
      return "'" + URL + "'";
    },
  },
};
</script>
