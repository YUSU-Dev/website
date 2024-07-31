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
    ids: {
      type: String,
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
    var groupIds = self.ids.split(",");
    for (let i in groupIds) {
      axios
        .get("https://pluto.sums.su/api/groups/" + groupIds[i], {
          headers: {
            "X-Site-Id": self.siteid,
          },
        })
        .then(function (response) {
          if (response.data.id) {
            self.Groups.push(response.data);
          }
        });
    }
    self.loading = false;
    console.log(self.Groups);
  },
};
</script>
