<template>
  <div>
    <div class="grid grid-cols-3 md:grid-cols-6">
      <div
        class="btn-student-voice flex flex-col items-center justify-center gap-y-2"
        :class="{ 'bg-light-pink': selectedCategory == 0 }"
        @click="selectedCategory = 0"
      >
        <FontAwesomeIcon icon="fa-core fa-hand-fist" class="h-8 w-8 p-1" />
        <p class="text-wrap text-center">All</p>
      </div>
      <div
        class="btn-student-voice flex flex-col items-center justify-center gap-y-2"
        :class="{ 'bg-light-pink': selectedCategory == 29 }"
        @click="selectedCategory = 29"
      >
        <FontAwesomeIcon icon="fa-core fa-graduation-cap" class="h-8 w-8 p-1" />
        <p class="text-wrap text-center">Academic</p>
      </div>
      <div
        class="btn-student-voice flex flex-col items-center justify-center gap-y-2"
        :class="{ 'bg-light-pink': selectedCategory == 31 }"
        @click="selectedCategory = 31"
      >
        <FontAwesomeIcon icon="fa-core fa-earth-europe" class="h-8 w-8 p-1" />
        <p class="text-wrap text-center">Community and Environmental</p>
      </div>
      <div
        class="btn-student-voice flex flex-col items-center justify-center gap-y-2"
        :class="{ 'bg-light-pink': selectedCategory == 33 }"
        @click="selectedCategory = 33"
      >
        <FontAwesomeIcon icon="fa-core fa-bullhorn" class="h-8 w-8 p-1" />
        <p class="text-wrap text-center">Liberation and Diversity</p>
      </div>
      <div
        class="btn-student-voice flex flex-col items-center justify-center gap-y-2"
        :class="{ 'bg-light-pink': selectedCategory == 30 }"
        @click="selectedCategory = 30"
      >
        <FontAwesomeIcon icon="fa-core fa-parachute-box" class="h-8 w-8 p-1" />
        <p class="text-wrap text-center">Student Activities</p>
      </div>
      <div
        class="btn-student-voice flex flex-col items-center justify-center gap-y-2"
        :class="{ 'bg-light-pink': selectedCategory == 34 }"
        @click="selectedCategory = 34"
      >
        <FontAwesomeIcon
          icon="fa-core fa-hand-holding-heart"
          class="h-8 w-8 p-1"
        />
        <p class="text-wrap text-center">Welfare</p>
      </div>
    </div>
    <div class="mt-6 grid grid-cols-1 md:grid-cols-3">
      <Tile
        v-for="article in FilteredArticles"
        :key="article.id"
        :title="article.title"
        :date="article.date"
        :url="'/news/article/' + article.entry_id"
        :image="article.thumbnail"
        :news="true"
      />
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHandFist,
  faGraduationCap,
  faEarthEurope,
  faBullhorn,
  faHandHoldingHeart,
  faParachuteBox,
} from "@fortawesome/free-solid-svg-icons";
import axios from "../../_common/axios.mjs";
import Tile from "../Tile/tile.ce.vue";

library.add(
  faHandFist,
  faGraduationCap,
  faEarthEurope,
  faBullhorn,
  faHandHoldingHeart,
  faParachuteBox,
);
export default {
  name: "ProjectsView",
  components: {
    FontAwesomeIcon,
    Tile,
  },
  data() {
    return {
      Articles: [],
      selectedCategory: 0,
    };
  },
  created() {
    this.selectedCategory = 31;
    axios
      .get("https://pluto.sums.su/api/news?categoryIds=19,33,30,31,34", {
        headers: {
          "X-Site-Id": self.siteid,
        },
      })
      .then((response) => {
        this.Articles = response.data.data;
      });
  },
  methods: {},
  computed: {
    FilteredArticles() {
      let self = this;
      if (self.selectedCategory != 0) {
<<<<<<< HEAD
=======

>>>>>>> 8f1809a6c158aefeb29de47b62cbc48e4d2e9c90
        return self.Articles.filter(function (article) {
          return article.categories.includes(self.selectedCategory);
        });
      } else {
        return self.Articles;
      }
    },
  },
};
</script>
