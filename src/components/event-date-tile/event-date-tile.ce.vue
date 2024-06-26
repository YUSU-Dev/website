<template>
  <div
    class="grid w-full grid-cols-1 justify-between gap-y-4 border-[0.5px] p-4 shadow xxs:grid-cols-4 sm:grid-cols-3 md:flex 3xl:grid-cols-1"
  >
    <div
      class="order-2 flex flex-col items-center justify-center text-center xxs:col-span-2 sm:order-1 sm:col-span-1"
    >
      <p class="text-4xl">{{ date }}</p>
      <p class="text-lg">{{ month }} {{ year }}</p>
    </div>
    <div
      class="order-1 flex flex-col items-center justify-center text-center xxs:col-span-4 sm:order-2 sm:col-span-1"
    >
      <p class="text-3xl">{{ date_name }}</p>
      <p class="text-lg" v-if="u_all_day">All day, {{ date_venue }}</p>
      <p class="text-lg" v-else>
        Start times from {{ time }}, {{ date_venue }}
      </p>
    </div>
    <div
      v-if="from_price != 'NONE'"
      class="order-3 flex items-center justify-center xxs:col-span-2 sm:col-span-1"
    >
      <Button
        class="h-min"
        :isPrimary="true"
        title="Buy Tickets"
        :href="'/events/products/' + date_id"
      />
    </div>
    <div
      v-if="external_tickets != ''"
      class="order-3 flex items-center justify-center xxs:col-span-2 sm:col-span-1"
    >
      <Button
        :isPrimary="true"
        title="Find Tickets"
        :href="'/events/external/' + date_id"
      />
    </div>
  </div>
</template>

<script>
import Button from "../../components/button/button.ce.vue";
export default {
  name: "EventDateTile",
  props: {
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
  },
  components: {
    Button,
  },
  computed: {
    date() {
      return new Date(this.u_start_date * 1000).getDate();
    },
    month() {
      return new Date(this.u_start_date * 1000).toLocaleString("default", {
        month: "long",
      });
    },
    year() {
      return new Date(this.u_start_date * 1000).getFullYear();
    },
    time() {
      return new Date(this.u_start_date * 1000).toLocaleString("default", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    },
  },
};
</script>
