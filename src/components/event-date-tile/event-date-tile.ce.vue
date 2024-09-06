<template>
  <div class="tile mb-4 flex justify-center pb-2 lg:pb-3">
    <div
      class="relative flex h-full w-full flex-col bg-white shadow transition md:max-w-[282px]"
    >
      <Loading :loading="loading" text class="w-full" />
      <div
        v-if="!loading"
        class="flex h-full flex-col items-center justify-between gap-y-4 p-6"
      >
        <h3
          v-if="event.event_date_title"
          class="line-clamp-3 w-full text-center text-xl font-semibold"
        >
          {{ event.event_date_title }}
        </h3>
        <div class="flex w-full flex-col gap-y-1 text-center">
          <p class="w-full" v-if="event.venue">{{ event.venue.name }}</p>
          <p class="w-full">Start times from {{ time }}</p>
          <p class="w-full">{{ date }} {{ month }} {{ year }}</p>
        </div>
        <div
          v-if="event.has_products"
          class="order-3 flex w-full items-center justify-center xxs:col-span-2 sm:col-span-1"
        >
          <Button
            class="h-min w-full"
            :is-primary="true"
            title="Tickets"
            :href="'/events/products/' + event.id"
          />
        </div>
        <div
          v-if="event.external_tickets != ''"
          class="order-3 flex w-full items-center justify-center xxs:col-span-2 sm:col-span-1"
        >
          <Button
            class="h-min w-full"
            :is-primary="true"
            title="Find Tickets"
            :href="event.external_tickets"
            target="_blank"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable vue/prop-name-casing -->
<script>
import Button from "../../components/button/button.ce.vue";
import Loading from "../../components/loading/loading.ce.vue";
import axios from "../../_common/axios.mjs";
export default {
  name: "EventDateTile",
  props: {
    date_id: { type: String, default: "" },
  },
  data() {
    return {
      dateId: { type: String, default: "" },
      event: { type: Object, default: null },
      loading: true,
    };
  },
  components: {
    Button,
    Loading,
  },
  created() {
    this.dateId = this.date_id;
    this.getEvent();
  },
  methods: {
    getEvent: function () {
      let self = this;
      self.loading = true;
      axios
        .get("https://pluto.sums.su/api/events/" + this.dateId)
        .then((response) => {
          self.event = response.data;
          self.event.start_date = new Date(self.event.start_date);
          self.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    date() {
      if (this.event && this.event.start_date) {
        return this.event.start_date.getDate();
      }
      return "";
    },
    month() {
      if (this.event && this.event.start_date) {
        return this.event.start_date.toLocaleString("default", {
          month: "long",
        });
      }
      return "";
    },
    year() {
      if (this.event && this.event.start_date) {
        return this.event.start_date.getFullYear();
      }
      return "";
    },
    time() {
      if (this.event && this.event.start_date) {
        return this.event.start_date.toLocaleString("default", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
      }
      return "";
    },
  },
};
</script>
