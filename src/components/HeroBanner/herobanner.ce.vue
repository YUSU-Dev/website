<template>
  <div class="flex justify-center">
    <div class="h-[400px] max-h-[40vh] w-full bg-repeat">
      <div
        class="flex h-full items-center justify-center bg-cover bg-center"
        :style="{ 'background-image': 'url(' + image + ')' }"
      >
        <div class="mx-2 max-w-full bg-white px-6 py-3">
          <h1
            class="w-full break-words text-center text-2xl font-bold sm:text-3xl"
          >
            {{ title }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["society", "image"],
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
