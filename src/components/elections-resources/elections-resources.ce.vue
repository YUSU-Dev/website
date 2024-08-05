<template>
  <main class="">
    <article class="container mx-auto flex flex-col gap-y-6 py-20">
      <!-- Page content -->
      <article
        v-html="page_content"
        class="body-style mb-5 flex flex-col gap-y-6"
      ></article>
      <!-- Page content -->

      <div class="terminology flex flex-col gap-y-4">
        <h2 class="text-2xl font-bold">Elections terminology</h2>
        <div class="flex flex-col border-t border-black">
          <div
            v-for="term in terms"
            :key="term.id"
            class="hidden grid-cols-4 gap-x-4 border-b border-black py-4 sm:grid"
          >
            <div class="col-span-1 flex items-center">
              <h3 class="mb-0 font-semibold">{{ term.terminology }}</h3>
            </div>
            <div class="col-span-3 flex items-center">
              <article v-html="term.explanation"></article>
            </div>
          </div>
          <Accordion
            v-for="term in terms"
            :key="term.id"
            :label="term.terminology"
            class="block sm:hidden"
          >
            <article v-html="term.explanation" class="body-style p-3"></article>
          </Accordion>
        </div>
      </div>

      <div class="flex flex-col gap-y-4">
        <h2 class="text-2xl font-bold">FAQs</h2>
        <div>
          <Accordion
            v-for="faq in faqs"
            :key="faq.question"
            :label="faq.question"
          >
            <article v-html="faq.answer" class="body-style p-3"></article>
          </Accordion>
        </div>
        <p>
          It’s okay if you haven’t come up with your full manifesto by the time
          you nominate. You will have a whole additional week after the
          nomination deadline to work on your manifesto. During this week (which
          we call Development Week) there will be workshops and resources to
          help you fine-tune your ideas. We encourage you to also come and have
          a chat with YUSU staff members who have extensive knowledge which can
          help you to decide what is and isn’t an achievable manifesto promise.
        </p>
        <p>
          Still have some questions? Contact us at
          <a href="mailto:elections@yusu.org">elections@yusu.org</a>
        </p>
      </div>
    </article>
  </main>
</template>
<!-- eslint-disable vue/prop-name-casing -->
<script>
import Accordion from "../accordion/accordion.ce.vue";
export default {
  name: "ElectionsResources",
  props: {
    page_content: {
      type: String,
      default: "",
    },
    terms: {
      type: Array,
      default: null,
    },
    faqs: {
      type: Array,
      default: null,
    },
  },
  components: {
    Accordion,
  },
};
</script>
