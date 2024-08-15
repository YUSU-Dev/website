<template>
  <div class="py-10">
    <div class="justify-center">
      <div>
        <h2
          v-if="title"
          class="flex items-center gap-x-3 pb-2 text-3xl font-bold"
        >
          {{ title }}
          <FontAwesomeIcon
            v-if="icon"
            icon="fas fa-basket-shopping"
            class="mx-1 h-8 w-8"
          />
        </h2>
        <div v-if="!hidefilter">
          <div
            class="grid grid-cols-1 gap-x-4 gap-y-4 xs:grid-cols-2 lg:grid-cols-4"
          >
            <div class="flex flex-col">
              <label for="event-search">Search</label>
              <div class="input-group flex h-full border-[1px] border-black">
                <input
                  class="form-control h-full w-full"
                  type="text"
                  aria-label="search for an activity"
                  name="search"
                  placeholder="Search..."
                  :value="Search"
                  @input="search($event)"
                />
                <div class="input-group-append">
                  <button
                    type="submit"
                    aria-label="Submit"
                    class="btn btn-block btn-secondary h-full"
                    @click="submitSearch"
                  >
                    <FontAwesomeIcon
                      icon="fas fa-search"
                      class="mx-1 h-4 w-4 text-white"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <label for="shop-categories">Categories</label>
              <v-select
                label="name"
                :options="Categories"
                placeholder="All"
                :model-value="displayCategory"
                @update:model-value="updateCategory"
              >
              </v-select>
            </div>
            <div>
              <label for="shop-group">Activities</label>
              <v-select
                label="name"
                :options="Groups"
                placeholder="All"
                :model-value="displayActivity"
                @update:model-value="updateGroup"
              >
              </v-select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative flex">
      <div class="">
        <div class="" v-if="!Products.length && !Loading">
          <h3 class="mb-4 mt-16 text-xl font-semibold text-[#555]">
            No products found
          </h3>
        </div>
        <div class="a-z-wrap mt-10" v-if="!Loading">
          <Tile
            v-for="product in Products"
            :key="product.id"
            :url="'/shop/product/' + product.id + '-' + product.url_name"
            :title="product.name"
            :image="product.image"
            :text="toCurrency(product.price)"
            :product-id="product.id"
            :shop-group-name="product.group_name"
          />
        </div>
        <div class="a-z-wrap mt-10" v-else>
          <Tile v-for="Item in ProductsPerPage" :key="Item" :loading="true" />
        </div>
        <Pagination
          :array="Products"
          :load-page="loadPage"
          :page="Page"
          :more-results="MoreResults"
          :previous-results="PreviousResults"
          :loading="Loading"
        />
      </div>
    </div>
  </div>
  <Modal
    :signed-in="signedIn"
    :title="'Basket Error!'"
    :error-description="ErrorDescription"
    :modal-closed="ModalClosed"
    @close="ModalClosed = true"
  />
</template>
<style>
@import "https://cdn.jsdelivr.net/npm/vue-select@3.16.0/dist/vue-select.css";
</style>
<script>
import Tile from "../Tile/tile.ce.vue";
import Pagination from "../Pagination/pagination.ce.vue";
import Modal from "../modal/modal.ce.vue";
import axios from "../../_common/axios.mjs";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import vSelect from "vue-select";
library.add(faSearch);
library.add(faBasketShopping);

export default {
  props: {
    siteid: { type: String, default: "" },
    title: { type: String, default: "" },
    featuredshop: Boolean,
    hidefilter: Boolean,
    selectedgroup: { type: String, default: "" },
    signedIn: { type: Boolean, default: false },
    icon: { type: Boolean, default: false },
  },
  components: {
    Tile,
    Pagination,
    Modal,
    FontAwesomeIcon,
    "v-select": vSelect,
  },
  data() {
    return {
      Products: [],
      Groups: [],
      Categories: [],
      Search: "",
      SelectedGroup: "",
      SelectedCategory: "",
      Page: 1,
      Pages: [],
      MoreResults: false,
      PreviousResults: false,
      ShopOnly: true,
      ModalClosed: true,
      ErrorDescription: "",
      Loading: true,
      ProductsPerPage: 12,
    };
  },
  created() {
    var self = this;
    self.Loading = true;
    //check if looking for a specific activity, search, etc...
    let urlParams = new URLSearchParams(window.location.search);
    if (!self.featuredshop && !self.hidefilter) {
      if (urlParams.has("activity_id")) {
        self.SelectedGroup = urlParams.get("activity_id");
      }
      if (urlParams.has("search")) {
        self.Search = urlParams.get("search");
      }
      if (urlParams.has("category")) {
        self.SelectedCategory = urlParams.get("category");
      }
    }
    if (self.selectedgroup) {
      self.SelectedGroup = self.selectedgroup;
    }
    //Get Categories
    axios
      .get("https://pluto.sums.su/api/products/categories?sortBy=name", {
        headers: {
          "X-Site-Id": self.siteid,
        },
      })
      .then(function (response) {
        self.Categories = response.data;
      });
    //get groups
    axios
      .get("https://pluto.sums.su/api/groups?sortBy=name&selectList=1", {
        headers: {
          "X-Site-Id": self.siteid,
        },
      })
      .then(function (response) {
        self.Groups = response.data;
      });
    //get Products
    self.getProducts();
  },
  methods: {
    /**
     * Fetch products from API
     * @param bool append - are we getting more events to append to the current list?
     */
    getProducts: function (append = false) {
      var self = this;
      if (!append) {
        self.Page = 1;
        self.Pages = [1];
      }
      let parameters =
        "sortBy=name&perPage=" +
        self.ProductsPerPage +
        "&hasStock=1&page=" +
        self.Page;
      if (self.featuredshop) {
        parameters += "&shopItems=1";
      }
      //add relevant parameters to the event search
      if (self.Search) {
        parameters += "&searchTerm=" + self.Search;
      }
      if (self.SelectedCategory) {
        parameters += "&categoryId=" + self.SelectedCategory;
      }
      if (self.SelectedGroup) {
        parameters += "&groupId=" + self.SelectedGroup;
      }
      axios
        .get("https://pluto.sums.su/api/products?" + parameters, {
          headers: {
            "X-Site-Id": self.siteid,
          },
        })
        .then(function (response) {
          self.Products = response.data.data;
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
          self.Loading = false;
        });
    },
    /**
     * choose category
     * @param event - event from select box
     */
    updateCategory(value) {
      self.Loading = true;
      if (value === null) {
        this.SelectedCategory = "";
      } else {
        this.SelectedCategory = value.id;
      }
      this.getProducts();
    },
    /**
     * Choose Group
     * @param event - event from select box
     */
    updateGroup(value) {
      self.Loading = true;
      if (value === null) {
        this.SelectedGroup = "";
      } else {
        this.SelectedGroup = value.id;
      }
      this.getProducts();
    },
    /**
     * Search for product
     * @param event - onkeyup event from input box
     */
    search(event) {
      this.Search = event.target.value;
      this.getProducts();
    },
    moreProducts() {
      self.Loading = true;
      this.Page++;
      this.getProducts(true);
    },
    loadPage(pageNumber = null) {
      self.Loading = true;
      if (pageNumber) {
        this.Page = pageNumber;
      } else {
        this.Page++;
      }
      this.Pages.indexOf(this.Page) === -1 ? this.Pages.push(this.Page) : "";
      this.getProducts(true);
    },
    toCurrency(value) {
      if (typeof value !== "number") {
        return value;
      }
      if (value === 0) {
        return "Free";
      }
      var formatter = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      });
      return formatter.format(value);
    },
  },
  computed: {
    displayCategory() {
      return this.Categories.find((category) => {
        return category.id == this.SelectedCategory;
      });
    },
    displayActivity() {
      return this.Groups.find((group) => {
        return group.id == this.SelectedGroup;
      });
    },
  },
};
</script>
