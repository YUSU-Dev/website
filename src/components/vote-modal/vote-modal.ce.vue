<template>
  <div
    v-show="!modalClosed"
    id="vote-modal"
    class="modal z-50 flex items-start"
    aria-label="Error Modal"
    tabindex="-1"
    role="dialog"
    @click="handleBackgroundClick"
  >
    <div
      id="vote-modal-container"
      class="relative container h-full px-6"
      role="document"
    >
      <div
        class="modal-content max-h-full overflow-y-auto overscroll-contain shadow-lg"
        @click.stop
      >
        <div class="modal-header">
          <div class="flex items-center gap-4">
            <FontAwesomeIcon icon="fa-solid fa-check-to-slot" class="h-6 w-6">
            </FontAwesomeIcon>
            <h2 class="modal-title">Confirm Votes</h2>
          </div>
          <button
            type="button"
            class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            data-dismiss="modal"
            aria-label="Close"
            @click="$emit('close')"
          >
            <svg
              class="h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="flex flex-col gap-8">
            <div
              class="flex items-center gap-8"
              :key="candidate.id"
              v-for="candidate in orderedCandidates"
            >
              <div
                class="flex min-h-12 min-w-12 items-center justify-center border-2"
              >
                <p class="text-3xl font-bold">{{ candidate.voteOrder }}</p>
              </div>
              <h3 class="text-2xl">{{ candidate.name }}</h3>
            </div>
            <div v-if="voteSpoiled" class="flex items-center gap-8">
              <div class="flex h-12 w-12 items-center justify-center border-2">
                <p class="text-3xl font-bold">S</p>
              </div>
              <h3 class="text-2xl!">Vote spoiled</h3>
            </div>
            <div class="border-voice-orange border-l-4">
              <p class="pl-2 text-sm">
                Please ensure that you are happy with your votes before you
                click confirm, as this choice is final.
              </p>
            </div>
            <div class="flex gap-4">
              <button
                type="button"
                class="btn btn-student-voice"
                @click="$emit('close')"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-student-voice"
                @click="$emit('submit')"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckToSlot } from "@fortawesome/free-solid-svg-icons";
library.add(faCheckToSlot);
export default {
  name: "VoteModal",
  props: {
    modalClosed: {
      type: Boolean,
      default: true,
    },
    votes: {
      type: Array,
      default: () => [],
    },
    candidates: {
      type: Array,
      default: () => [],
    },
    voteSpoiled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      orderedCandidates: 0,
    };
  },
  mounted() {},
  watch: {
    modalClosed(newVal) {
      if (!newVal) {
        this.updateVotes();
      }
    },
  },
  methods: {
    updateVotes() {
      if (this.voteSpoiled !== true) {
        this.orderedCandidates = this.candidates
          .filter((candidate) => candidate.voteOrder !== null)
          .sort((a, b) => a.voteOrder - b.voteOrder);
        console.log("Candidates sorted by voteOrder:", this.orderedCandidates);
      } else {
        this.orderedCandidates = [];
      }
    },
    handleBackgroundClick(event) {
      if (
        event.target.id === "vote-modal" ||
        event.target.id === "vote-modal-container"
      ) {
        this.$emit("close");
      }
    },
  },
  emits: ["close", "submit"],
};
</script>
