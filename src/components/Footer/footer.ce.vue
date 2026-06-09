<template>
  <footer id="footer" class="footer flex h-full items-end">
    <div class="w-full bg-black">
      <div class="sm:px-8 container mx-auto px-6 pt-6 pb-12 lg:px-6">
        <h1 class="sr-only text-white">Footer</h1>
        <div
          class="flex flex-col gap-y-12 py-4 text-white"
        >
          <div>
            <a href="/">
              <img
                src="https://assets-cdn.sums.su/YU/website/img/yorksu-logo-white-full.png"
                alt="YorkSU Logo"
                class="w-52"
              />
            </a>
          </div>
          <div class="grid grid-cols-2 gap-6 text-sm md:grid-cols-2 lg:grid-cols-4">
            <div class="flex flex-col gap-y-4">
              <h2 class="text-xs font-medium uppercase tracking-widest text-yellow-400">
                Get Involved
              </h2>
              <ul class="flex flex-col gap-y-1">
                <li><a href="/activities/societies">Societies</a></li>
                <li><a href="/activities/sport">Sports clubs</a></li>
                <li><a href="/volunteering">Volunteering</a></li>
                <li><a href="/student-media">Student media</a></li>
              </ul>
            </div>

            <div class="flex flex-col gap-y-4">
              <h2 class="text-xs font-medium uppercase tracking-widest text-yellow-400">
                Support
              </h2>
              <ul class="flex flex-col gap-y-1">
                <li><a href="/advice">Advice service</a></li>
                <li><a href="/night-safety">Night safety</a></li>
                <li><a href="/mental-health">Mental health</a></li>
                <li><a href="/housing">Housing help</a></li>
              </ul>
            </div>

            <div class="flex flex-col gap-y-4">
              <h2 class="text-xs font-medium uppercase tracking-widest text-yellow-400">
                About
              </h2>
              <ul class="flex flex-col gap-y-1">
                <li><a href="/about-us">Who we are</a></li>
                <li><a href="/contact">Contact us</a></li>
                <li>
                  <a
                    href="https://apply.yorksu.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Jobs</a
                  >
                </li>
                <li><a href="/documents/web-accessibility-statement">Accessibility</a></li>
              </ul>
            </div>

            <div class="flex flex-col gap-y-4">
              <h2 class="text-xs font-medium uppercase tracking-widest text-yellow-400">
                Policies
              </h2>
              <ul class="flex flex-col gap-y-1">
                <li><a href="/documents/refund-policy">Refund Policy</a></li>
                <li><a href="/documents/term-and-conditions">Terms &amp; Conditions</a></li>
                <li><a href="/documents/privacy">Your Privacy</a></li>
                <li><a href="/complaints">Complaints</a></li>
              </ul>
            </div>
          </div>

          <div class="mt-10 flex flex-col gap-y-6 border-t border-white/20 pt-6 text-white/40 lg:flex-row lg:items-center lg:justify-between lg:gap-y-0">
            <p class="text-xs text-white/40">
              © 2026 University of York Students' Union · Charity no. 1173404 · Powered by
              <a
                href="https://sums.digital"
                target="_blank"
                rel="noopener noreferrer"
                class="text-white/40 hover:text-white"
                >SUMS</a
              >
            </p>
            <div class="flex items-center gap-2">
              <a
                href="https://www.instagram.com/yorksu"
                target="_blank"
                rel="noopener noreferrer"
                class="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-white/60 hover:text-white"
              >
                <FontAwesomeIcon icon="fab fa-instagram" class="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/yorksu"
                target="_blank"
                rel="noopener noreferrer"
                class="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-white/60 hover:text-white"
              >
                <FontAwesomeIcon icon="fab fa-x-twitter" class="h-4 w-4" />
              </a>
              <a
                href="https://www.facebook.com/yorksu"
                target="_blank"
                rel="noopener noreferrer"
                class="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-white/60 hover:text-white"
              >
                <FontAwesomeIcon icon="fab fa-facebook-f" class="h-4 w-4" />
              </a>
              <a
                href="https://www.tiktok.com/@yorksu"
                target="_blank"
                rel="noopener noreferrer"
                class="flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-white/60 hover:text-white"
              >
                <FontAwesomeIcon icon="fab fa-tiktok" class="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faInstagram,
  faXTwitter,
  faFacebookF,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

library.add(faInstagram, faXTwitter, faFacebookF, faTiktok);

export default {
  name: "Footer",
  props: {},
  methods: {},
  components: {
    FontAwesomeIcon,
  },
};
</script>
