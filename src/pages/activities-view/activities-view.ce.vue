<template>
  <Navbar />
  <ActivitiesHeroBanner
    :group="Activity.name"
    :id="Activity.id"
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_General.jpg"
    :logo="Activity.thumbnail_url"
    :category="Activity.category"
  />
  <Breadcrumb />
  <ActivityPage :activity="Activity" :group-id="activityid" />
  <Footer />
</template>
<script>
import Navbar from "../../components/Navbar/navbar.ce.vue";
import ActivitiesHeroBanner from "../../components/ActivitiesHeroBanner/activitiesherobanner.ce.vue";
import Breadcrumb from "../../components/breadcrumb/breadcrumb.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";

import ActivityPage from "../../components/activity-page/activity-page.ce.vue";
import axios from "../../_common/axios.mjs";
export default {
  props: {
    society: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    componenttitle: {
      type: String,
      default: null,
    },
    selectedparents: {
      type: String,
      default: null,
    },
    logo: {
      type: String,
      default: null,
    },
    activityid: {
      type: Number,
      default: null,
    },
    siteid: {
      type: String,
      default: null,
    },
  },
  components: {
    Navbar,
    ActivitiesHeroBanner,
    Breadcrumb,
    Footer,
    ActivityPage,
  },
  data() {
    return {
      Activity: {},
      loading: true,
    };
  },
  created() {
    var self = this;
    self.loading = true;
    axios
      .all([
        axios.get("https://pluto.sums.su/api/groups/" + self.activityid, {
          headers: {
            "X-Site-Id": self.siteid,
          },
        }),
        axios.get("https://pluto.sums.su/api/groups/categories", {
          headers: {
            "X-Site-Id": self.siteid,
          },
        }),
      ])
      .then(
        axios.spread((response1, response2) => {
          self.Activity = response1.data;
          self.loading = false;
          self.Activity.category = response2.data.find(
            (item) => item.id === self.Activity.activity_category_id,
          ).name;
        }),
      );
  },
  methods: {
    wrapURL(URL) {
      return "'" + URL + "'";
    },
  },
};
</script>
