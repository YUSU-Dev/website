<template>
  <div
    v-show="!modalClosed"
    id="candidate-modal"
    class="modal z-50 flex items-start"
    aria-label="Error Modal"
    tabindex="-1"
    role="dialog"
    @click="handleBackgroundClick"
  >
    <div
      id="candidate-modal-container"
      class="container relative h-full px-6"
      role="document"
    >
      <div
        class="modal-content max-h-full overflow-y-auto overscroll-contain shadow-lg"
        @click.stop
      >
        <div class="modal-header">
          <div class="flex items-center gap-4">
            <FontAwesomeIcon icon="fa-solid fa-circle-info" class="h-6 w-6">
            </FontAwesomeIcon>
            <h2 v-if="candidateName" class="modal-title">
              {{ candidateName }}
            </h2>
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
          <ElectionsCandidate
            :key="candidateKey"
            :candidate-id="candidateId"
            :election-id="electionId"
            embedded
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
library.add(faCircleInfo);
import ElectionsCandidate from "../elections-candidate/elections-candidate.ce.vue";
export default {
  name: "CandidateModal",
  props: {
    modalClosed: {
      type: Boolean,
      default: true,
    },
    candidateId: {
      type: String,
      default: "",
    },
    electionId: {
      type: String,
      default: "",
    },
    candidateName: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ElectionsCandidate,
    FontAwesomeIcon,
  },
  data() {
    return {
      candidateKey: 0,
    };
  },
  watch: {
    candidateId() {
      this.candidateKey += 1;
    },
  },
  methods: {
    handleBackgroundClick(event) {
      if (
        event.target.id === "candidate-modal" ||
        event.target.id === "candidate-modal-container"
      ) {
        this.$emit("close");
      }
    },
  },
  emits: ["close"],
};
</script>
