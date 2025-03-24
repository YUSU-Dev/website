<template>
  <div v-if="!loading" class="px-6">
    <div class="min-h-96 w-full" :ref="id"></div>
    <div class="flex flex-col items-center justify-center gap-4 xs:flex-row">
      <Button
        v-if="small && (medium || large)"
        :selected="activeSize == 'small'"
        @click="setGraphSize('small')"
        is-primary
        text="Small"
        class="w-full sm:w-fit"
      />
      <Button
        v-if="medium && (small || large)"
        :selected="activeSize == 'medium'"
        @click="setGraphSize('medium')"
        is-primary
        text="Medium"
        class="w-full sm:w-fit"
      />
      <Button
        v-if="large && (small || medium)"
        :selected="activeSize == 'large'"
        @click="setGraphSize('large')"
        is-primary
        text="Large"
        class="w-full sm:w-fit"
      />
    </div>
  </div>
  <div v-else class="">
    <Loading :loading="loading" text></Loading>
  </div>
</template>

<script>
import * as echarts from "echarts";
import Loading from "../loading/loading.ce.vue";
import Button from "../button/button.ce.vue";
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
    axisLabel: {
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
    small: {
      type: Array,
      default: null,
    },
    medium: {
      type: Array,
      default: null,
    },
    large: {
      type: Array,
      default: null,
    },
  },
  components: {
    Loading,
    Button,
  },
  data() {
    return {
      isMobile: window.innerWidth < 768,
      myChart: null,
      activeSize: "small",
      windowWidth: window.innerWidth,
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
      var data = this.data;
      if (this.small && this.activeSize === "small") {
        data = this.small;
      } else if (this.medium && this.activeSize === "medium") {
        data = this.medium;
      } else if (this.large && this.activeSize === "large") {
        data = this.large;
      }
      let option = {
        tooltip: {
          confine: true,
        },
        xAxis: {},
        yAxis: {},
        series: [
          {
            type: "bar",
            showBackground: isMobile ? true : false,
            data: data.map((item) => item.overall_percent),
            itemStyle: {
              color: "#F2682F",
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
          top: 0,
          left: 10,
          right: 10,
          containLabel: true,
        },
      };

      if (isMobile) {
        option.xAxis = {
          type: "value",
          name: "Voter Turnout",
          nameLocation: "middle",
          nameGap: 50,
          axisLabel: {
            formatter: "{value}%",
          },
        };
        option.yAxis = {
          type: "category",
          data: data.map((item) => item.name),
          axisLabel: {
            inside: true,
            textStyle: {
              color: "#000",
              fontSize: 16,
            },
            width: "90%",
            formatter: function (value) {
              const graphElement = this.$refs[this.id];
              if (value.length > graphElement.offsetWidth / 10) {
                return (
                  value.substring(0, graphElement.offsetWidth / 10) + "..."
                );
              } else {
                return value;
              }
            }.bind(this),
          },
          z: 10,
          inverse: true,
        };
      } else {
        option.xAxis = {
          type: "category",
          data: data.map((item) => item.name),
          name: this.axisLabel,
          nameLocation: "middle",
          nameGap: 75,
          axisLabel: {
            interval: 0,
            rotate: -25,
          },
        };
        option.yAxis = {
          type: "value",
          name: "Voter Turnout",
          nameLocation: "middle",
          nameGap: 50,
          axisLabel: {
            formatter: "{value}%",
          },
        };
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
    setGraphSize(size) {
      this.activeSize = size;
      this.drawGraph();
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
