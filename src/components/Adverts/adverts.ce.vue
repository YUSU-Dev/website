<template>
  <div class="container mx-auto my-10">
    <div class="mx-2 mb-10 flex justify-center text-center">
      <h2 class="text-3xl font-bold">What's on this week</h2>
    </div>
    <div
      class="mx-2 grid grid-cols-2 justify-center gap-x-1 gap-y-1 md:mx-0 md:flex md:flex-wrap"
    >
      <Tile
        class="w-full bg-cover md:w-[282px]"
        v-for="banner in banners"
        :key="banner.alt"
        :url="banner.url"
        :image="banner.img"
        :title="banner.title"
      />
    </div>
  </div>
</template>
<script>
import axios from "../../_common/axios.mjs";
import Tile from "../Tile/tile.ce.vue";
export default {
  components: {
    Tile,
  },
  data() {
    return {
      banners: [],
    };
  },
  async created() {
    this.getBanners();
  },
  updated() {},
  methods: {
    getBanners: function () {
      axios
        .get("https://yu-development.sums.su/api/banners/homepage-whats-on")
        .then((response) => {
          var jsonData = JSON.parse(
            "[" +
              response.data.substring(0, response.data.lastIndexOf(",")) +
              "]",
          );
          this.banners.push(...jsonData);
          if (this.banners.length > 4) {
            this.banners = this.banners.slice(0, 4);
          }
        });
    },
  },
};
</script>
