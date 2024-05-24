<template>
  <Navbar />
  <HeroBanner :title="title" :image="image" />
  <HeroBanner :title="title" :image="image" />
  <HeroBanner :title="title" :image="image" />
  <HeroBanner :title="title" :image="image" />
  <Breadcrumb />
</template>
<script>
import Navbar from "../Navbar/navbar.vue";
import HeroBanner from "../HeroBanner/herobanner.vue";
import Breadcrumb from "../breadcrumb/breadcrumb.vue";
export default {
  props: ["title", "image"],
  components: {
    Navbar,
    HeroBanner,
    Breadcrumb,
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
