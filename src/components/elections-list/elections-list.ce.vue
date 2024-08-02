<template>
  <div class="container mx-auto flex flex-col gap-y-6 py-20">
    <!-- Page content -->
    <div class="flex flex-col gap-y-4">
      <p>
        The Students’ Union is here to ensure that every single student at York
        feels like their voice is heard meaning you collectively decide who is
        going to represent your interests and improve the lives of students
        where it matters most. We are always searching for students who are
        passionate about making positive change; whether it’s tackling the cost
        of living, fighting for a more inclusive campus or ensuring that
        students have the best possible academic experience at University.
      </p>
      <p>
        If you care about your University and the students in it, it’s time to
        make a difference.
      </p>
      <p>
        You can get in touch with
        <a href="mailto:elections@yusu.org">elections@yusu.org</a> if you have
        any questions.
      </p>
    </div>
    <hr />
    <div class="flex flex-col gap-y-4">
      <h2 class="text-2xl font-bold">Nominate</h2>
      <p>
        Nominating yourself means that you want to advocate for the interests of
        your fellow students and ensure their University experience is the best
        it can be. Before you nominate, make sure you know what you’ll need for
        your nomination. You can find all that information on yusu.org/elections
        or get in touch with
        <a href="mailto:elections@yusu.org">elections@yusu.org</a> if you have
        any questions.
      </p>
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
                class="w-24 bg-mustard py-1 text-center"
                >Nominate</a
              >
            </div>
            <div v-else class="flex justify-end">
              <a
                href="/elections/nominate/{election_id}"
                class="w-24 bg-mustard py-1 text-center"
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
      <p>
        Vote below for any current YUSU elections. Please note that certain
        elections such as Course Reps and College Officers can only be seen by
        members of the relevant faculties/colleges.
      </p>
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
                class="w-24 bg-mustard py-1 text-center"
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
          <div v-html="faq.answer" class="p-3"></div>
        </Accordion>
      </div>
    </div>
    <!-- Page content -->
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Accordion from "../accordion/accordion.ce.vue";
library.add(faCheck);
export default {
  name: "ElectionsList",
  props: {
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
