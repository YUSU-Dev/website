<template>
  <HeroHeader
    title="Candidates"
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_Student_Life.jpg"
  />
  <div class="container mx-auto">
    <ElectionsCandidates :election-id="electionId" />
  </div>
  <Footer />
</template>

<script>
import HeroHeader from "../../components/HeroHeader/heroheader.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import ElectionsCandidates from "../../components/elections-candidates/elections-candidates.ce.vue";
export default {
  name: "ElectionsCandidatesPage",
  components: {
    HeroHeader,
    Footer,
    ElectionsCandidates,
  },
  props: {
    electionId: {
      type: String,
      default: "",
    },
  },
};
</script>
