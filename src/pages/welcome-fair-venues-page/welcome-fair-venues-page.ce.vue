<template>
  <HeroHeader
    title="Welcome Fair Venues"
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_Student_Life.jpg"
  />
  <div class="container mx-auto">
    <div class="flex flex-col gap-y-8">
      <div class="flex flex-col gap-x-6 gap-y-4 sm:flex-row">
        <SectionLink sectionName="Welcome Fair" sectionUrl="/welcome-fair" />
        <SectionLink
          sectionName="Venues"
          sectionUrl="/venues"
          sectionIsActive
        />
        <SectionLink sectionName="Map" sectionUrl="/map" />
      </div>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem nobis
        ipsum illum quam quis? Ratione cumque laborum consectetur quia? Ratione
        maiores deleniti nostrum ipsam exercitationem magnam nisi sequi
        accusamus provident? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Nihil aperiam similique rem vitae itaque nesciunt ab nulla unde
        illum! Nisi et eum unde labore pariatur quaerat ipsa quia illum impedit.
      </p>
      <WelcomeFairVenues />
    </div>
  </div>
  <Footer />
</template>

<script>
import HeroHeader from "../../components/HeroHeader/heroheader.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import WelcomeFairVenues from "../../components/welcome-fair-venues/welcome-fair-venues.ce.vue";
import SectionLink from "../../components/section-link/section-link.ce.vue";
export default {
  name: "WelcomeFairVenuesPage",
  components: {
    HeroHeader,
    Footer,
    WelcomeFairVenues,
    SectionLink,
  },
};
</script>
