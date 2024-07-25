<template>
  <div id="skiptocontent"><a href="#maincontent">skip to main content</a></div>
  <Navbar />
  <main id="maincontent">
    <section class="my-4 py-4">
      <div class="container mx-auto flex flex-col justify-center pb-20 pt-4">
        {if link_error}
        <div class="border-l-4 border-red-400 bg-red-100 p-2">
          <h2 class="text-xl">Sorry!</h2>
          <p>{link_error}</p>
        </div>
        {if:elseif success}
        <div class="border-l-4 border-green-400 bg-green-100 p-2">
          <h2 class="text-xl">Success!</h2>
          <p>
            You can now login via the
            <a href="/associate-member">associate member login</a>.
          </p>
        </div>
        {if:else}

        <form id="associate-login" method="post" class="">
          <div>
            <h1 class="text-2xl font-bold">Verify Password</h1>
            <p>
              Your password should include at least one upper case, lower case,
              special character (@$!%*#?&), number (0-9) and be a minimum length
              of 10.
            </p>
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
              <label for="password">Password</label>
              <input
                id="password"
                class="form-input"
                type="password"
                placeholder="********"
                name="password"
                minlength="10"
                required
              />
            </div>

            <div class="mb-2">
              <label for="confirm_password">Confirm Password</label>
              <input
                id="confirm_password"
                class="form-input"
                type="password"
                placeholder="********"
                name="confirm"
                minlength="10"
                required
              />
            </div>

            <div class="mb-2">
              <input
                type="submit"
                class="btn btn-primary flex w-fit items-center"
                value="Save Password"
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
import Navbar from "../../components/Navbar/navbar.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
export default {
  name: "AssociateVerify",
  components: {
    Navbar,
    Footer,
  },
};
</script>
