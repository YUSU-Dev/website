<template>
  <div class="container">
    <div class="row pb-3">
      <div class="col">
        <label for="topic-search">Search for a topic</label>
        <div class="input-group">
          <input
            id="topic-search"
            class="form-control"
            aria-label="Search"
            type="text"
            name="search"
            placeholder="Search..."
            aria-describedby="topic-search"
            v-model="Search"
          />
          <div class="input-group-append">
            <button
              type="submit"
              class="btn btn-outline-secondary"
              aria-label="Submit"
            >
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <hr class="m-0" />
    <div class="row justify-content-center">
      <div class="col-12 col-lg-4 my-3" v-for="item in FilteredMenu">
        <div class="card h-100 text-center" v-if="item.name">
          <a :href="item.url">
            <h3 class="h6 card-header">{{ item.name }}</h3>
            <div class="card-body">
              <p>{{ item.category }}</p>
              <i class="fas fa-cross" v-if="item.icon" />
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../_common/axios.mjs";
export default {
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
      Menu: [],
      Categories: [],
      Search: "",
      selectedCategory: "",
    };
  },
  created() {
    console.log("cool");
    var self = this;
    let data = self.apitext;
    self.Menu = data.sort(self.compare);
    self.Menu.forEach((menuElement) => {
      if (!self.Categories.includes(menuElement.category)) {
        self.Categories.push(menuElement.category);
      }
    });
    /*
    if(self.apiurl){
      axios.get(self.apiurl,{})
      .then(
        function(response){
          let data=JSON.parse('['+response.data.substring(0,response.data.lastIndexOf(','))+']');
          self.Menu=data.sort(self.compare);
          self.Menu.forEach(menuElement=>{
            if(!(self.Categories.includes(menuElement.category))){
              self.Categories.push(menuElement.category);
            }
          }
        );
      });
    }
      */
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
    updateCategory(event) {
      this.selectedCategory = event.target.value;
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
