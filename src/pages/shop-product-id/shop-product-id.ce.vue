<template>
  <div id="skiptocontent"><a href="#maincontent">skip to main content</a></div>
  <Navbar />
  <div
    id="maincontent"
    class="container mx-auto flex flex-col items-center justify-center pb-20"
  >
    <div class="">
      <div class="my-4">
        <Button
          :is-student-life="true"
          title="Back to Shop"
          arrow
          :url="'/shop'"
        />
      </div>
      <div class="flex flex-wrap md:flex-row">
        <div class="md:w-1/2">
          <img class="object-cover" :alt="title" :src="image" />
        </div>
        <div class="ml-4 flex flex-col gap-2 md:w-5/12">
          <h1 class="text-2xl font-bold">{{ title }}</h1>
          <h2 class="text-xl">{{ price }}</h2>
          <AddToBasket :product-id="9788" :signed-in="true" />
          <div class="mt-2">
            <p>{{ description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import AddToBasket from "../../components/add-to-basket/add-to-basket.ce.vue";
import Button from "../../components/button/button.ce.vue";
import Navbar from "../../components/Navbar/navbar.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";

export default {
  name: "ShopProductId",
  components: {
    AddToBasket,
    Navbar,
    Footer,
    Button,
  },
  props: {
    image: {
      type: String,
      default: "https://assets-cdn.sums.su/YU/IMG/NewBrand/500x500_Blue.jpg",
    },
    title: {
      type: String,
      default: null,
    },
    price: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    productId: {
      type: Number,
      default: null,
    },
  },
};
</script>
