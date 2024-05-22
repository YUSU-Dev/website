<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: "soleil", sans-serif !important;
}

.select2 {
  width: 100% !important;
}

.select2-container--default .select2-selection--multiple {
  background-color: #f5f5f5;
  border: none;
  border-radius: 0px;
}

.select2-container--default .select2-selection--multiple .select2-selection__choice {
  background-color: #fad7d9;
}

.select2-container--default .select2-selection--multiple .select2-selection__choice__remove:hover {
  background-color: #fad7d9;
}

.select2-container--default .select2-selection--multiple .select2-selection__choice__display {
  text-wrap: balance;
  font-weight: 400;
  font-size: 16px;
  padding-left: 8px;
  padding-right: 8px;
}
</style>
<template>
  <div id="newsTop" class=""></div>
  <div class="grid grid-cols-5 container mx-auto">

    <div class="col-span-5 xl:col-span-1 order-1 xl:order-2 mb-5 xl:pl-4">

      <div class="sticky top-4 p-6 border-black border-[1px]">
        <div class="">
          <div class="">
            <div class="mb-5">
              <label for="search">
                <h2 class="font-semibold text-xl mb-2">Search</h2>
              </label>
              <div class="input-group flex border-black border-[1px]">
                <input id="search" name="search" placeholder="Search..." class="search form-control w-full p-2" @keyup.enter="submitSearch">
                <div class="input-group-append">
                  <button type="submit" aria-label="Submit" class="btn btn-block btn-secondary bg-black w-full h-full px-1"
                    @click="submitSearch">
                    <i class="fas fa-search text-white p-2"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="font-semibold text-xl mb-2">
              <label for="categories-small">
                <h2 class="mb-2">Categories</h2>
              </label>
              <div class="flex">
                <select id="categories-small" class="categories-small w-100" multiple="multiple">
                  <option v-for="(category, categoryID) in NewsCategories" :value="categoryID" :key="categoryID">{{ category.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="col-span-5 xl:col-span-4 order-1 xl:order-1 xl:pr-4 mx-md-0">
      <div v-if="News.length == 0" class="container mx-auto">
        <h2 class="mb-4 text-center text-2xl font-semibold mt-16">No Articles Found</h2>
      </div>
      <div v-if="loading" class="flex justify-center mt-16 spinner">
        <i class="fas fa-spinner fa-spin text-5xl"></i>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 news-row">

        <div class="mb-4 px-2 lg:px-3 pb-2 lg:pb-3" v-for="article in News" :key="article.id">
          <div class="transition hover:scale-105 relative shadow h-full">
            <a class="" :href="'/news/article/' + article.url_title">
              <div v-if="article.thumbnail" class="aspect-square bg-cover bg-center"
                :style="{ 'background-image': 'url(' + wrapURL(article.thumbnail) + ')' }">
              </div>
              <div v-else class="aspect-square bg-cover bg-center" :style="{ 'background-image': randomImage() }">
              </div>
              <div class="p-6 h-[136px] flex flex-col justify-between">
                <h3 class="text-xl mb-2 font-semibold line-clamp-2">{{ article.title }}</h3>
                <p class="font-semibold">{{ formatDate(article.date) }}</p>
              </div>
            </a>

            <div v-if="article.categories.length"
              class="rounded flex flex-col absolute bg-[#40454d] top-2.5 ml-2 mr-3 max-w-full max-h-[232.33px] overflow-y-auto group">
              <div class="flex">
                <i class="fa-solid fa-tag p-2 text-white"></i>
                <p class="m-0 pr-2 flex items-center text-white">{{ article.categories.length }}</p>
              </div>
              <div class="hidden group-hover:flex">
                <div class="pl-1 pr-5 pb-4 text-white">
                  <ul class="ps-[10px] mb-0 list-none">
                    <li v-for="category in article.categories" :key="category.id">
                      <span @click="appendCategory(category.id)" style="cursor: pointer">
                        &#x2022; <span class="underline">{{ category.name }}</span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
      <Pagination :loading="loading" :Array="News" :loadPage="loadPage" :Page="Page" :MoreResults="MoreResults"
        :PreviousResults="PreviousResults" />
    </div>
  </div>
</template>
<script>
/* global $ */
import axios from "../../_common/axios.mjs";
import Pagination from '../Pagination/pagination.vue';
import moment from "https://esm.sh/moment@2.30.1";
export default {
  components: {
    Pagination,
  },
  props: ["siteid"],
  data() {
    return {
      News: [],
      Page: 1,
      Pages: [],
      MoreResults: false,
      PreviousResults: false,
      loading: false,
      NewsCategories: {},
      filterCategories: [],
      filterSearch: null,
      formCategoriesElement: null,
      formSearchElement: null,
      awaitMountPromise: null,
      currentURLAccessibilityHelper: null,
      images: ['https://assets-cdn.sums.su/YU/IMG/NewBrand/500x500_Red.jpg', 'https://assets-cdn.sums.su/YU/IMG/NewBrand/500x500_Blue.jpg']
    };
  },
  async created() {
    var self = this;

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
    this.awaitMountPromise = self.getNewsCategories().then(() => self.getNews(false, self.filterSearch, self.filterCategories));
  },
  async mounted() {
    // wait for the signal that created has finished loading data
    const self = this;
    await self.awaitMountPromise;

    self.formCategoriesElement = $(".categories-small").select2();
    self.formSearchElement = $(".search");

    // set the initial values of the form elements
    self.formSearchElement.val(self.filterSearch);
    self.formCategoriesElement.val(self.filterCategories).trigger("change");

    // set the event handlers for the form elements
    self.formCategoriesElement.on("change", self.submitCategories);

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
      self.loading = true;
      let categoriesDictionary = {};
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
          }
        );

        page.data.data.forEach((element) => {
          categoriesDictionary[element.id] = {
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
      self.NewsCategories = categoriesDictionary;
    },
    getNews: async function (append = false, search = null, categories = null) {
      let self = this;
      self.loading = true;

      if (!append) {
        self.Page = 1;
        self.Pages = [1];
      }
      let parameters = "sortBy=name&perPage=10&page=" + self.Page;
      if (search) {
        parameters += "&searchTerm=" + search;
      }
      if (categories && categories.length > 0) {
        parameters += "&categoryIds=" + categories.join(",");
      }
      let response = await axios.get(
        "https://pluto.sums.su/api/news?" + parameters,
        {
          headers: {
            "X-Site-Id": self.siteid,
          },
        }
      );

      response.data.data.forEach((article) => {
        article.categories = article.categories.map(
          (category_id) => self.NewsCategories[category_id]
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
    submitSearch() {
      this.filterSearch =
        this.formSearchElement.val() == ""
          ? null
          : this.formSearchElement.val();
      this.changeFilteringParameters();
    },
    submitCategories() {
      this.filterCategories = this.formCategoriesElement.val();
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

      const newsTop = document.querySelector("#newsTop")
      newsTop.scrollIntoView({ behavior: "smooth" });
      newsTop.focus();
    },
    layout() { },
    wrapURL(URL) {
      return "'" + URL + "'";
    },
    formatDate(date) {
      var formattedDate = moment(date).format("DD MMMM YYYY");
      return formattedDate;
    },
    randomImage() {
      return `url("${this.images[Math.floor(Math.random() * this.images.length)]
        }")`;
    },
  },
};
</script>