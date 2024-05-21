<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: "soleil", sans-serif !important;
}
</style>
<template>
  <div class="container mx-auto p-10" id="societies-a-z">
    <div class="justify-center">
      <div class="flex px-2 lg:px-3">
        <!-- <i class="fa-solid fa-magnifying-glass text-3xl flex items-center mr-3"></i> -->
        <input class="border-[1px] border-black p-4 w-full" type="text" aria-label="search for an activity"
          name="search" placeholder="Search..." style="height: 40px;" v-on:keyup="search($event)" />
      </div>
      <div class="relative flex mt-12 px-2 lg:px-3 pb-4">
        <Transition>
          <div class="w-full" v-if="Search">
            <h3 class="text-center font-semibold text-3xl">Search Results</h3>
          </div>
        </Transition>
        <Transition>
          <div class="text-center w-full max-w-4xl" v-if="!Search && ParentCategories.length > 0">
            <div class="">
              <h3 class="sr-only">Filters</h3>
              <ul class="grid gap-4 grid-cols-1 md:grid-cols-3">
                <li v-for="Parent in ParentCategories"
                  @click.prevent="SelectedParent = Parent; SelectedCategory = ''; getGroups();" class=" "
                  :key=Parent.id>
                  <a v-bind:class="{ 'bg-white text-black font-semibold': (SelectedParent.id === Parent.id) }"
                    class="w-full h-full flex justify-center px-4 py-2 border-2 font-semibold border-none bg-mustard text-black hover:bg-white hover:text-black text-xl">
                    <h3>{{ Parent.name }}</h3>
                  </a>
                </li>
              </ul>
              <ul class="flex flex-wrap justify-center mt-6 gap-2" v-if="SelectedParent">
                <li class="" @click.prevent="SelectedCategory = ''; getGroups();">
                  <a v-bind:class="{ 'bg-white text-black font-semibold': (SelectedCategory === '') }" href="#"
                    class="flex justify-center px-4 py-2 border-2 border-black bg-black text-white hover:bg-white hover:text-black text-lg">
                    <h4>All</h4>
                  </a>
                </li>
                <li v-for="Category in filteredCategories" @click.prevent="SelectedCategory = Category; getGroups();"
                  class="" v-if="SelectedParent" :key=Category.id>
                  <a v-bind:class="{ 'bg-white text-black font-semibold': (SelectedCategory.id === Category.id) }"
                    class="flex justify-center px-4 py-2 border-2 border-black bg-black text-white hover:bg-white hover:text-black text-lg"
                    :href="'/student-life/clubs-and-socs?category=' + Category.id">
                    <h4>{{ Category.name }}</h4>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Transition>
      </div>
      <div class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mt-10">
        <Tile v-for="Group in Groups" :key=Group.id :url="'/activities/view/' + Group.url_name" :title="Group.name"
          :image="Group.thumbnail_url" />
      </div>
      <Pagination :Array="Groups" :loadPage="loadPage" :Page="Page" :MoreResults="MoreResults"
        :PreviousResults="PreviousResults" />
      <!-- <div class="flex justify-center mt-10" v-if="MoreResults">
        <button type="button" class="bg-black border border-black text-white px-6 py-2 rounded-lg hover:bg-white hover:text-black" @click="moreGroups()">Load More <i class="fa fa-chevron-down"></i></button>
      </div> -->
    </div>
  </div>
</template>
<script>
import Tile from '../Tile/tile.vue';
import Pagination from '../Pagination/pagination.vue';
export default {
  props: ['siteid', 'selectedparents', 'title', 'selectedcategory'],
  components: {
    Tile,
    Pagination
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
      Search: '',
      Page: 1,
      Pages: [],
      MoreResults: false,
      PreviousResults: false,
    }
  },
  created() {
    var self = this;
    if (self.selectedparents) {
      self.SelectedParents = self.selectedparents.split(",");
    } else if (self.selectedcategory) {
      self.CategoryIDs = self.selectedcategory;
    } else {
      self.SelectedParents = "2,24";
    }

    if (!self.title) {
      self.title = "Clubs and Societies: A-Z";
    }
    //check if looking for a specific activity, search, etc...
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('search')) {
      self.Search = urlParams.get('search');
    }
    //if we already have a category, don't get more info
    if (!self.selectedcategory) {
      //Get parents
      axios.get('https://pluto.sums.su/api/groups/categories?sortBy=name&isParent=1', {
        headers: {
          'X-Site-Id': self.siteid
        }
      }).then(function (response) {
        response.data.forEach(category => {
          if (self.SelectedParents.includes(category.id.toString())) {
            self.ParentCategories = [...self.ParentCategories, category];
          }
        });
      });
      //get categories
      axios.get('https://pluto.sums.su/api/groups/categories?sortBy=name&isParent=0&parentIds=' + self.selectedparents, {
        headers: {
          'X-Site-Id': self.siteid
        }
      }).then(function (response) {
        self.Categories = response.data;
        let idArray = self.Categories.map(function (item) {
          return item['id'];
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
      if (!append) {
        self.Page = 1;
        self.Pages = [1];
      }
      let parameters = 'sortBy=name&perPage=20&page=' + self.Page;
      //add relevant parameters to the group search
      if (self.CategoryIDs) {
        parameters += '&categoryIds=' + self.CategoryIDs;
      }
      if (self.Search) {
        parameters += '&searchTerm=' + self.Search;
        self.SelectedCategory = self.SelectedParent = "";
      } else if (self.SelectedCategory) {
        parameters += '&categoryId=' + self.SelectedCategory.id;
      } else if (self.SelectedParent) {
        parameters += '&parentCategoryId=' + self.SelectedParent.id;
      }
      axios.get('https://pluto.sums.su/api/groups?' + parameters, {
        headers: {
          'X-Site-Id': self.siteid
        }
      }).then(function (response) {
        self.Groups = response.data.data;
        //If the API says there are more results (ie another page), update the template accordingly
        if (response.data.next_page_url) {
          self.MoreResults = true
        } else {
          self.MoreResults = false
        }
        if (response.data.prev_page_url) {
          self.PreviousResults = true;
        } else {
          self.PreviousResults = false;
        }
      })
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
      this.Search = event.target.value
      this.getGroups();
    },
  },
  computed: {
    filteredCategories() {
      let self = this;
      return this.Categories.filter(category => {
        if (self.SelectedParent) {
          return category.parent_id == self.SelectedParent.id
        }

      });
    }
  }
};
</script>