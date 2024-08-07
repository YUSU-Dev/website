<template>
  <div id="skiptocontent"><a href="#maincontent">skip to main content</a></div>
  <Navbar />
  <div id="maincontent">
    <EventsProducts
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
      <!-- If not signed in -->
      <div v-if="!signed_in" class="flex flex-col gap-y-4">
        <p class="text-2xl font-bold">Are you a...</p>
        <div class="flex gap-x-4 xs:gap-x-6">
          <Button is-primary title="Student" class="px-6 font-semibold" />
          <Button is-primary title="Public" class="px-8 font-semibold" />
        </div>
      </div>

      <div v-else>
        <div
          v-if="no_products"
          class="flex w-fit flex-col items-center justify-center gap-x-4 gap-y-2 bg-yellow-400 px-6 py-4 text-center sm:flex-row sm:gap-y-0 sm:text-start"
        >
          <FontAwesomeIcon
            icon="fa-solid fa-circle-exclamation"
            class="h-6 w-6"
          ></FontAwesomeIcon>
          <p class="text-lg font-bold">
            Sorry! There are currently no products available for purchase.
          </p>
        </div>

        <div v-if="show_products" class="flex flex-col gap-y-4">
          <h3 class="text-2xl font-bold">Tickets</h3>

          <div
            v-if="event_error"
            class="flex w-fit flex-col items-center justify-center gap-x-4 gap-y-2 bg-yellow-400 px-6 py-4 text-center sm:flex-row sm:gap-y-0 sm:text-start"
          >
            <FontAwesomeIcon
              icon="fa-solid fa-circle-exclamation"
              class="h-6 w-6"
            ></FontAwesomeIcon>
            <p class="text-lg font-bold">Oops! {{ event_error }}</p>
          </div>

          <div v-if="event_products" class="flex flex-wrap gap-4">
            <EventsProductTile
              :product_name="product_name"
              :product_price="product_price"
              :product_inventory="product_inventory"
              :product_description="product_description"
              :product_id="1"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>
<!-- eslint-disable vue/prop-name-casing -->
<script>
import Navbar from "../../components/Navbar/navbar.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import EventsProducts from "../../components/events-products/events-products.ce.vue";
import EventsProductTile from "../../components/event-product-tile/event-product-tile.ce.vue";
import Button from "../../components/button/button.ce.vue";
export default {
  props: {
    signed_in: { type: Boolean, default: false },
    event_id: { type: String, default: "" },
    date_id: { type: String, default: "" },
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
    no_products: { type: Boolean, default: false },
    show_products: { type: Boolean, default: false },
    event_error: { type: String, default: "" },
    //This will need changing to an array of objects I think?
    event_products: { type: Boolean, default: false },
    product_name: { type: String, default: "" },
    product_price: { type: String, default: "" },
    product_inventory: { type: String, default: "" },
    product_description: { type: String, default: "" },
  },
  components: {
    Navbar,
    Footer,
    EventsProducts,
    EventsProductTile,
    Button,
  },
  methods: {},
};
</script>
