<template>
  <a class="sabb-tile group flex" :href="url">
    <div class="relative text-white shadow transition hover:scale-105">
      <div class="aspect-[141/161] bg-cover md:h-[322px]">
        <img
          :src="img"
          :alt="name + ', ' + position"
          class="h-full w-full object-cover"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black to-transparent to-60%"
        ></div>
      </div>
      <div class="absolute bottom-4 w-full px-4">
        <h4 class="text-lg md:text-xl">
          {{ name }}
        </h4>
        <h5 v-if="pronouns" class="hidden text-sm md:flex md:text-base">
          {{ pronouns }}
        </h5>
        <h5 class="text-sm md:text-base">
          {{ position }}
        </h5>
      </div>
    </div>
  </a>
</template>
<script>
export default {
  props: {
    img: { type: String, default: "" },
    name: { type: String, default: "" },
    position: { type: String, default: "" },
    url: { type: String, default: "" },
    pronouns: { type: String, default: "" },
  },

  data() {
    return {};
  },
};
</script>
