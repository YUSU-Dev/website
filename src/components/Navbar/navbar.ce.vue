<template>
  <nav class="sticky left-0 top-0 z-10 w-full bg-beige shadow">
    <div class="container mx-auto flex justify-between py-0">
      <div class="my-7">
        <a href="/" aria-label="Homepage">
          <img
            class="block h-[77px] sm:hidden"
            src="https://assets-cdn.sums.su/YU/IMG/Website/new_logo_cropped_beige.png"
            alt="University of York Students' Union"
            loading="lazy"
        /></a>
        <a href="/" aria-label="Homepage">
          <img
            class="hidden h-[77px] sm:block"
            src="https://assets-cdn.sums.su/YU/IMG/Website/new_logo_beige.png"
            alt="University of York Students' Union"
            loading="lazy"
          />
        </a>
      </div>
      <div class="my-5 flex flex-col justify-center">
        <div v-if="signedIn" class="mb-4 hidden text-sm lg:flex">
          <slot name="reachdeck"></slot>
          <a
            class="ml-3 bg-black px-4 py-1 text-white hover:bg-mustard hover:text-black"
            @click="getBearerToken()"
            href="javascript:;"
            >Student Dashboard</a
          >
          <a
            class="ml-3 bg-black px-4 py-1 text-white hover:bg-mustard hover:text-black"
            href="/sign-out"
            >Sign Out</a
          >
        </div>
        <div v-else class="mb-4 hidden text-sm lg:flex">
          <slot name="reachdeck"></slot>
          <a
            class="ml-3 bg-black px-4 py-1 text-white hover:bg-mustard hover:text-black"
            href="/associate-member"
            >Associate Sign In</a
          >
          <a
            class="ml-3 bg-black px-4 py-1 text-white hover:bg-mustard hover:text-black"
            href="/sign-in/sso"
            >Student Sign In</a
          >
        </div>
        <div class="flex items-center justify-end">
          <a
            class="hidden xs:flex"
            href="/search#gsc.tab=0"
            aria-label="Search the website"
          >
            <FontAwesomeIcon
              icon="fa-solid fa-magnifying-glass"
              class="h-8 w-8"
            ></FontAwesomeIcon>
          </a>
          <a
            class="ml-7 hidden xs:flex"
            href="/shop/basket"
            aria-label="View your basket"
          >
            <FontAwesomeIcon
              icon="fa-solid fa-basket-shopping"
              class="h-8 w-8"
            ></FontAwesomeIcon>
          </a>
          <button
            class="ml-12 text-4xl"
            @click="navClosed = !navClosed"
            aria-label="Toggle the website navigation bar"
            title="Toggle the website navigation bar"
            type="button"
          >
            <FontAwesomeIcon
              icon="fa-solid fa-bars"
              class="h-8 w-8"
            ></FontAwesomeIcon>
          </button>
        </div>
      </div>
    </div>
    <div
      :class="{ hidden: navClosed }"
      class="max-h-[calc(100vh-133px)] overflow-y-auto bg-[#f5f5f5]"
    >
      <div
        class="container mx-auto flex flex-col py-0 pb-8 pt-6 lg:grid lg:grid-cols-5"
      >
        <div class="order-2 lg:order-1 lg:col-span-4">
          <div
            v-if="signedIn"
            class="mb-10 flex flex-col justify-center gap-y-3 lg:hidden"
          >
            <slot name="reachdeck-mobile"></slot>
            <a
              class="bg-black px-4 py-1 text-center text-white hover:bg-mustard hover:text-black"
              @click="getBearerToken()"
              href="javascript:;"
              >Member Dashboard</a
            >
            <a
              class="bg-black px-4 py-1 text-center text-white hover:bg-mustard hover:text-black"
              href="/sign-out"
              >Sign Out</a
            >
          </div>
          <div
            v-else
            class="mb-8 flex flex-col flex-wrap gap-x-3 gap-y-3 xs:flex-row lg:hidden"
          >
            <slot name="reachdeck-mobile"></slot>
            <a
              class="bg-black px-4 py-1 text-center text-white hover:bg-mustard hover:text-black"
              href="/associate-member"
              >Associate Sign In</a
            >
            <a
              class="bg-black px-4 py-1 text-center text-white hover:bg-mustard hover:text-black"
              href="/sign-in/sso"
              >Student Sign In</a
            >
          </div>

          <!-- Mobile Nav -->
          <div
            id="mobileItems"
            class="mt-6 flex flex-col text-xl sm:hidden"
            :class="{
              hidden: menuData.sections
                .map((section) => section.closed)
                .some((closed) => !closed),
            }"
          >
            <button
              v-for="(section, index) in menuData.sections"
              :key="section.name"
              @click="section.closed = !section.closed"
              :class="`${index != menuData.sections.length - 1 && 'border-b border-black'} p${index == 0 ? 'b' : index == menuData.sections.length - 1 ? 't' : 'y'}-3 flex items-center justify-between`"
            >
              <p class="text-start font-bold">{{ section.name }}</p>
              <FontAwesomeIcon
                icon="fa-solid fa-caret-right"
                class="h-8 w-8"
              ></FontAwesomeIcon>
            </button>
          </div>
          <div
            v-for="section in menuData.sections"
            :key="section.name"
            :id="section.name"
            :class="{ hidden: section.closed }"
          >
            <button
              @click="section.closed = !section.closed"
              class="flex items-center"
            >
              <FontAwesomeIcon
                icon="fa-solid fa-caret-left"
                class="h-8 w-8"
              ></FontAwesomeIcon>
              <p class="text-start text-xl font-bold">{{ section.name }}</p>
            </button>
            <ul class="mt-5 flex flex-col gap-2 text-lg">
              <li
                v-for="(subheading, index) in section.links"
                :key="subheading.name"
                :class="`${index != section.links.length - 1 && 'border-b border-black pb-3'} ${index != 0 && 'pt-3'}`"
              >
                <a
                  :href="subheading.link"
                  class="hover:underline"
                  :target="subheading.target ?? '_self'"
                  >{{ subheading.name }}</a
                >
              </li>
            </ul>
          </div>

          <!-- Desktop Nav -->
          <div class="hidden grid-cols-2 gap-x-8 sm:grid md:grid-cols-3">
            <div
              v-for="section in menuData.sections"
              :key="section.name"
              class="nav-section flex flex-col pb-6"
            >
              <div class="flex w-full items-end pb-2 pr-10">
                <p class="text-start font-bold">{{ section.name }}</p>
              </div>
              <div class="pb-7 pt-3">
                <ul class="flex flex-col gap-2 text-sm">
                  <li
                    v-for="subheading in section.links"
                    :key="subheading.name"
                  >
                    <a
                      :href="subheading.link"
                      class="hover:underline"
                      :target="subheading.target ?? '_self'"
                      >{{ subheading.name }}</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div
          class="order-1 flex flex-col justify-between lg:order-2 lg:col-span-1 lg:pl-12"
        >
          <div
            class="mb-6 grid w-full grid-cols-2 justify-center gap-y-4 xs:flex xs:justify-between lg:mb-0 lg:flex-col lg:gap-y-8"
          >
            <a
              class="flex gap-x-2 border-r border-black text-start text-lg font-bold hover:underline xs:hidden xs:border-none sm:gap-x-6"
              href="/search#gsc.tab=0"
            >
              <FontAwesomeIcon
                icon="fa-solid fa-magnifying-glass"
                class="h-6 w-6"
              ></FontAwesomeIcon>
              Search
            </a>
            <a
              class="flex justify-end gap-x-2 text-start text-lg font-bold hover:underline xs:hidden xs:justify-start sm:gap-x-6"
              href="/shop/basket"
            >
              <FontAwesomeIcon
                icon="fa-solid fa-basket-shopping"
                class="h-6 w-6"
              ></FontAwesomeIcon>
              Basket
            </a>
            <a
              class="flex gap-x-2 border-r border-black text-start text-lg font-bold hover:underline xs:border-none sm:gap-x-6"
              href="/events"
            >
              <FontAwesomeIcon
                icon="fa-solid fa-calendar"
                class="h-6 w-6"
              ></FontAwesomeIcon>
              Events
            </a>
            <div
              class="hidden h-8 border-r border-black xs:block lg:hidden"
            ></div>
            <a
              class="flex justify-end gap-x-2 text-start text-lg font-bold hover:underline xs:justify-start sm:gap-x-6"
              href="/news"
            >
              <FontAwesomeIcon
                icon="fa-solid fa-book"
                class="h-6 w-6"
              ></FontAwesomeIcon>
              News
            </a>
            <div
              class="hidden h-8 border-r border-black xs:block lg:hidden"
            ></div>
            <a
              class="flex gap-x-2 border-r border-black text-start text-lg font-bold hover:underline xs:border-none sm:gap-x-6"
              href="/venues"
            >
              <FontAwesomeIcon
                icon="fa-solid fa-mug-saucer"
                class="h-6 w-6"
              ></FontAwesomeIcon>
              Venues
            </a>
            <div
              class="hidden h-8 border-r border-black xs:block lg:hidden"
            ></div>
            <a
              class="flex justify-end gap-x-2 text-start text-lg font-bold hover:underline xs:justify-start sm:gap-x-6"
              href="/shop?category=8"
            >
              <FontAwesomeIcon
                icon="fa-solid fa-cart-shopping"
                class="h-6 w-6"
              ></FontAwesomeIcon>
              Shop
            </a>
          </div>
          <div class="hidden gap-3 pb-8 lg:flex">
            <a
              v-for="socialPlatform in menuData.socials"
              :key="socialPlatform.name"
              :aria-label="socialPlatform.name"
              :href="socialPlatform.link"
              target="_blank"
            >
              <FontAwesomeIcon
                :icon="`fa-brands ${socialPlatform.icon}`"
                class="h-6 w-6"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faBasketShopping,
  faBars,
  faCaretRight,
  faCaretLeft,
  faUniversalAccess,
  faCircleUser,
  faCalendar,
  faBook,
  faMugSaucer,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { getBearerToken } from "../Navbar/bearer.js";

library.add(
  faFacebook,
  faInstagram,
  faTiktok,
  faXTwitter,
  faMagnifyingGlass,
  faBasketShopping,
  faBars,
  faCaretLeft,
  faCaretRight,
  faUniversalAccess,
  faCircleUser,
  faCalendar,
  faBook,
  faMugSaucer,
  faCartShopping,
);

export default {
  name: "Navbar",
  props: {
    signedIn: {
      type: Boolean,
      default: false,
    },
    icons: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    FontAwesomeIcon,
  },
  methods: {
    getBearerToken,
  },
  data() {
    return {
      navClosed: true,
      activitiesClosed: true,
      voiceClosed: true,
      communitiesClosed: true,
      resourcesClosed: true,
      supportClosed: true,
      aboutClosed: true,
      menuData: {
        sections: [
          {
            name: "Activities",
            closed: true,
            links: [
              {
                name: "Sports A-Z",
                link: "/sport",
              },
              {
                name: "Societies A-Z",
                link: "/societies",
              },
              {
                name: "Adopt an Activity",
                link: "/adopt-an-activity",
              },
              {
                name: "Volunteering & Fundraising",
                link: "/volunteering",
              },
              {
                name: "Activity Wishlist",
                link: "/wishlist",
              },
            ],
          },
          {
            name: "Student Voice",
            closed: true,
            links: [
              {
                name: "Elections",
                link: "/elections",
              },
              {
                name: "Big Ideas",
                link: "/suggestions",
              },
              {
                name: "Campaign & Projects",
                link: "/campaigns",
              },
              {
                name: "Research & Insight",
                link: "/research-insight",
              },
            ],
          },
          {
            name: "Communities & Leaders",
            closed: true,
            links: [
              {
                name: "Academic Reps",
                link: "/academic-reps",
              },
              {
                name: "Officers and Representation",
                link: "/officers",
              },
              {
                name: "Colleges",
                link: "/colleges",
              },
              {
                name: "Networks",
                link: "/networks",
              },
            ],
          },
          {
            name: "Resources",
            closed: true,
            links: [
              {
                name: "Student Group Resource Hub",
                link: "https://resource-hub.yorksu.org",
                target: "_blank",
              },
              {
                name: "Book an Event",
                link: "/events/book-event",
              },
            ],
          },
          {
            name: "Support",
            closed: true,
            links: [
              {
                name: "York SU Advice & Support",
                link: "/advice-support",
              },
              {
                name: "Support A-Z",
                link: "/advice-support/support-a-z",
              },
              {
                name: "Cost of Living Support",
                link: "/cost-of-living",
              },
              {
                name: "Activities Access Grants",
                link: "/activities-access-grants",
              },
              {
                name: "Complaints",
                link: "/complaints",
              },
            ],
          },
          {
            name: "About Us",
            closed: true,
            links: [
              {
                name: "About York SU",
                link: "/about-us",
              },
              {
                name: "Policies and Documents",
                link: "/documents",
              },
              {
                name: "Jobs",
                link: "https://apply.yorksu.org",
                target: "_blank",
              },
              {
                name: "Contact Us",
                link: "/contact-us",
              },
              {
                name: "Sustainability at York SU",
                link: "/sustainability",
              },
            ],
          },
        ],
        // mainButtons: [
        //   {
        //     name: "Events",
        //     link: "/events",
        //   },
        //   {
        //     name: "Venues",
        //     link: "/venues",
        //   },
        //   {
        //     name: "Shop",
        //     link: "/shop?category=8",
        //   },
        //   {
        //     name: "News",
        //     link: "/news",
        //   },
        // ],
        socials: [
          {
            name: "Facebook",
            link: "https://facebook.com/yorkunisu",
            icon: "fa-facebook",
          },
          {
            name: "Instagram",
            link: "https://instagram.com/yorkunisu",
            icon: "fa-instagram",
          },
          {
            name: "TikTok",
            link: "https://tiktok.com/@yorkunisu",
            icon: "fa-tiktok",
          },
          {
            name: "Twitter",
            link: "https://x.com/yorkunisu",
            icon: "fa-x-twitter",
          },
        ],
      },
    };
  },
};
</script>
