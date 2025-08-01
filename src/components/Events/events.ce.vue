<template>
  <div class="py-10" id="events-a-z">
    <div class="justify-center">
      <div
        v-if="!ShortView"
        class="events-filters xs:grid-cols-2 grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-9"
      >
        <div class="flex flex-col lg:col-span-2">
          <label>Category</label>
          <v-select
            label="name"
            :options="Categories"
            :model-value="displayCategory"
            @update:model-value="updateCategory"
            placeholder="All"
            class="h-full"
          ></v-select>
        </div>
        <div class="flex flex-col lg:col-span-2" data-testid="activity-select">
          <label>Activity</label>
          <v-select
            label="name"
            :options="Groups"
            :model-value="displayActivity"
            @update:model-value="updateGroup"
            placeholder="All"
            class="h-full"
          ></v-select>
        </div>
        <div class="flex flex-col lg:col-span-2">
          <label>Event Tag</label>
          <v-select
            label="name"
            :options="Tags"
            :model-value="displayTag"
            @update:model-value="updateTag"
            placeholder="All"
            class="h-full"
          ></v-select>
        </div>
        <div class="flex flex-col lg:col-span-2">
          <label for="event-search">Search</label>
          <div class="input-group flex h-full border border-black">
            <input
              id="event-search"
              class="form-control h-full w-full p-2 active:rounded-none"
              aria-label="Search"
              type="text"
              name="search"
              :value="Search"
              @input="search($event)"
            />
            <div class="input-group-append">
              <button
                type="submit"
                class="btn btn-block btn-secondary h-full"
                aria-label="Submit"
              >
                <FontAwesomeIcon
                  icon="fas fa-search"
                  class="h-6 w-4 text-white"
                ></FontAwesomeIcon>
              </button>
            </div>
          </div>
        </div>
        <div class="xs:col-span-2 flex items-end justify-end lg:col-span-1">
          <Button
            title="Reset"
            @click="reset"
            is-student-life="true"
            class="flex h-[38px] items-center"
          />
        </div>
      </div>
      <div v-else-if="title">
        <h2 class="flex items-center pb-2 text-3xl font-bold">
          {{ title }}
          <FontAwesomeIcon
            v-if="icon"
            icon="fas fa-calendar"
            class="mx-1 h-8 w-8"
          />
        </h2>
      </div>
      <div v-if="Events.length == 0 && !Loading" class="">
        <h3 class="mt-16 mb-4 text-xl font-semibold text-[#555]">
          There are currently no events
        </h3>
      </div>
      <div v-if="!Loading" class="a-z-wrap mt-10">
        <Tile
          v-for="event in PremiumEvents"
          :key="event.id"
          :url="'/events/id/' + event.event_id + '-' + event.url_name"
          :title="event.event_date_title"
          :image="event.thumbnail_url"
          :date="event.start_date"
          :group="event.group"
          :location="event.venue"
          :categories="event.categories"
          category-link="/events?tag"
          premium-event
        />
        <Tile
          v-for="event in Events"
          :key="event.id"
          :url="'/events/id/' + event.event_id + '-' + event.url_name"
          :title="event.event_date_title"
          :image="event.thumbnail_url"
          :date="event.start_date"
          :group="event.group"
          :location="event.venue"
          :categories="event.categories"
          category-link="/events?tag"
        />
      </div>
      <div v-else class="a-z-wrap mt-10">
        <Tile v-for="item in PerPage" :key="item" :loading="true" />
      </div>
      <Pagination
        :array="Groups"
        :loading="Loading"
        :load-page="loadPage"
        :page="Page"
        :more-results="MoreResults"
        :previous-results="PreviousResults"
      />
    </div>
  </div>
</template>
<style>
@import "https://cdn.jsdelivr.net/npm/vue-select@3.16.0/dist/vue-select.css";
</style>
<script>
import "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/+esm";
import Tile from "../Tile/tile.ce.vue";
import Pagination from "../Pagination/pagination.ce.vue";
import axios from "../../_common/axios.mjs";
import Button from "../../components/button/button.ce.vue";
import vSelect from "vue-select";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faCalendar } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch);
library.add(faCalendar);

export default {
  props: {
    siteid: { type: String, default: null },
    groupid: { type: String, default: null },
    typeid: { type: String, default: null },
    venueid: { type: String, default: null },
    smallcard: { type: Boolean, default: false },
    limit: { type: Number, default: null },
    premium: { type: Boolean, default: false },
    title: { type: String, default: null },
    icon: { type: Boolean, default: false },
    excludedTags: { type: String, default: null },
  },
  components: {
    Tile,
    Pagination,
    Button,
    "v-select": vSelect,
    FontAwesomeIcon,
  },
  data() {
    return {
      Categories: [],
      Groups: [],
      Events: [],
      Tags: [],
      PremiumEvents: [],
      excludedTaggedEvents: [],
      SelectedType: "",
      SelectedGroup: "",
      SelectedVenue: "",
      SelectedTag: "",
      Search: "",
      Page: 1,
      Pages: [],
      PerPage: 24,
      premiumResults: { type: Boolean, default: false },
      ShortView: { type: Boolean, default: false },
      MoreResults: { type: Boolean, default: false },
      PreviousResults: { type: Boolean, default: false },
      Placeholder: "Select an option",
      Loading: true,
      firstPagePremium: false,
    };
  },
  created() {
    var self = this;
    self.Loading = true;
    //Only show "premium" tagged events
    self.premiumResults = self.premium;

    //if we have a groupid, only list that group's events
    if (self.groupid) {
      self.SelectedGroup = self.groupid;
      self.ShortView = true;
    } else if (self.typeid) {
      self.SelectedType = self.typeid;
      self.ShortView = true;
    } else if (self.venueid) {
      self.SelectedVenue = self.venueid;
      self.ShortView = true;
    } else if (self.limit) {
      self.ShortView = true;
    } else {
      self.ShortView = false;
      //check if looking for a specific activity, search, etc...
      let urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("activity_id")) {
        self.SelectedGroup = urlParams.get("activity_id");
      } else if (urlParams.has("activity")) {
        //some pages use either attribute, so catching both
        self.SelectedGroup = urlParams.get("activity");
      }
      if (urlParams.has("search")) {
        self.Search = urlParams.get("search");
      }
      if (urlParams.has("category")) {
        self.SelectedType = urlParams.get("category");
      }
      if (urlParams.has("tag")) {
        self.SelectedTag = urlParams.get("tag");
      }
    }
    //Get Categories
    axios
      .get("https://pluto.sums.su/api/events/types?sortBy=name", {
        headers: {
          "X-Site-Id": self.siteid,
        },
      })
      .then(function (response) {
        self.Categories = response.data;
      });
    //get Activities
    axios
      .get("https://pluto.sums.su/api/groups?sortBy=name&selectList=1", {
        headers: {
          "X-Site-Id": self.siteid,
        },
      })
      .then(function (response) {
        self.Groups = response.data;
      });

    // get Tags
    axios
      .get("https://pluto.sums.su/api/events/categories?sortBy=name", {
        headers: {
          "X-Site-Id": self.siteid,
        },
      })
      .then(function (response) {
        self.Tags = response.data;
      });

    //get Events
    self.getEvents();
  },
  mounted() {},
  methods: {
    /**
     * Fetch events from API
     * @param bool append - are we getting more events to append to the current list?
     */
    getEvents: function (append = false) {
      let self = this;
      self.firstPagePremium = false;

      if (!append) {
        self.Page = 1;
        self.Pages = [1];
      }

      let parameters = "sortBy=start_date&futureOrOngoing=1&page=" + self.Page;

      //add relevant parameters to the event search
      if (self.limit) {
        parameters += "&perPage=" + self.limit;
      } else {
        parameters += "&perPage=" + self.PerPage;
      }
      if (self.SelectedType) {
        parameters += "&typeId=" + self.SelectedType;
      }
      if (self.SelectedGroup) {
        parameters += "&groupId=" + self.SelectedGroup;
      }
      if (self.SelectedVenue) {
        parameters += "&venueId=" + self.SelectedVenue;
      }
      if (self.Search) {
        parameters += "&eventDateTitleSearchTerm=" + self.Search;
      }
      if (self.premiumResults) {
        parameters += "&onlyPremium=1";
      }
      if (self.SelectedTag) {
        parameters += "&categoryId=" + self.SelectedTag;
      }
      //if we're on the first page, get the premium events first
      if (
        parameters ==
        "sortBy=start_date&futureOrOngoing=1&page=1" +
          "&perPage=" +
          self.PerPage
      ) {
        self.firstPagePremium = true;
        Promise.all([
          axios.get(
            "https://pluto.sums.su/api/events?onlyPremium=1&typeId=4&" +
              parameters,
            {
              headers: {
                "X-Site-Id": self.siteid,
              },
            },
          ),
          axios.get(
            "https://pluto.sums.su/api/events?onlyPremium=1&typeId=37&" +
              parameters,
            {
              headers: {
                "X-Site-Id": self.siteid,
              },
            },
          ),
        ]).then(function (responses) {
          self.PremiumEvents = responses[0].data.data.concat(
            responses[1].data.data,
          );
          self.PremiumEvents.sort(
            (a, b) => new Date(a.start_date) - new Date(b.start_date),
          );
        });
      }
      // get excluded Tags
      if (self.excludedTags) {
        const categoryIds = self.excludedTags;
        axios
          .get(
            "https://pluto.sums.su/api/events?" +
              "sortBy=start_date&futureOrOngoing=1&page=1" +
              "&perPage=200&categoryIds=" +
              categoryIds,
            {
              headers: {
                "X-Site-Id": self.siteid,
              },
            },
          )
          .then(function (response) {
            self.excludedTaggedEvents = response.data.data;
          });
      }
      //get the rest of the events
      axios
        .get("https://pluto.sums.su/api/events?" + parameters, {
          headers: {
            "X-Site-Id": self.siteid,
          },
        })
        .then(function (response) {
          if (self.firstPagePremium) {
            const premiumEventIds = self.PremiumEvents.map((event) => event.id);
            self.Events = response.data.data.filter((event) => {
              return !premiumEventIds.includes(event.id);
            });
          } else if (self.excludedTaggedEvents.length > 0) {
            self.PremiumEvents = [];
            const excludedTaggedEventIds = self.excludedTaggedEvents.map(
              (event) => event.id,
            );
            self.Events = response.data.data.filter((event) => {
              return !excludedTaggedEventIds.includes(event.id);
            });
          } else {
            self.PremiumEvents = [];
            self.Events = response.data.data;
          }
          //If the API says there are more results (ie another page), update the template accordingly
          if (response.data.next_page_url != null) {
            self.MoreResults = true;
          } else {
            self.MoreResults = false;
          }
          if (response.data.prev_page_url) {
            self.PreviousResults = true;
          } else {
            self.PreviousResults = false;
          }
          self.Loading = false;
        });
    },
    //update various fields to change events data
    updateCategory(value) {
      if (value) {
        this.SelectedType = value.id;
      } else {
        this.SelectedType = "";
      }
      this.getEvents();
    },
    updateGroup(value) {
      if (value) {
        this.SelectedGroup = value.id;
      } else {
        this.SelectedGroup = "";
      }
      this.getEvents();
    },
    updateTag(value) {
      if (value) {
        this.SelectedTag = value.id;
      } else {
        this.SelectedTag = "";
      }
      this.getEvents();
    },
    search(event) {
      this.Search = event.target.value;
      this.getEvents();
    },
    reset() {
      //easy way to refresh the page
      window.location = window.location.href.split("?")[0];
    },
    loadPage(pageNumber = null) {
      if (pageNumber) {
        this.Page = pageNumber;
      } else {
        this.Page++;
      }
      this.Pages.indexOf(this.Page) === -1 ? this.Pages.push(this.Page) : "";
      this.getEvents(true);
    },
  },
  computed: {
    filteredCategories() {
      let self = this;
      return this.Categories.filter((category) => {
        if (self.SelectedParent) {
          return category.parent_id == self.SelectedParent.id;
        }
      });
    },
    displayCategory() {
      return this.Categories.find((category) => {
        return category.id == this.SelectedType;
      });
    },
    displayActivity() {
      return this.Groups.find((group) => {
        return group.id == this.SelectedGroup;
      });
    },
    displayTag() {
      return this.Tags.find((tag) => {
        return tag.id == this.SelectedTag;
      });
    },
  },
};
</script>
