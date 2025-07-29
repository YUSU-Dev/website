<template>
  <main>
    <article class="flex flex-col gap-y-6 py-20">
      <div class="flex flex-col gap-y-4">
        <!-- Page content -->
        <article v-html="page_content" class="body-style"></article>
        <!-- Page content -->
      </div>
      <hr />
      <div class="flex flex-col gap-y-4">
        <h2 class="text-2xl font-bold">Nominate</h2>
        <!-- Page content -->
        <article v-html="nomination_page_content" class="body-style"></article>
        <!-- Page content -->
        <div v-if="openNominationCount == 0">
          <p class="font-semibold">
            There are currently no available elections open for nomination.
          </p>
        </div>
        <div v-else>
          <div class="flex flex-col gap-y-2">
            <div
              class="grid grid-cols-2 bg-gray-200 px-3 py-1 text-lg font-semibold sm:grid-cols-3"
            >
              <h3>Election</h3>
              <h3 class="hidden sm:block">Nominations Close</h3>
            </div>
            <div
              v-for="election in nominations"
              :key="election.election_id"
              class="grid grid-cols-2 items-center px-3 sm:grid-cols-3"
            >
              <p>{{ election.election_name }}</p>
              <p class="hidden sm:block">{{ election.nominations_close }}</p>
              <div v-if="election.activity_id" class="flex justify-end">
                <a
                  href="/elections/nominate/{election_id}/{activity_id}"
                  class="bg-mustard w-24 py-1 text-center text-black no-underline"
                  >Nominate</a
                >
              </div>
              <div v-else class="flex justify-end">
                <a
                  href="/elections/nominate/{election_id}"
                  class="bg-mustard w-24 py-1 text-center text-black no-underline"
                  >Nominate</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="flex flex-col gap-y-4">
        <h2 class="text-2xl font-bold">Voting</h2>
        <!-- Page content -->
        <article v-html="voting_page_content" class="body-style"></article>
        <!-- Page content -->
        <div v-if="openVotingCount == 0">
          <p class="font-semibold">
            There are currently no available elections open for voting.
          </p>
        </div>
        <div v-else>
          <div class="flex flex-col gap-y-2">
            <div
              class="grid grid-cols-2 bg-gray-200 px-3 py-1 text-lg font-semibold sm:grid-cols-3"
            >
              <h3>Election</h3>
              <h3 class="hidden sm:block">Voting Closes</h3>
            </div>
            <div
              v-for="election in voting"
              :key="election.election_id"
              class="grid grid-cols-2 items-center px-3 sm:grid-cols-3"
            >
              <p>{{ election.election_name }}</p>
              <p class="hidden sm:block">{{ election.voting_close }}</p>
              <div v-if="election.has_voted" class="flex justify-end">
                <p class="flex w-24 items-center justify-center bg-green-400">
                  Voted
                  <FontAwesomeIcon
                    icon="fa-solid fa-check"
                    class="ml-2 h-4 w-4"
                  />
                </p>
              </div>
              <div v-else class="flex justify-end">
                <a
                  href="/elections/vote/{election_id}"
                  class="bg-mustard w-24 py-1 text-center text-black no-underline"
                  >Vote Now</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-y-4">
        <h2 class="text-2xl font-bold">Voting FAQs</h2>
        <div>
          <Accordion
            v-for="faq in faqs"
            :key="faq.question"
            :label="faq.question"
          >
            <article v-html="faq.answer" class="body-style p-3"></article>
          </Accordion>
        </div>
      </div>
    </article>
  </main>
</template>
<!-- eslint-disable vue/prop-name-casing -->
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Accordion from "../accordion/accordion.ce.vue";
library.add(faCheck);
export default {
  name: "ElectionsList",
  props: {
    page_content: {
      type: String,
      default: "",
    },
    nomination_page_content: {
      type: String,
      default: "",
    },
    voting_page_content: {
      type: String,
      default: "",
    },
    openNominationCount: {
      type: Number,
      default: null,
    },
    nominations: {
      type: Array,
      default: null,
    },
    voting: {
      type: Array,
      default: null,
    },
    faqs: {
      type: Array,
      default: null,
    },
  },
  components: {
    FontAwesomeIcon,
    Accordion,
  },
};
</script>
