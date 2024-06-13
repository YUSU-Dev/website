<template>
  <!-- main Modal-->
  <Teleport to="body">
    <div
      id="error-modal"
      class="align-end fixed bottom-0 left-0 flex justify-start overflow-y-auto overflow-x-hidden md:inset-0"
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
                We use necessary cookies to ensure you get the best experience
                on our website. By continuing on our site you are agreeing to
                using cookies to help us understand usage and how to improve it.
                View our
                <a
                  href="/about-us/organisational-policies/cookie-policy"
                  class="text-blue-800 hover:underline"
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
  </Teleport>
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
