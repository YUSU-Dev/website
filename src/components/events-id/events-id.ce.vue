<template>
  <HeroBanner
    :title="event_name"
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_General.jpg"
  />
  <div
    class="container mx-auto flex flex-col items-center justify-center pb-10 pt-20"
  >
    <div class="grid w-full grid-cols-5 gap-x-4">
      <div
        class="order-2 col-span-5 flex flex-col gap-y-6 border-black md:order-1 md:col-span-4 md:border-r md:pr-6"
      >
        <div class="flex flex-col gap-y-4 border-b border-black pb-6">
          <h2 class="text-3xl font-bold">
            {{ event_name }}
            <span v-if="activity_name"> : {{ activity_name }}</span>
          </h2>
          <main class="body-style">
            <article class="body-style">
              <slot></slot>
            </article>
          </main>
        </div>
      </div>
      <div
        class="order-1 col-span-5 mb-5 flex flex-col gap-y-4 md:order-2 md:col-span-1 md:mb-0"
      >
        <Button
          arrow
          is-primary
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
          <div v-if="accessibilityOptions">
            <h2 class="my-4 border-b border-black pb-4 text-2xl font-bold">
              Accessibility Information
            </h2>
            <div
              class="mt-2"
              v-for="option in accessibilityOptions"
              :key="option.name"
            >
              <h3 class="text-xl">
                {{ option.name }}
              </h3>
              <p>{{ option.information }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable vue/prop-name-casing -->
<script>
import Button from "../../components/button/button.ce.vue";
import HeroBanner from "../../components/HeroBanner/herobanner.ce.vue";
import axios from "../../_common/axios.mjs";

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
    date_id: { type: String, default: "" },
    date_start: { type: String, default: "" },
    u_start_date: { type: String, default: "" },
    u_end_date: { type: String, default: "" },
    u_all_day: { type: Boolean, default: false },
    date_name: { type: String, default: "" },
    date_venue: { type: String, default: "" },
    date_unix: { type: String, default: "" },
    from_price: { type: String, default: "" },
    external_tickets: { type: Boolean, default: false },
    sale_start_date: { type: String, default: "" },
    sale_end_date: { type: String, default: "" },
    accessibility: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  components: {
    Button,
    HeroBanner,
  },
  data() {
    return {
      accessibilityOptions: [],
    };
  },
  mounted() {
    if (this.accessibility) {
      this.accessibilityOptions = this.accessibility.data;
    } else {
      this.accessibilityOptions = this.getAccessibility().data;
    }
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
  methods: {
    getAccessibility() {
      var self = this;
      axios
        .get("https://yorksu.org/api/accessibility/" + self.event_id)
        .then(function (response) {
          let jsonData = {};
          try {
            var cleanedData = response.data.replace(/,\s*]/, "]");
            jsonData = JSON.parse(cleanedData);
          } catch {
            var jsonString = JSON.stringify(response.data);
            var errorCleaned = jsonString.replace(/,\s*]/, "]");
            jsonData = JSON.parse(errorCleaned);
          }
          return jsonData.data;
        });
    },
  },
};
</script>
