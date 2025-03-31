<template>
  <div class="flex flex-col">
    <div class="flex flex-wrap items-center justify-center gap-x-12 pb-12">
      <div v-for="stat in stats" :key="stat.title" class="p-4">
        <div
          class="flex h-36 w-36 flex-col items-center justify-center text-center"
        >
          <div class="flex h-2/4 items-center justify-center">
            <h2 class="text-xl font-semibold">{{ stat.title }}</h2>
          </div>
          <div class="text-voice-orange h-2/4 text-5xl font-bold">
            {{ stat.data }}
          </div>
        </div>
      </div>
    </div>
    <ElectionsGraph
      v-for="graph in graphs"
      :key="graph.title"
      :data="graph.data"
      :small="graph.small"
      :medium="graph.medium"
      :large="graph.large"
      :title="graph.title"
      :axis-label="graph.axisLabel"
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
    all: {
      type: Boolean,
      default: true,
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
    sizesEnabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
      selected: [],
      graphs: [],
      stats: [],
      mediumThreshold: 200,
      largeThreshold: 400,
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
          if (self.generalStats || self.all) {
            // self.stats.push({'title': 'Total Electorate', 'data': response.data.total_electorate});
            self.stats.push({
              title: "% Turnout",
              data: response.data.overallPercent + "%",
            });
            self.stats.push({
              title: "Total Votes",
              data: response.data.total_votes,
            });
            self.stats.push({
              title: "Unique Voters",
              data: response.data.unique_voters,
            });
          }
          if (self.sports || self.all) {
            self.processData(
              response.data.activities_subcats,
              "Sports",
              "total_members",
              "sports clubs",
            );
          }
          if (self.societies || self.all) {
            self.processData(
              response.data.activities_parents,
              "Societies",
              "total_members",
              "societies",
            );
          }
          if (self.departments || self.all) {
            self.processData(
              response.data.schools,
              "Departments",
              "total_electorate",
              "departments",
            );
          }
          if (self.accommodations || self.all) {
            self.processData(
              response.data.accommodations,
              "Colleges",
              "total_electorate",
              "colleges",
            );
          }
          self.loading = false;
        });
    },
    processData(data, categoryName, memberKey, title) {
      let categoryData =
        data.find(
          (item) =>
            item.category_data && item.category_data.name === categoryName,
        )?.activity_data || data;
      categoryData = categoryData.filter(
        (item) => item[memberKey] > this.minimumMembers,
      );
      categoryData = categoryData.sort(
        (a, b) => b.overall_percent - a.overall_percent,
      );
      if (categoryData.length > this.chartSize) {
        categoryData = categoryData.slice(0, this.chartSize);
      }
      let small = null,
        medium = null,
        large = null;
      if (this.sizesEnabled) {
        small = this.filterAndSlice(
          categoryData,
          (item) => item[memberKey] < this.mediumThreshold,
        );
        medium = this.filterAndSlice(
          categoryData,
          (item) =>
            item[memberKey] >= this.mediumThreshold &&
            item[memberKey] < this.largeThreshold,
        );
        large = this.filterAndSlice(
          categoryData,
          (item) => item[memberKey] >= this.largeThreshold,
        );
      }

      this.graphs.push({
        title: `${categoryData.length} ${title}`,
        axisLabel: title.toUpperCase(),
        data: categoryData,
        small: small,
        medium: medium,
        large: large,
        id: categoryName.toLowerCase(),
      });
    },
    filterAndSlice(data, filter) {
      let filteredData = data.filter(filter);
      if (filteredData.length > this.chartSize) {
        filteredData = filteredData.slice(0, this.chartSize);
      }
      return filteredData.length === 0 ? null : filteredData;
    },
  },
};
</script>
