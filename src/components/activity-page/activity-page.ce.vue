<template>
  <main>
    <div class="flex flex-wrap md:flex-row">
      <div class="w-1/12"><br /></div>
      <div class="p-6 md:w-7/12">
        <h2 class="mb-5 text-3xl font-bold">About</h2>
        <article v-html="pageActivity.description"></article>
        <Events :groupid="groupId" title="Events" icon />
        <Shop :selectedgroup="groupId" hidefilter icon title="Products" />
      </div>
      <div class="flex flex-col p-6 md:w-3/12">
        <a :href="'/shop?activity_id=' + pageActivity.id"
          ><Button
            :class="{ 'bg-light-blue': title == 'join' }"
            title="Join"
            is-student-life
            class="px-10 text-center"
        /></a>
        <hr class="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700" />
        <h2 class="mb-5 text-3xl font-bold">Contact</h2>
        <ActivitiesContacts
          :name="pageActivity.name"
          :email="pageActivity.email_address"
          :facebook="pageActivity.facebook"
          :instagram="pageActivity.instagram"
          :twitter="pageActivity.twitter"
          :youtube="pageActivity.youtube"
          :discord="pageActivity.discord"
          :tiktok="pageActivity.tiktok"
        />
      </div>
    </div>
  </main>
</template>
<script>
import Button from "../../components/button/button.ce.vue";
import Events from "../../components/Events/events.ce.vue";
import Shop from "../../components/shop/shop.ce.vue";
import ActivitiesContacts from "../../components/ActivitiesContacts/activitiescontacts.ce.vue";
import axios from "../../_common/axios.mjs";

export default {
  props: {
    groupId: { type: String, default: null },
  },
  data() {
    return {
      pageActivity: {},
    };
  },
  components: {
    Button,
    ActivitiesContacts,
    Events,
    Shop,
  },
  created() {
    var self = this;
    self.loading = true;
    axios
      .all([
        axios.get("https://pluto.sums.su/api/groups/" + self.groupId, {
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
          self.pageActivity = response1.data;
          self.loading = false;
          self.pageActivity.category = response2.data.find(
            (item) => item.id === self.pageActivity.activity_category_id,
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
