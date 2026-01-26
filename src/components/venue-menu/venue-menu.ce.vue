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

        <iframe
          v-if="menuItem.url"
          :ref="`iframe-${index}`"
          :src="getPdfUrl(menuItem.url)"
          :title="`${menuItem.displayName} PDF`"
          class="aspect-[4/5] max-h-[90vh] min-h-[50vh] w-full"
          :aria-label="`${menuItem.displayName} menu`"
          :tabindex="openMenus[index] ? '0' : '-1'"
          allow="fullscreen"
          scrolling="yes"
          @load="onIframeLoad(index)"
        />
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
          buttonName: "The Courtyard Lunch Menu",
          menu: "https://assets-cdn.sums.su/YU/Venues/Menus/Courtyard_Lunch_Menu_Online_2025.pdf",
        },
        {
          title: "The Courtyard",
          buttonName: "The Courtyard Evening Menu",
          menu: "https://assets-cdn.sums.su/YU/Venues/Menus/Courtyard_Evening_Menu_Online_2025.pdf",
        },
        {
          title: "The Glasshouse",
          buttonName: "The Glasshouse Menu",
          menu: "https://assets-cdn.sums.su/YU/Venues/Menus/Glasshouse_Menu_Online_2025.pdf",
        },
        {
          title: "The Kitchen",
          buttonName: "The Kitchen Menu",
          menu: "https://assets-cdn.sums.su/YU/Venues/Menus/Kitchen_Online_Menu_2025.pdf",
        },
        {
          title: "The Vanbrugh Arms",
          buttonName: "The Vanbrugh Arms Menu",
          menu: "https://assets-cdn.sums.su/YU/Venues/Menus/CY_Menu_EVENING_2025VA.pdf",
        },
      ],
      openMenus: {},
      reloadTimers: {},
      loadedIframes: {},
      loadingIframes: {},
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
    startReloadTimer(index) {
      this.loadingIframes = {
        ...this.loadingIframes,
        [index]: true,
      };

      if (this.reloadTimers[index]) {
        clearInterval(this.reloadTimers[index]);
      }

      this.reloadTimers[index] = setInterval(() => {
        const iframeRef = this.$refs[`iframe-${index}`];
        if (iframeRef && iframeRef[0]) {
          const currentSrc = iframeRef[0].src;
          iframeRef[0].src = currentSrc;
        }
      }, 1000);
    },
    onIframeLoad(index) {
      if (this.reloadTimers[index]) {
        clearInterval(this.reloadTimers[index]);
        delete this.reloadTimers[index];
        this.loadedIframes[index] = true;
        this.loadingIframes = {
          ...this.loadingIframes,
          [index]: false,
        };
      }
    },
    initializePdfLoading() {
      this.matchingMenus.forEach((_, index) => {
        if (!this.loadedIframes[index]) {
          this.startReloadTimer(index);
        }
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initializePdfLoading();
    });
  },
  beforeUnmount() {
    Object.values(this.reloadTimers).forEach((timer) => {
      clearInterval(timer);
    });
  },
};
</script>
