<template>
  <div class="">
    <div class="py-2 pb-3">
      <label for="topic-search">Search for a topic</label>
      <div class="flex items-center py-2">
        <div class="input-group flex w-full border border-black">
          <input
            id="topic-search"
            class="search form-control w-full gap-6 p-2"
            type="text"
            name="search"
            placeholder="Search..."
            v-model="Search"
          />
          <div class="input-group-append">
            <button
              type="submit"
              aria-label="Submit"
              class="btn btn-block btn-secondary h-full w-full bg-black px-1"
            >
              <FontAwesomeIcon
                icon="fas fa-search"
                class="mx-1 h-4 w-4 py-0.5 text-white"
              />
            </button>
          </div>
        </div>
      </div>
      <div v-if="Categories.length > 1" class="flex flex-wrap gap-x-2 gap-y-2">
        <Button
          title="All"
          is-advice-and-support
          class="px-8 text-start"
          :class="{ 'bg-light-blue !text-black': selectedCategory == '' }"
          @click="updateCategory('')"
        />
        <Button
          v-for="category in Categories"
          :key="category"
          :title="category"
          is-advice-and-support
          class="px-8 text-start"
          :class="{ 'bg-light-blue !text-black': selectedCategory == category }"
          @click="updateCategory(category)"
        />
      </div>
    </div>
    <hr class="mt-0 mb-2" />
    <div
      class="xxs:grid-cols-2 grid gap-x-4 gap-y-4 sm:grid-cols-3 lg:grid-cols-4"
    >
      <SupportTile
        v-for="item in Tiles"
        :key="item.name"
        :name="item.name"
        :url="item.url"
        :category="item.category"
        :activeCategory="selectedCategory"
        :img="backgroundImage"
      />
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/button/button.ce.vue";
import SupportTile from "../support-tile/support-tile.ce.vue";
import axios from "../../_common/axios.mjs";
import { randomAdviceImageUrl } from "../../_common/randomImage.mjs";

library.add(faSearch);

export default {
  components: {
    FontAwesomeIcon,
    Button,
    SupportTile,
  },
  props: {
    apiurl: {
      type: String,
      default: null,
    },
    apitext: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      Data: null,
      Tiles: [],
      Categories: [],
      Search: "",
      selectedCategory: "",
      backgroundImage:
        "https://assets-cdn.sums.su/YU/website/img/advice/advice-blue.webp",
    };
  },
  created() {
    var self = this;
    if (self.apiurl) {
      axios.get(self.apiurl, {}).then(function (response) {
        self.data = JSON.parse(
          response.data.replace(/,\]/g, "]"), // Remove trailing commas before parsing
        );
        self.Categories = self.data.children.map((item) => item.name);

        self.Tiles = self.data.children.flatMap((item) =>
          item.children.map((tile) => ({
            name: tile.name,
            url: tile.url,
            category: item.name,
          })),
        );
        self.Tiles.sort(self.compare);
      });
    } else {
      let data = self.apitext;
      self.Menu = data.sort(self.compare);
      self.Menu.forEach((menuElement) => {
        if (!self.Categories.includes(menuElement.category)) {
          self.Categories.push(menuElement.category);
        }
      });
    }
  },
  methods: {
    compare: function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    },
    getTileImage: function () {
      return randomAdviceImageUrl();
    },
    updateCategory: function (category) {
      console.log("Updating category to:", category);
      if (category === this.selectedCategory) {
        return; // No change, do nothing
      } else if (category === "") {
        this.selectedCategory = "";
        this.Tiles = this.data.children.flatMap((item) =>
          item.children.map((tile) => ({
            name: tile.name,
            url: tile.url,
            category: item.name,
          })),
        );
        return;
      }
      this.selectedCategory = category;
      let updatedData = this.data.children.filter((item) => {
        return item.name.toLowerCase() === category.toLowerCase();
      });
      console.log("Updated data for category:", updatedData);
      let updatedTiles = [];
      updatedData[0].children.forEach((tile) => {
        console.log("Processing tile:", tile);
        if (tile.name && tile.url) {
          updatedTiles.push({
            name: tile.name,
            url: tile.url,
            category: updatedData.category,
          });
        }
      });
      updatedTiles.sort(this.compare);
      this.Tiles = updatedTiles;
    },
  },
  computed: {
    FilteredMenu() {
      let self = this;
      let Menu = self.Menu;
      if (self.Search) {
        Menu = Menu.filter((item) =>
          item.name.toLowerCase().includes(self.Search.toLowerCase()),
        );
      }
      if (self.selectedCategory) {
        Menu = Menu.filter(
          (item) =>
            item.category.toLowerCase() == self.selectedCategory.toLowerCase(),
        );
      }
      return Menu;
    },
  },
};
</script>
