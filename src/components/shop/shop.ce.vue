<template>
  <div class="w-full">
    <div class="pt-3">
      <div class="container">
        <h2 v-if="title" class="pb-2 text-center">{{ title }}</h2>
        <div v-if="!hidefilter">
          <h2 class="text-3xl">Shop Filters</h2>
          <div class="row">
            <div class="justify-center">
              <div class="input-group flex px-2 lg:px-3">
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
                    <i class="fas fa-search p-2 text-white"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="col-lg-3 form-group">
              <label for="shop-categories">Categories</label>
              <select
                id="shop-categories"
                class="form-control"
                v-model="SelectedCategory"
                @change="updateCategory($event)"
              >
                <option value="">All</option>
                <option
                  v-for="category in Categories"
                  :value="category.id"
                  :key="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="col-lg-3 form-group">
              <label for="shop-group">Activities</label>
              <select
                id="shop-group"
                class="form-control"
                v-model="SelectedGroup"
                @change="updateGroup($event)"
              >
                <option value="">All</option>
                <option
                  v-for="activity in Groups"
                  :value="activity.id"
                  :key="activity.id"
                >
                  {{ activity.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="relative mt-6 flex px-2 pb-4 lg:px-3">
      <div class="container">
        <div class="m-4 text-center" v-if="!Products.length">
          <h3>No products found</h3>
        </div>
        <div
          class="mt-10 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        >
          <Tile
            v-for="product in Products"
            :key="product.id"
            :url="'/shop/product/' + product.id + '-' + product.url_name"
            :title="product.name"
            :image="product.image"
            :addToBasket="addToBasket"
            :text="toCurrency(product.price)"
            :productId="product.id"
            :shopGroupName="product.group_name"
          />
        </div>
        <Pagination
          :Array="Products"
          :loadPage="loadPage"
          :Page="Page"
          :MoreResults="moreProducts"
          :PreviousResults="PreviousResults"
        />
      </div>
      <!-- <div class="row justify-content-center">
          <div
            v-bind:class="{
              'col-md-3': Products.length > 3,
              'col-md-4': Products.length < 4,
            }"
            class="col-9 d-flex align-items-stretch my-3"
            v-for="product in Products"
            :key="product.id"
          >
            <a
              class="card w-100"
              :href="'/shop/product/' + product.id + '-' + product.url_name"
            >
              <img
                v-if="product.image"
                class="card-img-top"
                :src="product.image"
                alt=""
              />
              <img
                v-else
                class="card-img-top"
                src="https://assets-cdn.sums.su/YU/IMG/Website/500x500_Placeholder.webp"
                alt=""
              />
              <div class="card-body d-flex flex-column text-dark text-center">
                <h3 class="h5 card-title">{{ product.name }}</h3>
                <p class="card-text mt-auto" v-if="product.group_name">
                  {{ product.group_name }}
                </p>
                <p class="card-text mt-auto" v-if="product.price > 0">
                  {{ toCurrency(product.price) }}
                </p>
                <p class="card-text mt-auto" v-else>Free</p>
              </div>
              <div class="card-footer bg-white">
                <div class="text-center">
                  <a
                    class="btn btn-lg u-btn-primary m-1"
                    :href="
                      '/shop/product/' + product.id + '-' + product.url_name
                    "
                    >More Information</a
                  >
                  <a
                    class="btn btn-lg u-btn-primary m-1 p-2"
                    :href="'javascript:addToBasket(' + product.id + ')'"
                    >Add to Basket</a
                  >
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="row d-flex justify-content-center m-3" v-if="MoreResults">
          <button
            type="button"
            class="btn u-btn-secondary rounded"
            @click="moreProducts()"
          >
            Load More <i class="fa fa-chevron-down"></i>
          </button>
        </div> -->
      <!-- </div> -->
    </div>
  </div>
  <Modal
    :signedIn="signedIn"
    :title="'Basket Error!'"
    :errorDescription="ErrorDescription"
    :modalClosed="ModalClosed"
    @close="ModalClosed = true"
  />
</template>

<script>
import Tile from "../Tile/tile.ce.vue";
import Pagination from "../Pagination/pagination.ce.vue";
import Modal from "../modal/modal.ce.vue";
import axios from "../../_common/axios.mjs";
import "../../main.css";
export default {
  props: [
    "siteid",
    "title",
    "featuredshop",
    "hidefilter",
    "selectedgroup",
    "signedIn",
  ],
  components: {
    Tile,
    Pagination,
    Modal,
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
      ModalClosed: false,
      ErrorDescription: "",
    };
  },
  created() {
    var self = this;
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
      let parameters = "sortBy=name&perPage=12&hasStock=1&page=" + self.Page;
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
        });
    },
    /**
     * choose category
     * @param event - event from select box
     */
    updateCategory(event) {
      this.SelectedCategory = event.target.value;
      this.getProducts();
    },
    /**
     * Choose Group
     * @param event - event from select box
     */
    updateGroup(event) {
      this.SelectedGroup = event.target.value;
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
      this.Page++;
      this.getProducts(true);
    },
    loadPage(pageNumber = null) {
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
    addToBasket(productId) {
      let self = this;
      axios
        .post(
          "shop/ajax",
          {
            c: "ab",
            pid: productId,
          },
          {
            headers: {
              "X-Site-Id": self.siteid,
            },
          },
        )
        .then(function (response) {
          if (!response["success"]) {
            var data = response.error_message;
            self.ErrorDescription = data;
            self.ModalClosed = false;
            return;
          }
          if (typeof response.fields != "undefined") {
            window.location.replace("/shop/fields/" + productId);
          } else {
            // refreshBasketAdd();
          }
        })
        .catch(function (response) {
          if (response.error_message != "undefined") {
            console.log(
              "There was an error adding the product to the basket: " +
                response.error_message,
            );
            self.ModalClosed = false;
          } else {
            console.log("Undefined error adding product to basket");
          }
        });
    },
  },
};
</script>
