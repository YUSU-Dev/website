<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
<template>
  <HeroHeader
    :title="title"
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_Student_Life.jpg"
  />
  <div
    class="container mx-auto flex flex-col sm:flex-row gap-y-4 gap-x-6 px-2 lg:px-3 pt-10 pb-6 font-semibold"
  >
    <a href="/"
      ><Button
        :class="{ 'bg-light-blue': title == 'Sports' }"
        title="Sports"
        isStudentLife="True"
        class="px-10 text-center"
    /></a>
    <a href="/"
      ><Button
        :class="{ 'bg-light-blue': title == 'Societies' }"
        title="Societies"
        isStudentLife="True"
        class="px-8 text-center"
    /></a>
    <a href="/"
      ><Button
        :class="{ 'bg-light-blue': title == 'Volunteering' }"
        title="Volunteering"
        isStudentLife="True"
        class="px-8 text-center"
    /></a>
  </div>
  <Activities
    siteid="tZyLG9BX9f4hdTp2HLva5c"
    :selectedparents="selectedparents"
  />
  <Footer />
</template>
<script>
import HeroHeader from "../../components/HeroHeader/heroheader.ce.vue";
import Activities from "../../components/activities/activities.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import Button from "../../components/button/button.ce.vue";
export default {
  props: ["title", "selectedparents"],
  components: {
    HeroHeader,
    Activities,
    Footer,
    Button,
  },
  methods: {},
};
</script>
