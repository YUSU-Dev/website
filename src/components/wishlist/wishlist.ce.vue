<template>
  <main class="container mx-auto">
    <div class="flex flex-col gap-y-6">
      <div class="h-min w-full bg-gray-100 px-3 py-2">
        <h2 class="mb-0 text-3xl font-semibold">Activity Wishlist</h2>
      </div>
      <!-- If they do have registered interests -->
      <div v-if="interests" class="a-z-wrap">
        <!-- for each registered interest -->
        <div
          v-for="activity in interests"
          :key="activity.activity_name"
          class="tile mb-4 flex justify-center pb-2 lg:pb-3"
        >
          <div
            class="relative h-full w-full bg-white shadow transition md:max-w-[282px]"
          >
            <div
              v-if="activity.thumbnail_url"
              class="flex aspect-square items-center justify-center"
            >
              <img
                class="aspect-square bg-cover bg-center object-cover"
                :src="activity.thumbnail_url"
                alt=""
                loading="lazy"
              />
            </div>
            <div v-else class="flex aspect-square items-center justify-center">
              <img
                class="aspect-square bg-cover bg-center"
                :src="randomImage(activity.section)"
                alt=""
                loading="lazy"
              />
            </div>
            <div class="flex h-full flex-col justify-between p-6">
              <div class="flex flex-col gap-y-2">
                <h3
                  v-if="activity.activity_name"
                  class="mb-2 line-clamp-3 font-semibold lg:text-lg"
                >
                  {{ activity.activity_name }}
                </h3>
                <Button
                  title="Go to activity"
                  class="flex w-full justify-center text-center"
                  isPrimary
                  :url="activity.url_name"
                />
                <!-- Can we make this url go to their membership? -->
                <Button
                  title="Join activity"
                  class="flex w-full justify-center text-center"
                  isPrimary
                  :url="activity.url_name"
                />
                <Button
                  title="Unregister interest"
                  class="flex w-full justify-center text-center"
                  isPrimary
                  @click="unregisterInterest(activity_id)"
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
        <Button title="Find an activity" isPrimary url="/sport" />
      </div>
    </div>
  </main>
</template>
<!-- eslint-disable vue/prop-name-casing -->
<script>
import Button from "../button/button.ce.vue";
import { randomImageUrl } from "../../_common/randomImage.mjs";
export default {
  name: "Wishlist",
  components: {
    Button,
  },
  props: {
    interests: {
      type: Array,
      default: null,
    },
  },
  methods: {
    randomImage(section) {
      return randomImageUrl(section);
    },
    //   unregisterInterest(activity_id) {
    //   $.ajax({
    //     url: "/activities/api",
    //     type: "post",
    //     data: {
    //       method: "unregister-group-interest",
    //       activity_id: {activity_id}
    //     },
    //     success: function (data) {
    //       location.reload();
    //     },
    //     error: function (error) {
    //       console.log(error);
    //     },
    //   });
    // }
  },
};
</script>
