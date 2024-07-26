<template>
  <div id="skiptocontent"><a href="#maincontent">skip to main content</a></div>
  <HeroHeader
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_General.jpg"
    title="My Account"
  />
  <div
    id="maincontent"
    class="container mx-auto flex flex-col items-center justify-center py-20"
  >
    <Account :sub_groups="sub_groups" />
  </div>
  <Footer />
</template>
<script>
import HeroHeader from "../../components/HeroHeader/heroheader.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import Account from "../../components/account/account.ce.vue";
export default {
  props: {
    title: { type: String, default: "" },
    sub_groups: { type: Array, default: null },
  },
  components: {
    HeroHeader,
    Footer,
    Account,
  },
  methods: {},
};
</script>
