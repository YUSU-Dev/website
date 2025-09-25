<template>
  <div
    class="slideshow flex w-full flex-col gap-y-8 py-10"
    v-if="slides.length"
  >
    <div class="h-[300px] sm:h-[400px] md:h-[600px]">
      <vueper-slides
        ref="mainSlideshow"
        class="no-shadow"
        fixed-height="100%"
        :touchable="false"
        fade
        :arrows="false"
        :autoplay="false"
        :bullets="false"
        @slide="
          currentSlideIndex = $event.currentSlide.index;
          $refs.thumbnailSlideshow &&
            $refs.thumbnailSlideshow.goToSlide($event.currentSlide.index, {
              emit: false,
            });
        "
      >
        <vueper-slide v-for="(slide, index) in slides" :key="index">
          <template #content>
            <div class="slide-image-container">
              <img :src="slide.url" alt="decorative" class="slide-image" />
            </div>
          </template>
        </vueper-slide>
      </vueper-slides>
    </div>
    <div class="flex justify-center" v-if="slides.length > 1">
      <div
        class="transition-width flex w-full justify-between rounded-lg bg-gray-200 px-4 py-2 duration-300 md:w-lg"
      >
        <button
          @click="$refs.mainSlideshow.previous()"
          aria-label="Previous slide"
        >
          <FontAwesomeIcon
            icon="fas fa-arrow-left"
            class="h-6 w-6"
          ></FontAwesomeIcon>
        </button>
        <a :href="slides[currentSlideIndex]?.url" target="_blank">
          <FontAwesomeIcon
            icon="fas fa-up-right-from-square"
            class="h-6 w-6"
          ></FontAwesomeIcon>
        </a>
        <button @click="$refs.mainSlideshow.next()" aria-label="Next slide">
          <FontAwesomeIcon
            icon="fas fa-arrow-right"
            class="h-6 w-6"
          ></FontAwesomeIcon>
        </button>
      </div>
    </div>
    <vueper-slides
      v-if="slides.length > 1"
      :arrows="true"
      arrows-outside
      ref="thumbnailSlideshow"
      class="no-shadow thumbnails"
      @slide="
        currentSlideIndex = $event.currentSlide.index;
        $refs.mainSlideshow &&
          $refs.mainSlideshow.goToSlide($event.currentSlide.index, {
            emit: false,
          });
      "
      :visible-slides="Math.min(slides.length, 5)"
      fixed-height="100px"
      :bullets="false"
      :gap="2"
      :touchable="false"
    >
      <vueper-slide
        v-for="(slide, index) in slides"
        :key="'thumb-' + index"
        @click="$refs.thumbnailSlideshow.goToSlide(index)"
      >
        <template #content>
          <div class="thumbnail-container">
            <img :src="slide.url" alt="decorative" class="thumbnail-image" />
          </div>
        </template>
      </vueper-slide>
    </vueper-slides>
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/vueperslides@3.6.0/dist/vueperslides.min.css";
</style>

<script>
import axios from "../../_common/axios.mjs";
import { VueperSlides, VueperSlide } from "vueperslides";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faArrowRight,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
library.add(faArrowLeft, faArrowRight, faUpRightFromSquare);
export default {
  name: "Slideshow",
  props: {
    folderId: {
      type: String,
      required: true,
    },
  },
  components: {
    FontAwesomeIcon,
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      slides: [],
      currentSlideIndex: 0,
    };
  },
  mounted() {
    this.getSlides();
  },
  methods: {
    getSlides: async function () {
      const response = await axios.get(
        "https://yorksu.org/core-components/documents-api/" + this.folderId,
      );
      this.slides = JSON.parse(response.data.replace(/,\]/g, "]"));
    },
  },
};
</script>
