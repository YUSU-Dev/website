<template>
  <div class="flex">
    <div class="w-full bg-repeat">
      <div
        class="flex h-full items-center justify-center bg-cover bg-center bg-repeat-y"
        :style="{ 'background-image': 'url(' + image + ')' }"
      >
        <div class="flex-col items-center justify-center">
          <div class="grid place-items-center gap-y-2">
            <br />
            <img
              v-if="logo"
              :src="logo"
              class="h-48 w-48 items-center object-contain"
            />
            <div
              v-if="group"
              class="mx-2 w-fit max-w-full gap-y-2 bg-white px-6 py-3"
            >
              <h1
                class="w-full break-words text-center text-2xl font-bold sm:text-3xl"
              >
                {{ group }}
              </h1>
            </div>
            <div
              v-if="category"
              class="mx-2 w-fit max-w-full bg-white px-6 py-3"
            >
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
  props: {
    group: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    logo: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      default: null,
    },
    id: {
      type: Number,
      default: null,
    },
  },
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
