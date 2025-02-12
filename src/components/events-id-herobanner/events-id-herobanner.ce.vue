<template>
  <div class="flex justify-center">
    <div class="h-[400px] max-h-[40vh] w-full bg-repeat">
      <div
        class="flex h-full items-center justify-center bg-cover bg-center"
        :style="{ 'background-image': 'url(' + image + ')' }"
      >
        <div class="flex-col items-center justify-center">
          <div class="grid place-items-center gap-y-2">
            <br />
            <img
              v-if="eventThumbnail"
              :src="eventThumbnail"
              class="h-48 w-48 items-center object-cover"
              alt=""
            />
            <div
              v-if="title"
              class="mx-2 w-fit max-w-full gap-y-2 bg-white px-6 py-3"
            >
              <h1
                class="w-full break-words text-center text-2xl font-bold sm:text-3xl"
              >
                {{ title }}
              </h1>
            </div>
          </div>
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
    eventThumbnail: { type: String, default: "" },
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
