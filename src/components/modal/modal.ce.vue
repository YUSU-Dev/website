<template>
  <div
    v-show="!modalClosed"
    id="error-modal"
    class="modal z-50 flex items-start"
    aria-label="Error Modal"
    tabindex="-1"
    role="dialog"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">{{ title }}</h2>
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
          <p id="modal-body-error">{{ errorDescription }}</p>
          <div v-if="!signedIn">
            <p>
              Please sign in below. If you are still having problems please get
              in touch with
              <a
                href="mailto:it@yorksu.org"
                class="text-blue-800 underline dark:text-blue-400"
                >YorkSU IT Support</a
              >
            </p>
          </div>
        </div>
        <div class="modal-footer">
          <div v-if="!signedIn">
            <a type="button" class="btn btn-primary" href="/sign-in">Sign In</a>
          </div>
          <div v-if="welcomeMapError">
            <a type="button" class="btn btn-primary" href="/welcome-fair"
              >View Stalls</a
            >
          </div>
          <button
            type="button"
            class="btn btn-primary"
            data-dismiss="modal"
            @click="$emit('close')"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    signedIn: {
      type: Boolean,
      default: false,
    },
    modalClosed: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "Error",
    },
    errorDescription: {
      type: String,
      default: "Undefined Error!",
    },
    welcomeMapError: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close"],
};
</script>
