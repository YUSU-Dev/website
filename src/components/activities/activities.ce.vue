<template>
  <div class="py-10" id="societies-a-z">
    <div v-if="title" class="mb-4">
      <h2 class="text-3xl font-bold">{{ title }}</h2>
    </div>
    <div class="justify-center">
      <div v-if="!selectedcategory" class="input-group flex">
        <input
          class="search form-control w-full border-[1px] border-black p-2"
          type="text"
          aria-label="search for an activity"
          name="search"
          placeholder="Search..."
          v-on:keyup="search($event)"
        />
        <div class="input-group-append">
          <button
            type="submit"
            aria-label="Submit"
            class="btn btn-block btn-secondary h-full w-full bg-black px-1"
            @click="submitSearch"
          >
            <FontAwesomeIcon
              icon="fa-solid fa-search"
              class="h-8 w-8 p-2 text-white"
            />
          </button>
        </div>
      </div>
      <div class="relative mt-6 flex pb-4">
        <Transition>
          <div class="w-full" v-if="Search">
            <h3 class="text-center text-3xl font-semibold">Search Results</h3>
          </div>
        </Transition>
        <Transition>
          <div
            class="w-full max-w-4xl text-center"
            v-if="!Search && ParentCategories.length > 0"
          >
            <div class="">
              <h3 class="sr-only">Filters</h3>
              <div v-if="ParentCategories.length > 1">
                <ul class="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <li
                    v-for="Parent in ParentCategories"
                    @click.prevent="
                      SelectedParent = Parent;
                      SelectedCategory = '';
                      getGroups();
                    "
                    class=""
                    :key="Parent.id"
                  >
                    <a
                      v-bind:class="{
                        '!bg-light-blue font-semibold text-black':
                          SelectedParent.id === Parent.id,
                      }"
                      class="flex h-full w-full justify-center border-2 border-none bg-mustard px-4 py-2 text-xl font-semibold text-black hover:bg-light-blue hover:text-black"
                    >
                      <h3>{{ Parent.name }}</h3>
                    </a>
                  </li>
                </ul>
              </div>
              <ul class="mt-6 flex flex-wrap gap-2" v-if="SelectedParent">
                <li
                  class=""
                  @click.prevent="
                    SelectedCategory = '';
                    getGroups();
                  "
                >
                  <a
                    v-bind:class="{
                      '!bg-light-blue font-semibold text-black':
                        SelectedCategory === '',
                    }"
                    href="#"
                    class="flex justify-center bg-mustard px-4 py-2 text-lg text-black hover:bg-light-blue hover:text-black"
                  >
                    <h4>All</h4>
                  </a>
                </li>
                <li
                  v-for="Category in filteredCategories"
                  @click.prevent="
                    SelectedCategory = Category;
                    getGroups();
                  "
                  class=""
                  :key="Category.id"
                >
                  <a
                    v-bind:class="{
                      '!bg-light-blue font-semibold text-black':
                        SelectedCategory.id === Category.id,
                    }"
                    class="flex justify-center bg-mustard px-4 py-2 text-lg text-black hover:bg-light-blue hover:text-black"
                    :href="
                      '/student-life/clubs-and-socs?category=' + Category.id
                    "
                  >
                    <h4>{{ Category.name }}</h4>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Transition>
      </div>
      <Transition>
        <div class="a-z-wrap mt-10" v-if="!loading">
          <Tile
            v-for="Group in Groups"
            :key="Group.id"
            :url="'/activities/view/' + Group.url_name"
            :title="Group.name"
            :image="Group.thumbnail_url"
          />
        </div>
        <div class="a-z-wrap mt-10" v-else>
          <Tile v-for="Item in PerPage" :key="Item" :loading="true" />
        </div>
      </Transition>
      <Pagination
        v-if="Page != 1 || MoreResults"
        :Array="Groups"
        :loadPage="loadPage"
        :Page="Page"
        :MoreResults="MoreResults"
        :PreviousResults="PreviousResults"
        :Loading="loading"
      />
    </div>
  </div>
</template>
<script>
import Tile from "../Tile/tile.ce.vue";
import Pagination from "../Pagination/pagination.ce.vue";
import axios from "../../_common/axios.mjs";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

library.add(faSearch);

export default {
  props: ["siteid", "selectedparents", "selectedcategory", "title"],
  components: {
    Tile,
    Pagination,
    FontAwesomeIcon,
  },
  data() {
    return {
      Categories: [],
      CategoryIDs: "",
      ParentCategories: [],
      Groups: [],
      SelectedCategory: "",
      SelectedParent: "",
      SelectedParents: [],
      Search: "",
      Page: 1,
      PerPage: 24,
      Pages: [],
      MoreResults: false,
      PreviousResults: false,
      loading: true,
    };
  },
  created() {
    var self = this;
    self.loading = true;
    if (self.selectedparents) {
      self.SelectedParents = self.selectedparents.split(",");
    } else if (self.selectedcategory) {
      self.CategoryIDs = self.selectedcategory;
    } else {
      self.SelectedParents = "2,24";
    }
    //check if looking for a specific activity, search, etc...
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("search")) {
      self.Search = urlParams.get("search");
    }
    //if we already have a category, don't get more info
    if (!self.selectedcategory) {
      //Get parents
      axios
        .get(
          "https://pluto.sums.su/api/groups/categories?sortBy=name&isParent=1",
          {
            headers: {
              "X-Site-Id": self.siteid,
            },
          },
        )
        .then(function (response) {
          response.data.forEach((category) => {
            if (self.SelectedParents.includes(category.id.toString())) {
              self.ParentCategories = [...self.ParentCategories, category];
            }
          });
        });
      //get categories
      axios
        .get(
          "https://pluto.sums.su/api/groups/categories?sortBy=name&isParent=0&parentIds=" +
            self.selectedparents,
          {
            headers: {
              "X-Site-Id": self.siteid,
            },
          },
        )
        .then(function (response) {
          self.Categories = response.data;
          let idArray = self.Categories.map(function (item) {
            return item["id"];
          });
          self.CategoryIDs = idArray.join();
          self.getGroups();
        });
    } else {
      self.getGroups();
    }
  },
  methods: {
    /**
     * Fetch groups from API
     * @param bool append - are we getting more groups to append to the current list?
     */
    getGroups: function (append = false) {
      let self = this;
      if (self.ParentCategories.length == 1) {
        self.SelectedParent = self.ParentCategories[0];
      }
      if (!append) {
        self.Page = 1;
        self.Pages = [1];
      }
      let parameters =
        "sortBy=name&perPage=" + self.PerPage + "&page=" + self.Page;
      //add relevant parameters to the group search
      if (self.CategoryIDs) {
        parameters += "&categoryIds=" + self.CategoryIDs;
      }
      if (self.Search) {
        parameters += "&searchTerm=" + self.Search;
        self.SelectedCategory = self.SelectedParent = "";
      } else if (self.SelectedCategory) {
        parameters += "&categoryId=" + self.SelectedCategory.id;
      } else if (self.SelectedParent) {
        parameters += "&parentCategoryId=" + self.SelectedParent.id;
      }
      axios
        .get("https://pluto.sums.su/api/groups?" + parameters, {
          headers: {
            "X-Site-Id": self.siteid,
          },
        })
        .then(function (response) {
          self.Groups = response.data.data;
          //If the API says there are more results (ie another page), update the template accordingly
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
        });
    },
    loadPage(pageNumber = null) {
      if (pageNumber) {
        this.Page = pageNumber;
      } else {
        this.Page++;
      }
      this.Pages.indexOf(this.Page) === -1 ? this.Pages.push(this.Page) : "";
      this.getGroups(true);
    },
    search(event) {
      this.Search = event.target.value;
      this.getGroups();
    },
  },
  computed: {
    filteredCategories() {
      let self = this;
      return this.Categories.filter((category) => {
        if (self.SelectedParent) {
          return category.parent_id == self.SelectedParent.id;
        }
      });
    },
  },
};
</script>
