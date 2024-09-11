<template>
  <div class="flex flex-col gap-y-12" id="modalArea">
    <div class="flex flex-col gap-y-6">
      <div class="flex lg:w-3/6">
        <Searchbar
          :submit-search-callback="submitSearch"
          :initial-search-value="search"
          placeholder="Search stalls..."
          class="w-full"
        />
      </div>
      <div class="flex flex-wrap gap-4">
        <Button
          title="All"
          @click="updateActiveLocation()"
          is-primary
          :class="{ 'btn-primary-active': locationFilter === '' }"
        />
        <Button
          v-for="location in filteredLocations"
          :key="location.id"
          :title="location.name"
          @click="updateActiveLocation(location.id)"
          is-primary
          :class="{ 'btn-primary-active': locationFilter === location.id }"
        />
      </div>
    </div>
    <div class="a-z-wrap" v-if="stalls.length > 0 && !loading">
      <div
        v-for="stall in stalls"
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
          <div class="relative flex aspect-square items-center justify-center">
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
            <div class="absolute right-2 top-2">
              <InterestButton
                :activity-id="stall.id"
                @unregister="unregisterInterest()"
                @register="registerInterest()"
                is-heart
              />
            </div>
          </div>
          <div class="flex h-full flex-col justify-between gap-y-2 p-6">
            <h3
              v-if="stall.name"
              class="mb-2 line-clamp-3 font-semibold lg:text-lg"
            >
              {{ stall.name }}
            </h3>
            <p v-if="stall.locationId">{{ stall.location.name }}</p>
            <div class="flex flex-col gap-y-2">
              <Button
                title="Go to activity"
                class="flex w-full justify-center text-center"
                is-primary
                :url="'/activities/view/' + stall.url"
              />
              <!-- <InterestButton
                :activity-id="stall.id"
                @unregister="unregisterInterest()"
                @register="registerInterest()"
              /> -->
              <!-- Can't remember the url off the top of my head -->
              <Button
                title="See on map"
                class="flex w-full justify-center text-center"
                is-primary
                :url="'/map?location=' + stall.locationId"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="a-z-wrap" v-else>
      <Tile v-for="stall in stalls" :key="stall.id" :loading="true" />
    </div>
    <Pagination
      :array="stalls"
      :load-page="loadPage"
      :page="Page"
      :more-results="MoreResults"
      :previous-results="PreviousResults"
      :loading="loading"
    />
  </div>
</template>

<script>
import axios from "../../_common/axios.mjs";
import Button from "../button/button.ce.vue";
import { randomImageUrl } from "../../_common/randomImage.mjs";
import InterestButton from "../interest-button/interest-button.ce.vue";
import Pagination from "../Pagination/pagination.ce.vue";
import Tile from "../Tile/tile.ce.vue";
import Searchbar from "../searchbar/searchbar.ce.vue";
export default {
  name: "WelcomeFair",
  components: {
    Button,
    InterestButton,
    Pagination,
    Tile,
    Searchbar,
  },
  data() {
    return {
      stalls: [],
      locations: [],
      locationFilter: "",
      urlLocation: "",
      Page: 1,
      Pages: [],
      MoreResults: false,
      PreviousResults: false,
      loading: false,
      search: "",
    };
  },
  mounted() {
    this.loading = true;
    this.getUrlParam();
    this.getStalls();
    this.getLocations();
  },
  methods: {
    async getStalls() {
      this.loading = true;
      let self = this;
      let parameters = "page=" + this.Page;
      parameters += "&limit=12";
      if (this.search) {
        parameters += "&search=" + this.search;
        this.locationFilter = "";
      }
      if (this.locationFilter) {
        parameters += "&location=" + this.locationFilter;
      }
      await axios
        .get("https://welcome-api.yorksu.org/api/stall?" + parameters)
        .then(function (response) {
          self.stalls = response.data.stalls;
          if (response.data.pagination.next_page) {
            self.MoreResults = true;
          } else {
            self.MoreResults = false;
          }
          if (response.data.pagination.prev_page) {
            self.PreviousResults = true;
          } else {
            self.PreviousResults = false;
          }
          self.loading = false;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    async getLocations() {
      let self = this;
      await axios
        .get("https://welcome-api.yorksu.org/api/location?venues=false")
        .then(function (response) {
          self.locations = response.data;
          for (let i = 0; i < self.locations.length; i++) {
            console.log(self.locations[i]._count.stalls);
          }
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
      }
      if (urlParams.has("search")) {
        this.search = urlParams.get("search");
      }
    },
    submitSearch(searchValue) {
      this.search = searchValue;
      this.getStalls();
    },
    unregisterInterest(stall_id) {
      const stall = this.stalls.indexOf(stall_id);
      this.stalls.splice(stall, 1);
    },
    registerInterest() {
      this.getStalls();
    },
    loadPage(pageNumber = null) {
      if (pageNumber) {
        this.Page = pageNumber;
      } else {
        this.Page++;
      }
      this.Pages.indexOf(this.Page) === -1 ? this.Pages.push(this.Page) : "";
      this.getStalls();
    },
    updateActiveLocation(location) {
      let self = this;
      this.search = "";
      if (location) {
        self.locationFilter = location;
      } else {
        self.locationFilter = "";
      }
      self.Page = 1;
      self.getStalls();
    },
  },
  computed: {
    filteredLocations() {
      return this.locations.filter(function (location) {
        return location._count.stalls > 0;
      });
    },
    getImg() {
      return randomImageUrl("student-life");
    },
  },
};
</script>
