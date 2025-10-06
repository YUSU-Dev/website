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
        <VoteModalContent
          :ordered-candidates="orderedCandidates"
          :vote-spoiled="voteSpoiled"
          :show-close-button="true"
          :button-states="buttonStates"
          @close="$emit('close')"
          @cancel="handleCancel"
          @confirm="handleConfirm"
        />
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
          <VoteModalContent
            :ordered-candidates="orderedCandidates"
            :vote-spoiled="voteSpoiled"
            :show-close-button="false"
            :button-states="buttonStates"
            :key-prefix="'left-'"
            @close="$emit('close')"
            @cancel="handleCancel"
            @confirm="handleConfirm"
          />
        </div>

        <div class="fold-right">
          <div class="fold-front">
            <VoteModalContent
              :ordered-candidates="orderedCandidates"
              :vote-spoiled="voteSpoiled"
              :show-close-button="true"
              :button-states="buttonStates"
              :key-prefix="'right-'"
              @close="$emit('close')"
              @cancel="handleCancel"
              @confirm="handleConfirm"
            />
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
import VoteModalContent from "../vote-modal-content/vote-modal-content.ce.vue";
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
    VoteModalContent,
  },
  data() {
    return {
      orderedCandidates: 0,
      isFolding: false,
      foldStage: 0,
    };
  },
  computed: {
    buttonStates() {
      return {
        cancelText: "Cancel",
        cancelDisabled: this.isFolding,
        confirmText: this.isFolding ? "Submitting..." : "Confirm",
        confirmDisabled: this.isFolding,
      };
    },
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
          if (!foldContainer) return;

          const computedStyle = window.getComputedStyle(modalContent);

          Object.assign(foldContainer.style, {
            width: rect.width + "px",
            height: rect.height + "px",
            top: rect.top - containerRect.top + "px",
            left: rect.left - containerRect.left + "px",
            maxHeight: computedStyle.maxHeight,
            borderRadius: computedStyle.borderRadius,
            padding: computedStyle.padding,
            margin: computedStyle.margin,
          });

          const originalHeader = modalContent.querySelector(".modal-header");
          if (originalHeader) {
            const headerHeight = originalHeader.getBoundingClientRect().height;
            const headerStyles = {
              height: headerHeight + "px",
              minHeight: headerHeight + "px",
              maxHeight: headerHeight + "px",
            };

            const headers = [
              foldContainer.querySelector(".fold-left .modal-header"),
              foldContainer.querySelector(".fold-right .modal-header"),
            ];

            headers.forEach((header) => {
              if (header) Object.assign(header.style, headerStyles);
            });
          }

          const foldLeftContent = foldContainer.querySelector(
            ".fold-left .modal-content",
          );
          if (foldLeftContent) {
            Object.assign(foldLeftContent.style, {
              padding: computedStyle.padding,
              margin: computedStyle.margin,
              boxSizing: computedStyle.boxSizing,
            });
          }
        });
      }

      this.isFolding = true;

      const animateStage = (stage, delay, callback) => {
        setTimeout(() => {
          this.foldStage = stage;
          if (callback) callback();
        }, delay);
      };

      animateStage(1, 60);
      animateStage(2, 400);
      animateStage(3, 600, () => {
        const foldContainer = this.$el.querySelector(".fold-container");
        if (foldContainer) {
          foldContainer.style.transition = "transform 0.8s ease-in-out";
          foldContainer.style.transform = "translateX(25%)";
        }
      });
      animateStage(4, 2800, () => {
        const foldContainer = this.$el.querySelector(".fold-container");
        if (foldContainer) {
          Object.assign(foldContainer.style, {
            transform: "translateX(25%) translateY(100vh) rotateZ(15deg)",
            opacity: "0",
            transition:
              "transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.8s ease-out",
          });
        }
      });

      setTimeout(() => this.$emit("submit"), 800);
      setTimeout(() => this.$emit("close"), 5500);
      setTimeout(() => {
        this.isFolding = false;
        this.foldStage = 0;
      }, 5600);
    },
    handleCancel() {
      this.$emit("close");
    },
    handleConfirm() {
      this.startFoldAnimation();
    },
  },
  emits: ["close", "submit"],
};
</script>
