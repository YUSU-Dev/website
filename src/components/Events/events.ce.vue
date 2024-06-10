<template>
  <div class="container mx-auto py-10" id="events-a-z">
    <div class="justify-center">
      <div
        class="grid grid-cols-1 gap-x-4 gap-y-4 px-2 xs:grid-cols-2 lg:grid-cols-4 lg:px-3"
      >
        <div class="event-filter">
          <label>Category</label>
          <v-select
            label="name"
            :options="Categories"
            @update:modelValue="updateCategory"
            placeholder="All"
          ></v-select>
        </div>
        <div>
          <label>Activity</label>
          <v-select
            label="name"
            :options="Groups"
            @update:modelValue="updateGroup"
            placeholder="All"
          ></v-select>
        </div>
        <div class="flex flex-col">
          <label for="event-search">Search</label>
          <div class="input-group flex h-full border-[1px] border-black">
            <input
              id="event-search"
              class="form-control h-full w-full"
              aria-label="Search"
              type="text"
              name="search"
              :value="Search"
            />
            <div class="input-group-append">
              <button
                type="submit"
                class="btn btn-block btn-secondary h-full"
                aria-label="Submit"
              >
                <FontAwesomeIcon icon="fas fa-search" className="w-8 h-8 text-white"></FontAwesomeIcon>
              </button>
            </div>
          </div>
        </div>
        <div class="flex items-end justify-start md:justify-end">
          <Button
            title="Reset"
            @click="reset"
            isStudentLife="true"
            class="flex h-[38px] items-center"
          />
        </div>
      </div>
      <div class="mt-10 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4">
        <Tile
          v-for="event in Events"
          :key="event.id"
          :url="'/events/id/' + event.event_id + '-' + event.url_name"
          :title="event.event_date_title"
          :image="event.thumbnail_url"
        />
      </div>
      <Pagination
        :Array="Groups"
        :loadPage="loadPage"
        :Page="Page"
        :MoreResults="MoreResults"
        :PreviousResults="PreviousResults"
      />
    </div>
  </div>
</template>
<script>
import "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/+esm";
import Tile from "../Tile/tile.ce.vue";
import Pagination from "../Pagination/pagination.ce.vue";
import axios from "../../_common/axios.mjs";
import Button from "../../components/button/button.ce.vue";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch);

export default {
  props: [
    "siteid",
    "groupid",
    "typeid",
    "venueid",
    "smallcard",
    "limit",
    "premium",
  ],
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
      SelectedType: "",
      SelectedGroup: "",
      SelectedVenue: "",
      Search: "",
      Page: 1,
      Pages: [],
      Premium: false,
      ShortView: false,
      MoreResults: false,
      PreviousResults: false,
      Placeholder: "Select an option",
    };
  },
  created() {
    var self = this;
    //Only show "premium" tagged events
    if (self.premium) {
      self.Premium = true;
    }
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
    }
    //get Events
    self.getEvents();
  },
  mounted() {
    //allow scrolling functionality
    if (!this.limit) {
      this.onScroll();
    }
  },
  methods: {
    /**
     * Fetch events from API
     * @param bool append - are we getting more events to append to the current list?
     */
    getEvents: function (append = false) {
      let self = this;
      if (!append) {
        self.Page = 1;
        self.Pages = [1];
      }
      let parameters = "sortBy=start_date&futureOrOngoing=1&page=" + this.Page;
      //add relevant parameters to the event search
      if (this.limit) {
        parameters += "&perPage=" + this.limit;
      } else {
        parameters += "&perPage=12";
      }
      if (this.SelectedType) {
        parameters += "&typeId=" + this.SelectedType;
      }
      if (this.SelectedGroup) {
        parameters += "&groupId=" + this.SelectedGroup;
      }
      if (this.SelectedVenue) {
        parameters += "&venueId=" + this.SelectedVenue;
      }
      if (this.Search) {
        parameters += "&searchTerm=" + this.Search;
      }
      if (this.Premium) {
        parameters += "&onlyPremium=1";
      }
      axios
        .get("https://pluto.sums.su/api/events?" + parameters, {
          headers: {
            "X-Site-Id": self.siteid,
          },
        })
        .then(function (response) {
          self.Events = response.data.data;
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
        });
    },
    /**
     * Track when the user scrolls down the page
     */
    onScroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop,
          ) +
            window.innerHeight +
            10 >=
          document.documentElement.offsetHeight;

        //automatically get more results if at bottom of page
        if (bottomOfWindow && self.MoreResults) {
          this.moreEvents();
        }
      };
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
  },
};
</script>
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Select2 */
/* .vs__dropdown-toggle {
  border-radius: none !important;
} */

.v-select .vs--single .vs--searchable {
  color: white !important;
}

.vs__open-indicator {
  fill: white !important;
}

.vs__search,
.vs__search:focus,
.vs__selected {
  opacity: 1 !important;
  color: white !important;
}

.select2-container--default .select2-selection--single {
  background-color: black !important;
  border-radius: 0px !important;
}

.select2-container .select2-selection--single {
  height: inherit;
  padding-top: 4px;
  padding-bottom: 4px;
}

.select2-selection__arrow {
  height: 95% !important;
}

.select2-selection__arrow b {
  color: white !important;
}

.select2-container--default.select2-container--open
  .select2-selection--single
  .select2-selection__arrow
  b {
  color: white !important;
}

.select2-selection__placeholder {
  color: white !important;
}

.select2-container--default
  .select2-selection--single
  .select2-selection__rendered {
  color: white !important;
}
</style>
