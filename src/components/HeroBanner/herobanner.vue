<template>
  <div class="flex justify-center">
    <div class="max-w-[1900px] w-full h-[400px]">
      <div
        class="flex justify-center items-center h-full bg-center"
        :style="{ 'background-image': 'url(' + image + ')' }"
      >
        <h1 class="bg-white px-6 py-3 text-3xl">{{ title }}</h1>
      </div>
    </div>
  </div>
</template>
<script>
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
