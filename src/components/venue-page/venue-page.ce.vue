<template>
  <div class="flex justify-center">
    <img :src="page_key_image" :alt="title + ' logo'" />
  </div>
  <main>
    <article v-html="page_content"></article>
  </main>
  <VenueMenu :title="title" />
  <Events :venueid="page_class" title="Events" icon class="" />
  <article v-html="additional_page_content"></article>
</template>
<!-- eslint-disable vue/prop-name-casing -->
<script>
import Events from "../../components/Events/events.ce.vue";
import VenueMenu from "../../components/venue-menu/venue-menu.ce.vue";

export default {
  name: "VenuePage",
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
    Events,
    VenueMenu,
  },
};
</script>
