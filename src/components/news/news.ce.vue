<template>
  <div id="newsTop" class=""></div>
  <div v-if="embedded" class="container mx-auto">
    <div
      v-if="!firstLoad"
      class="news-row grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4"
    >
      <Tile
        v-for="article in News"
        :key="article.id"
        :title="article.title"
        :date="article.date"
        :categories="article.categories"
        :url="'/news/article/' + article.entry_id"
        :image="article.thumbnail"
        :appendCategory="appendCategory"
      />
    </div>
    <div v-else class="news-row grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
      <Tile v-for="item in embeddedPerPage" :key="item" :loading="true" />
    </div>

    <Pagination
      :loading="loading"
      :Array="News"
      :loadPage="loadPage"
      :Page="Page"
      :MoreResults="MoreResults"
      :PreviousResults="PreviousResults"
    />
  </div>
  <div v-else class="container mx-auto grid grid-cols-5">
    <div class="z-10 order-1 col-span-5 mb-5 xl:order-2 xl:col-span-1 xl:pl-4">
      <div class="sticky top-4 border-[1px] border-black p-6">
        <div class="">
          <div class="">
            <div class="mb-5">
              <label for="search">
                <h2 class="mb-2 text-xl font-semibold">Search</h2>
              </label>
              <Searchbar
                :submit-search-callback="submitSearch"
                :initial-search-value="filterSearch"
                placeholder="Search articles..."
              />
            </div>
            <div class="mb-2 text-xl font-semibold">
              <label for="categories-small">
                <h2 class="mb-2">Categories</h2>
              </label>
              <div class="">
                <v-select
                  label="name"
                  :options="NewsCategories"
                  @update:modelValue="submitCategories"
                  placeholder="All"
                  multiple
                  :reduce="(article) => article.id"
                >
                </v-select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-md-0 order-1 col-span-5 xl:order-1 xl:col-span-4 xl:pr-4">
      <div
        v-if="News.length == 0 && !loading && !firstLoad"
        class="container mx-auto"
      >
        <h2 class="mb-4 mt-16 text-center text-2xl font-semibold">
          No Articles Found
        </h2>
      </div>
      <div
        v-if="loading"
        class="spinner mt-16 flex justify-center"
        role="alert"
        aria-busy="true"
      >
        <FontAwesomeIcon
          icon="fa-solid fa-spinner"
          class="h-8 w-8 animate-spin"
        ></FontAwesomeIcon>
      </div>
      <div
        v-if="!firstLoad"
        class="news-row grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      >
        <Tile
          v-for="article in News"
          :key="article.id"
          :title="article.title"
          :date="article.date"
          :categories="article.categories"
          :url="'/news/article/' + article.entry_id"
          :image="article.thumbnail"
          :appendCategory="appendCategory"
        />
      </div>
      <div
        v-else
        class="news-row grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      >
        <Tile v-for="item in perPage" :key="item" :loading="true" />
      </div>
      <Pagination
        :loading="loading"
        :Array="News"
        :loadPage="loadPage"
        :Page="Page"
        :MoreResults="MoreResults"
        :PreviousResults="PreviousResults"
      />
    </div>
  </div>
</template>
<style>
@import "https://cdn.jsdelivr.net/npm/vue-select@3.16.0/dist/vue-select.css";
</style>
<script>
import axios from "../../_common/axios.mjs";
import Pagination from "../Pagination/pagination.ce.vue";
import moment from "https://cdn.jsdelivr.net/npm/moment@2.30.1/+esm";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Tile from "../Tile/tile.ce.vue";
import Searchbar from "../searchbar/searchbar.ce.vue";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import vSelect from "vue-select";
// import "vue-select/dist/vue-select.css";

library.add(faSpinner);

export default {
  components: {
    Searchbar,
    Pagination,
    Tile,
    FontAwesomeIcon,
    "v-select": vSelect,
  },
  props: {
    embedded: {
      type: Boolean,
      default: false,
    },
    selectedCategories: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      News: [],
      Page: 1,
      Pages: [],
      MoreResults: false,
      PreviousResults: false,
      loading: false,
      firstLoad: true,
      NewsCategories: [],
      categoriesDictionary: [],
      filterCategories: [],
      filterSearch: null,
      formCategoriesElement: null,
      awaitMountPromise: null,
      currentURLAccessibilityHelper: null,
      images: [
        "https://assets-cdn.sums.su/YU/IMG/NewBrand/500x500_Red.jpg",
        "https://assets-cdn.sums.su/YU/IMG/NewBrand/500x500_Blue.jpg",
      ],
      perPage: 12,
      embeddedPerPage: 4,
    };
  },
  async created() {
    const self = this;
    self.firstLoad = true;

    // set any initial filtering parameters
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    let categories = searchParams.get("categories");
    let search = searchParams.get("search");

    if (search) {
      this.filterSearch = search;
    }

    if (categories) {
      this.filterCategories = decodeURIComponent(categories).split(",");
    }

    // create promise to hold mounted() and load data
    this.awaitMountPromise = self
      .getNewsCategories()
      .then(() =>
        self.getNews(false, self.filterSearch, self.filterCategories),
      );
  },
  async mounted() {
    // wait for the signal that created has finished loading data
    const self = this;
    await self.awaitMountPromise;
    self.firstLoad = false;

    self.currentURLAccessibilityHelper = window.location.href;

    window.addEventListener("popstate", function () {
      // check whether the URL has changed apart from the hash
      if (
        self.currentURLAccessibilityHelper.split("#")[0] !==
        window.location.href.split("#")[0]
      ) {
        // URL has changed, so reload the page
        location.reload();
      }
    });

    this.layout();
  },
  updated() {
    this.layout();
  },
  methods: {
    getNewsCategories: async function () {
      let self = this;
      if (self.firstLoad != true) {
        self.loading = true;
      }
      // let categoriesDictionary = [];
      var foundAllCategories = false;
      var categoriesPage = 1;
      while (!foundAllCategories) {
        let categoriesParameters = "perPage=100&page=" + categoriesPage;
        let page = await axios.get(
          "https://pluto.sums.su/api/news/categories?" + categoriesParameters,
          {
            headers: {
              "X-Site-Id": self.siteid,
            },
          },
        );
        page.data.data.forEach((element) => {
          self.categoriesDictionary[element.id] = {
            id: element.id,
            parent_id: element.parent_id,
            name: element.name,
            url: element.url,
          };
        });

        if (page.data.next_page_url) {
          categoriesPage++;
        } else {
          foundAllCategories = true;
        }
      }
      self.NewsCategories = self.categoriesDictionary.filter(
        (value) => Object.keys(value).length !== 0,
      );
    },
    getNews: async function (append = false, search = null, categories = null) {
      let self = this;
      if (self.firstLoad != true) {
        self.loading = true;
      }

      if (!append) {
        self.Page = 1;
        self.Pages = [1];
      }

      if (self.embedded) {
        self.perPage = self.embeddedPerPage;
      }

      let parameters =
        "sortBy=name&perPage=" + self.perPage + "&page=" + self.Page;
      if (search) {
        parameters += "&searchTerm=" + search;
      }
      if (categories && categories.length > 0) {
        parameters += "&categoryIds=" + categories.join(",");
      }
      if (self.selectedCategories) {
        parameters += "&categoryIds=" + self.selectedCategories;
      }
      let response = await axios.get(
        "https://pluto.sums.su/api/news?" + parameters,
        {
          headers: {
            "X-Site-Id": self.siteid,
          },
        },
      );
      response.data.data.forEach((article) => {
        article.categories = article.categories.map(
          (category_id) => self.categoriesDictionary[category_id],
        );
      });
      self.News = response.data.data;
      if (response.data.next_page_url) {
        self.MoreResults = true;
      } else {
        self.MoreResults = false;
      }
      if (response.data.prev_page_url) {
        self.PreviousResults = true;
      } else {
        self.PreviousResults = false;
      }
      self.loading = false;
    },
    submitSearch(searchValue) {
      this.filterSearch = searchValue;
      this.changeFilteringParameters();
    },
    submitCategories(value) {
      this.filterCategories = value;
      this.changeFilteringParameters();
    },
    changeFilteringParameters() {
      // update URL parameters "categories" and "search" to match the current filtering parameters
      let url = new URL(window.location.href);
      let searchParams = new URLSearchParams(url.search);

      if (this.filterCategories.length > 0) {
        searchParams.set("categories", this.filterCategories.join(","));
      } else {
        searchParams.delete("categories");
      }

      if (this.filterSearch) {
        searchParams.set("search", this.filterSearch);
      } else {
        searchParams.delete("search");
      }

      url.search = searchParams.toString();
      window.history.pushState({}, "", url);
      this.currentURLAccessibilityHelper = url.toString();
      this.Pages = [];
      this.getNews(false, this.filterSearch, this.filterCategories);
    },
    appendCategory(categoryID) {
      if (this.filterCategories.includes(categoryID)) {
        return;
      }
      this.filterCategories.push(categoryID);
      this.formCategoriesElement.val(this.filterCategories).trigger("change");
    },
    async loadPage(pageNumber = null) {
      if (pageNumber) {
        this.Page = pageNumber;
      } else {
        this.Page++;
      }
      this.Pages.indexOf(this.Page) === -1 ? this.Pages.push(this.Page) : "";
      await this.getNews(true, this.filterSearch, this.filterCategories);

      const newsTop = document.querySelector("#newsTop");
      newsTop.scrollIntoView({ behavior: "smooth" });
      newsTop.focus();
    },
    layout() {},
    wrapURL(URL) {
      return "'" + URL + "'";
    },
    formatDate(date) {
      var formattedDate = moment(date).format("DD MMMM YYYY");
      return formattedDate;
    },
    randomImage() {
      return `url("${
        this.images[Math.floor(Math.random() * this.images.length)]
      }")`;
    },
  },
};
</script>
