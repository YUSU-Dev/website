<template>
  <div id="skiptocontent"><a href="#maincontent">skip to main content</a></div>
  <Navbar />
  <main id="maincontent">
    <section class="my-4 py-4">
      <div class="container mx-auto flex flex-col justify-center pt-4">
        {if success}
        <div class="border-l-4 border-green-400 bg-green-100 p-2">
          <h2 class="text-xl">Success!</h2>
          <p>
            If we've got an account matching those details, you'll receive an
            email shortly with a reset link.
          </p>
        </div>
        {if:else}

        <form id="associate-forgot" method="post" class="">
          <div>
            <h1 class="text-2xl font-bold">Forgotton Password</h1>
          </div>

          {if errors}
          <div class="border-l-4 border-red-400 bg-red-100 p-2">
            <h2 class="text-xl">Uh oh! There appears to be a few errors...</h2>
            <p>{errors}</p>
          </div>
          {/if}
          <div>
            <input type="hidden" name="main" value="{main}" />
            <input type="hidden" name="string" value="{string}" />

            <div class="mb-2">
              <label for="email_address">Email Address</label>
              <input
                id="email_address"
                name="email_address"
                class="form-input"
                type="email"
                placeholder="email@yorksu.org"
                autocomplete="email"
                required
              />
            </div>

            <div class="mb-2">
              {recaptcha_widget}
              <input
                type="submit"
                class="btn btn-primary flex w-fit items-center"
                value="Submit"
              />
            </div>
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
  name: "AssociateResetPassword",
  components: {
    Navbar,
    Footer,
  },
};
</script>
