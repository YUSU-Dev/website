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
            {{ day }} {{ date }} {{ month }} {{ year }}, {{ time }}
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
          arrow
          is-primary
          title="Back to event"
          :href="'/events/id/' + date_id + '-' + event_url"
          class=""
        />
        <div v-if="u_next_on" class="flex flex-col">
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
import HeroBanner from "../../components/HeroBanner/herobanner.ce.vue";
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
    //
    product_name: { type: String, default: "" },
    product_price: { type: String, default: "" },
    product_inventory: { type: String, default: "" },
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
    day() {
      return new Date(this.u_next_on * 1000).toLocaleString("default", {
        weekday: "long",
      });
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
