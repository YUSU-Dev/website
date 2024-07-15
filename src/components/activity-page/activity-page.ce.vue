<template>
  <main>
    <div class="flex flex-col gap-x-20 gap-y-12 sm:flex-row">
      <div class="flex flex-col gap-y-6">
        <div class="flex gap-x-4 sm:hidden">
          <!-- {if category_name != "College Sport (Groups)"} -->
          <a :href="'/shop?activity_id=' + pageActivity.id"
            ><Button
              :class="{ 'bg-light-blue': title == 'join' }"
              title="Join"
              is-student-life
              class="px-10 text-center"
          /></a>
          <!-- {exp:su_activities:getGroupInterest activity_id="{activity_id}"}
          {if signed_in}
          {if is_interested}
          <a href=""
            ><Button
              @click="unregisterInterest()"
              :class="{ 'bg-light-blue': title == 'join' }"
              title="Interested?"
              is-student-life
              class="px-10 text-center"
          /></a>
          {if:else}
          <a href=""
            ><Button
              @click="registerInterest()"
              :class="{ 'bg-light-blue': title == 'join' }"
              title="Interested?"
              is-student-life
              class="px-10 text-center"
          /></a>
          {/if}
          {/if}
          {/exp:su_activities:getGroupInterest} {/if}
          {/if} -->
        </div>
        <div class="flex flex-col">
          <h2 class="mb-5 text-3xl font-bold">About</h2>
          <article v-html="pageActivity.description"></article>
        </div>
      </div>
      <div class="flex flex-col gap-y-8">
        <div class="hidden flex-col gap-y-4 sm:flex">
          <a :href="'/shop?activity_id=' + pageActivity.id"
            ><Button
              :class="{ 'bg-light-blue': title == 'join' }"
              title="Join"
              is-student-life
              class="px-10 text-center"
          /></a>
          <!-- <a href=""
            ><Button
              :class="{ 'bg-light-blue': title == 'join' }"
              title="Interested?"
              is-student-life
              class="px-10 text-center"
          /></a> -->
        </div>
        <div class="flex flex-col">
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
    </div>
    <div class="flex flex-col">
      <Events :groupid="groupId" title="Events" icon />
      <Shop :selectedgroup="groupId" hidefilter icon title="Products" />
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
