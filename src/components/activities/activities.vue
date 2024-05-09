<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
<template>
  <div class="container mx-auto p-10 border-l-4 border-r-4 border-black" id="societies-a-z">
    <div class="justify-center">
      <div class="text-center mb-8">
        <h2 class="font-bold text-4xl">{{ title }}</h2>
      </div>
      <div class="flex justify-center">
        <i class="fa-solid fa-magnifying-glass text-3xl flex items-center mr-3"></i>
        <input class="border-2 border-black p-4 rounded-lg" type="text" aria-label="search for an activity" name="search"
          placeholder="Search..." style="height: 40px;" v-on:keyup="search($event)" />
      </div>
      <div class="relative flex justify-center mt-12 border-b-4 border-black pb-8">
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
                  @click.prevent="SelectedParent = Parent; SelectedCategory = ''; getGroups();" class=" " :key=Parent.id>
                  <a v-bind:class="{ 'bg-white text-black font-semibold': (SelectedParent.id === Parent.id) }"
                    class="w-full h-full flex justify-center px-4 py-2 border-2 border-black bg-black text-white hover:bg-white hover:text-black text-xl rounded-lg">
                    <h3>{{ Parent.name }}</h3>
                  </a>
                </li>
              </ul>
              <ul class="flex flex-wrap justify-center mt-6 gap-2" v-if="SelectedParent">
                <li class="" @click.prevent="SelectedCategory = ''; getGroups();">
                  <a v-bind:class="{ 'bg-white text-black font-semibold': (SelectedCategory === '') }" href="#"
                    class="flex justify-center px-4 py-2 border-2 border-black bg-black text-white hover:bg-white hover:text-black text-lg rounded-lg">
                    <h4>All</h4>
                  </a>
                </li>
                <li v-for="Category in filteredCategories" @click.prevent="SelectedCategory = Category; getGroups();"
                  class="" v-if="SelectedParent" :key=Category.id>
                  <a v-bind:class="{ 'bg-white text-black font-semibold': (SelectedCategory.id === Category.id) }"
                    class="flex justify-center px-4 py-2 border-2 border-black bg-black text-white hover:bg-white hover:text-black text-lg rounded-lg"
                    :href="'/student-life/clubs-and-socs?category=' + Category.id">
                    <h4>{{ Category.name }}</h4>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Transition>
      </div>
      <div class="flex flex-wrap gap-6 mt-12 justify-center">
        <!-- Activity -->
        <a v-for="Activity in Groups" :href="'/activities/view/' + Activity.url_name" :key=Activity.id>
          <div class="w-[282px] min-h-[315px] h-full border-black border">
            <div>
              <div v-if="Activity.thumbnail_url" class="w-full h-[202px] bg-center bg-cover" style=""
                v-bind:style="'background-image:url(' + Activity.thumbnail_url + ');'"
                v-bind:alt="Activity.name + ' Logo'" />
              <div v-else class="w-full h-[202px] bg-center bg-cover"
                style="background-image:url('https://assets-cdn.sums.su/YU/IMG/YUSU_logo_single.png');"
                alt="Yusu Activities Logo" />
            </div>
            <div class="my-6 mx-6">
              <p class="text-xl font-semibold">{{ Activity.name }}</p>
            </div>
          </div>
        </a>
        <!-- Activity end-->
      </div>
      <div class="flex justify-center mt-10" v-if="MoreResults">
        <button type="button" class="bg-black border border-black text-white px-6 py-2 rounded-lg hover:bg-white hover:text-black" @click="moreGroups()">Load More <i class="fa fa-chevron-down"></i></button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['siteid', 'selectedparents', 'title', 'selectedcategory'],
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
      MoreResults: false,
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
      if (!append) { self.Page = 1; }
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
        //if we want more events (append = true), add to array
        if (append) {
          self.Groups = [...self.Groups, ...response.data.data];
        } else {
          //otherwise replace current events
          self.Groups = response.data.data;
        }
        //If the API says there are more results (ie another page), update the template accordingly
        if (response.data.next_page_url) {
          self.MoreResults = true
        } else {
          self.MoreResults = false
        }
      })
    },
    moreGroups() {
      this.Page++;
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