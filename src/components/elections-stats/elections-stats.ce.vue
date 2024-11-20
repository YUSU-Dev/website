<template>
  <div class="flex flex-col">
    <ElectionsGraph
      v-for="graph in graphs"
      :key="graph.title"
      :data="graph.data"
      :title="graph.title"
      :id="graph.id"
      :loading="loading"
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
    minimumMembers: {
      type: Number,
      default: 15,
    },
    chartSize: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      loading: false,
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
      this.loading = true;
      await axios
        .get("https://pluto.sums.su/api/elections/statistics")
        .then(function (response) {
          if (self.sports) {
            var sports = response.data.activities_subcats.find(
              (item) => item.category_data.name === "Sports",
            ).activity_data;
            sports = sports.filter(
              (item) => item.total_members > self.minimumMembers,
            );
            sports = sports.sort((a, b) => b.total_votes - a.total_votes);
            if (sports.length > self.chartSize) {
              sports = sports.slice(0, self.chartSize);
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
            societies = societies.filter(
              (item) => item.total_members > self.minimumMembers,
            );
            societies = societies.sort((a, b) => b.total_votes - a.total_votes);
            if (societies.length > self.chartSize) {
              societies = societies.slice(0, self.chartSize);
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
              (item) => item.total_electorate > self.minimumMembers,
            );
            departments = departments.sort(
              (a, b) => b.total_votes - a.total_votes,
            );
            if (departments.length > self.chartSize) {
              departments = departments.slice(0, self.chartSize);
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
              (item) => item.total_electorate > self.minimumMembers,
            );
            accommodations = accommodations.sort(
              (a, b) => b.total_votes - a.total_votes,
            );
            if (accommodations.length > self.chartSize) {
              accommodations = accommodations.slice(0, self.chartSize);
            }
            self.graphs.push({
              title: accommodations.length + " colleges",
              data: accommodations,
              id: "accommodations",
            });
          }
          self.loading = false;
        });
    },
  },
};
</script>
