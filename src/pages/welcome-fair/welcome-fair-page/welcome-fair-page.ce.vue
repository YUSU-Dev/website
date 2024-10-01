<template>
  <HeroHeader
    title="Welcome Fair"
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_Student_Life.jpg"
  />
  <div class="container mx-auto">
    <div class="flex flex-col gap-y-8">
      <div class="flex flex-col gap-x-6 gap-y-4 sm:flex-row">
        <SectionLink
          section-name="Welcome Fair"
          section-url="/welcome-fair"
          section-is-active
        />
        <SectionLink section-name="Venues" section-url="/venues" />
        <SectionLink section-name="Map" section-url="/map" />
      </div>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem nobis
        ipsum illum quam quis? Ratione cumque laborum consectetur quia? Ratione
        maiores deleniti nostrum ipsam exercitationem magnam nisi sequi
        accusamus provident? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Nihil aperiam similique rem vitae itaque nesciunt ab nulla unde
        illum! Nisi et eum unde labore pariatur quaerat ipsa quia illum impedit.
      </p>
      <WelcomeFair />
    </div>
  </div>
  <Footer />
</template>

<script>
import HeroHeader from "../../../components/HeroHeader/heroheader.ce.vue";
import Footer from "../../../components/Footer/footer.ce.vue";
import WelcomeFair from "../../../components/welcome-fair/welcome-fair.ce.vue";
import SectionLink from "../../../components/section-link/section-link.ce.vue";
export default {
  name: "WelcomeFairPage",
  components: {
    HeroHeader,
    Footer,
    WelcomeFair,
    SectionLink,
  },
};
</script>
