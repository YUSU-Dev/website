<template>
  <button
    data-modal-target="error-modal"
    data-modal-toggle="default-modal"
    class="block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    type="button"
  >
    Toggle modal
  </button>
  <!-- main Modal-->
  <div id="error-modal" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Basket Error</h2>
          <button
            type="button"
            class="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
            data-dismiss="modal"
            aria-label="Close"
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
          <p id="modal-body-error">Undefined Error!</p>
          <!-- {if logged_in} -->
          <!-- {if:else} -->
          <p>
            If you think you should be able to purchase this product please sign
            in.
          </p>
          <!-- {/if} -->
        </div>
        <div class="modal-footer">
          <!-- {if logged_in} -->
          <button type="button" class="btn btn-primary" data-dismiss="modal">
            Close
          </button>
          <!-- {if:else} -->
          <a type="button" class="btn btn-primary" href="/sign-in/sso"
            >Sign In</a
          >
          <button type="button" class="btn btn-primary" data-dismiss="modal">
            Close
          </button>
          <!-- {/if} -->
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
  },
};
</script>
