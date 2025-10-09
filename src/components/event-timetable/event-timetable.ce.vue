<template>
  <div class="timetable">
    <div
      class="mb-6 flex min-h-[100px] flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-lg bg-gray-50 p-4 md:justify-between"
    >
      <button
        @click="goToPreviousWeek"
        :tabindex="currentlyVisible ? '0' : '-1'"
        class="order-2 flex w-[110px] items-center justify-between rounded border bg-white px-3 py-2 hover:bg-gray-50 md:order-1"
      >
        <FontAwesomeIcon icon="fa-arrow-left" class="h-4 w-4" /> Previous
      </button>

      <div class="order-1 w-full text-center md:order-2 md:w-auto">
        <h3 class="text-lg font-semibold">{{ weekLabel }}</h3>
        <button
          v-if="currentWeekOffset !== 0"
          @click="goToCurrentWeek"
          :tabindex="currentlyVisible ? '0' : '-1'"
          class="mt-1 rounded border bg-white px-2 py-1 text-sm hover:bg-gray-50"
        >
          Back to this week
        </button>
      </div>

      <button
        @click="goToNextWeek"
        :tabindex="currentlyVisible ? '0' : '-1'"
        class="order-3 flex w-[110px] items-center justify-between rounded border bg-white px-3 py-2 hover:bg-gray-50"
      >
        Next
        <FontAwesomeIcon
          icon="fa-arrow-right"
          class="h-4 w-4"
        ></FontAwesomeIcon>
      </button>
    </div>

    <div class="grid min-h-[450px] grid-cols-1 gap-4 lg:grid-cols-7">
      <div v-for="day in days" :key="day" class="rounded-lg border p-3">
        <div class="mb-3 text-center">
          <h3 class="font-semibold">{{ day }}</h3>
          <p class="text-sm text-gray-600">
            {{ formatDate(groupedEvents[day].date) }}
          </p>
        </div>

        <div v-if="columnLoadingStates[day]" class="space-y-2">
          <div v-for="n in 3" :key="n" class="animate-pulse">
            <div class="mb-1 h-4 rounded bg-gray-300"></div>
            <div class="h-3 w-3/4 rounded bg-gray-200"></div>
          </div>
        </div>

        <ul v-else-if="groupedEvents[day].events.length" class="space-y-2">
          <li
            v-for="event in groupedEvents[day].events"
            :key="`${event.event_id}-${event.start_date}`"
          >
            <a
              :href="`/events/id/${event.event_id}-${event.url_name}`"
              :tabindex="currentlyVisible ? '0' : '-1'"
              :class="[
                'flex flex-col rounded p-2 text-sm transition-colors duration-200',
                isPastEvent(event.start_date)
                  ? 'bg-gray-100 hover:bg-gray-200'
                  : 'bg-mustard opacity-85 hover:opacity-100',
              ]"
            >
              <div :class="['font-semibold']">
                {{ formatTime(event.start_date) }}
              </div>
              <h4 class="timetable-title">
                {{ event.title }}
              </h4>
            </a>
          </li>
        </ul>
        <p v-else class="py-4 text-center text-xs italic">No events</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../_common/axios.mjs";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowLeft, faArrowRight);
export default {
  name: "EventTimetable",
  components: {
    FontAwesomeIcon,
  },
  props: {
    typeId: {
      type: Number,
      default: null,
    },
    groupId: {
      type: Number,
      default: null,
    },
    venueId: {
      type: Number,
      default: null,
    },
    categoryId: {
      type: Number,
      default: null,
    },
    searchTerm: {
      type: String,
      default: null,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      events: [],
      loadedMonths: [],
      loadingMonths: [],
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      currentWeekOffset: 0,
      searchTimeout: null,
      expandingButtonVisible: null,
    };
  },
  watch: {
    currentWeekOffset: {
      handler() {
        this.$nextTick(() => {
          this.checkAndFetchNewMonths();
        });
      },
    },
    typeId: {
      handler() {
        this.refreshEvents();
      },
    },
    groupId: {
      handler() {
        this.refreshEvents();
      },
    },
    venueId: {
      handler() {
        this.refreshEvents();
      },
    },
    categoryId: {
      handler() {
        this.refreshEvents();
      },
    },
    searchTerm: {
      handler() {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
          this.refreshEvents();
        }, 500);
      },
    },
  },
  computed: {
    currentlyVisible() {
      return this.expandingButtonVisible !== null
        ? this.expandingButtonVisible
        : this.isVisible;
    },
    currentWeekDates() {
      const today = new Date();
      const currentDay = today.getDay();
      const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;

      const monday = new Date(today);
      monday.setDate(
        today.getDate() + mondayOffset + this.currentWeekOffset * 7,
      );

      const dates = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        dates.push(date);
      }
      return dates;
    },

    weekLabel() {
      const startDate = this.currentWeekDates[0];
      const endDate = this.currentWeekDates[6];

      const formatDate = (date) =>
        date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        });

      if (this.currentWeekOffset === 0) {
        return `This Week ${formatDate(startDate)} - ${formatDate(endDate)}`;
      } else if (this.currentWeekOffset === 1) {
        return `Next Week ${formatDate(startDate)} - ${formatDate(endDate)}`;
      } else if (this.currentWeekOffset === -1) {
        return `Last Week ${formatDate(startDate)} - ${formatDate(endDate)}`;
      } else {
        return `${formatDate(startDate)} - ${formatDate(endDate)}`;
      }
    },

    groupedEvents() {
      const groups = {};
      const dateMap = new Map();

      this.currentWeekDates.forEach((date, index) => {
        const dayName = this.days[index];
        const dateStr = date.toDateString();
        groups[dayName] = {
          date: date,
          events: [],
        };
        dateMap.set(dateStr, dayName);
      });

      this.events.forEach((event) => {
        const eventDate = new Date(event.start_date);
        const dayName = dateMap.get(eventDate.toDateString());

        if (dayName && groups[dayName]) {
          groups[dayName].events.push({
            ...event,
            sortTime: eventDate.getTime(),
          });
        }
      });

      Object.keys(groups).forEach((day) => {
        if (groups[day].events.length > 1) {
          groups[day].events.sort((a, b) => a.sortTime - b.sortTime);
        }
      });

      return groups;
    },

    columnLoadingStates() {
      const states = {};
      this.currentWeekDates.forEach((date, index) => {
        const dayName = this.days[index];
        const monthId = date.toISOString().slice(0, 7);
        states[dayName] = this.loadingMonths.includes(monthId);
      });
      return states;
    },
  },
  mounted() {
    this.fetchEvents();

    this.handleExpandingButtonToggle = (event) => {
      this.expandingButtonVisible = event.detail.isExpanded;
    };

    this.$el.addEventListener(
      "expanding-button-toggle",
      this.handleExpandingButtonToggle,
    );
  },
  beforeUnmount() {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.$el.removeEventListener(
      "expanding-button-toggle",
      this.handleExpandingButtonToggle,
    );
  },
  methods: {
    goToPreviousWeek() {
      this.currentWeekOffset--;
    },

    goToNextWeek() {
      this.currentWeekOffset++;
    },

    goToCurrentWeek() {
      this.currentWeekOffset = 0;
    },

    checkAndFetchNewMonths() {
      const requiredMonthIds = [];
      this.currentWeekDates.forEach((date) => {
        const monthId = date.toISOString().slice(0, 7);
        if (!requiredMonthIds.includes(monthId)) {
          requiredMonthIds.push(monthId);
        }
      });

      const needsNewData = requiredMonthIds.some(
        (month) =>
          !this.loadedMonths.includes(month) &&
          !this.loadingMonths.includes(month),
      );

      if (needsNewData) {
        this.fetchEvents();
      }
    },

    isPastEvent(dateStr) {
      const eventDate = new Date(dateStr);
      const now = new Date();
      return eventDate < now;
    },

    formatDate(date) {
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      });
    },

    async fetchEvents() {
      const requiredMonths = [];
      this.currentWeekDates.forEach((date) => {
        const monthId = date.toISOString().slice(0, 7);
        if (!requiredMonths.includes(monthId)) {
          requiredMonths.push(monthId);
        }
      });

      const monthsToFetch = requiredMonths.filter(
        (month) =>
          !this.loadedMonths.includes(month) &&
          !this.loadingMonths.includes(month),
      );

      if (monthsToFetch.length === 0) {
        return;
      }

      monthsToFetch.forEach((month) => {
        if (!this.loadingMonths.includes(month)) {
          this.loadingMonths.push(month);
        }
      });

      const allEvents = [];

      for (const month of monthsToFetch) {
        const eventsForMonth = await this.fetchAllPagesForMonth(month);
        allEvents.push(...eventsForMonth);
      }

      this.events.push(...allEvents);
      this.loadedMonths.push(...monthsToFetch);
      this.loadingMonths = this.loadingMonths.filter(
        (month) => !monthsToFetch.includes(month),
      );
    },

    async fetchAllPagesForMonth(month) {
      const eventsFromAllPages = [];
      let baseUrl = `https://pluto.sums.su/api/events?date=${month}&perPage=100`;

      if (this.typeId) {
        baseUrl += `&typeId=${this.typeId}`;
      }
      if (this.groupId) {
        baseUrl += `&groupId=${this.groupId}`;
      }
      if (this.venueId) {
        baseUrl += `&venueId=${this.venueId}`;
      }
      if (this.categoryId) {
        baseUrl += `&categoryId=${this.categoryId}`;
      }
      if (this.searchTerm && this.searchTerm.length >= 2) {
        baseUrl += `&eventDateTitleSearchTerm=${encodeURIComponent(this.searchTerm)}`;
      }

      let nextPageUrl = baseUrl;

      while (nextPageUrl) {
        const response = await axios.get(nextPageUrl);
        const data = response.data;

        eventsFromAllPages.push(...data.data);
        nextPageUrl = data.next_page_url;
      }

      return eventsFromAllPages;
    },

    formatTime(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    },

    refreshEvents() {
      this.events = [];
      this.loadedMonths = [];
      this.loadingMonths = [];
      this.$nextTick(() => {
        this.fetchEvents();
      });
    },
  },
};
</script>
