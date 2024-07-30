<template>
  <Navbar />
  <ActivitiesViewPage :activityid="activityid" />
  <Footer />
</template>
<script>
import Navbar from "../../components/Navbar/navbar.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import ActivitiesViewPage from "../../components/activities-view-page/activities-view-page.ce.vue";
export default {
  props: {
    activityid: {
      type: Number,
      default: null,
    },
  },
  components: {
    Navbar,
    Footer,
    ActivitiesViewPage,
  },
};
</script>
