<template>
  <div class="py-10">
    <button
      class="btn-primary rounded p-4 transition-[width] duration-1000 ease-in-out"
      :class="menuOpen ? 'w-full rounded-b-none' : 'w-48'"
      @click="menuOpen = !menuOpen"
    >
      {{ title }} menu
    </button>
    <div
      class="overflow-hidden rounded-b border bg-[#f7f7f7] transition-all duration-1000 ease-in-out"
      :class="
        menuOpen
          ? 'max-h-[100vh] w-full'
          : 'aria-hidden max-h-0 w-48 border-none'
      "
    >
      <iframe
        v-if="menu"
        :src="pdfUrl"
        class="aspect-[4/5] max-h-[90vh] min-h-[50vh] w-full"
        :aria-label="`${title} menu`"
      />
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
          menu: "https://assets-cdn.sums.su/YU/Evening_Menu_Online.pdf",
        },
      ],
      menuOpen: false,
    };
  },
  computed: {
    menu() {
      const menu = this.menus.find((m) => m.title === this.title);
      return menu ? menu.menu : null;
    },
    pdfUrl() {
      if (!this.menu) return null;
      return `${this.menu}#view=FitH&zoom=page-width`;
    },
  },
};
</script>
