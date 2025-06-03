<template>
  <div id="skiptocontent"><a href="#maincontent">skip to main content</a></div>
  <Navbar />
  <main id="maincontent">
    <section class="my-4 py-4">
      <div class="container mx-auto flex flex-col justify-center pt-4">
        <form id="associate-login" method="post" class="">
          <div>
            <h1 class="text-2xl font-bold">Associate Member Login</h1>
          </div>

          {if error_message != ""}
          <div class="border-l-4 border-red-400 bg-red-100 p-2">
            <p>{error_message}</p>
          </div>
          {/if}
          <div>
            <div class="mb-2">
              <label class="mb-2" for="assoc-username">Username</label>
              <input
                id="assoc-username"
                class="form-input"
                type="text"
                placeholder="ASSOC123456"
                name="username"
                required
              />
            </div>

            <div class="mb-2">
              <label for="assoc-password">Password</label>
              <input
                id="assoc-password"
                class="form-input"
                type="password"
                placeholder="********"
                name="password"
                required
              />
            </div>

            <div class="mb-2">
              {recaptcha_widget}
              <input
                type="submit"
                class="btn btn-primary flex w-fit items-center"
                value="Log In"
              />
            </div>
            <p>
              Looking to apply for an account?
              <a href="/associate-member/apply" class="text-blue-800 underline"
                >Submit an application here</a
              >.
            </p>
          </div>
        </form>
      </div>
    </section>
  </main>
  <Footer />
</template>

<script>
import Navbar from "../../../components/Navbar/navbar.ce.vue";
import Footer from "../../../components/Footer/footer.ce.vue";
export default {
  name: "AssociateLogin",
  components: {
    Navbar,
    Footer,
  },
};
</script>
