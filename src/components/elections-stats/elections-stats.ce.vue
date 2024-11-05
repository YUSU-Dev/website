<template>
  <div class="flex">
    <div class="min-h-96 w-full" ref="chart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "ElectionsStats",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  mounted() {
    var myChart = echarts.init(this.$refs.chart);

    const option = {
      tooltip: {},
      xAxis: {
        data: ["shirt", "cardigan", "chiffon", "pants", "heels", "socks"],
      },
      yAxis: {},
      series: [
        {
          name: "sales",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
      grid: {
        left: 0,
        right: 0,
        top: 0,
      },
    };

    if (this.title) {
      option.title = {
        text: this.title,
        left: "0",
        width: "100%",
        padding: [0, 0, 24, 0],
      };
      option.grid.top = "48";
    }

    myChart.setOption(option);

    window.addEventListener("resize", function () {
      myChart.resize();
    });
  },
};
</script>
