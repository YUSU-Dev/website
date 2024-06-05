<template>
  <!-- main Modal-->
  <Teleport to="body">
    <div
      v-show="!modalClosed"
      id="error-modal"
      class="modal flex items-start"
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
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-dismiss="modal"
              aria-label="Close"
              @click="$emit('close')"
            >
              <svg
                class="w-3 h-3"
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
                Please sign in below. If you are still having problems please
                get in touch with
                <a
                  href="mailto:it@yorksu.org"
                  class="text-blue-800 hover:underline"
                  >YorkSU IT Support</a
                >.
              </p>
            </div>
          </div>
          <div class="modal-footer">
            <div v-if="!signedIn">
              <a type="button" class="btn btn-primary" href="/sign-in/sso"
                >Sign In</a
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
  </Teleport>
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
  },
  emits: ["close"],
};
</script>
