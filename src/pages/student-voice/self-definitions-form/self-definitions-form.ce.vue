<template>
  <div id="skiptocontent"><a href="#maincontent">skip to main content</a></div>
  <Navbar />
  <main id="maincontent">
    {exp:su_elections:defineForm}
    <section>
      <div class="container mx-auto">
        <div>
          {if errorCount == 1} {validation_errors}
          <div class="border-l-4 border-red-400 bg-red-100 p-2">
            <h2 class="text-xl">Uh oh! There appears to be a few errors...</h2>
            <p>{errors}</p>
          </div>
          {/validation_errors} {/if}

          <div class="flex flex-col gap-y-8">
            {page_content}

            <form method="post" class="flex flex-col gap-y-6">
              <input type="hidden" name="do" value="define" />
              <div class="form-group flex flex-col gap-y-3">
                {if defineCount == 1} {defines}
                <div class="checkboxes flex gap-x-6">
                  <div class="flex w-8 items-center">
                    <input
                      type="checkbox"
                      id="definition_{define_id}"
                      name="define[]"
                      value="{define_id}"
                      class="h-full w-full"
                    />
                  </div>
                  <div class="flex w-min items-center">
                    <label for="definition_{define_id}"
                      ><span>{define_name}</span></label
                    >
                  </div>
                </div>
                {/defines} {/if}
              </div>
              <button
                type="submit"
                class="btn btn-primary w-max px-8"
                value="Submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    {/exp:su_elections:defineForm}
  </main>
  <Footer />
</template>

<script>
import Navbar from "../../../components/Navbar/navbar.ce.vue";
import Footer from "../../../components/Footer/footer.ce.vue";
export default {
  name: "SelfDefinitionsForm",
  components: {
    Navbar,
    Footer,
  },
};
</script>
