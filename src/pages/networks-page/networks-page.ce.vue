<template>
  <HeroHeader
    :title="title"
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_Student_Life.jpg"
  />
  <!-- <div
    class="container mx-auto flex flex-col gap-x-6 gap-y-4 px-2 pb-6 pt-10 font-semibold sm:flex-row lg:px-3"
  >
    <a href="/"
      ><Button
        :class="{ 'bg-light-blue': title == 'Sports' }"
        title="Sports"
        is-student-life="True"
        class="px-10 text-center"
    /></a>
    <a href="/"
      ><Button
        :class="{ 'bg-light-blue': title == 'Societies' }"
        title="Societies"
        is-student-life="True"
        class="px-8 text-center"
    /></a>
    <a href="/"
      ><Button
        :class="{ 'bg-light-blue': title == 'Volunteering' }"
        title="Volunteering"
        is-student-life="True"
        class="px-8 text-center"
    /></a>
  </div> -->
  <div class="container mx-auto">
    <Activities
      siteid="tZyLG9BX9f4hdTp2HLva5c"
      :selectedcategory="selectedcategory"
      :title="componenttitle"
    />
  </div>
  <Footer />
</template>
<script>
import HeroHeader from "../../components/HeroHeader/heroheader.ce.vue";
import Activities from "../../components/activities/activities.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
export default {
  name: "NetworksPage",
  props: {
    title: { type: String, default: "" },
    componenttitle: { type: String, default: "" },
    selectedcategory: { type: String, default: "" },
  },
  components: {
    HeroHeader,
    Activities,
    Footer,
  },
  methods: {},
};
</script>
