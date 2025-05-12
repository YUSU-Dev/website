<template>
  <div style="width: 1000px; height: 300px">
    <vueper-slides>
      <vueper-slide
        v-for="(slide, i) in headshots"
        :key="i"
        :image="slide.image"
        :title="slide.title"
        :content="slide.name"
      />
    </vueper-slides>
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
      headshots: [
        {
          name: "Rich Andrew",
          image:
            "https://assets-cdn.sums.su/YU/website/img/advice/rich-andrew.jpeg",
          title: "Advice and Welfare Manager",
        },
        {
          name: "Charlotte Renshaw",
          image:
            "https://assets-cdn.sums.su/YU/website/img/advice/charlotte-renshaw.jpeg",
          title: "Academic and Welfare Development Coordinator",
        },
        {
          name: "Evie Cox",
          image:
            "https://assets-cdn.sums.su/YU/website/img/advice/evie-cox.jpeg",
          title: "Academic and Welfare Development Coordinator",
        },
        {
          name: "Matt Johnstone",
          image:
            "https://assets-cdn.sums.su/YU/website/img/advice/matt-johnstone.jpeg",
          title: "Academic and Welfare Development Coordinator",
        },
        {
          name: "Laura Robertson",
          image:
            "https://assets-cdn.sums.su/YU/website/img/advice/laura-robertson.jpeg",
          title: "Academic and Welfare Development Coordinator",
        },
      ],
      // currentIndex: 0,
      // firstItem: null,
      // lastItem: null,
      // disableTransition: false,
    };
  },
  // computed: {
  //   middleIndex() {
  //     return Math.floor(this.headshots.length / 2);
  //   },
  // },
  // methods: {
  //   shuffle(array) {
  //     for (let i = array.length - 1; i > 0; i--) {
  //       const j = Math.floor(Math.random() * (i + 1));
  //       [array[i], array[j]] = [array[j], array[i]];
  //     }
  //     return array;
  //   },
  //   next() {
  //     this.disableTransition = true;
  //     this.$nextTick(() => {
  //       const firstItem = this.headshots.shift();
  //       this.headshots.push(firstItem);
  //       this.$nextTick(() => {
  //         this.disableTransition = false;
  //       });
  //     });
  //   },
  //   prev() {
  //     this.disableTransition = true;
  //     this.$nextTick(() => {
  //       const lastItem = this.headshots.pop();
  //       this.headshots.unshift(lastItem);
  //       this.$nextTick(() => {
  //         this.disableTransition = false;
  //       });
  //     });
  //   },
  // },
};
</script>
