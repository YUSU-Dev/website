<template>
  <div class="flex w-full flex-col">
    <h2 class="pb-4 text-2xl font-bold" v-if="pages[0]">Group Pages</h2>
    <div class="flex w-full flex-col gap-4">
      <Button
        v-for="page in pages"
        :key="page.id"
        :title="page.title"
        class="btn-student-life w-full px-4 text-center"
        :class="{ 'btn-student-life-active': page.url_title == selectedUrl }"
        :url="'/activities/page/' + page.activity_id + '/' + page.url_title"
      />
    </div>
  </div>
</template>
<script>
import axios from "../../_common/axios.mjs";
import Button from "../button/button.ce.vue";
export default {
  name: "GroupPagesList",
  props: {
    groupId: { type: String, default: null },
    groupUrl: { type: String, default: "" },
    selectedUrl: { type: String, default: "" },
  },
  components: {
    Button,
  },
  data() {
    return {
      pages: {},
    };
  },
  created() {
    var self = this;
    axios
      .get(
        "https://pluto.sums.su/api/groups/" + self.groupId + "/pages?all=1",
        {
          headers: {
            "X-Site-Id": self.siteid,
          },
        },
      )
      .then((response) => {
        self.pages = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
