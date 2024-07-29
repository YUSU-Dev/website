<template>
  <main>
    <div class="flex flex-col gap-x-20 gap-y-12 sm:flex-row">
      <div class="flex flex-grow flex-col gap-y-6">
        <div class="flex gap-x-4 sm:hidden">
          <!-- {if category_name != "College Sport (Groups)"} -->
          <Button
            v-if="isActivity"
            :class="{ 'bg-light-blue': title == 'join' }"
            title="Join"
            is-student-life
            class="px-10 text-center"
            :url="'/shop?activity_id=' + pageActivity.id"
          />
          <Button
            v-if="isAdoptable"
            :class="{ 'bg-light-blue': title == 'join' }"
            title="How to Adopt"
            is-student-life
            class="px-10 text-center"
            url="/adopt-an-activity"
          />
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
        <div v-if="pageActivity.description" class="flex flex-col">
          <h2 class="mb-5 text-3xl font-bold">About</h2>
          <article v-html="pageActivity.description"></article>
        </div>
        <div v-else class="flex flex-col gap-y-6">
          <div class="flex flex-col">
            <h3 class="text-xl font-semibold">Meeting times</h3>
            <p>Please get in touch via email to find out our meeting times.</p>
          </div>
          <div class="flex flex-col">
            <h3 class="text-xl font-semibold">Get Involved</h3>
            <p>
              We are open to all students, and encourage those from all
              backgrounds to come along!
            </p>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-y-8">
        <div class="hidden flex-col gap-y-4 sm:flex">
          <Button
            v-if="isActivity"
            :class="{ 'bg-light-blue': title == 'join' }"
            title="Join"
            is-student-life
            class="px-10 text-center"
            :url="'/shop?activity_id=' + pageActivity.id"
          />
          <Button
            v-if="isAdoptable"
            :class="{ 'bg-light-blue': title == 'join' }"
            title="How to Adopt"
            is-student-life
            class="px-10 text-center"
            url="/adopt-an-activity"
          />
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
      <Activities
        v-if="subgroupCategoryId"
        :selectedcategory="subgroupCategoryId"
        :title="subgroupCategoryName"
      />
    </div>
  </main>
</template>
<script>
import Button from "../../components/button/button.ce.vue";
import Events from "../../components/Events/events.ce.vue";
import Shop from "../../components/shop/shop.ce.vue";
import Activities from "../../components/activities/activities.ce.vue";
import ActivitiesContacts from "../../components/ActivitiesContacts/activitiescontacts.ce.vue";
import axios from "../../_common/axios.mjs";

export default {
  props: {
    groupId: { type: String, default: null },
  },
  data() {
    return {
      pageActivity: {},
      subgroupCategoryId: null,
      subgroupCategoryName: null,
      isAdoptable: false,
      isAcademicRep: false,
      isActivity: true,
    };
  },
  components: {
    Button,
    ActivitiesContacts,
    Events,
    Shop,
    Activities,
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
          this.isAdoptable = this.pageActivity.activity_category_id == 26;
          this.isAcademicRep = [40, 41, 42, 43, 44].includes(
            this.pageActivity.activity_category_id,
          );
          this.isActivity = !this.isAdoptable && !this.isAcademicRep;
        }),
      );
    this.getSubgroupCategoryId();
  },
  methods: {
    wrapURL(URL) {
      return "'" + URL + "'";
    },
    getSubgroupCategoryId() {
      if (this.groupId == "267") {
        this.subgroupCategoryId = 31;
        this.subgroupCategoryName = "Alcuin College Sports";
      } else if (this.groupId == "269") {
        this.subgroupCategoryId = 30;
        this.subgroupCategoryName = "James College Sports";
      } else if (this.groupId == "309") {
        this.subgroupCategoryId = 32;
        this.subgroupCategoryName = "Vanbrugh College Sports";
      } else if (this.groupId == "320") {
        this.subgroupCategoryId = 33;
        this.subgroupCategoryName = "Constantine College Sports";
      } else if (this.groupId == "395") {
        this.subgroupCategoryId = 34;
        this.subgroupCategoryName = "Derwent College Sports";
      } else if (this.groupId == "396") {
        this.subgroupCategoryId = 35;
        this.subgroupCategoryName = "Goodricke College Sports";
      } else if (this.groupId == "397") {
        this.subgroupCategoryId = 36;
        this.subgroupCategoryName = "Halifax College Sports";
      } else if (this.groupId == "553") {
        this.subgroupCategoryId = 30;
        this.subgroupCategoryName = "Anne Lister & David Kato College Sports";
      } else if (this.groupId == "398") {
        this.subgroupCategoryId = 37;
        this.subgroupCategoryName = "Langwith College Sports";
      }
    },
  },
};
</script>
