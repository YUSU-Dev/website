<template>
  <div class="container mx-auto my-10">
    <div
      class="mx-2 mb-10 flex flex-col items-center justify-center gap-y-4 text-center"
    >
      <h2 class="text-3xl font-bold">Introducing your Sabbatical Officers</h2>
      <h3 class="text-xl font-semibold">
        They lead the Union and represent all students.
      </h3>
    </div>
    <div
      class="mx-2 grid grid-cols-2 justify-center gap-x-2 gap-y-2 md:mx-0 md:flex md:flex-wrap md:gap-x-4 md:gap-y-4 lg:gap-x-8 lg:gap-y-8"
    >
      <SabbTile
        v-for="sabb in SabbsList"
        :key="sabb.name"
        :name="sabb.name"
        :position="sabb.position"
        :url="sabb.url"
        :img="sabb.img"
      />
    </div>
  </div>
</template>
<script>
import SabbTile from "../sabb-tile/sabb-tile.ce.vue";
export default {
  props: {
    SabbsList: {
      type: Array,
      required: true,
    },
  },
  components: {
    SabbTile,
  },
};
</script>
