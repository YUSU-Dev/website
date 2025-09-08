<template>
  <div
    id="cookie-consent"
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
              cookies to help us understand usage and how to improve it, you can
              help us further by accepting optional cookies which allows us
              further insights into your experience on our site. View our
              <a
                href="/documents/cookie-policy"
                class="text-blue-800 underline dark:text-blue-400"
                >Cookie Policy</a
              >.
            </p>
          </div>
        </div>
        <div
          class="flex flex-wrap items-center justify-items-end gap-3 rounded-b-sm border-t border-gray-200 p-4 md:p-5 dark:border-gray-600"
        >
          <button
            type="button"
            class="btn btn-primary"
            @click="rejectCookies()"
          >
            Accept Required Cookies
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="acceptCookies()"
          >
            Accept all Cookies
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
    if (cookieConsent === "ok" || cookieConsent === "rejected") {
      this.displayCookieConsent = false;
    }
  },
  methods: {
    acceptCookies() {
      setCookie("yorksu-cookie-consent", "ok", {
        expires: 365,
      });
      window.clarity("consentv2", {
        ad_storage: "granted",
        analytics_storage: "granted",
      });
      this.displayCookieConsent = false;
    },
    rejectCookies() {
      setCookie("yorksu-cookie-consent", "rejected", {
        expires: 3,
      });
      window.clarity("consentv2", {
        ad_storage: "denied",
        analytics_storage: "denied",
      });
      this.displayCookieConsent = false;
    },
  },
};
</script>
