<template>
  <div class="flex justify-center">
    <div class="bg-repeat w-full h-[400px] max-h-[40vh]">
      <div
        class="flex justify-center items-center h-full bg-center bg-cover"
        :style="{ 'background-image': 'url(' + image + ')' }"
      >
        <div class="bg-white px-6 py-3 max-w-full mx-2">
          <h1
            class="text-2xl sm:text-3xl text-center break-words w-full font-bold"
          >
            {{ title }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "../../main.css";
export default {
  props: ["title", "image"],
  data() {
    return {};
  },
  methods: {
    wrapURL(URL) {
      return "'" + URL + "'";
    },
  },
};
</script>
