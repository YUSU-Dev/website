<template>
  <div class="flex flex-col gap-y-12">
    <div class="flex flex-wrap gap-4">
      <button @click="locationFilter = ''" class="btn btn-primary text-black">
        All
      </button>
      <button
        v-for="location in locations"
        :key="location.id"
        @click="locationFilter = location.id"
        class="btn btn-primary text-black"
      >
        {{ location.name }}
      </button>
    </div>
    <div class="a-z-wrap" v-if="filteredStalls.length > 0">
      <div
        v-for="stall in filteredStalls"
        :key="stall.id"
        class="tile mb-4 flex justify-center pb-2 lg:pb-3"
      >
        <div
          class="relative flex h-full w-full flex-col bg-white shadow transition md:max-w-[282px]"
        >
          <div v-if="stall.stallNumber" class="flex justify-center bg-beige">
            <p class="py-1 text-lg font-semibold">
              Stall {{ stall.stallNumber }}
            </p>
          </div>
          <div class="flex aspect-square items-center justify-center">
            <img
              v-if="stall.logo"
              class="aspect-square bg-cover bg-center object-cover"
              :src="stall.logo"
              alt=""
              loading="lazy"
            />
            <img
              v-else
              class="aspect-square bg-cover bg-center object-cover"
              :src="getImg"
              alt=""
              loading="lazy"
            />
          </div>
          <div class="flex h-full flex-col justify-between gap-y-2 p-6">
            <h3
              v-if="stall.name"
              class="mb-2 line-clamp-3 font-semibold lg:text-lg"
            >
              {{ stall.name }}
            </h3>
            <p v-if="stall.locationId">Location: {{ stall.locationId }}</p>
            <div class="flex flex-col gap-y-2">
              <Button
                title="Go to activity"
                class="flex w-full justify-center text-center"
                is-primary
                :url="'/activities/view/' + stall.url"
              />
              <!-- <InterestButton
              :activity-id="activity.id"
              @unregister="unregisterInterest()"
              @register="registerInterest()"
            /> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../_common/axios.mjs";
import Button from "../button/button.ce.vue";
import { randomImageUrl } from "../../_common/randomImage.mjs";
export default {
  name: "WelcomeFair",
  components: {
    Button,
  },
  data() {
    return {
      stalls: [],
      locations: [],
      locationFilter: "",
      urlLocation: "",
    };
  },
  mounted() {
    this.getUrlParam();
    this.getStalls();
    this.getLocations();
  },
  methods: {
    async getStalls() {
      let self = this;
      await axios
        .get("https://welcome-database.pages.dev/api/stall")
        .then(function (response) {
          self.stalls = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async getLocations() {
      let self = this;
      await axios
        .get("https://welcome-database.pages.dev/api/location")
        .then(function (response) {
          console.log(response.data);
          self.locations = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getUrlParam() {
      let queryString = window.location.search;
      let urlParams = new URLSearchParams(queryString);
      if (urlParams.has("location")) {
        this.urlLocation = urlParams.get("location");
        this.locationFilter = this.urlLocation;
        console.log(this.urlLocation);
      }
    },
  },
  computed: {
    filteredStalls() {
      let self = this;
      if (this.locationFilter === "") {
        return this.stalls;
      } else {
        return this.stalls.filter(function (stall) {
          return stall.locationId === self.locationFilter;
        });
      }
    },
    getImg() {
      return randomImageUrl("student-life");
    },
  },
};
</script>
