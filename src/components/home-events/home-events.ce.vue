<template>
  <section class="py-10" aria-labelledby="home-events-title">
    <div class="mb-5 flex flex-wrap items-baseline justify-between gap-x-4">
      <h2 id="home-events-title" class="m-0 text-2xl font-bold lg:text-3xl">
        {{ showingFallback ? "Coming up" : title }}
      </h2>
      <a
        :href="allEventsUrl"
        class="font-semibold text-black underline underline-offset-4"
      >
        All events
      </a>
    </div>

    <div v-if="loading" class="grid gap-5 lg:grid-cols-[280px_1fr]">
      <div class="h-72 animate-pulse rounded-2xl bg-slate-200"></div>
      <div class="flex flex-col gap-2">
        <div
          v-for="n in 4"
          :key="n"
          class="h-[72px] animate-pulse rounded-xl bg-slate-200"
        ></div>
      </div>
    </div>

    <p v-else-if="failed" class="m-0">
      We couldn't load events just now.
      <a :href="allEventsUrl" class="font-semibold underline">
        See all events
      </a>
    </p>

    <div v-else class="grid items-start gap-5 lg:grid-cols-[280px_1fr]">
      <div class="rounded-2xl bg-[#231f20] p-5 text-white">
        <p
          class="text-mustard m-0 mb-3 text-lg font-bold tracking-wide uppercase"
        >
          {{ monthLabel }}
        </p>
        <div class="mb-1 grid grid-cols-7 gap-1" aria-hidden="true">
          <span
            v-for="d in weekdays"
            :key="d"
            class="py-1 text-center text-[10px] font-bold text-white/50 uppercase"
          >
            {{ d }}
          </span>
        </div>
        <div class="grid grid-cols-7 gap-1">
          <span
            v-for="n in leadingBlanks"
            :key="'b' + n"
            aria-hidden="true"
          ></span>
          <template v-for="cell in monthCells" :key="cell.key">
            <button
              v-if="cell.count"
              type="button"
              class="relative flex aspect-square cursor-pointer items-center justify-center rounded-lg border-0 text-xs font-semibold transition motion-reduce:transition-none"
              :class="dayClass(cell)"
              :aria-pressed="selectedDay === cell.key"
              :aria-label="dayLabel(cell)"
              @click="toggleDay(cell.key)"
            >
              {{ cell.day }}
              <span
                class="absolute bottom-1 h-1 w-1 rounded-full"
                :class="cell.today ? 'bg-black' : 'bg-mustard'"
              ></span>
            </button>
            <span
              v-else
              class="flex aspect-square items-center justify-center rounded-lg text-xs"
              :class="
                cell.today ? 'bg-mustard font-bold text-black' : 'text-white/50'
              "
              :aria-label="cell.today ? cell.day + ', today' : null"
            >
              {{ cell.day }}
            </span>
          </template>
        </div>
      </div>

      <div>
        <p
          v-if="selectedDay"
          class="m-0 mb-3 flex items-center justify-between text-sm font-semibold"
        >
          <span>{{ selectedDayLabel }}</span>
          <button
            type="button"
            class="cursor-pointer border-0 bg-transparent p-0 font-semibold underline underline-offset-4"
            @click="selectedDay = null"
          >
            Show all
          </button>
        </p>

        <ul
          v-if="visibleEvents.length"
          class="m-0 flex list-none flex-col gap-2 p-0"
        >
          <li
            v-for="event in visibleEvents"
            :key="event.id"
            class="hover:border-mustard flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 transition motion-reduce:transition-none"
          >
            <div
              class="bg-mustard flex h-[52px] w-[46px] shrink-0 flex-col items-center justify-center rounded-lg"
              aria-hidden="true"
            >
              <span class="text-xl leading-none font-black">{{
                event.dayNum
              }}</span>
              <span class="text-[10px] font-bold uppercase">{{
                event.monthShort
              }}</span>
            </div>
            <div class="min-w-0 flex-1">
              <p
                v-if="event.label"
                class="m-0 truncate text-[11px] font-bold tracking-wide text-gray-600 uppercase"
              >
                {{ event.label }}
              </p>
              <a
                :href="event.url"
                class="block truncate font-semibold text-black no-underline"
              >
                {{ event.title }}
              </a>
              <p class="m-0 truncate text-sm text-gray-700">
                <span v-if="event.venue">{{ event.venue }} · </span
                >{{ event.time
                }}<span
                  v-if="event.free"
                  class="text-advice-green font-semibold"
                >
                  · Free</span
                ><span v-else-if="event.price" class="font-semibold">
                  · {{ event.price }}</span
                >
              </p>
            </div>
            <div class="flex shrink-0 items-center gap-2">
              <a
                :href="event.url"
                class="hidden rounded-full border border-black px-4 py-1.5 text-sm font-semibold text-black no-underline hover:bg-black hover:text-white sm:inline-block"
                :aria-label="'View ' + event.title"
              >
                View
              </a>
              <a
                v-if="event.bookable"
                :href="event.url"
                class="rounded-full bg-black px-4 py-1.5 text-sm font-semibold text-white no-underline hover:bg-gray-800"
                :aria-label="'Book ' + event.title"
              >
                Book
              </a>
              <a
                v-else
                :href="event.url"
                class="rounded-full bg-black px-4 py-1.5 text-sm font-semibold text-white no-underline hover:bg-gray-800 sm:hidden"
                :aria-label="'View ' + event.title"
              >
                View
              </a>
            </div>
          </li>
        </ul>
        <p v-else class="m-0">
          Nothing on this day.
          <a :href="allEventsUrl" class="font-semibold underline">
            See all events
          </a>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "../../_common/axios.mjs";

const TZ = "Europe/London";
const GENERIC_CATEGORY_IDS = [426, 431, 409];

const dayFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const timeFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: TZ,
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});
const monthShortFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: TZ,
  month: "short",
});

function dayKey(date) {
  return dayFormat.format(date);
}

function addDays(key, n) {
  const [y, m, d] = key.split("-").map(Number);
  return dayKey(new Date(Date.UTC(y, m - 1, d + n, 12)));
}

function formatTime(date) {
  return timeFormat.format(date);
}

export default {
  props: {
    siteid: { type: String, default: null },
    typeid: { type: String, default: "4" },
    title: { type: String, default: "What's on" },
    days: { type: Number, default: 7 },
    limit: { type: Number, default: 6 },
    fallbackCount: { type: Number, default: 4 },
    allEventsUrl: { type: String, default: "/events" },
  },
  data() {
    return {
      events: [],
      loading: true,
      failed: false,
      selectedDay: null,
      today: dayKey(new Date()),
      weekdays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    };
  },
  computed: {
    prepared() {
      const today = this.today;
      return this.events
        .filter((event) => !event.unlisted)
        .map((event) => {
          const start = new Date(event.start_date);
          let key = dayKey(start);
          if (key < today) {
            key = today;
          }
          const category = (event.categories || []).find(
            (c) => !GENERIC_CATEGORY_IDS.includes(c.id),
          );
          const price = parseFloat(event.from_price);
          const free =
            (event.categories || []).some((c) => c.id === 431) || price === 0;
          return {
            id: event.id,
            key,
            title: event.title,
            url: "/events/id/" + event.event_id + "-" + event.url_name,
            dayNum: Number(key.slice(8, 10)),
            monthShort: monthShortFormat.format(new Date(key + "T12:00:00Z")),
            time: formatTime(start),
            venue: event.venue && event.venue.name,
            label: category && category.name,
            free,
            price: price > 0 ? "£" + price.toFixed(price % 1 ? 2 : 0) : null,
            bookable: !!event.has_products && event.product_count > 0,
          };
        });
    },
    weekEvents() {
      const last = addDays(this.today, this.days - 1);
      return this.prepared.filter((e) => e.key <= last);
    },
    showingFallback() {
      return !this.loading && !this.failed && this.weekEvents.length === 0;
    },
    baseEvents() {
      if (this.weekEvents.length) {
        return this.weekEvents;
      }
      return this.prepared.slice(0, this.fallbackCount);
    },
    visibleEvents() {
      const list = this.selectedDay
        ? this.prepared.filter((e) => e.key === this.selectedDay)
        : this.baseEvents;
      return list.slice(0, this.limit);
    },
    countsByDay() {
      const counts = {};
      this.prepared.forEach((e) => {
        counts[e.key] = (counts[e.key] || 0) + 1;
      });
      return counts;
    },
    monthParts() {
      const [y, m] = this.today.split("-").map(Number);
      return { y, m };
    },
    monthLabel() {
      const { y, m } = this.monthParts;
      return new Intl.DateTimeFormat("en-GB", {
        timeZone: "UTC",
        month: "long",
        year: "numeric",
      }).format(new Date(Date.UTC(y, m - 1, 1)));
    },
    leadingBlanks() {
      const { y, m } = this.monthParts;
      const sunFirst = new Date(Date.UTC(y, m - 1, 1)).getUTCDay();
      return (sunFirst + 6) % 7;
    },
    monthCells() {
      const { y, m } = this.monthParts;
      const total = new Date(Date.UTC(y, m, 0)).getUTCDate();
      const cells = [];
      for (let d = 1; d <= total; d++) {
        const key =
          y +
          "-" +
          String(m).padStart(2, "0") +
          "-" +
          String(d).padStart(2, "0");
        cells.push({
          key,
          day: d,
          count: key >= this.today ? this.countsByDay[key] || 0 : 0,
          today: key === this.today,
        });
      }
      return cells;
    },
    selectedDayLabel() {
      if (!this.selectedDay) {
        return "";
      }
      return new Intl.DateTimeFormat("en-GB", {
        timeZone: "UTC",
        weekday: "long",
        day: "numeric",
        month: "long",
      }).format(new Date(this.selectedDay + "T12:00:00Z"));
    },
  },
  created() {
    this.loadEvents();
  },
  methods: {
    loadEvents() {
      const params =
        "sortBy=start_date&futureOrOngoing=1&page=1&perPage=100&typeId=" +
        this.typeid;
      axios
        .get("https://pluto.sums.digital/api/events?" + params, {
          headers: { "X-Site-Id": this.siteid },
        })
        .then((response) => {
          this.events = response.data.data || [];
          this.loading = false;
        })
        .catch((error) => {
          console.error("Failed to load home events", error);
          this.failed = true;
          this.loading = false;
        });
    },
    toggleDay(key) {
      this.selectedDay = this.selectedDay === key ? null : key;
    },
    dayClass(cell) {
      if (this.selectedDay === cell.key) {
        return "bg-white text-black";
      }
      if (cell.today) {
        return "bg-mustard text-black";
      }
      return "bg-transparent text-white hover:bg-white/10";
    },
    dayLabel(cell) {
      const n = cell.count;
      return (
        cell.day +
        (cell.today ? ", today" : "") +
        ", " +
        n +
        (n === 1 ? " event" : " events")
      );
    },
  },
};
</script>
