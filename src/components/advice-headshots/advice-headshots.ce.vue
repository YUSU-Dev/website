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
      <h3 class="font-semibold">{{ activeSlide.title }}</h3>
      <h4 class="font-bold">Student testimonial:</h4>
      <p class="">"{{ activeSlide.testimonial }}"</p>
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
          testimonial:
            "The guidance I received from my adviser was vital to my response to the process I was engaging in, and without his help I would not have been able to manage the situation sucessfully.",
        },
        {
          name: "Charlotte Renshaw",
          image:
            "https://assets-cdn.sums.su/YU/website/img/advice/charlotte-renshaw.jpeg",
          title: "Advice & Support Development Coordinator",
          testimonial:
            "I wanted to express my sincere thanks for your incredibly clear and thorough responses to my questions. Your guidance has been very helpful, especially with everything feeling so overwhelming. I feel extremely fortunate to have your support and advice during this challenging time.",
        },
        {
          name: "Evie Cox",
          image:
            "https://assets-cdn.sums.su/YU/website/img/advice/evie-cox.jpeg",
          title: "Advice & Support Development Coordinator",
          testimonial:
            "My advisor Evie, was nothing short of excellent. She was so patient and actively listened to everything I said. It felt like she had struck the perfect balance of being supportive and empathetic whilst remaining calm and offering other perspectives in an unbiased manner. Evie always responded in a timely manner, and wherever she was unable to do so, she would inform me and give me a timeline of when I could expect to hear back from her. I can't express in words how much her help made a difference to me. She is a credit to York SU and I feel lucky to have been put in touch with her - any students who get the pleasure of being advised by Evie are blessed and in the best hands.",
        },
        {
          name: "Matt Johnstone",
          image:
            "https://assets-cdn.sums.su/YU/website/img/advice/matt-johnstone.jpeg",
          title: "Advice & Support Development Coordinator",
          testimonial:
            "I just wanted to thank you so so much for all of your help. You've been fantastic. From making me feel so comfortable in our initial meeting to being so unbelievably helpful with statement writing and editing and getting back to me in excellent time, you've made what has been such a stressful situation so much more bearable and I cannot thank you enough.",
        },
        {
          name: "Laura Robertson",
          image:
            "https://assets-cdn.sums.su/YU/website/img/advice/laura-robertson.jpeg",
          title: "Advice & Support Development Coordinator",
          testimonial:
            "Your help came at what was truly one of the darkest and most difficult times for me, and the guidance and encouragement you gave were unbelievably valuable. It’s comforting to know that I have people like you who are willing to help me navigate these challenges.",
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
