<template>
  <div class="flex justify-center">
    <div class="w-full max:container">
      <transition-group
        :name="transition"
        tag="div"
        class="relative flex h-[400px] justify-center"
      >
        <div v-for="i in [currentIndex]" :key="i" class="absolute">
          <a :href="banners[currentIndex].url">
            <img
              :src="banners[currentIndex].img"
              :alt="banners[currentIndex].alt"
              class="h-[400px] object-cover"
            />
          </a>
        </div>
      </transition-group>
    </div>
  </div>
  <div class="bg-[#f7f7f7]">
    <div class="container mx-auto">
      <div class="flex justify-center gap-x-4 py-2">
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
library.add(faArrowLeft, faArrowRight, faPause, faPlay);
export default {
  components: {
    FontAwesomeIcon,
  },
  props: {
    interval: {
      type: Number,
      default: 5000,
    },
    defaultBanner: {
      type: Object,
      default() {
        return {
          url: "https://www.youtube.com/watch?v=c_hUsm0W7eg&t=5s",
          img: "https://assets-cdn.sums.su/YU/IMG/Freshers2022/welcome.png",
          alt: "Welcome! We're your Students' Union - here to make sure you love your time at York",
        };
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
      timer: null,
      transition: "slide-next",
      playing: true,
      banners: [],
    };
  },
  async created() {
    this.banners.push(this.defaultBanner);
    this.getBanners();
  },
  async mounted() {
    this.startSlide();
  },
  updated() {},
  methods: {
    getBanners: function () {
      axios
        .get("https://yu-development.sums.su/api/banners/homepage-carousel")
        .then((response) => {
          var jsonData = JSON.parse(
            "[" +
              response.data.substring(0, response.data.lastIndexOf(",")) +
              "]",
          );
          this.banners.push(...jsonData);
        });
    },
    startSlide: function () {
      this.timer = setInterval(this.next, this.interval);
      this.playing = true;
    },
    stopSlide: function () {
      clearInterval(this.timer);
      this.playing = false;
    },
    next: function () {
      this.transition = "slide-next";
      if (this.currentIndex === this.banners.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex += 1;
      }
    },
    prev: function () {
      this.transition = "slide-prev";
      if (this.currentIndex === 0) {
        this.currentIndex = this.banners.length - 1;
      } else {
        this.currentIndex -= 1;
      }
    },
  },
};
</script>
