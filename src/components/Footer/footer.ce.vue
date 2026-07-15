<template>
  <footer id="footer" class="footer flex h-full items-end">
    <div class="w-full bg-black">
      <div class="sm:px8 container mx-auto px-6 pt-10 pb-8 lg:px-6">
        <h1 class="sr-only text-white">Footer</h1>

        <div class="pb-8">
          <a href="/">
            <img
              src="https://assets-cdn.sums.su/YU/website/img/yorksu-logo-white-full.png"
              alt="YorkSU Logo"
              class="w-52"
            />
          </a>
        </div>

        <div
          class="grid grid-cols-2 gap-x-6 gap-y-10 border-t border-white/20 pt-8 text-white sm:grid-cols-4 sm:gap-x-8"
        >
          <div
            v-for="column in footerColumns"
            :key="column.title"
            class="flex flex-col gap-y-4"
          >
            <h2
              class="text-sm font-semibold tracking-wide text-gray-400 uppercase"
            >
              {{ column.title }}
            </h2>
            <ul class="flex flex-col gap-y-3">
              <li v-for="link in column.links" :key="link.label">
                <a
                  :href="link.href"
                  :target="link.external ? '_blank' : null"
                  :rel="link.external ? 'noopener noreferrer' : null"
                  class="text-sm font-normal text-gray-300 hover:text-white hover:underline"
                  >{{ link.label }}</a
                >
              </li>
            </ul>
          </div>
        </div>

        <div
          class="mt-10 flex flex-col gap-y-4 border-t border-white/20 pt-6 text-sm text-gray-300 sm:flex-row sm:items-start sm:justify-between"
        >
          <div class="flex flex-col gap-y-2">
            <ul class="flex flex-wrap gap-x-2 gap-y-1">
              <li>© {{ currentYear }} University of York Students' Union</li>
              <li class="hidden sm:inline">·</li>
              <li>Charity no. 1173404</li>
              <li class="hidden sm:inline">·</li>
              <li>
                Powered by
                <a
                  href="https://sums.digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hover:text-white hover:underline"
                  >SUMS</a
                >
              </li>
            </ul>
            <ul class="flex flex-wrap gap-x-2 gap-y-1">
              <li>
                <a
                  href="/documents/refund-policy"
                  class="hover:text-white hover:underline"
                  >Refund Policy</a
                >
              </li>
              <li class="hidden sm:inline">·</li>
              <li>
                <a
                  href="/documents/term-and-conditions"
                  class="hover:text-white hover:underline"
                  >Terms & Conditions</a
                >
              </li>
              <li class="hidden sm:inline">·</li>
              <li>
                <a
                  href="/documents/privacy"
                  class="hover:text-white hover:underline"
                  >Privacy</a
                >
              </li>
              <li class="hidden sm:inline">·</li>
              <li>
                <a href="/complaints" class="hover:text-white hover:underline"
                  >Complaints</a
                >
              </li>
            </ul>
          </div>
          <div class="flex gap-x-3">
            <a
              v-for="social in socials"
              :key="social.name"
              :aria-label="social.name"
              :href="social.link"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <FontAwesomeIcon
                :icon="`fa-brands ${social.icon}`"
                class="h-4 w-4"
              />
            </a>
            <a
              aria-label="Email helpdesk@yorksu.org"
              href="mailto:helpdesk@yorksu.org"
              class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <FontAwesomeIcon icon="fas fa-envelope" class="h-4 w-4" />
            </a>
            <a
              aria-label="Call 01904 32 3724"
              href="tel:+441904323724"
              class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <FontAwesomeIcon icon="fas fa-phone" class="h-4 w-4" />
            </a>
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
  faFacebook,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

library.add(faInstagram, faXTwitter, faFacebook, faTiktok, faEnvelope, faPhone);

export default {
  name: "Footer",
  props: {},
  data() {
    return {
      currentYear: new Date().getFullYear(),
      footerColumns: [
        {
          title: "Get Involved",
          links: [
            { label: "Societies", href: "/societies" },
            { label: "Sports Clubs", href: "/sport" },
            { label: "Volunteering", href: "/volunteering" },
            { label: "Campaigns & Projects", href: "/campaigns" },
          ],
        },
        {
          title: "Support",
          links: [
            { label: "Support A-Z", href: "/advice-support/support-a-z" },
            { label: "Advice Service", href: "/advice-support" },
            {
              label: "Housing",
              href: "/advice-support/support-a-z/housing-and-bills",
            },
            { label: "Cost of Living Support", href: "/cost-of-living" },
          ],
        },
        {
          title: "Your Voice",
          links: [
            { label: "Officers", href: "/officers" },
            { label: "Academic Reps", href: "/academic-reps" },
            { label: "Research & Insight", href: "/research-insight" },
            { label: "SUmmit", href: "/summit" },
          ],
        },
        {
          title: "About",
          links: [
            { label: "Jobs", href: "https://apply.yorksu.org", external: true },
            { label: "Advertise with Us", href: "/advertise-with-us" },
            { label: "Brand Hub", href: "/brand-hub" },
            {
              label: "Accessibility Statement",
              href: "/documents/web-accessibility-statement",
            },
          ],
        },
      ],
      socials: [
        {
          name: "Facebook",
          icon: "fa-facebook",
          link: "https://facebook.com/yorkunisu",
        },
        {
          name: "Instagram",
          icon: "fa-instagram",
          link: "https://instagram.com/yorkunisu",
        },
        {
          name: "TikTok",
          icon: "fa-tiktok",
          link: "https://tiktok.com/@yorkunisu",
        },
        { name: "X", icon: "fa-x-twitter", link: "https://x.com/yorkunisu" },
      ],
    };
  },
  methods: {},
  components: {
    FontAwesomeIcon,
  },
};
</script>
