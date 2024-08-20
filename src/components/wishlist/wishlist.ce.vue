<template>
  <main class="">
    <div class="flex flex-col gap-y-6">
      <div class="h-min w-full bg-gray-100 px-3 py-2">
        <h2 class="mb-0 text-3xl font-semibold">Activity Wishlist</h2>
      </div>
      <!-- If they do have registered interests -->
      <div v-if="activities[0]" class="a-z-wrap">
        <!-- for each registered interest -->
        <div
          v-for="activity in activities"
          :key="activity.id"
          class="tile mb-4 flex justify-center pb-2 lg:pb-3"
        >
          <div
            class="relative flex h-full w-full flex-col bg-white shadow transition md:max-w-[282px]"
          >
            <div class="flex aspect-square items-center justify-center">
              <img
                class="aspect-square bg-cover bg-center object-cover"
                :src="activity.image"
                alt=""
                loading="lazy"
              />
            </div>
            <div class="flex h-full flex-col justify-between gap-y-2 p-6">
              <h3
                v-if="activity.name"
                class="mb-2 line-clamp-3 font-semibold lg:text-lg"
              >
                {{ activity.name }}
              </h3>
              <div class="flex flex-col gap-y-2">
                <Button
                  title="Go to activity"
                  class="flex w-full justify-center text-center"
                  is-primary
                  :url="'/activities/view/' + activity.url_name"
                />
                <!-- Can we make this url go to their membership? -->
                <Button
                  title="Join activity"
                  class="flex w-full justify-center text-center"
                  is-primary
                  :url="'/shop?activity_id=' + activity.id"
                />
                <interestButton
                  :activity-id="activity.id"
                  @unregister="unregisterInterest()"
                  @register="registerInterest()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- if there are registered interests -->
      <div v-else class="flex flex-col gap-y-2 px-3">
        <h3 class="text-lg font-semibold">Nothing to show</h3>
        <p>You have not registered your interest in any activities.</p>
        <Button title="Find an activity" is-primary url="/societies" />
      </div>
    </div>
  </main>
</template>
<!-- eslint-disable vue/prop-name-casing -->
<script>
import Button from "../button/button.ce.vue";
import { randomImageUrl } from "../../_common/randomImage.mjs";
import axios from "../../_common/axios.mjs";
import interestButton from "../interest-button/interest-button.ce.vue";
export default {
  name: "Wishlist",
  components: {
    Button,
    interestButton,
  },
  props: {
    interestedIds: {
      type: Array,
      default: null,
    },
    interests: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      loading: true,
      Ids: {
        type: Array,
        value: null,
      },
      activities: {
        type: Array,
        value: null,
      },
    };
  },
  created() {
    this.getActivities();
  },
  methods: {
    randomImage(section) {
      return randomImageUrl(section);
    },
    async getActivities() {
      let self = this;
      self.Loading = true;
      self.items = [];
      if (this.interestedIds.length === 0) {
        await axios
          .get("https://yorksu.org/wishlist/wishlist-api")
          .then((response) => {
            let jsonData = {};
            try {
              var cleanedData = response.data.replace(/,\s*]/, "]");
              jsonData = JSON.parse(cleanedData);
            } catch {
              var jsonString = JSON.stringify(response.data);
              var errorCleaned = jsonString.replace(/,\s*]/, "]");
              jsonData = JSON.parse(errorCleaned);
            }
            this.Ids = jsonData;
          });
      } else {
        this.Ids = this.interestedIds;
      }
      let activityIds = this.Ids;
      if (activityIds.length === 0) {
        self.Loading = false;
        return;
      }
      let interestedActivities = [];
      let activity = {};
      for (const id of activityIds) {
        await axios
          .get(
            `https://pluto.sums.su/api/groups/` + id.interested_activity_id,
            {
              headers: {
                "X-Site-Id": self.siteid,
              },
            },
          )
          .then((response) => {
            activity = {};
            activity.image =
              response.data.thumbnail_url != ""
                ? response.data.thumbnail_url
                : randomImageUrl("student-life");
            activity.url_name = response.data.url_name;
            activity.name = response.data.name;
            activity.id = response.data.id;
            interestedActivities.push(activity);
          })
          .catch((error) => {
            console.error(error);
          });
      }
      self.activities = interestedActivities;
      console.log(self.activities);
      self.Loading = false;
    },
    unregisterInterest(activity_id) {
      const activity = this.activities.indexOf(activity_id);
      this.activities.splice(activity, 1);
    },
    registerInterest() {
      this.getActivities();
    },
  },
};
</script>
