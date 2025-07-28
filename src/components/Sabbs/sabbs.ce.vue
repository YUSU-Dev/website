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
          name: "Lewis Parrey",
          position: "Union Affairs Officer",
          pronouns: "He/Him",
          img: "https://assets-cdn.sums.su/YU/website/img/sabbs/25-26/yorksu-sabbs-central-hall-affairs.jpg",
          url: "/officers/union-affairs",
        },
        {
          name: "Anna Lindberg",
          pronouns: "She/Her",
          position: "Union Development Officer",
          img: "https://assets-cdn.sums.su/YU/website/img/sabbs/25-26/yorksu-sabbs-central-hall-development.jpg",
          url: "/officers/union-development",
        },
        {
          name: "Aya Haidar",
          position: "Academic Officer",
          pronouns: "She/Her",
          img: "https://assets-cdn.sums.su/YU/website/img/sabbs/25-26/yorksu-sabbs-central-hall-academic.jpg",
          url: "/officers/academic",
        },
        {
          name: "Abi Harrison",
          pronouns: "She/Her/They/Them",
          position: "Equality and Inclusion Officer",
          img: "https://assets-cdn.sums.su/YU/website/img/sabbs/25-26/yorksu-sabbs-central-hall-equality.jpg",
          url: "/officers/equality",
        },
        {
          name: "Sam Dickinson",
          pronouns: "He/Him",
          position: "Community & Wellbeing Officer",
          img: "https://assets-cdn.sums.su/YU/website/img/sabbs/25-26/yorksu-sabbs-central-hall-community.jpg",
          url: "/officers/community",
        },
        {
          name: "Kaitlyn Beattie-Zarb",
          pronouns: "She/Her",
          position: "Activities Officer",
          img: "https://assets-cdn.sums.su/YU/website/img/sabbs/25-26/yorksu-sabbs-central-hall-activities.jpg",
          url: "/officers/activities",
        },
        {
          name: "Darcy Graham",
          pronouns: "They/Them",
          position: "Sports Officer",
          img: "https://assets-cdn.sums.su/YU/website/img/sabbs/25-26/yorksu-sabbs-central-hall-sports.jpg",
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
