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
      ref="modalContainer"
      id="vote-modal-container"
      class="relative container h-full px-6"
      style="perspective: 2000px"
      role="document"
    >
      <div
        v-show="!isFolding"
        ref="modalContent"
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
              <h3 class="text-2xl">Vote spoiled</h3>
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
                :disabled="isFolding"
                @click="startFoldAnimation"
              >
                {{ isFolding ? "Submitting..." : "Confirm" }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        v-show="isFolding"
        class="fold-container"
        :class="{
          'fold-stage-1': foldStage >= 1,
          'fold-stage-2': foldStage >= 2,
          'fold-stage-3': foldStage >= 3,
          'fold-stage-4': foldStage >= 4,
        }"
      >
        <div class="fold-left">
          <div
            class="modal-content max-h-full overflow-y-auto overscroll-contain shadow-lg"
            @click.stop
          >
            <div class="modal-header">
              <div class="flex items-center gap-4">
                <FontAwesomeIcon
                  icon="fa-solid fa-check-to-slot"
                  class="h-6 w-6"
                >
                </FontAwesomeIcon>
                <h2 class="modal-title">Confirm Votes</h2>
              </div>
            </div>
            <div class="modal-body">
              <div class="flex flex-col gap-8">
                <div
                  class="flex items-center gap-8"
                  :key="'left-' + candidate.id"
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
                  <div
                    class="flex h-12 w-12 items-center justify-center border-2"
                  >
                    <p class="text-3xl font-bold">S</p>
                  </div>
                  <h3 class="text-2xl">Vote spoiled</h3>
                </div>
                <div class="border-voice-orange border-l-4">
                  <p class="pl-2 text-sm">
                    Please ensure that you are happy with your votes before you
                    click confirm, as this choice is final.
                  </p>
                </div>
                <div class="flex gap-4">
                  <button type="button" class="btn btn-student-voice">
                    Cancel
                  </button>
                  <button type="button" class="btn btn-student-voice">
                    Submitting...
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="fold-right">
          <div class="fold-front">
            <div
              class="modal-content fold-right-content max-h-full overflow-y-auto overscroll-contain shadow-lg"
              @click.stop
            >
              <div class="modal-header">
                <div class="flex items-center gap-4">
                  <FontAwesomeIcon
                    icon="fa-solid fa-check-to-slot"
                    class="h-6 w-6"
                  >
                  </FontAwesomeIcon>
                  <h2 class="modal-title">Confirm Votes</h2>
                </div>
                <button
                  type="button"
                  class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400"
                >
                  <svg class="h-3 w-3" fill="none" viewBox="0 0 14 14">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>
              <div class="modal-body">
                <div class="flex flex-col gap-8">
                  <div
                    class="flex items-center gap-8"
                    :key="'right-' + candidate.id"
                    v-for="candidate in orderedCandidates"
                  >
                    <div
                      class="flex min-h-12 min-w-12 items-center justify-center border-2"
                    >
                      <p class="text-3xl font-bold">
                        {{ candidate.voteOrder }}
                      </p>
                    </div>
                    <h3 class="text-2xl">{{ candidate.name }}</h3>
                  </div>
                  <div v-if="voteSpoiled" class="flex items-center gap-8">
                    <div
                      class="flex h-12 w-12 items-center justify-center border-2"
                    >
                      <p class="text-3xl font-bold">S</p>
                    </div>
                    <h3 class="text-2xl">Vote spoiled</h3>
                  </div>
                  <div class="border-voice-orange border-l-4">
                    <p class="pl-2 text-sm">
                      Please ensure that you are happy with your votes before
                      you click confirm, as this choice is final.
                    </p>
                  </div>
                  <div class="flex gap-4">
                    <button type="button" class="btn btn-student-voice">
                      Cancel
                    </button>
                    <button type="button" class="btn btn-student-voice">
                      Submitting...
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="fold-back">
            <div class="flex h-full items-center justify-center">
              <FontAwesomeIcon
                icon="fa-solid fa-check-to-slot"
                class="text-voice-orange h-16 w-16"
              >
              </FontAwesomeIcon>
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
      isFolding: false,
      foldStage: 0,
    };
  },
  watch: {
    modalClosed(newVal) {
      if (!newVal) {
        this.updateVotes();
        this.isFolding = false;
      }
    },
  },
  methods: {
    updateVotes() {
      if (this.voteSpoiled !== true) {
        this.orderedCandidates = this.candidates
          .filter((candidate) => candidate.voteOrder !== null)
          .sort((a, b) => a.voteOrder - b.voteOrder);
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
    startFoldAnimation() {
      if (this.isFolding) return;

      const modalContent = this.$refs.modalContent;
      const modalContainer = this.$refs.modalContainer;

      if (modalContent && modalContainer) {
        const rect = modalContent.getBoundingClientRect();
        const containerRect = modalContainer.getBoundingClientRect();

        this.$nextTick(() => {
          const foldContainer = this.$el.querySelector(".fold-container");
          if (foldContainer) {
            foldContainer.style.width = rect.width + "px";
            foldContainer.style.height = rect.height + "px";
            foldContainer.style.top = rect.top - containerRect.top + "px";
            foldContainer.style.left = rect.left - containerRect.left + "px";

            const computedStyle = window.getComputedStyle(modalContent);
            foldContainer.style.maxHeight = computedStyle.maxHeight;
            foldContainer.style.borderRadius = computedStyle.borderRadius;
          }
        });
      }

      setTimeout(() => {
        this.isFolding = true;
      }, 10);

      setTimeout(() => {
        this.foldStage = 1;
      }, 60);

      setTimeout(() => {
        this.foldStage = 2;
      }, 400);

      setTimeout(() => {
        this.foldStage = 3;
        const foldContainer = this.$el.querySelector(".fold-container");
        if (foldContainer) {
          foldContainer.style.transform = "translateX(25%)";
          foldContainer.style.transition = "transform 0.8s ease-in-out";
        }
      }, 600);

      setTimeout(() => {
        this.foldStage = 4;
        const foldContainer = this.$el.querySelector(".fold-container");
        if (foldContainer) {
          foldContainer.style.transform =
            "translateX(25%) translateY(100vh) rotateZ(15deg)";
          foldContainer.style.opacity = "0";
          foldContainer.style.transition =
            "transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s ease-out";
        }
      }, 2800);

      setTimeout(() => {
        this.$emit("submit");
      }, 800);

      setTimeout(() => {
        this.$emit("close");
      }, 5500);

      setTimeout(() => {
        this.isFolding = false;
        this.foldStage = 0;
      }, 5600);
    },
  },
  emits: ["close", "submit"],
};
</script>

<style scoped>
.fold-container {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  perspective: 2000px;
  transform-style: preserve-3d;
  z-index: 10;
  pointer-events: none;
  opacity: 1;
  transition:
    transform 0.8s ease-in-out,
    opacity 0.8s ease-out;
}

.fold-left {
  width: 50%;
  height: 100%;
  overflow: hidden;
  background: white;
  border-radius: 8px 0 0 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: filter 0.6s ease;
  position: relative;
}

.fold-left .modal-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 100%;
  overflow: hidden;
}

.fold-right {
  width: 50%;
  height: 100%;
  position: relative;
  transform-origin: left center;
  transform-style: preserve-3d;
  transition: transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.fold-front,
.fold-back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.fold-front {
  transform: rotateY(0deg);
  overflow: hidden;
  background: white;
  border-radius: 0 8px 8px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: opacity 0.3s ease;
}

.fold-back {
  transform: rotateY(-180deg);
  background: white;
  border-radius: 0 8px 8px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.fold-right-content {
  position: absolute;
  left: -100%;
  width: 200%;
  height: 100%;
}

.fold-stage-1 .fold-right {
  transform: rotateY(-90deg);
}

.fold-stage-1 .fold-left {
  filter: brightness(0.95);
}

.fold-stage-2 .fold-right {
  transform: rotateY(-180deg);
}

.fold-stage-2 .fold-front {
  opacity: 0;
}

.fold-stage-2 .fold-left {
  filter: brightness(0.9);
}

.fold-stage-3 .fold-container {
  transform: translateX(25%) !important;
  transition: transform 0.8s ease-in-out !important;
}

.fold-stage-4 .fold-container {
  transform: translateX(25%) translateY(100vh) rotateZ(15deg) !important;
  opacity: 0 !important;
  transition:
    transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    opacity 0.8s ease-out !important;
}

.fold-left .modal-header,
.fold-left .modal-body {
  width: 200%;
}

.fold-left .flex {
  flex-wrap: nowrap;
}

.fold-left,
.fold-right {
  min-height: 100%;
  box-sizing: border-box;
}

.fold-left .modal-content,
.fold-right .modal-content {
  height: 100% !important;
  min-height: 100% !important;
  box-sizing: border-box;
}

.fold-left h3,
.fold-right h3 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
