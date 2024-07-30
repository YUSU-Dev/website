<template>
  <ActivitiesHeroBanner
    :group="Activity.name"
    :id="Activity.id"
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_General.jpg"
    :logo="Activity.thumbnail_url"
    :category="Activity.category"
  />
  <ActivityBreadcrumb
    v-if="!loading"
    :category-name="Activity.category"
    :category-id="Activity.activity_category_id"
    :group-name="Activity.name"
    :group-url="Activity.url_name"
  />
  <div class="container mx-auto pb-20">
    <ActivityPage :group-id="activityid" />
  </div>
</template>
<script>
import ActivitiesHeroBanner from "../../components/ActivitiesHeroBanner/activitiesherobanner.ce.vue";
import ActivityBreadcrumb from "../../components/activity-breadcrumb/activity-breadcrumb.ce.vue";
import ActivityPage from "../../components/activity-page/activity-page.ce.vue";
import axios from "../../_common/axios.mjs";
export default {
  props: {
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
    ActivitiesHeroBanner,
    ActivityBreadcrumb,
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
          self.Activity.category = response2.data.find(
            (item) => item.id === self.Activity.activity_category_id,
          ).name;
          self.loading = false;
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
