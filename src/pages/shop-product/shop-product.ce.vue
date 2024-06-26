<template>
  <div id="skiptocontent"><a href="#maincontent">skip to main content</a></div>
  <Navbar />
  <main id="maincontent">
    <div
      class="container mx-auto flex flex-col items-center justify-center pb-20"
    >
      <ShopProductId :image="image" :product-id="productId" />
    </div>
  </main>
  <Footer />
</template>

<script>
import Navbar from "../../components/Navbar/navbar.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import ShopProductId from "../../components/shop-product-id/shop-product-id.ce.vue";

export default {
  name: "ShopProduct",
  components: {
    Navbar,
    Footer,
    ShopProductId,
  },
  props: {
    image: {
      type: String,
      default: "https://assets-cdn.sums.su/YU/IMG/NewBrand/500x500_Blue.jpg",
    },
    productId: {
      type: Number,
      default: null,
    },
  },
};
</script>
