<template>
  <div id="skiptocontent"><a href="#maincontent">skip to main content</a></div>
  <Navbar />
  <div id="maincontent">
    <EventsId
      :event_name="event_name"
      :activity_name="activity_name"
      :event_description="event_description"
      :u_next_on="u_next_on"
      :date_id="date_id"
      :date_start="date_start"
      :u_start_date="u_start_date"
      :u_end_date="u_end_date"
      :u_all_day="u_all_day"
      :date_name="date_name"
      :date_venue="date_venue"
      :date_unix="date_unix"
      :from_price="from_price"
      :external_tickets="external_tickets"
      :sale_start_date="sale_start_date"
      :sale_end_date="sale_end_date"
    />
    <div class="container mx-auto">
      <div
        class="flex w-full flex-col gap-y-4 pt-6 xl:grid xl:grid-cols-2 xl:gap-x-4"
      >
        <EventsDateTile
          :date_id="date_id"
          :date_start="date_start"
          :u_start_date="u_start_date"
          :u_end_date="u_end_date"
          :u_all_day="u_all_day"
          :date_name="date_name"
          :date_venue="date_venue"
          :date_unix="date_unix"
          :from_price="from_price"
          :external_tickets="external_tickets"
          :sale_start_date="sale_start_date"
          :sale_end_date="sale_end_date"
        />
      </div>
    </div>
  </div>
  <Footer />
</template>
<!-- eslint-disable vue/prop-name-casing -->
<script>
import Navbar from "../../components/Navbar/navbar.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import EventsId from "../../components/events-id/events-id.ce.vue";
import EventsDateTile from "../../components/event-date-tile/event-date-tile.ce.vue";
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
  },
  components: {
    Navbar,
    Footer,
    EventsId,
    EventsDateTile,
  },
  methods: {},
};
</script>
