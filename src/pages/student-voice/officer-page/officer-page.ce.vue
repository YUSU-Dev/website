<template>
  <HeroHeader
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_Student_Life.jpg"
    :title="title"
  />
  <div id="main" class="body-style container mx-auto">
    <div class="flex flex-col justify-center gap-12 md:flex-row">
      <!-- Main Content -->
      <div class="order-2 flex w-fit flex-col md:order-1">
        <!-- Page Content -->
        <h2>What do I do?</h2>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>

        <h3>A bit about me</h3>

        <p>
          <span style="font-size: 13px"
            >My favourite thing about York is...</span
          >
        </p>

        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <h4>Manifesto summary</h4>

        <ol>
          <li aria-level="1" dir="ltr">
            <p dir="ltr" role="presentation">
              Lorem ipsum dolor sit amet - consectetur adipiscing elit sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </li>
          <li aria-level="1" dir="ltr">
            <p dir="ltr" role="presentation">
              Ut enim ad minim veniam - quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo.
            </p>
          </li>
          <li aria-level="1" dir="ltr">
            <p dir="ltr" role="presentation">
              Duis aute irure dolor - in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla.
            </p>
          </li>
        </ol>

        <p dir="ltr" role="presentation">
          <a href="#">Read my full manifesto</a>
        </p>

        <p dir="ltr" role="presentation">&nbsp;</p>
        <!-- End Page Content -->
      </div>
      <div class="order-1 flex justify-center md:order-2">
        <OfficerTile :uri="uri" :position="title" />
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import HeroHeader from "../../../components/HeroHeader/heroheader.ce.vue";
import Footer from "../../../components/Footer/footer.ce.vue";
import OfficerTile from "../../../components/officer-tile/officer-tile.ce.vue";
export default {
  name: "OfficerPage",
  components: {
    HeroHeader,
    Footer,
    OfficerTile,
  },
  props: {
    uri: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
