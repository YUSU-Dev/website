<template>
  <HeroBanner
    :title="event_name"
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_General.jpg"
  />
  <div
    id="maincontent"
    class="container mx-auto flex flex-col items-center justify-center py-20"
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
        <div
          class="grid grid-cols-1 justify-between gap-y-4 border-[0.5px] p-4 shadow xxs:grid-cols-4 sm:grid-cols-3 md:flex"
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
    event_name: { type: String, default: "Test Name" },
    date_name: { type: String, default: "Test Date Name" },
    date_venue: { type: String, default: "Test Venue" },
    activity_name: { type: String, default: "Test Activity" },
    event_description: {
      type: String,
      default:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam et felis sit amet varius. Proin vitae pharetra dolor, nec rutrum orci. Mauris sagittis diam sed lacinia tincidunt. Morbi et libero sed libero scelerisque pellentesque. Sed tristique mattis scelerisque. Nulla sed ex urna. Etiam condimentum nisi ullamcorper tellus accumsan, sit amet convallis enim venenatis. Proin consectetur condimentum nulla, eu varius tellus vestibulum quis. Phasellus congue felis elit, at suscipit urna lobortis in. Etiam efficitur, arcu id sollicitudin malesuada, nibh dolor fringilla sapien, quis imperdiet est tellus a arcu. Ut bibendum nisl a elit venenatis, sit amet vulputate nibh scelerisque. Quisque malesuada, metus non mollis condimentum, ante dolor tempor leo, vitae vestibulum elit lectus ac nisl. Fusce ut magna finibus, auctor nulla ut, cursus felis. Aenean non orci et arcu consectetur tincidunt ut vitae nisi. Fusce faucibus eget neque sed fermentum.",
    },
    u_start_date: { type: String, default: "1719648000" },
    u_all_day: { type: Boolean, default: false },
    date_id: { type: String, default: "4564" },
    from_price: { type: String, default: "£1.00" },
    external_tickets: { type: Boolean, default: false },
    u_next_on: { type: String, default: "1719648000" },
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
