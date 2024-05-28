<template>
  <Navbar />
  <HeroBanner :title="title" :image="image" />
  <Breadcrumb class="pt-4" />
</template>
<script>
import Navbar from "../Navbar/navbar.ce.vue";
import HeroBanner from "../HeroBanner/herobanner.ce.vue";
import Breadcrumb from "../breadcrumb/breadcrumb.ce.vue";
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
