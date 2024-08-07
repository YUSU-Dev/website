<template>
  <!-- {exp:channel:entries channel="pages"}

{if no_results}

	{exp:su_redirect:redirect url_to="/"}

{/if}

{exp:ifelse parse="inward"}

	{if page_redirect != ""}

	{exp:su_redirect:redirect url_to="{page_redirect}"}

	{if:else}

{embed="core-components/.hero-header" title="{title}" image_url="{page_key_image}" }
{embed="core-components/.section-links" section_id="{page_section_id}" section-area="primary"} -->
  <HeroHeader />
  <section>
    <div id="main" class="container mx-auto">
      <!-- Main content -->
      <div class="{page_class}">
        <!-- Main Content -->
        <article>{page_content}</article>
        <!-- End Main Content-->
      </div>
    </div>
  </section>
  <Footer />
  <!-- {embed="core-components/.footer"}
{/if}

{/exp:ifelse}

{/exp:channel:entries} -->
</template>

<script>
import HeroHeader from "../../components/HeroHeader/heroheader.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
export default {
  name: "PageTemplate",
  components: {
    HeroHeader,
    Footer,
  },
};
</script>
