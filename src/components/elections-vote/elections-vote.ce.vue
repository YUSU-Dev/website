<template>
  <div>
    <div>
      <div
        class="body-style mb-6 flex flex-col gap-2 border-l-4 border-gray-400 bg-gray-100 p-2"
      >
        <h2 class="text-xl! font-bold">How to vote</h2>
        <ol class="list-inside list-decimal">
          <li class="">
            View each candidate, you can click the
            <FontAwesomeIcon
              icon="fa-solid fa-circle-info"
              class="inline-flex h-4 w-4 items-center"
              aria-label="View manifesto button"
            >
            </FontAwesomeIcon>
            icon to view more in depth candidate information.
          </li>
          <li>
            Vote using the STV system, clicking your choices in order of
            preference.
            <a
              class="text-blue-800 underline"
              href="https://www.youtube.com/watch?v=J1GLiPkXnII&feature=youtu.be"
              target="_blank"
              >Further explanation</a
            >.
          </li>
          <li>
            You may also choose to spoil your vote by ticking “Spoil vote” at
            the bottom of your ballot, which is a way to demonstrate your
            dissatisfaction with the available candidates while still
            participating in the democratic process.
            <a
              class="text-blue-800 underline"
              href="https://votingcounts.org.uk/spoilt-ballot"
              target="_blank"
              >Further explanation</a
            >.
          </li>
          <li>
            Once you are happy with your votes, please click review and submit.
          </li>
        </ol>
      </div>
      <h2 class="text-3xl font-bold">Candidates</h2>
      <div
        class="xxs:grid-cols-2 xs:grid-cols-3 mt-4 mb-10 grid gap-6 md:grid-cols-4 lg:grid-cols-5"
      >
        <button
          type="button"
          v-for="candidate in candidates"
          :key="candidate.id"
          class="flex h-full flex-col border shadow-sm"
          @click="handleVote(candidate.id)"
          :class="{
            'selected-candidate': selectedCandidates.includes(candidate.id),
          }"
        >
          <div class="relative">
            <div class="absolute flex w-full justify-end">
              <div
                v-if="candidate.voteOrder"
                class="bg-voice-orange m-2 flex h-8 w-8 items-center justify-center rounded-full border border-black"
              >
                <p>{{ candidate.voteOrder }}</p>
              </div>
            </div>
            <div v-if="candidate.assets.document_photo">
              <img
                :src="candidate.assets.document_photo"
                alt=""
                draggable="false"
              />
            </div>
            <div v-else>
              <img
                src="https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Pink.webp"
                alt=""
                draggable="false"
              />
            </div>
          </div>
          <div class="flex h-full w-full flex-col p-2 text-start">
            <h3 class="line-clamp-3 text-lg font-semibold">
              {{ candidate.name }}
            </h3>
            <div
              v-if="candidate.id != 9"
              class="flex grow flex-col justify-between sm:flex-row"
            >
              <p class="xs:text-wrap truncate">{{ candidate.pronouns }}</p>
              <div class="flex items-end justify-end">
                <button
                  type="button"
                  class=""
                  @click.stop="viewManifesto(candidate.id)"
                  aria-label="View manifesto"
                  title="View manifesto"
                >
                  <FontAwesomeIcon
                    icon="fa-solid fa-circle-info"
                    class="h-6 w-6"
                  >
                  </FontAwesomeIcon>
                </button>
              </div>
            </div>
          </div>
        </button>
      </div>

      <div
        @click="doSpoilVote()"
        v-if="spoiltVote == '1'"
        class="my-10 flex w-fit items-center gap-x-2"
      >
        <input
          id="spoil-vote"
          class="h-5 w-5"
          type="checkbox"
          name="spoilt"
          v-model="voteSpoiled"
          aria-labelledby="spoil-vote-label"
        />
        <label id="spoil-vote-label" class="text-lg">Spoil Vote</label>
      </div>

      <div class="flex flex-col gap-y-4">
        <div class="flex gap-x-4">
          <button
            type="button"
            id="clear-vote"
            class="btn btn-student-voice"
            @click="clearVotes()"
          >
            Clear Votes
          </button>
          <button
            type="button"
            class="btn btn-student-voice"
            :class="{
              'bg-gray-300 hover:bg-gray-300':
                votes.length == 0 && !voteSpoiled,
            }"
            :disabled="votes.length == 0 && !voteSpoiled"
            @click="confirmVotes()"
          >
            Review and Submit
          </button>
        </div>

        <p>
          <em
            >If you're having issues voting please contact
            <a
              class="text-blue-800 underline"
              href="mailto:elections@yorksu.org"
              >elections@yorksu.org</a
            >.</em
          >
        </p>
      </div>
    </div>

    <CandidateModal
      v-if="selectedCandidate"
      :candidate-id="String(selectedCandidate.id)"
      :election-id="String(election.id)"
      :candidate-name="selectedCandidate.name"
      :modal-closed="ModalClosed"
      @close="ModalClosed = true"
    />
    <VoteModal
      :modal-closed="VoteModalClosed"
      :votes="votes"
      :candidates="candidates"
      :vote-spoiled="voteSpoiled"
      @close="VoteModalClosed = true"
      @submit="submitVotes"
    />
    <Modal
      :modal-closed="ErrorModalClosed"
      title="Error"
      error-description="Please vote for at least 1 candidate or spoil your vote."
      @close="ErrorModalClosed = true"
    />
  </div>
</template>

<script>
import axios from "../../_common/axios.mjs";
import CandidateModal from "../candidate-modal/candidate-modal.ce.vue";
import VoteModal from "../vote-modal/vote-modal.ce.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { submitVoteHandler } from "./election-vote.js";
import Modal from "../modal/modal.ce.vue";
library.add(faCircleInfo);
export default {
  name: "ElectionsVote",
  props: {
    electionId: {
      type: String,
      default: "",
    },
    spoiltVote: {
      type: String,
      default: "",
    },
  },
  components: {
    CandidateModal,
    VoteModal,
    FontAwesomeIcon,
    Modal,
  },
  data() {
    return {
      election: [],
      candidates: [],
      selectedCandidate: "",
      votes: [],
      selectedCandidates: [],
      ModalClosed: true,
      ErrorModalClosed: true,
      VoteModalClosed: true,
      voteSpoiled: false,
      formData: {},
    };
  },
  mounted() {
    this.getCandidates();
  },
  methods: {
    createFormData() {
      this.formData.do = "vote";
      this.formData.election_id = this.electionId;
      if (this.election.method == "STV" && this.voteSpoiled == false) {
        for (let i = 0; i < this.votes.length; i++) {
          this.formData["candidate[" + this.votes[i] + "]"] = i + 1;
        }
      }
      // TODO: Add handling for referendum elections
      if (this.voteSpoiled) {
        this.formData.spoilt = "Y";
      }
    },
    async getCandidates() {
      var self = this;
      self.ModalClosed = true;
      try {
        const [electionsResponse, pronounsResponse] = await Promise.all([
          axios.get("https://pluto.sums.su/api/elections/" + this.electionId),
          axios.get(
            "https://yorksu.org/elections/all-candidate-pronouns/" +
              this.electionId,
          ),
        ]);
        self.election = electionsResponse.data;
        self.candidates = self.candidates.sort(() => Math.random() - 0.5);
        self.candidates = electionsResponse.data.candidates;
        let cleanedData = pronounsResponse.data.replace(/,\s*([\]}])/g, "$1");
        let JSONData = JSON.parse(cleanedData);
        self.candidates.forEach((candidate) => {
          const pronouns = JSONData.find(
            (pronoun) => pronoun.id == candidate.id,
          );
          if (pronouns) {
            candidate.pronouns = pronouns.pronouns;
          }
          candidate.voteOrder = null;
        });
      } catch (error) {
        console.error(error);
      }
    },
    handleVote(candidateId) {
      if (this.voteSpoiled) {
        this.voteSpoiled = false;
      }
      const candidate = this.candidates.find(
        (candidate) => candidate.id === candidateId,
      );
      if (this.votes.includes(candidateId)) {
        this.votes = this.votes.filter((id) => id !== candidateId);
        this.selectedCandidates = this.selectedCandidates.filter(
          (id) => id !== candidateId,
        );
        candidate.voteOrder = null;
      } else {
        this.votes.push(candidateId);
        this.selectedCandidates.push(candidateId);
        candidate.voteOrder = this.votes.length;
      }
      this.votes.forEach((id, index) => {
        const candidate = this.candidates.find(
          (candidate) => candidate.id === id,
        );
        candidate.voteOrder = index + 1;
      });
    },
    viewManifesto(candidateId) {
      this.selectedCandidate = this.candidates.find(
        (candidate) => candidate.id === candidateId,
      );
      this.ModalClosed = false;
    },
    clearVotes() {
      this.votes = [];
      this.selectedCandidates = [];
      this.candidates.forEach((candidate) => {
        candidate.voteOrder = null;
      });
    },
    doSpoilVote() {
      this.voteSpoiled = !this.voteSpoiled;
      if (this.votes.length > 0) {
        this.clearVotes();
      }
    },
    confirmVotes() {
      this.VoteModalClosed = false;
    },
    submitVotes() {
      if (this.votes.length > 0 && this.voteSpoiled == false) {
        console.log("Voting submitted, votes: ");
        console.log(this.votes);
        this.createFormData();
        submitVoteHandler(this.electionId, this.formData)
          .then(function () {
            window.location.assign("/elections");
          })
          .catch(function (response) {
            if (response.error_message != "undefined") {
              console.log(
                "There was an error submitting the vote: " +
                  response.error_message,
              );
            } else {
              console.log("Undefined error submitting vote");
            }
          });
        this.VoteModalClosed = true;
      } else if (this.votes.length == 0 && this.voteSpoiled) {
        console.log("Vote spoiled");
        submitVoteHandler(this.electionId, this.formData)
          .then(function () {
            window.location.assign("/elections");
          })
          .catch(function (response) {
            if (response.error_message != "undefined") {
              console.log(
                "There was an error submitting the vote: " +
                  response.error_message,
              );
            } else {
              console.log("Undefined error submitting vote");
            }
          });
        this.VoteModalClosed = true;
      } else {
        console.log("Please vote for at least 1 candidate or spoil your vote.");
      }
    },
  },
};
</script>
