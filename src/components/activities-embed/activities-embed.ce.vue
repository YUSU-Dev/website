<template>
  <div class="a-z-wrap mt-10" v-if="!loading">
    <Tile
      v-for="Group in Groups"
      :key="Group.id"
      :url="'/activities/view/' + Group.url_name"
      :title="Group.name"
      :image="Group.thumbnail_url"
      section="student-life"
    />
  </div>
</template>

<script>
import Tile from "../Tile/tile.ce.vue";
import axios from "../../_common/axios.mjs";
export default {
  name: "ActivitiesEmbed",
  props: {
    groupIds: {
      type: Array,
      default: null,
    },
  },
  components: {
    Tile,
  },
  data() {
    return {
      Groups: [],
      loading: true,
    };
  },
  created() {
    var self = this;
    self.loading = true;
    for (let i in this.groupIds) {
      console.log(this.groupIds[i]);
      axios
        .get("https://pluto.sums.su/api/groups/" + self.groupIds[i], {
          headers: {
            "X-Site-Id": self.siteid,
          },
        })
        .then(function (response) {
          console.log(response.data);
          self.Groups.push(response.data);
        });
    }
    self.loading = false;
    console.log(self.Groups);
  },
};
</script>
