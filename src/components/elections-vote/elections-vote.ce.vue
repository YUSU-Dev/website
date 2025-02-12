<template>
  <div>
    <div>
      <h2 class="text-3xl font-bold">Candidates</h2>
      <div
        class="my-10 grid gap-6 xxs:grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        <button
          type="button"
          v-for="candidate in candidates"
          :key="candidate.id"
          class="flex h-full flex-col border shadow"
          @click="handleVote(candidate.id)"
          :class="{
            'selected-candidate': selectedCandidates.includes(candidate.id),
          }"
        >
          <div class="relative">
            <div class="absolute flex w-full justify-end">
              <div
                v-if="candidate.voteOrder"
                class="m-2 flex h-8 w-8 items-center justify-center rounded-full bg-voice-orange"
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
                src="https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Red.webp"
                alt=""
                draggable="false"
              />
            </div>
          </div>
          <div class="flex h-full w-full flex-col p-2 text-start">
            <h3 class="truncate text-lg font-semibold xs:text-wrap">
              {{ candidate.name }}
            </h3>
            <div
              v-if="candidate.id != 9"
              class="flex flex-grow flex-col justify-between sm:flex-row"
            >
              <p class="truncate xs:text-wrap">{{ candidate.pronouns }}</p>
              <div class="flex items-end justify-end">
                <button
                  type="button"
                  class=""
                  @click.stop="viewManifesto(candidate.id)"
                  aria-label="View manifesto"
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

      <hr />

      <div v-if="spoiltVote == '1'" class="my-10 flex items-center gap-x-2">
        <input
          id="spoil-vote"
          class="h-5 w-5"
          type="checkbox"
          name="spoilt"
          v-model="voteSpoiled"
          aria-labelledby="spoil-vote-label"
          @click="doSpoilVote()"
        />
        <label id="spoil-vote-label" class="text-lg">Spoil Vote</label>
      </div>

      <hr />

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
      v-if="candidate"
      :candidate-id="String(candidate.id)"
      :election-id="String(election.id)"
      :candidate-name="candidate.name"
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
      candidate: "",
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
      this.candidate = this.candidates.find(
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
