<template>
  <link rel="stylesheet" href="https://assets-cdn.sums.su/YU/CSS/custom-student-life.css">
  <div class="row societies-a-z-block p-2" id="societies-a-z">
    <div class="col-12">
      <div class="row activities-list justify-content-center">
        <div class="col-12 text-center col-lg-8 pb-2">
          <div class="heading heading--primary heading--center pb-2">
            <h2 class="heading__title d-none d-lg-block">{{title}}</h2>
            <p class="h3 d-block d-lg-none text-dark">{{title}}</p>
          </div>
        </div>
        <div class="col-8 col-lg-4 my-auto">
          <input class="nav-item w-100 float-right" type="text" aria-label="search for an activity" 
                 name="search" placeholder="Search..." style="height: 40px;" 
                 v-on:keyup="search($event)"/>
        </div>
        <div class="col-12 text-center" v-if="Search">
          <p class="h3">Search Results</p>
        </div>
        <div class="col-12 d-none d-lg-block" v-if="!Search && ParentCategories.length > 0">
          <div class="nav-societies-type text-center">
            <p class="h3">Filters</p>
            <ul class="clubs-nav-block nav nav-tabs nav-justified u-nav-v2-1 u-nav-rounded-3 u-nav-primary g-mb-30" data-btn-classes="btn btn-md btn-block u-btn-outline-primary g-mb-30">
              <li v-for="Parent in ParentCategories" @click.prevent="SelectedParent = Parent; SelectedCategory = ''; getGroups();" class="nav-item">
                <a v-bind:class="{'active':(SelectedParent.id === Parent.id)}" class="nav-link">
                  <span>{{ Parent.name }}</span>
                </a>
              </li>
            </ul>
            <ul class="nav nav-pills nav-fill g-mb-30" v-if="SelectedParent">
              <li class="nav-item" @click.prevent="SelectedCategory = ''; getGroups();">
                <a v-bind:class="{'active':(SelectedCategory === '')}" href="#" class="nav-link">
                  <span>All</span>
                </a>
              </li>
              <li v-for="Category in filteredCategories" @click.prevent="SelectedCategory = Category; getGroups();" class="nav-item" v-if="SelectedParent">
                <a v-bind:class="{'active':(SelectedCategory.id === Category.id)}" class="nav-link" :href="'/student-life/clubs-and-socs?category='+Category.id">
                  <span>{{ Category.name }}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-12">
            <hr />
        </div>
        <div class="row socs-list g-mb-10 p-0 justify-content-center w-100">
          <!-- Activity -->
          <div class="col-5 col-md-2 mx-2 my-2 activity-article d-block" v-for="Activity in Groups">
            <div>
              <a :href="'/activities/view/' + Activity.url_name">
                <div>
                  <div v-if="Activity.thumbnail_url" 
                       class="d-none d-md-block justify-content-center" 
                       style="height: 9em;overflow:hidden; background-position: center; background-repeat: no-repeat; background-size: contain; cursor:pointer;" 
                       v-bind:style="'background-image:url(' + Activity.thumbnail_url + ');'"
                       v-bind:alt="Activity.name + ' Logo'" />
                  <div v-else class="d-none d-md-block justify-content-center" 
                       style="height: 9em;overflow:hidden ;background-image:url('https://yusu.s3.eu-west-2.amazonaws.com/sums/website/images/placeholder-events.png');
                              background-position: center; background-repeat: no-repeat; background-size: contain; cursor:pointer;" 
                       alt="Yusu Activities Logo"/>
                  <div v-if="Activity.thumbnail_url" 
                       class="d-md-none justify-content-center" 
                       style="height: 9em;overflow:hidden; background-position: center; background-repeat: no-repeat; background-size: contain; cursor:pointer;" 
                       v-bind:style="'background-image:url(' + Activity.thumbnail_url + ');'"
                       v-bind:alt="Activity.name + ' Logo'" />
                  <div v-else 
                       class="d-md-none justify-content-center" 
                       style="height: 5em;overflow:hidden ;background-image:url('https://yusu.s3.eu-west-2.amazonaws.com/sums/website/images/placeholder-events.png');
                              background-position: center; background-repeat: no-repeat; background-size: contain; cursor:pointer;" 
                       alt="Yusu Activities Logo" />

                </div>
                <div class="h6 g-color-grey g-mb-5 text-center align-bottom btn-block">
                  <p class="g-color-black">{{ Activity.name }}</p>
                </div>
              </a>
            </div>
          </div>
          <!-- Activity end-->
        </div>
        <div class="row d-flex justify-content-center m-3" v-if="MoreResults">
          <button type="button" class="btn-more" @click="moreGroups()">Load More <i class="fa fa-chevron-down"></i></button>
        </div>
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
        
        if (!self.title){
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
          axios.get('https://pluto.sums.su/api/groups/categories?sortBy=name&isParent=0&parentIds=' + self.selectedparents , {
              headers: {
                  'X-Site-Id': self.siteid
              }
          }).then(function (response) {
              self.Categories = response.data;
              let idArray = self.Categories.map(function(item) {
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