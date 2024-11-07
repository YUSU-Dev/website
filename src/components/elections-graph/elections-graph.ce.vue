<template>
  <div class="min-h-96 w-full" :ref="id"></div>
</template>

<script>
import * as echarts from "echarts";
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
  },
  mounted() {
    this.drawGraph();
  },
  methods: {
    drawGraph() {
      console.log(this.data);
      var chart = this.$refs[this.id];
      var myChart = echarts.init(chart);

      const option = {
        tooltip: {},
        xAxis: {
          type: "category",
          data: this.data.map((item) => item.name),
          name: "Sports Clubs",
          nameLocation: "middle",
          nameGap: 50,
          axisLabel: {
            interval: 0,
            rotate: -15,
          },
        },
        yAxis: {
          type: "value",
          name: "Total Votes",
          nameLocation: "middle", // Align the y-axis label in the middle
          nameGap: 50,
        },
        series: [
          {
            type: "bar",
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
          },
        ],
        grid: {
          left: 80,
          right: 40,
          top: 0,
        },
      };

      if (this.title) {
        option.title = {
          text: "Top " + this.title,
          left: "center",
          width: "100%",
          padding: [0, 0, 0, 0],
        };
        option.grid.top = "48";
      }

      myChart.setOption(option);

      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
  },
};
</script>
