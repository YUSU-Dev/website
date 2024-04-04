<template>
  <div class="w-100">
    <div v-bind:class="{ 'sidebar-coloured': featuredshop }" class="pt-3">
      <div class="container">
        <h2 v-if="title" class="text-center pb-2">{{ title }}</h2>
        <div v-if="!hidefilter">
          <h2 class="h6">Shop Filters</h2>
          <div class="row">
            <div class="col-lg-6 form-group">
              <label for="shop-search">Search</label>
              <div class="input-group mb-3">
                <input
                  id="shop-search"
                  class="form-control"
                  aria-label="Search"
                  type="text"
                  name="search"
                  placeholder="Search..."
                  v-on:keyup="search($event)"
                />
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
                <option v-for="category in Categories" :value="category.id">
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
                <option v-for="activity in Groups" :value="activity.id">
                  {{ activity.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-4 text-center">
      <div class="container">
        <div class="m-4 text-center" v-if="!Products.length">
          <h3>No products found</h3>
        </div>
        <div class="row justify-content-center">
          <div
            v-bind:class="{
              'col-md-3': Products.length > 3,
              'col-md-4': Products.length < 4,
            }"
            class="col-9 my-3 d-flex align-items-stretch"
            v-for="product in Products"
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
              <div class="card-body d-flex flex-column text-center text-dark">
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["siteid", "title", "featuredshop", "hidefilter", "selectedgroup"],
  data() {
    return {
      Products: [],
      Groups: [],
      Categories: [],
      Search: "",
      SelectedGroup: "",
      SelectedCategory: "",
      Page: 1,
      MoreResults: false,
      ShopOnly: true,
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
  mounted() {
    //allow scrolling functionality
    this.onScroll();
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
          //if we want more events (append = true), add to array
          if (append) {
            self.Products = [...self.Products, ...response.data.data];
          } else {
            //otherwise replace current events
            self.Products = response.data.data;
          }
          //If the API says there are more results (ie another page), update the template accordingly
          if (response.data.next_page_url) {
            self.MoreResults = true;
          } else {
            self.MoreResults = false;
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
    /**
     * Track when the user scrolls down the page
     */
    onScroll() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.max(
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
          ) +
            window.innerHeight +
            10 >=
          document.documentElement.offsetHeight;

        //automatically get more results if at bottom of page
        if (bottomOfWindow) {
          this.moreProducts();
        }
      };
    },
    toCurrency(value) {
      if (typeof value !== "number") {
        return value;
      }
      var formatter = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      });
      return formatter.format(value);
    },
  },
};
</script>
