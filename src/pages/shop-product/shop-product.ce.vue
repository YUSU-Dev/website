<template>
  <div id="skiptocontent"><a href="#maincontent">skip to main content</a></div>
  <div class="min-h-screen xs:min-h-svh">
    <Navbar />
    <main id="maincontent">
      <div class="container mx-auto flex flex-col items-center justify-center">
        <ShopProductId :image="image" :product-id="productId" />
      </div>
    </main>
    <Footer />
  </div>
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
      default:
        "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Blue.webp",
    },
    productId: {
      type: Number,
      default: null,
    },
  },
};
</script>
