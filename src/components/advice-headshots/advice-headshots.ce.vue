<template>
  <div class="flex flex-col items-center justify-center">
    <div class="mt-10 w-full md:w-[90%]">
      <vueper-slides
        class="no-shadow"
        style="max-width: 100vw"
        :visible-slides="4"
        :slide-ratio="1 / 4"
        :dragging-distance="25"
        :gap="3"
        infinite
        arrows-outside
        @slide="updateActiveSlide"
        :breakpoints="breakpoints"
      >
        <vueper-slide
          v-for="(headshot, index) in headshots"
          :key="index"
          :image="headshot.image"
        >
        </vueper-slide>
      </vueper-slides>
    </div>
    <!-- Active Slide Content Below the Slideshow -->
    <div
      v-if="activeSlide"
      class="flex w-full flex-col gap-2 bg-[#f7f7f7] p-4 md:w-[90%]"
    >
      <h2 class="text-2xl font-bold">{{ activeSlide.name }}</h2>
      <p class="text-lg font-semibold">{{ activeSlide.title }}</p>
      <p class="">{{ activeSlide.personalStatement }}</p>
    </div>
  </div>
</template>
<style>
@import "https://cdn.jsdelivr.net/npm/vueperslides@3.6.0/dist/vueperslides.min.css";
</style>
<script>
import { VueperSlides, VueperSlide } from "vueperslides";

export default {
  name: "AdviceHeadshots",
  components: {
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      headshots: this.shuffle([
        {
          name: "Rich Andrew",
          image:
            "https://assets-cdn.sums.su/YU/website/img/advice/rich-andrew.jpeg",
          title: "Advice & Support Manager",
          personalStatement:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam dictum, ipsum sit amet dignissim finibus, augue nulla varius risus, id tristique lorem augue eget felis. Pellentesque malesuada fringilla mi. Aliquam lacus risus, consectetur et ante ut, molestie pretium lorem. Vestibulum suscipit vehicula mauris et mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc facilisis risus eu purus porttitor, sit amet dignissim mauris volutpat. Mauris pellentesque tempor urna feugiat tempus. Pellentesque mollis id nisl non accumsan. Suspendisse efficitur sit amet purus sed dignissim.",
        },
        {
          name: "Charlotte Renshaw",
          image:
            "https://assets-cdn.sums.su/YU/website/img/advice/charlotte-renshaw.jpeg",
          title: "Advice & Support Development Coordinator",
          personalStatement:
            "Vivamus venenatis est purus, id ultrices sem eleifend quis. In augue urna, sollicitudin id nisi et, vehicula aliquet lectus. Nullam mattis semper diam, a pharetra ante accumsan sed. Sed convallis quam sapien, vel sodales dui commodo quis. In pharetra venenatis leo, consectetur congue dui. Nam tristique a purus in condimentum. Donec risus eros, convallis eu ullamcorper eu, iaculis vel nulla.",
        },
        {
          name: "Evie Cox",
          image:
            "https://assets-cdn.sums.su/YU/website/img/advice/evie-cox.jpeg",
          title: "Advice & Support Development Coordinator",
          personalStatement:
            "Nullam vitae dapibus sem. Curabitur turpis ante, sollicitudin nec sollicitudin convallis, euismod eget quam. Suspendisse nec placerat nisl. Aliquam hendrerit tempus arcu at tincidunt. Curabitur tellus leo, dapibus ut nisi a, sollicitudin congue nulla. Aliquam vel nunc in diam blandit vehicula nec ut elit. Nulla sed augue at risus vestibulum blandit. Proin tempor efficitur turpis, et aliquam nunc ultrices at. Donec aliquam convallis tellus, vel luctus sapien ullamcorper sed. Vivamus dapibus vulputate tincidunt. Duis in lacus condimentum, cursus nunc at, posuere sapien.",
        },
        {
          name: "Matt Johnstone",
          image:
            "https://assets-cdn.sums.su/YU/website/img/advice/matt-johnstone.jpeg",
          title: "Advice & Support Development Coordinator",
          personalStatement:
            "Mauris molestie gravida enim, nec ornare elit rutrum ut. Donec pellentesque vulputate consectetur. Suspendisse lacinia lacinia volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean a nisl leo. Praesent sagittis massa nunc, id pretium erat commodo in. Morbi molestie mauris hendrerit, pulvinar eros ac, dignissim erat.",
        },
        {
          name: "Laura Robertson",
          image:
            "https://assets-cdn.sums.su/YU/website/img/advice/laura-robertson.jpeg",
          title: "Advice & Support Development Coordinator",
          personalStatement:
            "Aliquam aliquam orci lacus, sit amet laoreet justo hendrerit at. Aliquam volutpat, ipsum vel efficitur eleifend, dolor odio vulputate elit, nec venenatis quam turpis sed eros. Suspendisse sed posuere justo. Nullam commodo egestas erat. Nulla ut libero quam. Pellentesque eu sodales ex. Morbi nibh justo, finibus ut turpis eget, auctor ornare augue. Nunc lobortis sit amet massa quis commodo. Donec at velit at ipsum feugiat tincidunt. Vivamus sed lorem quis erat dignissim fringilla ut eu enim.",
        },
      ]),
      breakpoints: {
        640: {
          slideRatio: 1,
          visibleSlides: 1,
          arrowsOutside: false,
          infinite: false,
        },
        768: {
          slideRatio: 2 / 4,
          visibleSlides: 2,
        },
        1024: {
          slideRatio: 1 / 3,
          visibleSlides: 3,
        },
        1280: {
          slideRatio: 1 / 3,
          visibleSlides: 3,
        },
      },
      activeSlide: null,
    };
  },
  created() {
    this.headshots = this.shuffle(this.headshots);
    this.activeSlide = this.headshots[0]; // Set the first slide as active initially
  },
  methods: {
    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    updateActiveSlide(slide) {
      this.activeSlide = this.headshots[slide.currentSlide.index];
    },
  },
};
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/vueperslides@3.6.0/dist/vueperslides.min.css";
</style>
