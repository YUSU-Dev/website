<template>
  <EventsIdHeroBanner
    :title="eventDate.event_date_title"
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_General.jpg"
    :event-thumbnail="eventDate.thumbnail_url"
  />
  <div
    class="container mx-auto flex flex-col items-center justify-center pt-20 pb-10"
  >
    <Loading text :loading="loading" class="w-full" />
    <div v-if="!loading" class="grid w-full grid-cols-5 gap-x-4">
      <div
        class="order-2 col-span-5 flex flex-col gap-y-6 border-black md:order-1 md:col-span-4 md:border-r md:pr-6"
      >
        <div class="flex flex-col gap-y-4 border-b border-black pb-6">
          <h2 class="text-3xl font-bold">
            {{ eventDate.event_date_title }} - {{ startDate }}
          </h2>
          <div
            v-if="eventDate.description"
            v-html="eventDate.description"
          ></div>
        </div>
      </div>
      <div
        class="order-1 col-span-5 mb-5 flex flex-col gap-y-4 md:order-2 md:col-span-1 md:mb-0"
      >
        <Button
          arrow
          is-primary
          title="Back to event"
          :href="'/events/id/' + eventDate.event_id + '-' + eventDate.url_name"
          class=""
        />
        <div v-if="eventDate.has_products" class="flex flex-col">
          <h2 class="mb-4 border-b border-black pb-4 text-2xl font-bold">
            Important
          </h2>
          <div>
            <ul class="flex list-inside list-disc flex-col gap-y-1">
              <li class="text-sm">
                Your selected tickets will not be reserved until the next step.
              </li>
              <li class="text-sm">
                You will be required to provide identification on entry to the
                venue.
              </li>
              <li class="text-sm">
                Event tickets are non-refundable and non-transferable.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable vue/prop-name-casing -->
<script>
import Button from "../../components/button/button.ce.vue";
import EventsIdHeroBanner from "../../components/events-id-herobanner/events-id-herobanner.ce.vue";
import Loading from "../../components/loading/loading.ce.vue";
import axios from "../../_common/axios.mjs";
export default {
  props: {
    date_id: { type: String, default: "" },
  },
  components: {
    Button,
    EventsIdHeroBanner,
    Loading,
  },
  data() {
    return {
      eventDate: {},
      Loading: true,
    };
  },
  created() {
    this.getEventDate();
    console.log(this.eventDate);
  },
  methods: {
    async getEventDate() {
      var self = this;
      this.loading = true;
      await axios
        .get("https://pluto.sums.su/api/events/" + self.date_id, {
          headers: {
            "X-Site-Id": self.siteid,
          },
        })
        .then(function (response) {
          self.eventDate = response.data;
          self.loading = false;
        });
    },
  },
  computed: {
    startDate() {
      return new Date(this.eventDate.start_date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    },
  },
};
</script>
