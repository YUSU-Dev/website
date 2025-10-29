<template>
  <HeroHeader
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_General.jpg"
    title="Employability Opportunities"
  />
  <div
    id="maincontent"
    class="container mx-auto flex flex-col items-center justify-center"
  >
    <EmployabilityOpportunities />
  </div>
  <Footer />
</template>

<script>
import HeroHeader from "../../components/HeroHeader/heroheader.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import EmployabilityOpportunities from "../../components/employability-opportunities/employability-opportunities.ce.vue";

export default {
  name: "EmployabilityPage",
  components: {
    HeroHeader,
    Footer,
    EmployabilityOpportunities,
  },
};
</script>
