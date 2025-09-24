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
        class="overflow-hidden rounded-b border bg-[#f7f7f7] transition-all duration-500 ease-in-out"
        :class="
          openMenus[index] ? 'max-h-[100vh] w-full' : 'max-h-0 w-48 border-none'
        "
        :aria-hidden="!openMenus[index]"
        :aria-labelledby="getButtonId(index)"
      >
        <iframe
          v-if="menuItem.url"
          :src="getPdfUrl(menuItem.url)"
          :title="`${menuItem.displayName} PDF`"
          class="aspect-[4/5] max-h-[90vh] min-h-[50vh] w-full"
          :aria-label="`${menuItem.displayName} menu`"
          :tabindex="openMenus[index] ? '0' : '-1'"
          allow="fullscreen"
          scrolling="yes"
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
          title: "The Kitchen at Alcuin",
          buttonName: "The Kitchen Menu",
          menu: "https://assets-cdn.sums.su/YU/Venues/Menus/Kitchen_Online_Menu_2025.pdf",
        },
      ],
      openMenus: {},
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
  },
};
</script>
