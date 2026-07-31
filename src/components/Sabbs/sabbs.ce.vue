<template>
  <div class="my-10">
    <div
      v-if="!noTitle"
      class="mx-2 mb-10 flex flex-col items-center justify-center gap-y-4 text-center"
    >
      <h2 class="text-3xl font-bold">Introducing your Sabbatical Officers</h2>
      <h3 class="text-xl font-semibold">
        They lead the Union and represent all students.
      </h3>
    </div>
    <div class="tile-wrap">
      <SabbTile
        v-for="sabb in sabbsList"
        :key="sabb.name"
        :name="sabb.name"
        :position="sabb.position"
        :url="sabb.url"
        :img="sabb.img"
        :pronouns="sabb.pronouns"
      />
    </div>
  </div>
</template>
<script>
import SabbTile from "../sabb-tile/sabb-tile.ce.vue";
export default {
  props: {
    sabbsList: {
      type: Array,
      required: true,
      default: () => [
        {
          name: "Sam Dickinson",
          position: "Union Affairs Officer",
          pronouns: "He/Him",
          img: "https://assets-cdn.sums.su/YU/Student_voice/SabbaticalOfficers/1.webp",
          url: "/officers/union-affairs",
        },
        {
          name: "Alex Brown",
          position: "Activities Officer",
          pronouns: "He/Him",
          img: "https://assets-cdn.sums.su/YU/Student_voice/SabbaticalOfficers/2.webp",
          url: "/officers/activities",
        },
        {
          name: "Aya Haidar",
          position: "Academic Officer",
          pronouns: "She/Her",
          img: "https://assets-cdn.sums.su/YU/Student_voice/SabbaticalOfficers/3.webp",
          url: "/officers/academic",
        },
        {
          name: "Abi Harrison",
          pronouns: "She/Her/They/Them",
          position: "Community & Inclusion Officer",
          img: "https://assets-cdn.sums.su/YU/Student_voice/SabbaticalOfficers/4.webp",
          url: "/officers/community",
        },
        {
          name: "Darcy Graham",
          pronouns: "They/Them",
          position: "Sports Officer",
          img: "https://assets-cdn.sums.su/YU/Student_voice/SabbaticalOfficers/5.webp",
          url: "/officers/sport",
        },
      ],
    },
    noTitle: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    SabbTile,
  },
};
</script>
