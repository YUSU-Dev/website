<template>
  <div class="flex justify-center">
    <div class="w-full bg-repeat">
      <div
        class="flex h-full items-center justify-center bg-cover bg-center bg-repeat-y"
        :style="{ 'background-image': 'url(' + image + ')' }"
      >
        <div class="flex-col items-center justify-center">
          <div class="grid place-items-center">
            <br />
            <img :src="logo" class="h-48 w-48 object-contain" />
            <div class="mx-2 w-fit max-w-full bg-white px-6 py-3">
              <h1
                class="w-full break-words text-center text-2xl font-bold sm:text-3xl"
              >
                {{ society }}
              </h1>
            </div>
            <div class="mx-2 w-fit max-w-full bg-white px-6 py-3">
              <h1
                class="w-full break-words text-center text-2xl font-bold sm:text-2xl"
              >
                {{ category }}
              </h1>
            </div>
          </div>
          <br />
          <div
            class="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 p-4 md:flex-none"
          >
            <a
              :href="'/shop?activity_id=' + id"
              class="btn group flex w-fit items-center bg-white hover:bg-light-blue"
              >Memberships & Products
            </a>
            <a
              :href="'/events?activity=' + id"
              class="btn group flex w-fit items-center bg-white hover:bg-light-blue"
              >Events</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["society", "image", "logo", "category", "id"],
  components: {},
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
