<template>
  <div class="container mx-auto my-10">
    <div class="mb-10 flex flex-col items-center justify-center gap-y-4">
      <h2 class="text-3xl font-bold">Introducing your Sabbatical Officers</h2>
      <h3 class="text-xl font-semibold">
        They lead the Union and represent all students.
      </h3>
    </div>
    <div
      class="grid grid-cols-2 justify-center gap-x-8 gap-y-8 md:flex md:flex-wrap"
    >
      <SabbTile
        img="https://assets-cdn.sums.su/YU/elections2024/test-headshot.jpg"
        name="Stare"
        position="Cat 1"
        url="https://yusu.org/your-voice/president"
      />
      <SabbTile
        img="https://assets-cdn.sums.su/YU/elections2024/test-headshot-2.jpg"
        name="Fridge Chonk"
        position="Cat 2"
        url="https://yusu.org/your-voice/president"
      />
      <SabbTile
        img="https://assets-cdn.sums.su/YU/elections2024/test-headshot-3.jpg"
        name="Spilled"
        position="Cat 3"
        url="https://yusu.org/your-voice/president"
      />
      <SabbTile
        img="https://assets-cdn.sums.su/YU/elections2024/test-headshot-4.jpg"
        name="Sad Boi"
        position="Cat 4"
        url="https://yusu.org/your-voice/president"
      />
      <SabbTile
        img="https://assets-cdn.sums.su/YU/elections2024/test-headshot-5.jpg"
        name="Noice"
        position="Cat 5"
        url="https://yusu.org/your-voice/president"
      />
      <SabbTile
        img="https://assets-cdn.sums.su/YU/elections2024/test-headshot-6.jpg"
        name="One Smiley Boi"
        position="Cat 6"
        url="https://yusu.org/your-voice/president"
      />
      <SabbTile
        img="https://assets-cdn.sums.su/YU/elections2024/test-headshot-7.jpg"
        name="Anger"
        position="Cat 7"
        url="https://yusu.org/your-voice/president"
      />
    </div>
  </div>
</template>
<script>
import SabbTile from "../sabb-tile/sabb-tile.ce.vue";
export default {
  data() {
    return {};
  },
  components: {
    SabbTile,
  },
};
</script>
