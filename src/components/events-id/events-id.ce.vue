<template>
  <HeroBanner
    :title="event_name"
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_General.jpg"
  />
  <div
    class="container mx-auto flex flex-col items-center justify-center pt-20"
  >
    <div class="grid grid-cols-5 gap-x-4">
      <div
        class="order-2 col-span-5 flex flex-col gap-y-6 border-black md:order-1 md:col-span-4 md:border-r md:pr-6"
      >
        <div class="flex flex-col gap-y-4 border-b border-black pb-6">
          <h2 class="text-3xl font-bold">
            {{ event_name }}
            <span v-if="activity_name"> : {{ activity_name }}</span>
          </h2>
          <div v-if="event_description">
            <p>{{ event_description }}</p>
          </div>
        </div>
      </div>
      <div
        class="order-1 col-span-5 mb-5 flex flex-col gap-y-4 md:order-2 md:col-span-1 md:mb-0"
      >
        <Button
          :arrow="true"
          :isPrimary="true"
          title="Back to events"
          href="/events"
          class=""
        />
        <div v-if="u_next_on" class="flex flex-col">
          <h2 class="mb-4 border-b border-black pb-4 text-2xl font-bold">
            Next On
          </h2>
          <p class="text-xl font-semibold">{{ date }} {{ month }} {{ year }}</p>
          <p class="text-lg">{{ time }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Button from "../../components/button/button.ce.vue";
import HeroBanner from "../../components/HeroBanner/herobanner.ce.vue";
export default {
  props: {
    event_id: { type: String, default: "" },
    event_name: { type: String, default: "" },
    event_description: { type: String, default: "" },
    event_url: { type: String, default: "" },
    event_thumbnail: { type: String, default: "" },
    event_image: { type: String, default: "" },
    age_restriction: { type: String, default: "" },
    activity_name: { type: String, default: "" },
    next_on: { type: String, default: "" },
    u_next_on: { type: String, default: "" },
    u_next_on_all_day: { type: Boolean, default: false },
  },
  components: {
    Button,
    HeroBanner,
  },
  data() {
    return {};
  },
  computed: {
    date() {
      return new Date(this.u_next_on * 1000).getDate();
    },
    month() {
      return new Date(this.u_next_on * 1000).toLocaleString("default", {
        month: "long",
      });
    },
    year() {
      return new Date(this.u_next_on * 1000).getFullYear();
    },
    time() {
      return new Date(this.u_next_on * 1000).toLocaleString("default", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    },
  },
};
</script>
