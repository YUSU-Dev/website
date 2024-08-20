<template>
  <div
    v-show="!toastClosed"
    id="alert-toast"
    class="fixed bottom-5 right-5 flex w-full max-w-xs items-center space-x-4 divide-x divide-gray-200 rounded-lg bg-white p-4 text-gray-500 shadow rtl:divide-x-reverse dark:divide-gray-700 dark:bg-gray-800 dark:text-gray-400"
    role="alert"
  >
    <div class="flex">
      <div
        class="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-900 dark:text-green-300"
      >
        <FontAwesomeIcon icon="fas fa-check" class="h-4 w-4" />
        <span class="sr-only">Check icon</span>
      </div>
      <div class="ms-3 text-sm font-normal">
        <span
          class="mb-1 text-sm font-semibold text-gray-900 dark:text-white"
          >{{ title }}</span
        >
        <div class="mb-2 text-sm font-normal">{{ message }}</div>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <button
              type="button"
              class="btn btn-primary w-full py-2"
              data-dismiss="modal"
              @click="$emit('close')"
            >
              {{ dismissText }}
            </button>
          </div>
          <div>
            <button
              type="button"
              class="btn btn-secondary w-full px-3 py-2"
              data-dismiss="modal"
              @click="$emit('undo')"
            >
              {{ undoText }}
            </button>
          </div>
        </div>
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
        <span class="sr-only">Close</span>
      </button>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

library.add(faCheck);
export default {
  name: "Toast",
  components: { FontAwesomeIcon },
  props: {
    title: {
      type: String,
      default: "Success!",
    },
    message: {
      type: String,
      default: "You have successfully registered interest.",
    },
    undoText: {
      type: String,
      default: "Undo",
    },
    dismissText: {
      type: String,
      default: "Dismiss",
    },
    toastClosed: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["close", "undo"],
};
</script>
