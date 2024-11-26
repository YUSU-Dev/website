<template>
  <div class="flex flex-col">
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
              "Accommodations",
              "total_electorate",
              "accommodations",
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
