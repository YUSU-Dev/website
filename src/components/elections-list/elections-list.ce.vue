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
        <!-- <table class="w-full table-fixed">
          <thead>
            <tr>
              <th class="text-start">Election</th>
              <th class="hidden text-start sm:block">Nominations Close</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="election in nominations" :key="election.election_id">
              <td>{{ election.election_name }}</td>
              <td class="hidden sm:block">{{ election.nominations_close }}</td>
              <td v-if="election.activity_id">
                <a href="/elections/nominate/{election_id}/{activity_id}"
                  >Nominate</a
                >
              </td>
              <td v-else>
                <a href="/elections/nominate/{election_id}">Nominate</a>
              </td>
            </tr>
          </tbody>
        </table> -->
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
            <!-- <a
              v-if="election.activity_id"
              href="/elections/nominate/{election_id}/{activity_id}"
              >Nominate</a
            >
            <a v-else href="/elections/nominate/{election_id}">Nominate</a> -->
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
        <!-- <table class="w-full table-fixed">
          <thead>
            <tr>
              <th class="text-start">Election</th>
              <th class="hidden text-start sm:block">Voting Close</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="election in voting" :key="election.election_id">
              <td>{{ election.election_name }}</td>
              <td class="hidden sm:block">{{ election.voting_close }}</td>
              <td v-if="election.has_voted">Voted</td>
              <td v-else>
                <a href="/elections/vote/{election_id}">Vote Now</a>
              </td>
            </tr>
          </tbody>
        </table> -->
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
      <div id="accordion">
        <div v-for="faq in faqs" :key="faq.question">
          <div class="relative z-10 bg-gray-200 px-3 py-2">
            <button
              class="h-full w-full text-start"
              @click="faq.open = !faq.open"
            >
              <h3>{{ faq.question }}</h3>
            </button>
          </div>
          <Transition :name="accordionTransition(faq.question)">
            <div
              v-if="faq.open"
              v-html="faq.answer"
              class="flex flex-col gap-y-2 px-3 py-2"
            ></div>
          </Transition>
        </div>
        <!-- <div id="heading1" class="bg-gray-200 px-3 py-2 relative z-10">
          <button class="h-full w-full text-start" @click="accordionControl('collapse1')">
            <h3>We use Single Transferable Voting (STV). What is STV?</h3>
          </button>
        </div>
        <Transition name="slide-top" >
        <div v-if="active === 'collapse1'" id="collapse1" class="px-3 py-2">
          <p>
            STV is a voting system that uses ranked-choice ballots. This gives
            you the option to ‘rank’ your preferred candidates. This means that
            when the candidate with the least votes is removed from the
            leadership contest, the votes given to them move to people’s second
            preferences and so on, until one candidate is the winner!
          </p>
        </div>
      </Transition>
      <div id="heading2" class="bg-gray-200 px-3 py-2 relative z-10">
          <button class="h-full w-full text-start" @click="accordionControl('collapse2')">
            <h3>We use Single Transferable Voting (STV). What is STV?</h3>
          </button>
        </div>
        <Transition name="slide-top" >
        <div v-if="active === 'collapse2'" id="collapse2" class="px-3 py-2">
          <p>
            STV is a voting system that uses ranked-choice ballots. This gives
            you the option to ‘rank’ your preferred candidates. This means that
            when the candidate with the least votes is removed from the
            leadership contest, the votes given to them move to people’s second
            preferences and so on, until one candidate is the winner!
          </p>
        </div>
      </Transition>
      <div id="heading3" class="bg-gray-200 px-3 py-2 relative z-10">
          <button class="h-full w-full text-start" @click="accordionControl('collapse3')">
            <h3>We use Single Transferable Voting (STV). What is STV?</h3>
          </button>
        </div>
        <Transition name="slide-top" >
        <div v-if="active === 'collapse3'" id="collapse3" class="px-3 py-2">
          <p>
            STV is a voting system that uses ranked-choice ballots. This gives
            you the option to ‘rank’ your preferred candidates. This means that
            when the candidate with the least votes is removed from the
            leadership contest, the votes given to them move to people’s second
            preferences and so on, until one candidate is the winner!
          </p>
        </div>
      </Transition> -->
      </div>
    </div>
    <!-- Page content -->
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
library.add(faCheck);
export default {
  name: "ElectionsList",
  data() {
    return {
      active: null,
    };
  },
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
  },
  methods: {
    accordionControl(id) {
      console.log(id);
      if (this.active == id) {
        this.active = null;
      } else {
        this.active = id;
      }
    },
    accordionTransition(id) {
      if (this.active == id) {
        console.log("slide-top");
        return "slide-top";
      } else {
        console.log("slide-bottom");
        return "slide-bottom";
      }
    },
  },
};
</script>
