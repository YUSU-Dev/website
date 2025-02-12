<template>
  <div class="flex min-h-screen flex-col">
    <Navbar />
    <section class="py-7">
      <div class="container mx-auto">
        <main class="flex h-full min-h-[60vh] items-center justify-center">
          <div class="relative place-content-center text-center">
            <div class="text-7xl font-bold text-gray-200 md:text-9xl">
              Loading...
            </div>

            <div class="text-centre absolute inset-0 pt-6 md:pt-12">
              <h1 class="break-all text-xl font-bold text-gray-800 md:text-3xl">
                Redirecting to Student Dashboard
              </h1>

              <div>
                <div class="mt-5 inline-flex pt-4">
                  <a class="btn btn-primary px-10 text-center" url="/"
                    >Return Home</a
                  >
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
    <Footer />
  </div>
</template>
<script>
import Navbar from "../../../components/Navbar/navbar.ce.vue";
import Footer from "../../../components/Footer/footer.ce.vue";
export default {
  components: {
    Footer,
    Navbar,
  },
};
</script>
