<template>
  <Navbar />
  <ActivitiesHeroBanner
    :society="society"
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_General.jpg"
    :logo="logo"
  />
  <Breadcrumb />
  <div class="flex flex-wrap md:flex-row">
    <div class="w-1/12"><br /></div>
    <div class="p-6 md:w-8/12">
      <h2 class="mb-5 text-3xl font-bold">About</h2>
      <p class="mb-3">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum."
      </p>
      <h2 class="mb-5 mt-10 text-3xl font-bold">About</h2>
      <p class="mb-3">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum."
      </p>
      <h2 class="mb-5 mt-10 text-3xl font-bold">About</h2>
      <p class="mb-3">
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum."
      </p>
    </div>
    <div class="flex flex-col p-6 md:w-2/12">
      <a href="/"
        ><Button
          :class="{ 'bg-light-blue': title == 'Sports' }"
          title="Join"
          is-student-life="True"
          class="px-10 text-center"
      /></a>
      <hr class="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700" />
      <h2 class="mb-5 text-3xl font-bold">Contact</h2>
      <ActivitiesContacts email="" />
    </div>
  </div>
  <Footer />
</template>
<script>
import Navbar from "../../components/Navbar/navbar.ce.vue";
import ActivitiesHeroBanner from "../../components/ActivitiesHeroBanner/activitiesherobanner.ce.vue";
import Breadcrumb from "../../components/breadcrumb/breadcrumb.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import Button from "../../components/button/button.ce.vue";
import ActivitiesContacts from "../../components/ActivitiesContacts/activitiescontacts.ce.vue";
export default {
  props: ["society", "image", "componenttitle", "selectedparents", "logo"],
  components: {
    Navbar,
    ActivitiesHeroBanner,
    Breadcrumb,
    Footer,
    Button,
    ActivitiesContacts,
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
