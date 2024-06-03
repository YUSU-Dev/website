<template>
  <div class="container mx-auto py-10" id="events-a-z">
    <div class="justify-center">
      <!-- <div class="input-group flex px-2 lg:px-3">
          <input
            class="border-[1px] border-black search form-control w-full p-2"
            type="text"
            aria-label="search for an activity"
            name="search"
            placeholder="Search..."
            v-on:keyup="search($event)"
          />
          <div class="input-group-append">
            <button
              type="submit"
              aria-label="Submit"
              class="btn btn-block btn-secondary bg-black w-full h-full px-1"
              @click="submitSearch"
            >
              <i class="fas fa-search text-white p-2"></i>
            </button>
          </div>
        </div> -->
      <!-- <div class="relative flex mt-6 px-2 lg:px-3 pb-4">
          <Transition>
            <div class="w-full" v-if="Search">
              <h3 class="text-center font-semibold text-3xl">Search Results</h3>
            </div>
          </Transition>
          <Transition>
            <div
              class="text-center w-full max-w-4xl"
              v-if="!Search && ParentCategories.length > 0"
            >
              <div class="">
                <h3 class="sr-only">Filters</h3>
                <div v-if="ParentCategories.length > 1">
                  <ul class="grid gap-4 grid-cols-1 md:grid-cols-3">
                    <li
                      v-for="Parent in ParentCategories"
                      @click.prevent="
                        SelectedParent = Parent;
                        SelectedCategory = '';
                        getGroups();
                      "
                      class=""
                      :key="Parent.id"
                    >
                      <a
                        v-bind:class="{
                          '!bg-light-blue text-black font-semibold':
                            SelectedParent.id === Parent.id,
                        }"
                        class="w-full h-full flex justify-center px-4 py-2 border-2 font-semibold border-none bg-mustard text-black hover:bg-light-blue hover:text-black text-xl"
                      >
                        <h3>{{ Parent.name }}</h3>
                      </a>
                    </li>
                  </ul>
                </div>
                <ul class="flex flex-wrap mt-6 gap-2" v-if="SelectedParent">
                  <li
                    class=""
                    @click.prevent="
                      SelectedCategory = '';
                      getGroups();
                    "
                  >
                    <a
                      v-bind:class="{
                        '!bg-light-blue text-black font-semibold':
                          SelectedCategory === '',
                      }"
                      href="#"
                      class="flex justify-center px-4 py-2 bg-mustard text-black hover:bg-light-blue hover:text-black text-lg"
                    >
                      <h4>All</h4>
                    </a>
                  </li>
                  <li
                    v-for="Category in filteredCategories"
                    @click.prevent="
                      SelectedCategory = Category;
                      getGroups();
                    "
                    class=""
                    :key="Category.id"
                  >
                    <a
                      v-bind:class="{
                        '!bg-light-blue text-black font-semibold':
                          SelectedCategory.id === Category.id,
                      }"
                      class="flex justify-center px-4 py-2 bg-mustard text-black hover:bg-light-blue hover:text-black text-lg"
                      :href="
                        '/student-life/clubs-and-socs?category=' + Category.id
                      "
                    >
                      <h4>{{ Category.name }}</h4>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Transition>
        </div> -->
      <div class="grid grid-cols-4 gap-x-4">
        <div class="event-filter">
          <label for="event-category">Category</label>
          <select
            id="event-category"
            class="form-control event-category"
            data-placeholder="All"
            data-open-icon="fa fa-angle-down"
            data-close-icon="fa fa-angle-up"
            @change="updateCategory($event)"
          >
            <option value="">All</option>
            <option
              v-for="category in Categories"
              :value="category.id"
              :key="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <div>
          <label for="event-activity">Activity</label>
          <select
            id="event-activity"
            class="form-control"
            data-placeholder="All"
            data-open-icon="fa fa-angle-down"
            data-close-icon="fa fa-angle-up"
            @change="updateGroup($event)"
          >
            <option value="">All</option>
            <option
              v-for="activity in Groups"
              :value="activity.id"
              :key="activity.id"
            >
              {{ activity.name }}
            </option>
          </select>
        </div>
        <div class="flex flex-col">
          <label for="event-search">Search</label>
          <div class="input-group flex border-[1px] border-black">
            <input
              id="event-search"
              class="form-control w-full"
              aria-label="Search"
              type="text"
              name="search"
              :value="Search"
            />
            <div class="input-group-append">
              <button
                type="submit"
                class="btn btn-block btn-secondary"
                aria-label="Submit"
              >
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="flex justify-end items-center">
          <Button title="Reset" @click="reset" isStudentLife="true" />
        </div>
      </div>
      <div
        class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mt-10"
      >
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
  <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v6.5.1/css/all.css"
    crossorigin="anonymous"
  />
</template>
<script>
import Tile from "../Tile/tile.ce.vue";
import Pagination from "../Pagination/pagination.ce.vue";
import axios from "../../_common/axios.mjs";
import "../../main.css";
import Button from "../../components/button/button.ce.vue";
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
    //Add Select2 Search dropdowns to the selects - if not present is ignored
    try {
      $("#event-category, #event-activity").select2();
    } catch {}
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
          //if we want more events (append = true), add to array
          if (append) {
            self.Events = [...self.Events, ...response.data.data];
          } else {
            //otherwise replace current events
            self.Events = response.data.data;
          }
          //If the API says there are more results (ie another page), update the template accordingly
          if (response.data.next_page_url != null) {
            self.MoreResults = true;
          } else {
            self.MoreResults = false;
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
    updateCategory(event) {
      this.SelectedType = event.target.value;
      this.getEvents();
    },
    updateGroup(event) {
      this.SelectedGroup = event.target.value;
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
    moreEvents() {
      this.Page++;
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
//Various filters to formate dates and time for template
// Vue.filter('getDate', function(value) {
//     if (value) {
//         return moment(String(value)).format('DD MMMM')
//     }
// });

// Vue.filter('getDay', function(value) {
//     if (value) {
//         return moment(String(value)).format('DD')
//     }
// });

// Vue.filter('getMonthYear', function(value) {
//     if (value) {
//         return moment(String(value)).format('MMMM YYYY')
//     }
// });

// Vue.filter('getTime', function(value) {
//     if (value) {
//         return moment(String(value)).format('hh:mm a')
//     }
// })
</script>
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Select2 */
.select2-container--default .select2-selection--single {
  background-color: black !important;
}

.select2-container .select2-selection--single {
  height: inherit;
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>
