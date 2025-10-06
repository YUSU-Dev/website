<template>
  <div
    class="modal-content max-h-full overflow-y-auto overscroll-contain shadow-lg"
    @click.stop
  >
    <div class="modal-header">
      <div class="flex items-center gap-4">
        <FontAwesomeIcon
          icon="fa-solid fa-check-to-slot"
          class="h-6 w-6"
        ></FontAwesomeIcon>
        <h2 class="modal-title">Confirm Votes</h2>
      </div>
      <button
        v-if="showCloseButton"
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
          :key="keyPrefix + candidate.id"
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
        <div
          class="border-l-voice-orange border-r-4 border-l-4 border-r-transparent"
        >
          <p class="pl-2 text-sm">
            Please ensure that you are happy with your votes before you click
            confirm, as this choice is final.
          </p>
        </div>
        <div class="flex gap-4">
          <button
            type="button"
            class="btn btn-student-voice"
            :disabled="buttonStates.cancelDisabled"
            @click="$emit('cancel')"
          >
            {{ buttonStates.cancelText }}
          </button>
          <button
            type="button"
            class="btn btn-student-voice"
            :disabled="buttonStates.confirmDisabled"
            @click="$emit('confirm')"
          >
            {{ buttonStates.confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VoteModalContent",
  props: {
    orderedCandidates: {
      type: Array,
      required: true,
    },
    voteSpoiled: {
      type: Boolean,
      default: false,
    },
    showCloseButton: {
      type: Boolean,
      default: true,
    },
    keyPrefix: {
      type: String,
      default: "",
    },
    buttonStates: {
      type: Object,
      default: () => ({
        cancelText: "Cancel",
        cancelDisabled: false,
        confirmText: "Confirm",
        confirmDisabled: false,
      }),
    },
  },
  emits: ["close", "cancel", "confirm"],
};
</script>
