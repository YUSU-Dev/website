<template>
  <div class="flex justify-center">
    <div class="h-[400px] max-h-[40vh] w-full bg-repeat">
      <div
        class="flex h-full items-center justify-center bg-cover bg-center"
        :style="{ 'background-image': 'url(' + image + ')' }"
      >
        <div v-if="title" class="mx-2 max-w-full bg-white px-6 py-3">
          <h1
            class="mb-0 w-full text-center text-2xl font-bold break-words sm:text-3xl"
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
  props: {
    title: { type: String, default: "" },
    image: { type: String, default: "" },
  },
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
