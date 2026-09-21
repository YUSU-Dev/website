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
      <!-- View Mode Toggle -->
      <div v-if="!ShortView" class="mt-4 flex justify-center">
        <div class="flex rounded-lg border border-gray-300 bg-white p-1">
          <button
            @click="viewMode = 'list'"
            :class="[
              'flex items-center rounded-md px-4 py-2 transition-colors',
              viewMode === 'list' ? 'bg-mustard opacity-90' : '',
            ]"
          >
            <FontAwesomeIcon icon="fas fa-list" class="mr-2 h-4 w-4" />
            List View
          </button>
          <button
            @click="viewMode = 'timetable'"
            :class="[
              'flex items-center rounded-md px-4 py-2 transition-colors',
              viewMode === 'timetable' ? 'bg-mustard opacity-90' : '',
            ]"
          >
            <FontAwesomeIcon icon="fas fa-calendar-week" class="mr-2 h-4 w-4" />
            Calendar View
          </button>
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
      <!-- ShortView search box. Not tied to title, so showSearch works on its own. -->
      <div v-if="ShortView && showSearch" class="flex w-full flex-col pb-4">
        <label for="event-search" class="sr-only">Search</label>
        <div class="input-group flex h-full border border-black">
          <input
            id="event-search"
            class="form-control h-full w-full p-2 active:rounded-none"
            aria-label="Search"
            type="text"
            name="search"
            placeholder="Search events"
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
      <!-- ShortView type filter pills. Only shown when typeid carries more than one Type ID. -->
      <ul
        v-if="ShortView && ShortViewTypeIds.length > 1"
        class="mb-4 flex flex-wrap gap-2"
      >
        <li>
          <a
            href="#"
            @click.prevent="setTypeFilter('')"
            :class="{ '!btn-student-life-active': TypeFilter === '' }"
            class="btn-student-life flex justify-center px-4 py-2"
          >
            <span>All</span>
          </a>
        </li>
        <li v-for="option in TypeFilterOptions" :key="option.id">
          <a
            href="#"
            @click.prevent="setTypeFilter(option.id)"
            :class="{ '!btn-student-life-active': TypeFilter === option.id }"
            class="btn-student-life flex justify-center px-4 py-2"
          >
            <span>{{ option.name }}</span>
          </a>
        </li>
      </ul>
      <div v-if="DisplayedEvents.length == 0 && !Loading" class="">
        <h3
          v-if="LoadFailed"
          class="mt-16 mb-4 text-xl font-semibold text-[#555]"
        >
          Events could not be loaded.
          <button type="button" class="underline" @click="getEvents()">
            Try again
          </button>
        </h3>
        <h3 v-else class="mt-16 mb-4 text-xl font-semibold text-[#555]">
          There are currently no events
        </h3>
      </div>

      <div v-if="!ShortView">
        <!-- Timetable View -->
        <div v-show="viewMode === 'timetable'" class="py-10">
          <EventTimetable
            :is-visible="viewMode === 'timetable'"
            :type-id="SelectedType"
            :group-id="SelectedGroup"
            :venue-id="SelectedVenue"
            :category-id="SelectedTag"
            :search-term="Search"
            :siteid="siteid"
          />
        </div>

        <!-- List View -->
        <div v-show="viewMode === 'list' && !Loading" class="a-z-wrap mt-10">
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

        <!-- Loading State -->
        <div v-show="viewMode === 'list' && Loading" class="a-z-wrap mt-10">
          <Tile v-for="item in PerPage" :key="item" :loading="true" />
        </div>

        <!-- Pagination (only for list view) -->
        <Pagination
          v-show="viewMode === 'list'"
          :array="Groups"
          :loading="Loading"
          :load-page="loadPage"
          :page="Page"
          :more-results="MoreResults"
          :previous-results="PreviousResults"
        />
      </div>

      <!-- Short View (when ShortView is true) -->
      <div v-else-if="!Loading" class="a-z-wrap mt-10">
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
          v-for="event in VisibleEvents"
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

      <!-- Short View Loading -->
      <div v-else class="a-z-wrap mt-10">
        <Tile v-for="item in PerPage" :key="item" :loading="true" />
      </div>

      <!-- Numbered pages, for multi-type ShortView pages (e.g. GIAG). -->
      <nav
        v-if="PagedShortView && !Loading && TotalPages > 1"
        aria-label="Events pages"
        class="mt-8 flex flex-wrap items-center justify-center gap-1"
      >
        <p class="sr-only" aria-live="polite">
          Page {{ CurrentPage }} of {{ TotalPages }}
        </p>
        <button
          type="button"
          class="px-3 py-2 disabled:opacity-40"
          aria-label="Previous page"
          :disabled="CurrentPage === 1"
          @click="goToPage(CurrentPage - 1)"
        >
          <FontAwesomeIcon icon="fas fa-chevron-left" class="h-4 w-4" />
        </button>
        <template v-for="(item, index) in PageNumbers" :key="index">
          <span v-if="item === '...'" class="px-2 py-2" aria-hidden="true"
            >...</span
          >
          <button
            v-else
            type="button"
            class="px-3 py-2"
            :class="{ 'bg-mustard': item === CurrentPage }"
            :aria-label="'Page ' + item"
            :aria-current="item === CurrentPage ? 'page' : null"
            @click="goToPage(item)"
          >
            {{ item }}
          </button>
        </template>
        <button
          type="button"
          class="px-3 py-2 disabled:opacity-40"
          aria-label="Next page"
          :disabled="CurrentPage === TotalPages"
          @click="goToPage(CurrentPage + 1)"
        >
          <FontAwesomeIcon icon="fas fa-chevron-right" class="h-4 w-4" />
        </button>
      </nav>
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
import EventTimetable from "../event-timetable/event-timetable.ce.vue";
import axios from "../../_common/axios.mjs";
import Button from "../../components/button/button.ce.vue";
import vSelect from "vue-select";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSearch,
  faCalendar,
  faList,
  faCalendarWeek,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

library.add(faSearch);
library.add(faCalendar);
library.add(faList);
library.add(faCalendarWeek);
library.add(faChevronLeft);
library.add(faChevronRight);

// Display names for the type filter pills in multi-type ShortView pages
// (e.g. GIAG). Falls back to "Type {id}" for any Type ID not listed here.
const EVENT_TYPE_LABELS = {
  17: "Volunteering",
  19: "Societies",
  20: "Sports",
};

// Fetches every page of a paged API list, so a list that grows past one page
// is never cut off. getPage(n) resolves to an axios style response.
function fetchAllPages(getPage, maxPages = 50) {
  const next = (page, collected) =>
    getPage(page).then((r) => {
      const all = collected.concat(r.data.data || []);
      if (r.data.next_page_url && page < maxPages) {
        return next(page + 1, all);
      }
      if (r.data.next_page_url && maxPages > 1) {
        throw new Error("Events list is longer than " + maxPages + " pages");
      }
      return all;
    });
  return next(1, []);
}

// sessionStorage can throw (private mode, blocked storage), so never trust it
function storageGet(key) {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key, value) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // ignore, this is only a speed up
  }
}

// How long the last list of events is reused for an instant first paint
const CACHE_MAX_AGE = 10 * 60 * 1000;
const SCROLL_KEY = "yorksu-events-scroll";

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
    // Search box for ShortView mode, without the full filter row.
    showSearch: { type: Boolean, default: false },
  },
  components: {
    Tile,
    Pagination,
    Button,
    EventTimetable,
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
      TypeFilter: "",
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
      LoadFailed: false,
      CurrentPage: 1,
      ScrollPending: false,
      LatestRequest: 0,
      SearchTimer: null,
      firstPagePremium: false,
      viewMode: "list",
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
    // Multi-type ShortView pages (GIAG) keep their place in the URL
    if (self.PagedShortView) {
      self.restoreState();
    }
    //Get Categories
    axios
      .get("https://pluto.sums.digital/api/events/types?sortBy=name", {
        headers: {
          "X-Site-Id": self.siteid,
        },
      })
      .then(function (response) {
        self.Categories = response.data;
      });
    //get Activities
    axios
      .get("https://pluto.sums.digital/api/groups?sortBy=name&selectList=1", {
        headers: {
          "X-Site-Id": self.siteid,
        },
      })
      .then(function (response) {
        self.Groups = response.data;
      });

    // get Tags
    axios
      .get("https://pluto.sums.digital/api/events/categories?sortBy=name", {
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
  mounted() {
    if (this.PagedShortView) {
      window.addEventListener("pagehide", this.saveScroll);
      if (!this.Loading) {
        this.$nextTick(this.restoreScroll);
      }
    }
  },
  beforeUnmount() {
    window.removeEventListener("pagehide", this.saveScroll);
    clearTimeout(this.SearchTimer);
  },
  methods: {
    // Reads page, type pill and search back out of the URL, and shows the
    // last list straight away while fresh data loads behind it
    restoreState() {
      const params = new URLSearchParams(window.location.search);
      const type = params.get("events_type");
      if (type && this.ShortViewTypeIds.includes(type)) {
        this.TypeFilter = type;
      }
      const search = params.get("events_search");
      if (search) {
        this.Search = search;
      }
      const rawPage = params.get("events_page");
      if (rawPage && /^[1-9]\d*$/.test(rawPage)) {
        this.CurrentPage = parseInt(rawPage, 10);
      }
      if (this.Search.length < 2) {
        const cached = this.readCache();
        if (cached) {
          this.Events = cached;
          this.Loading = false;
          this.clampPage();
        }
      }
      // Back button: remember to put the scroll position back once tiles show
      const perf = window.performance;
      const nav =
        perf && perf.getEntriesByType
          ? perf.getEntriesByType("navigation")[0]
          : null;
      if (nav && nav.type === "back_forward" && this.savedScroll() > 0) {
        this.ScrollPending = true;
      }
    },
    cacheKey() {
      return [
        "yorksu-events-list",
        this.siteid,
        this.typeid,
        this.excludedTags,
      ].join(":");
    },
    readCache() {
      try {
        const saved = JSON.parse(storageGet(this.cacheKey()));
        if (
          saved &&
          Array.isArray(saved.events) &&
          Date.now() - saved.time < CACHE_MAX_AGE
        ) {
          return saved.events;
        }
      } catch {
        // bad or missing cache, just load normally
      }
      return null;
    },
    // Only the fields the tiles and type pills use, to keep it small
    writeCache() {
      if (this.Search.length >= 2) {
        return;
      }
      const events = this.Events.map((event) => ({
        id: event.id,
        event_id: event.event_id,
        url_name: event.url_name,
        event_date_title: event.event_date_title,
        thumbnail_url: event.thumbnail_url,
        start_date: event.start_date,
        group: event.group,
        venue: event.venue,
        categories: event.categories,
        type: event.type ? { id: event.type.id } : null,
      }));
      storageSet(
        this.cacheKey(),
        JSON.stringify({ time: Date.now(), events: events }),
      );
    },
    // If events were removed, don't stay on a page that no longer exists
    clampPage() {
      if (this.CurrentPage > this.TotalPages) {
        this.CurrentPage = this.TotalPages;
      }
    },
    saveScroll() {
      storageSet(
        SCROLL_KEY,
        JSON.stringify({ url: this.pageUrl(), y: window.scrollY }),
      );
    },
    pageUrl() {
      return window.location.pathname + window.location.search;
    },
    // The saved scroll position, but only if it was saved for this exact URL
    savedScroll() {
      try {
        const saved = JSON.parse(storageGet(SCROLL_KEY));
        if (saved && saved.url === this.pageUrl() && saved.y > 0) {
          return saved.y;
        }
      } catch {
        // nothing usable saved
      }
      return 0;
    },
    restoreScroll() {
      if (!this.ScrollPending) {
        return;
      }
      this.ScrollPending = false;
      const y = this.savedScroll();
      if (y > 0) {
        window.scrollTo(0, y);
        // images can still be pushing the page taller, so check once more
        setTimeout(() => {
          if (Math.abs(window.scrollY - y) > 20) {
            window.scrollTo(0, y);
          }
        }, 300);
      }
    },
    // Keeps ?events_page, ?events_type and ?events_search in the address bar
    // (replaced, not pushed, so the back button leaves the page)
    syncUrl() {
      if (!this.PagedShortView) {
        return;
      }
      try {
        const url = new URL(window.location.href);
        const set = (key, value) => {
          if (value) {
            url.searchParams.set(key, value);
          } else {
            url.searchParams.delete(key);
          }
        };
        set("events_page", this.CurrentPage > 1 ? this.CurrentPage : "");
        set("events_type", this.TypeFilter);
        set("events_search", this.Search);
        window.history.replaceState(window.history.state, "", url);
      } catch {
        // the URL is a nice to have, never break the list over it
      }
    },
    setTypeFilter(id) {
      this.TypeFilter = id;
      this.CurrentPage = 1;
      this.syncUrl();
    },
    /**
     * Fetch events from API
     * @param bool append - are we getting more events to append to the current list?
     */
    getEvents: function (append = false) {
      let self = this;
      self.firstPagePremium = false;
      // Only the newest request may update the list, so a slow earlier
      // response (e.g. from typing in search) can't overwrite a newer one
      const requestId = ++self.LatestRequest;
      self.LoadFailed = false;

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
      // typeid can be comma-separated on ShortView pages (e.g. GIAG's typeid
      // prop). One request per type ID, merged below, since the API ignores
      // a plural typeIds= param. The full /events view's own Category filter
      // is single-select, so its value is left untouched here.
      let typeIds = [];
      if (self.ShortView && self.SelectedType) {
        typeIds = String(self.SelectedType)
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean);
        if (typeIds.length === 1) {
          parameters += "&typeId=" + typeIds[0];
        }
      } else if (self.SelectedType) {
        parameters += "&typeId=" + self.SelectedType;
      }
      if (self.SelectedGroup) {
        parameters += "&groupId=" + self.SelectedGroup;
      }
      if (self.SelectedVenue) {
        parameters += "&venueId=" + self.SelectedVenue;
      }
      if (self.Search && self.Search.length >= 2) {
        parameters +=
          "&eventDateTitleSearchTerm=" + encodeURIComponent(self.Search);
      }
      if (self.premiumResults) {
        parameters += "&onlyPremium=1";
      }
      if (self.SelectedTag) {
        parameters += "&categoryId=" + self.SelectedTag;
      }
      //if we're on the first page, get the premium events first
      // Skip this for multi-type ShortView requests: parameters carries no
      // typeId there (each per-type request adds its own below), so it can
      // match this baseline by coincidence and fire an unrelated fetch.
      const firstPagePremium =
        typeIds.length <= 1 &&
        parameters ==
          "sortBy=start_date&futureOrOngoing=1&page=1" +
            "&perPage=" +
            self.PerPage;
      self.firstPagePremium = firstPagePremium;

      // Returns the premium events once loaded, or null if this isn't a
      // first-page-premium request. Awaited below alongside the main fetch,
      // not fired standalone, so filtering never runs against a stale
      // self.PremiumEvents from before this data actually arrived.
      const premiumEventsPromise = firstPagePremium
        ? Promise.all([
            axios.get(
              "https://pluto.sums.digital/api/events?onlyPremium=1&typeId=4&" +
                parameters,
              {
                headers: {
                  "X-Site-Id": self.siteid,
                },
              },
            ),
            axios.get(
              "https://pluto.sums.digital/api/events?onlyPremium=1&typeId=37&" +
                parameters,
              {
                headers: {
                  "X-Site-Id": self.siteid,
                },
              },
            ),
          ]).then(function (responses) {
            const premiumEvents = responses[0].data.data.concat(
              responses[1].data.data,
            );
            premiumEvents.sort(
              (a, b) => new Date(a.start_date) - new Date(b.start_date),
            );
            return premiumEvents;
          })
        : Promise.resolve(null);

      // Every page of the excluded events, so the exclusion still works if
      // more than 200 events ever carry the tag
      const excludedTagsPromise = self.excludedTags
        ? fetchAllPages(function (page) {
            return axios.get(
              "https://pluto.sums.digital/api/events?" +
                "sortBy=start_date&futureOrOngoing=1&page=" +
                page +
                "&perPage=200&categoryIds=" +
                self.excludedTags,
              {
                headers: {
                  "X-Site-Id": self.siteid,
                },
              },
            );
          })
        : Promise.resolve(null);

      // Fetches every page of one type's events. Multi-type ShortView pages
      // have no server-side pagination (results are merged client-side), so
      // asking for a single page of PerPage would silently drop the rest.
      // A limit prop keeps its old meaning: one small page, no looping.
      const fetchAllForType = function (id) {
        return fetchAllPages(
          function (page) {
            let pageParams = parameters.replace(/&page=\d+/, "&page=" + page);
            if (!self.limit) {
              pageParams = pageParams.replace(/&perPage=\d+/, "&perPage=200");
            }
            return axios.get(
              "https://pluto.sums.digital/api/events?" +
                pageParams +
                "&typeId=" +
                id,
              {
                headers: {
                  "X-Site-Id": self.siteid,
                },
              },
            );
          },
          self.limit ? 1 : 50,
        );
      };

      //get the rest of the events, one request per type ID if more than one is set
      const mainEventsPromise =
        typeIds.length > 1
          ? Promise.all(typeIds.map(fetchAllForType)).then(function (lists) {
              let merged = [];
              let seenIds = {};
              lists.forEach(function (list) {
                list.forEach(function (event) {
                  if (!seenIds[event.id]) {
                    seenIds[event.id] = true;
                    merged.push(event);
                  }
                });
              });
              merged.sort(
                (a, b) => new Date(a.start_date) - new Date(b.start_date),
              );
              // typeIds only has more than one entry in ShortView (see the
              // gate above), and ShortView never renders Pagination, so
              // there's no next page to track here.
              return {
                data: {
                  data: merged,
                  next_page_url: null,
                  prev_page_url: null,
                },
              };
            })
          : axios.get("https://pluto.sums.digital/api/events?" + parameters, {
              headers: {
                "X-Site-Id": self.siteid,
              },
            });

      Promise.all([
        excludedTagsPromise,
        mainEventsPromise,
        premiumEventsPromise,
      ])
        .then(function (results) {
          if (requestId !== self.LatestRequest) {
            return;
          }
          const excludedEvents = results[0];
          const response = results[1];
          const premiumEvents = results[2];
          self.excludedTaggedEvents = excludedEvents || [];
          if (firstPagePremium) {
            self.PremiumEvents = premiumEvents;
            const premiumEventIds = premiumEvents.map((event) => event.id);
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
          if (self.PagedShortView) {
            self.clampPage();
            self.writeCache();
            self.$nextTick(self.restoreScroll);
          }
        })
        .catch(function (error) {
          console.error("Failed to load events", error);
          if (requestId === self.LatestRequest) {
            self.Loading = false;
            self.LoadFailed = true;
          }
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
      this.CurrentPage = 1;
      this.syncUrl();
      if (this.ShortView) {
        // wait for a pause in typing, the list is refetched in full
        clearTimeout(this.SearchTimer);
        this.SearchTimer = setTimeout(() => this.getEvents(), 250);
      } else {
        this.getEvents();
      }
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
    toggleViewMode(mode) {
      this.viewMode = mode;
    },
    goToPage(page) {
      if (page < 1 || page > this.TotalPages) {
        return;
      }
      this.CurrentPage = page;
      this.syncUrl();
      // Bring the top of the component back into view after changing page
      this.$nextTick(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
        this.$el.scrollIntoView({
          behavior: reduce.matches ? "auto" : "smooth",
        });
      });
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
    // Type IDs from the typeid prop, only in ShortView. Same split logic
    // as getEvents(), kept separate so the template can use it without
    // depending on getEvents() having already run.
    ShortViewTypeIds() {
      if (!this.ShortView || !this.typeid) {
        return [];
      }
      return String(this.typeid)
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    },
    TypeFilterOptions() {
      return this.ShortViewTypeIds.map((id) => ({
        id: id,
        name: EVENT_TYPE_LABELS[id] || "Type " + id,
      }));
    },
    // Events after the type filter pills, if any are set. Client-side only,
    // since all types are already fetched and merged in getEvents(). Falls
    // back to Events unchanged when no filter is active, so this is safe to
    // use anywhere Events was used before.
    DisplayedEvents() {
      if (!this.TypeFilter) {
        return this.Events;
      }
      return this.Events.filter((event) => {
        return event.type && String(event.type.id) === String(this.TypeFilter);
      });
    },
    // Multi-type ShortView pages fetch everything, so they page client-side.
    // Every other ShortView keeps rendering exactly what the API returned.
    PagedShortView() {
      return this.ShortViewTypeIds.length > 1 && !this.limit;
    },
    VisibleEvents() {
      if (!this.PagedShortView) {
        return this.DisplayedEvents;
      }
      const start = (this.CurrentPage - 1) * this.PerPage;
      return this.DisplayedEvents.slice(start, start + this.PerPage);
    },
    TotalPages() {
      return Math.max(1, Math.ceil(this.DisplayedEvents.length / this.PerPage));
    },
    // Page buttons: 1 and the last page always, plus two either side of the
    // current page, with "..." filling any gap of two or more.
    PageNumbers() {
      const total = this.TotalPages;
      const current = this.CurrentPage;
      const items = [];
      let last = 0;
      for (let p = 1; p <= total; p++) {
        if (p === 1 || p === total || Math.abs(p - current) <= 2) {
          if (p - last === 2) {
            items.push(p - 1);
          } else if (p - last > 1) {
            items.push("...");
          }
          items.push(p);
          last = p;
        }
      }
      return items;
    },
  },
};
</script>
