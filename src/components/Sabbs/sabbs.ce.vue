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
          img: "https://assets-cdn.sums.su/YU/website/img/sabbs/24-25/yusu-sabbs-central-hall-affairs.webp",
          url: "/officers/union-affairs",
        },
        {
          name: "Gen Andrews",
          pronouns: "She/Her",
          position: "Union Development Officer",
          img: "https://assets-cdn.sums.su/YU/website/img/sabbs/24-25/yusu-sabbs-central-hall-development.webp",
          url: "/officers/union-development",
        },
        {
          name: "Fenella Johnson",
          position: "Academic Officer",
          pronouns: "She/Her",
          img: "https://assets-cdn.sums.su/YU/website/img/sabbs/24-25/yusu-sabbs-central-hall-academic.webp",
          url: "/officers/academic",
        },
        {
          name: "Ezreal Xie",
          pronouns: "He/Him",
          position: "Equality and Inclusion Officer",
          img: "https://assets-cdn.sums.su/YU/website/img/sabbs/24-25/yusu-sabbs-central-hall-equality.webp",
          url: "/officers/equality",
        },
        {
          name: "Freddy Russell",
          pronouns: "He/Him",
          position: "Community & Wellbeing Officer",
          img: "https://assets-cdn.sums.su/YU/website/img/sabbs/24-25/yusu-sabbs-central-hall-community.webp",
          url: "/officers/community",
        },
        {
          name: "Kaitlyn Beattie-Zarb",
          pronouns: "She/Her",
          position: "Activities Officer",
          img: "https://assets-cdn.sums.su/YU/website/img/sabbs/24-25/yusu-sabbs-central-hall-activities.webp",
          url: "/officers/activities",
        },
        {
          name: "Tanisha Jain (TJ)",
          pronouns: "She/Her",
          position: "Sports Officer",
          img: "https://assets-cdn.sums.su/YU/website/img/sabbs/24-25/yusu-sabbs-central-hall-sports.webp",
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
