<template>
  <div id="skiptocontent"><a href="#maincontent">skip to main content</a></div>
  <Navbar />
  <EventsId />
  <Footer />
</template>
<script>
import Navbar from "../../components/Navbar/navbar.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import EventsId from "../../components/events-id/events-id.ce.vue";
export default {
  props: {},
  components: {
    Navbar,
    Footer,
    EventsId,
  },
  methods: {},
};
</script>
