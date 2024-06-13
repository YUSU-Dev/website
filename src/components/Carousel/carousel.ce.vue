<template>
  <div class="flex justify-center">
    <div class="relative h-[400px] max:container">
      <transition-group name="fade" tag="div">
        <div v-for="i in [currentIndex]" :key="i">
          <a :href="banners[currentIndex].url">
            <img
              :src="banners[currentIndex].img"
              :alt="banners[currentIndex].alt"
              class="h-[400px] max-h-[40vh] object-cover"
            />
          </a>
        </div>
      </transition-group>
      <!-- <a v-if="banners[index+1]" :href="banners[index+1].url" class="banner-next">
                <img :src="banners[index+1].img" :alt="banners[index+1].alt" class="h-[400px] max-h-[40vh] object-cover"/>
            </a> -->
    </div>
  </div>
  <button @click="nextBanner()">NEXT</button>
</template>
<script>
import axios from "../../_common/axios.mjs";
export default {
  components: {},
  props: {},
  data() {
    return {
      banners: [
        {
          url: "https://www.rateyourlandlord.org.uk/rate/",
          img: "https://d7c4643dcbda7415a35e-80960cc71f8ebfe47418d0eb60e429bc.ssl.cf3.rackcdn.com/bnr_v8rlao_wcqd6z_ryl_web.jpg",
          alt: "Rate Your Landlord",
        },
        {
          url: "https://www.surveymonkey.co.uk/r/QZLG8JZ",
          img: "https://d7c4643dcbda7415a35e-80960cc71f8ebfe47418d0eb60e429bc.ssl.cf3.rackcdn.com/bnr_wy3kjt_dgvxlm_fisurvey_(custom).png",
          alt: "A blue banner with the text 'First Impression Survey",
        },
      ],
      currentIndex: 0,
      timer: null,
    };
  },
  async created() {
    this.getBanners();
  },
  async mounted() {
    this.startSlide();
  },
  updated() {},
  methods: {
    getBanners: function () {
      // axios
      //     .get("https://yusu.org/api/banners/homepage-carousel")
      //     .then(function (response) {
      //         console.log(response);
      //     });
      console.log(this.banners);
    },
    startSlide: function () {
      this.timer = setInterval(this.next, 4000);
    },
    next: function () {
      if (this.currentIndex === this.banners.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex += 1;
      }
    },
    prev: function () {
      this.currentIndex -= 1;
    },
  },
  computed: {
    currentImg: function () {
      return this.banners[Math.abs(this.currentIndex) % this.banners.length];
    },
  },
};
</script>
