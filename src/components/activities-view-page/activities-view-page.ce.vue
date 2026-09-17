<template>
  <ActivitiesHeroBanner
    :group="group_name || Activity.name"
    :id="activityid"
    image="https://assets-cdn.sums.digital/YU/website/img/Banners/1500x400_Web_Banners_General.jpg"
    :logo="thumbnail_url || Activity.thumbnail_url"
    :category="category_name || Activity.category"
    :constitution="constitution"
  />
  <ActivityBreadcrumb
    v-if="!loading"
    :category-name="Activity.category"
    :category-id="Activity.activity_category_id"
    :group-name="Activity.name"
    :group-url="Activity.url_name"
  />
  <div v-if="loading" class="container mx-auto min-h-[700px]"></div>
  <div v-else class="container mx-auto">
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
    constitution: {
      type: String,
      default: null,
    },
    group_name: {
      type: String,
      default: null,
    },
    category_name: {
      type: String,
      default: null,
    },
    thumbnail_url: {
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
        axios.get("https://pluto.sums.digital/api/groups/" + self.activityid, {
          headers: {
            "X-Site-Id": self.siteid,
          },
        }),
        axios.get("https://pluto.sums.digital/api/groups/categories", {
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
