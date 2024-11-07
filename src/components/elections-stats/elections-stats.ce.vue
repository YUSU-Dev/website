<template>
  <div class="flex flex-col">
    <ElectionsGraph
      v-for="graph in graphs"
      :key="graph.title"
      :data="graph.data"
      :title="graph.title"
      :id="graph.id"
    />
  </div>
</template>

<script>
import axios from "../../_common/axios.mjs";
import ElectionsGraph from "../elections-graph/elections-graph.ce.vue";
export default {
  name: "ElectionsStats",
  components: {
    ElectionsGraph,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    sports: {
      type: Boolean,
      default: false,
    },
    societies: {
      type: Boolean,
      default: false,
    },
    departments: {
      type: Boolean,
      default: false,
    },
    accommodations: {
      type: Boolean,
      default: false,
    },
    generalStats: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      all: true,
      selected: [],
      graphs: [],
      stats: [],
    };
  },
  mounted() {
    this.getStatistics();
  },
  methods: {
    async getStatistics() {
      let self = this;
      await axios
        .get("https://pluto.sums.su/api/elections/statistics")
        .then(function (response) {
          console.log(response.data);
          if (self.sports) {
            var sports = response.data.activities_subcats.find(
              (item) => item.category_data.name === "Sports",
            ).activity_data;
            sports = sports.filter((item) => item.total_members > 15);
            sports = sports.sort((a, b) => b.total_votes - a.total_votes);
            if (sports.length > 10) {
              sports = sports.slice(0, 10);
            }
            self.graphs.push({
              title: sports.length + " sports clubs",
              data: sports,
              id: "sports",
            });
          }
          if (self.societies) {
            var societies = response.data.activities_parents.find(
              (item) => item.category_data.name === "Societies",
            ).activity_data;
            societies = societies.filter((item) => item.total_members > 15);
            societies = societies.sort((a, b) => b.total_votes - a.total_votes);
            if (societies.length > 10) {
              societies = societies.slice(0, 10);
            }
            self.graphs.push({
              title: societies.length + " societies",
              data: societies,
              id: "societies",
            });
          }
          if (self.departments) {
            var departments = response.data.schools;
            departments = departments.filter(
              (item) => item.total_electorate > 15,
            );
            departments = departments.sort(
              (a, b) => b.total_votes - a.total_votes,
            );
            if (departments.length > 10) {
              departments = departments.slice(0, 10);
            }
            self.graphs.push({
              title: departments.length + " departments",
              data: departments,
              id: "departments",
            });
          }
          if (self.accommodations) {
            var accommodations = response.data.accommodations;
            accommodations = accommodations.filter(
              (item) => item.total_electorate > 15,
            );
            accommodations = accommodations.sort(
              (a, b) => b.total_votes - a.total_votes,
            );
            if (accommodations.length > 10) {
              accommodations = accommodations.slice(0, 10);
            }
            self.graphs.push({
              title: accommodations.length + " accommodations",
              data: accommodations,
              id: "accommodations",
            });
          }
        });
    },
  },
};
</script>
