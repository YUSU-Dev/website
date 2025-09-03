<template>
  <div class="bg-mustard flex justify-center overflow-x-hidden">
    <div class="max:banner-container w-full">
      <vueper-slides
        ref="vueperSlides"
        :key="slidesKey"
        class="no-shadow carousel-slides"
        :autoplay="autoplayEnabled"
        :duration="interval"
        :touchable="true"
        :bullets="false"
        :arrows="false"
        :pause-on-hover="false"
        :pause-on-touch="false"
        @autoplay-pause="onAutoplayPause"
        @autoplay-resume="onAutoplayResume"
        @ready="onVueperSlidesReady"
        :fixed-height="'400px'"
        :dragging-distance="70"
      >
        <vueper-slide
          v-for="(banner, index) in banners"
          :key="index"
          :image="banner.img"
          :link="banner.url"
        >
        </vueper-slide>
      </vueper-slides>
    </div>
  </div>
  <div class="bg-[#f7f7f7]">
    <div class="banner-container mx-auto h-10">
      <div v-if="banners.length > 1" class="flex justify-center gap-x-4 py-2">
        <button @click="prev()" aria-label="Previous slide">
          <FontAwesomeIcon
            icon="fas fa-arrow-left"
            class="h-6 w-6"
          ></FontAwesomeIcon>
        </button>
        <button v-if="playing" aria-label="Stop slide" @click="stopSlide()">
          <FontAwesomeIcon
            icon="fas fa-pause"
            class="h-6 w-6"
          ></FontAwesomeIcon>
        </button>
        <button v-else @click="startSlide()" aria-label="Start Slide">
          <FontAwesomeIcon icon="fas fa-play" class="h-6 w-6"></FontAwesomeIcon>
        </button>
        <button @click="next()" aria-label="Next slide">
          <FontAwesomeIcon
            icon="fas fa-arrow-right"
            class="h-6 w-6"
          ></FontAwesomeIcon>
        </button>
      </div>
    </div>
  </div>
</template>
<style>
@import "https://cdn.jsdelivr.net/npm/vueperslides@3.6.0/dist/vueperslides.min.css";
</style>
<script>
import axios from "../../_common/axios.mjs";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faArrowRight,
  faPause,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { VueperSlides, VueperSlide } from "vueperslides";

library.add(faArrowLeft, faArrowRight, faPause, faPlay);

export default {
  components: {
    FontAwesomeIcon,
    VueperSlides,
    VueperSlide,
  },
  props: {
    interval: {
      type: Number,
      default: 6000,
    },
  },
  data() {
    return {
      autoplayEnabled: true,
      playing: true,
      banners: [],
      slidesKey: 0,
    };
  },
  async created() {
    this.getBanners();
  },
  mounted() {
    this.playing = true;
    this.autoplayEnabled = true;
  },
  methods: {
    getBanners: function () {
      axios
        .get("https://yorksu.org/api/banners/homepage-carousel")
        .then((response) => {
          if (response.data.length) {
            var cleanedData = response.data
              .replace("{banners}", "[")
              .replace("{/banners}", "]")
              .replace(/,\s*]/, "]");
            var jsonData = JSON.parse(cleanedData);
            this.banners = jsonData;

            this.$nextTick(() => {
              if (this.$refs.vueperSlides && this.banners.length > 1) {
                this.autoplayEnabled = true;
                this.playing = true;
                this.$refs.vueperSlides.resumeAutoplay();
              }
            });
            this.slidesKey += 1;
          }
        });
    },
    startSlide: function () {
      this.autoplayEnabled = true;
      this.playing = true;
      if (this.$refs.vueperSlides) {
        this.$refs.vueperSlides.resumeAutoplay();
      }
    },
    stopSlide: function () {
      this.autoplayEnabled = false;
      this.playing = false;
      if (this.$refs.vueperSlides) {
        this.$refs.vueperSlides.pauseAutoplay();
      }
    },
    next: function () {
      if (this.$refs.vueperSlides) {
        this.$refs.vueperSlides.next();
      }
    },
    prev: function () {
      if (this.$refs.vueperSlides) {
        this.$refs.vueperSlides.previous();
      }
    },
    onVueperSlidesReady: function () {
      this.playing = true;
      this.autoplayEnabled = true;
    },
    onAutoplayPause: function () {
      this.playing = false;
    },
    onAutoplayResume: function () {
      this.playing = true;
    },
  },
};
</script>
