<template>
  <div class="my-10">
    <div
      class="mx-2 mb-10 flex flex-col items-center justify-center gap-y-4 text-center"
    >
      <h2 class="text-3xl font-bold">Introducing your Sabbatical Officers</h2>
      <h3 class="text-xl font-semibold">
        They lead the Union and represent all students.
      </h3>
    </div>
    <div class="tile-wrap">
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
      default: () => [
        {
          name: "Stare",
          position: "Union Affairs Officer",
          img: "https://assets-cdn.sums.su/YU/elections2024/test-headshot.jpg",
          url: "/your-voice/president",
        },
        {
          name: "Fridge Chonk",
          position: "Union Development Officer",
          img: "https://assets-cdn.sums.su/YU/elections2024/test-headshot-2.jpg",
          url: "/your-voice/president",
        },
        {
          name: "Spilled",
          position: "Union Purrfection officer",
          img: "https://assets-cdn.sums.su/YU/elections2024/test-headshot-3.jpg",
          url: "/your-voice/president",
        },
        {
          name: "Christopher Charles Nethercott",
          position: "Meowster of Ceremony",
          img: "https://assets-cdn.sums.su/YU/elections2024/test-headshot-4.jpg",
          url: "/your-voice/president",
        },
        {
          name: "Noice",
          position: "Cat",
          img: "https://assets-cdn.sums.su/YU/elections2024/test-headshot-5.jpg",
          url: "/your-voice/president",
        },
        {
          name: "One Smiley Boi",
          position: "You’ve cat to be kitten me",
          img: "https://assets-cdn.sums.su/YU/elections2024/test-headshot-6.jpg",
          url: "/your-voice/president",
        },
        {
          name: "Anger",
          position: "Purr-plexed",
          img: "https://assets-cdn.sums.su/YU/elections2024/test-headshot.jpg",
          url: "/your-voice/president",
        },
      ],
    },
  },
  components: {
    SabbTile,
  },
};
</script>
