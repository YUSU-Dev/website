<template>
  <div
    id="error-modal"
    class="align-end fixed bottom-0 left-0 z-50 flex justify-start overflow-x-hidden overflow-y-auto"
    aria-label="Cookie Consent Modal"
    role="dialog"
    v-if="displayCookieConsent"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">We value your privacy</h2>
        </div>
        <div class="modal-body">
          <div>
            <p>
              We use necessary cookies to ensure you get the best experience on
              our website. By continuing on our site you are agreeing to using
              cookies to help us understand usage and how to improve it. View
              our
              <a
                href="/documents/cookie-policy"
                class="text-blue-800 underline dark:text-blue-400"
                >Cookie Policy</a
              >.
            </p>
          </div>
        </div>
        <div
          class="flex items-center justify-items-end gap-3 rounded-b border-t border-gray-200 p-4 md:p-5 dark:border-gray-600"
        >
          <button
            type="button"
            class="btn btn-primary"
            @click="acceptCookies()"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  setCookie,
  getCookie,
} from "https://cdn.jsdelivr.net/npm/tiny-cookie@2.5.1/+esm";

export default {
  data() {
    return {
      displayCookieConsent: true,
    };
  },
  mounted() {
    const cookieConsent = getCookie("yorksu-cookie-consent");
    if (cookieConsent === "ok") {
      this.displayCookieConsent = false;
    }
  },
  methods: {
    acceptCookies() {
      setCookie("yorksu-cookie-consent", "ok", {
        expires: 365,
      });
      this.displayCookieConsent = false;
    },
    rejectCookies() {
      setCookie("yorksu-cookie-consent", "rejected", {
        expires: 365,
      });
      this.displayCookieConsent = true;
    },
  },
};
</script>
