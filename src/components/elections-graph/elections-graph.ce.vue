<template>
  <div v-if="!loading" class="min-h-96 w-full" :ref="id"></div>
  <div v-else class="">
    <Loading :loading="loading" text></Loading>
  </div>
</template>

<script>
import * as echarts from "echarts";
import Loading from "../loading/loading.ce.vue";
export default {
  name: "ElectionsGraph",
  props: {
    data: {
      type: Array,
      default: null,
    },
    title: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Loading,
  },
  data() {
    return {
      isMobile: window.innerWidth < 768,
      myChart: null,
    };
  },
  mounted() {
    this.drawGraph();
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    createOptions() {
      const isMobile = this.isMobile;
      let option = {
        tooltip: {},
        xAxis: {},
        yAxis: {},
        series: [
          {
            type: "bar",
            showBackground: isMobile ? true : false,
            data: this.data.map((item) => item.total_votes),
            itemStyle: {
              color: "#f2cb50",
              borderColor: "000000",
              borderWidth: 1,
              backgroundStyle: {
                shadowColor: "rgba(0, 0, 0, 0.5)",
                shadowBlur: 10,
              },
            },
            barWidth: isMobile ? "100%" : "auto",
          },
        ],
        grid: {
          right: 40,
          top: 0,
        },
      };

      if (isMobile) {
        console.log("Drawing mobile graph");
        option.xAxis = {
          type: "value",
          name: "Total Votes",
          nameLocation: "middle",
          nameGap: 50,
        };
        option.yAxis = {
          type: "category",
          data: this.data.map((item) => item.name),
          axisLabel: {
            inside: true,
            textStyle: {
              color: "#000",
              fontSize: 16,
              overflow: "hidden",
            },
          },
          z: 10,
        };
        option.grid.left = "40";
      } else {
        console.log("Drawing desktop graph");
        option.xAxis = {
          type: "category",
          data: this.data.map((item) => item.name),
          name: "Sports Clubs",
          nameLocation: "middle",
          nameGap: 50,
          axisLabel: {
            interval: 0,
            rotate: -15,
          },
        };
        option.yAxis = {
          type: "value",
          name: "Total Votes",
          nameLocation: "middle",
          nameGap: 50,
        };
        option.grid.left = "80";
      }

      if (this.title) {
        option.title = {
          text: "Top " + this.title,
          left: "center",
          width: "100%",
          padding: [0, 0, 0, 0],
        };
        option.grid.top = "48";
      }

      return option;
    },
    drawGraph() {
      var chart = this.$refs[this.id];
      var myChart;
      if (this.myChart) {
        myChart = this.myChart;
      } else {
        myChart = echarts.init(chart);
      }

      var option = this.createOptions();
      myChart.setOption(option);
      this.myChart = myChart;
    },
    handleResize() {
      this.myChart.resize();
      this.isMobile = window.innerWidth < 768;
    },
  },
  watch: {
    isMobile(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.drawGraph();
      }
    },
  },
};
</script>
