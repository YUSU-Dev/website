<template>
  <main>
    <div class="flex flex-col gap-x-20 gap-y-12 md:flex-row">
      <div class="flex flex-grow flex-col gap-y-6">
        <div
          class="flex flex-col gap-x-4 gap-y-4 xxs:w-max xxs:flex-row md:hidden"
        >
          <!-- {if category_name != "College Sport (Groups)"} -->
          <Button
            v-if="isActivity"
            :class="{ 'bg-light-blue': title == 'join' }"
            title="Join"
            is-student-life
            class="w-full px-10 text-center xxs:w-min"
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
          <InterestButton v-if="!isAdoptable" :activity-id="groupId" />
        </div>
        <div
          class="flex flex-col gap-x-4 gap-y-4 xxs:w-max xxs:flex-row md:hidden"
        >
          <GroupPagesList
            :group-id="groupId"
            :group-url="pageActivity.url_name"
            :selected-url="pageDetails.url_title"
          />
        </div>
        <div class="flex flex-col">
          <h1 class="text-3xl font-bold">{{ pageDetails.title }}</h1>
          <article v-html="groupPage.content"></article>
        </div>
      </div>
      <div class="flex flex-col gap-y-8">
        <div class="hidden w-max flex-col gap-y-4 md:flex">
          <Button
            v-if="isActivity"
            :class="{ 'bg-light-blue': title == 'join' }"
            title="Join"
            is-student-life
            class="w-full px-10 text-center"
            :url="'/shop?activity_id=' + pageActivity.id"
          />
          <Button
            v-if="isAdoptable"
            :class="{ 'bg-light-blue': title == 'join' }"
            title="How to Adopt"
            is-student-life
            class="w-full px-10 text-center"
            url="/adopt-an-activity"
          />
          <InterestButton :activity-id="groupId" />
          <GroupPagesList
            :group-id="groupId"
            :group-url="pageActivity.url_name"
            :selected-url="pageDetails.url_title"
          />
        </div>
        <div class="flex flex-col">
          <h2 class="mb-5 text-3xl font-bold">Contact</h2>
          <ActivitiesContacts
            v-if="!loading"
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
  </main>
</template>
<script>
import Button from "../../components/button/button.ce.vue";
import ActivitiesContacts from "../../components/ActivitiesContacts/activitiescontacts.ce.vue";
import axios from "../../_common/axios.mjs";
import InterestButton from "../interest-button/interest-button.ce.vue";
import GroupPagesList from "../group-pages-list/group-pages-list.ce.vue";
export default {
  props: {
    groupId: { type: String, default: null },
    pageUrl: { type: String, default: null },
  },
  data() {
    return {
      pageActivity: {},
      groupPage: {},
      pageDetails: {},
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
    InterestButton,
    GroupPagesList,
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
        axios.get(
          "https://pluto.sums.su/api/groups/" +
            self.groupId +
            "/pages/" +
            self.pageUrl,
          {
            headers: {
              "X-Site-Id": self.siteid,
            },
          },
        ),
      ])
      .then(
        axios.spread((response1, response2, response3) => {
          self.pageActivity = response1.data;
          self.groupPage = response3.data;
          self.pageDetails = response3.data.page;
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
        this.subgroupCategoryId = "33,45";
        this.subgroupCategoryName = "Constantine College Sports";
      } else if (this.groupId == "395") {
        this.subgroupCategoryId = 34;
        this.subgroupCategoryName = "Derwent College Sports";
      } else if (this.groupId == "396") {
        this.subgroupCategoryId = "35,45";
        this.subgroupCategoryName = "Goodricke College Sports";
      } else if (this.groupId == "397") {
        this.subgroupCategoryId = 36;
        this.subgroupCategoryName = "Halifax College Sports";
      } else if (this.groupId == "553") {
        this.subgroupCategoryId = 38;
        this.subgroupCategoryName = "Anne Lister & David Kato College Sports";
      } else if (this.groupId == "398") {
        this.subgroupCategoryId = "37,45";
        this.subgroupCategoryName = "Langwith College Sports";
      }
    },
  },
};
</script>
