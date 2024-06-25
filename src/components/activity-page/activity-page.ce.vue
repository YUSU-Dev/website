<template>
  <main>
    <div class="flex flex-wrap md:flex-row">
      <div class="w-1/12"><br /></div>
      <div class="p-6 md:w-7/12">
        <h2 class="mb-5 text-3xl font-bold">About</h2>
        <article v-html="activity.description"></article>
      </div>
      <div class="flex flex-col p-6 md:w-3/12">
        <a :href="'/shop?activity_id=' + activity.id"
          ><Button
            :class="{ 'bg-light-blue': title == 'join' }"
            title="Join"
            is-student-life="True"
            class="px-10 text-center"
        /></a>
        <hr class="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700" />
        <h2 class="mb-5 text-3xl font-bold">Contact</h2>
        <ActivitiesContacts
          :name="activity.name"
          :email="activity.email_address"
          :facebook="activity.facebook"
          :instagram="activity.instagram"
          :twitter="activity.twitter"
          :youtube="activity.youtube"
          :discord="activity.discord"
          :tiktok="activity.tiktok"
        />
      </div>
    </div>
  </main>
</template>
<script>
import Button from "../../components/button/button.ce.vue";
import ActivitiesContacts from "../../components/ActivitiesContacts/activitiescontacts.ce.vue";
export default {
  props: {
    activity: {
      type: Object,
      default: null,
    },
  },
  components: {
    Button,
    ActivitiesContacts,
  },
};
</script>
