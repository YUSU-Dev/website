<template>
  <div class="flex flex-col gap-y-4 py-10" v-if="matchingMenus.length > 0">
    <div v-for="(menuItem, index) in matchingMenus" :key="index">
      <button
        :id="getButtonId(index)"
        class="btn-primary rounded p-4 transition-[width] duration-500 ease-in-out"
        :class="openMenus[index] ? 'w-full rounded-b-none' : 'w-48'"
        @click="toggleMenu(index)"
        :aria-expanded="openMenus[index]"
        :aria-controls="getMenuContentId(index)"
        :aria-label="`${openMenus[index] ? 'Close' : 'Open'} ${menuItem.displayName}`"
        type="button"
      >
        {{ menuItem.displayName }}
      </button>
      <div
        :id="getMenuContentId(index)"
        class="relative overflow-hidden rounded-b border bg-[#f7f7f7] transition-all duration-500 ease-in-out"
        :class="
          openMenus[index] ? 'max-h-[100vh] w-full' : 'max-h-0 w-48 border-none'
        "
        :aria-hidden="!openMenus[index]"
        :aria-labelledby="getButtonId(index)"
      >
        <div
          v-show="loadingIframes[index]"
          class="absolute inset-0 z-10 flex min-h-[50vh] items-center justify-center bg-[#f7f7f7]"
        >
          <div class="flex flex-col items-center gap-4">
            <div
              class="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"
            ></div>
            <p class="text-gray-600">Loading menu...</p>
          </div>
        </div>

        <!-- sandbox has no allow-downloads, so the viewer can never save files -->
        <iframe
          v-if="menuItem.url && startedIframes[index] && !failedIframes[index]"
          :key="attempts[index]"
          :src="getPdfUrl(menuItem.url)"
          :title="`${menuItem.displayName} PDF`"
          class="aspect-[4/5] max-h-[90vh] min-h-[50vh] w-full"
          :aria-label="`${menuItem.displayName} menu`"
          :tabindex="openMenus[index] ? '0' : '-1'"
          sandbox="allow-scripts allow-same-origin allow-popups"
          allow="fullscreen"
          scrolling="yes"
          @load="onIframeLoad(index)"
        />

        <div
          v-if="failedIframes[index]"
          class="flex min-h-[30vh] flex-col items-center justify-center gap-4 p-6 text-center"
        >
          <p class="text-gray-600">We couldn't load the menu preview.</p>
          <a
            :href="menuItem.url"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary rounded p-4"
          >
            Open {{ menuItem.displayName }} (PDF)
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VenueMenu",
  props: {
    title: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      menus: [
        {
          title: "The Courtyard",
          buttonName: "The Courtyard Menu",
          menu: "https://assets-cdn.sums.digital/YU/Venues/Menus/Courtyard_2627_Online.pdf",
        },
        {
          title: "The Glasshouse",
          buttonName: "The Glasshouse Menu",
          menu: "https://assets-cdn.sums.digital/YU/Venues/Menus/Glasshouse_2627_Online.pdf",
        },
        {
          title: "The Kitchen",
          buttonName: "The Kitchen Menu",
          menu: "https://assets-cdn.sums.digital/YU/Venues/Menus/kitchen_Menu_2627_Online.pdf",
        },
        {
          title: "The Vanbrugh Arms",
          buttonName: "The Vanbrugh Arms Menu",
          menu: "https://assets-cdn.sums.digital/YU/Venues/Menus/CY_Menu_EVENING_2025VA.pdf",
        },
      ],
      openMenus: {},
      retryTimers: {},
      attempts: {},
      startedIframes: {},
      loadedIframes: {},
      loadingIframes: {},
      failedIframes: {},
      maxAttempts: 3,
      attemptTimeout: 6000,
    };
  },
  computed: {
    matchingMenus() {
      const matches = this.menus.filter((m) => m.title === this.title);
      return matches.map((match) => ({
        ...match,
        url: match.menu,
        displayName: match.buttonName || match.title,
      }));
    },
  },
  methods: {
    toggleMenu(index) {
      this.openMenus = {
        ...this.openMenus,
        [index]: !this.openMenus[index],
      };
      // Load the viewer on first open only
      if (this.openMenus[index] && !this.startedIframes[index]) {
        this.startLoading(index);
      }
    },
    getPdfUrl(menuUrl) {
      if (!menuUrl) return null;
      return `https://drive.google.com/viewerng/viewer?embedded=true&url=${menuUrl}#view=FitH&zoom=page-width`;
    },
    getMenuContentId(index) {
      return `menu-content-${this.title?.toLowerCase().replace(/\s+/g, "-") || "default"}-${index}`;
    },
    getButtonId(index) {
      return `menu-button-${this.title?.toLowerCase().replace(/\s+/g, "-") || "default"}-${index}`;
    },
    startLoading(index) {
      this.startedIframes = { ...this.startedIframes, [index]: true };
      this.loadingIframes = { ...this.loadingIframes, [index]: true };
      this.attempts = { ...this.attempts, [index]: 1 };
      this.waitForLoad(index);
    },
    waitForLoad(index) {
      clearTimeout(this.retryTimers[index]);
      this.retryTimers[index] = setTimeout(() => {
        if (this.loadedIframes[index]) return;
        if (this.attempts[index] < this.maxAttempts) {
          // New key remounts the iframe, which retries the viewer
          this.attempts = {
            ...this.attempts,
            [index]: this.attempts[index] + 1,
          };
          this.waitForLoad(index);
        } else {
          this.failedIframes = { ...this.failedIframes, [index]: true };
          this.loadingIframes = { ...this.loadingIframes, [index]: false };
        }
      }, this.attemptTimeout);
    },
    onIframeLoad(index) {
      clearTimeout(this.retryTimers[index]);
      delete this.retryTimers[index];
      this.loadedIframes[index] = true;
      this.loadingIframes = { ...this.loadingIframes, [index]: false };
    },
  },
  beforeUnmount() {
    Object.values(this.retryTimers).forEach((timer) => {
      clearTimeout(timer);
    });
  },
};
</script>
