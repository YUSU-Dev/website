<template>
  <Navbar />
  <ActivitiesHeroBanner
    :society="Activity.name"
    :id="Activity.id"
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_General.jpg"
    :logo="Activity.thumbnail_url"
    :category="Activity.category"
  />
  <Breadcrumb />
  <div class="flex flex-wrap md:flex-row">
    <div class="w-1/12"><br /></div>
    <div class="p-6 md:w-7/12">
      <h2 class="mb-5 mt-10 text-3xl font-bold">About</h2>
      <span v-html="Activity.description"></span>
    </div>
    <div class="flex flex-col p-6 md:w-3/12">
      <a :href="'/shop?activity_id=' + Activity.id"
        ><Button
          :class="{ 'bg-light-blue': title == 'join' }"
          title="Join"
          is-student-life="True"
          class="px-10 text-center"
      /></a>
      <hr class="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700" />
      <h2 class="mb-5 text-3xl font-bold">Contact</h2>
      <ActivitiesContacts
        :name="Activity.name"
        :email="Activity.email_address"
        :facebook="Activity.facebook"
        :instagram="Activity.instagram"
        :twitter="Activity.twitter"
        :youtube="Activity.youtube"
        :discord="Activity.discord"
        :tiktok="Activity.tiktok"
      />
    </div>
  </div>
  <Footer />
</template>
<script>
import Navbar from "../../components/Navbar/navbar.ce.vue";
import ActivitiesHeroBanner from "../../components/ActivitiesHeroBanner/activitiesherobanner.ce.vue";
import Breadcrumb from "../../components/breadcrumb/breadcrumb.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import Button from "../../components/button/button.ce.vue";
import ActivitiesContacts from "../../components/ActivitiesContacts/activitiescontacts.ce.vue";
import axios from "../../_common/axios.mjs";
import { Controls } from "@storybook/blocks";
export default {
  props: [
    "society",
    "image",
    "componenttitle",
    "selectedparents",
    "logo",
    "activityid",
    "siteid",
  ],
  components: {
    Navbar,
    ActivitiesHeroBanner,
    Breadcrumb,
    Footer,
    Button,
    ActivitiesContacts,
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
