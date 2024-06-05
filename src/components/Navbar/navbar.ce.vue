<template>
  <nav class="sticky left-0 top-0 z-[1] w-full bg-beige">
    <div class="3xl:px-0 container mx-auto flex justify-between px-4">
      <div class="my-7">
        <a href="/">
          <img
            class="block h-[77px] sm:hidden"
            src="https://assets-cdn.sums.su/YU/IMG/Website/new_logo_cropped_beige.png"
            alt="University of York Students' Union"
        /></a>
        <a href="/">
          <img
            class="hidden h-[77px] sm:block"
            src="https://assets-cdn.sums.su/YU/IMG/Website/new_logo_beige.png"
            alt="University of York Students' Union"
          />
        </a>
      </div>
      <div class="my-5 flex flex-col justify-center">
        <div v-if="signedIn" class="mb-4 hidden text-sm lg:flex">
          <button
            id="__ba_panel"
            onclick="alert('Please disable any ad-blockers and refresh the page to use the accessibility tools.')"
            class="bg-black px-4 py-1 text-white hover:bg-white hover:text-black"
            aria-label="Listen with the ReachDeck Toolbar"
            title="Listen with the ReachDeck Toolbar"
            type="button"
          >
            Accessibility Tools
          </button>
          <!-- {if logged_in} -->
          <a
            class="ml-3 bg-black px-4 py-1 text-white hover:bg-white hover:text-black"
            onClick="getBearerToken()"
            >Student Dashboard</a
          >
          <a
            class="ml-3 bg-black px-4 py-1 text-white hover:bg-white hover:text-black"
            href="/sign-out"
            >Sign Out</a
          >
        </div>
        <!-- {if:else} -->
        <div v-else class="mb-4 hidden text-sm lg:flex">
          <button
            class="bg-black px-4 py-1 text-white hover:bg-white hover:text-black"
            aria-label="Listen with the ReachDeck Toolbar"
            title="Listen with the ReachDeck Toolbar"
            type="button"
          >
            Accessibility Tools
          </button>
          <a
            class="ml-3 bg-black px-4 py-1 text-white hover:bg-white hover:text-black"
            href="/sign-in"
            >Associate Sign In</a
          >
          <a
            class="ml-3 bg-black px-4 py-1 text-white hover:bg-white hover:text-black"
            href="/sign-in/sso"
            >Student Sign In</a
          >
          <!-- {/if} -->
        </div>
        <div class="flex items-center justify-end">
          <a
            class="hidden lg:flex"
            href="/search#gsc.tab=0"
            aria-label="Search the website"
            ><i class="fa-solid fa-magnifying-glass text-3xl"></i
          ></a>
          <a
            class="hidden lg:flex"
            href="/shop/basket"
            aria-label="View your basket"
            ><i class="fa-solid fa-basket-shopping ml-6 text-3xl"></i
          ></a>
          <button
            class="ml-12 text-4xl"
            @click="navClosed = !navClosed"
            aria-label="Toggle the website navigation bar"
            title="Toggle the website navigation bar"
            type="button"
          >
            <i class="fa-sharp fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
    <div
      class="absolute left-0 top-[133px] max-h-[calc(100vh-133px)] w-full overflow-y-auto bg-beige"
    >
      <div
        :class="{ hidden: navClosed }"
        class="navbar 3xl:px-0 container mx-auto px-4 pb-12"
      >
        <div v-if="icons" class="mb-8 mt-4 flex flex-wrap gap-4 md:hidden">
          <a class="" href="/search#gsc.tab=0" aria-label="Search the website">
            <i class="fa-solid fa-magnifying-glass text-4xl"></i
          ></a>
          <a class="" href="/shop/basket" aria-label="view your basket">
            <i class="fa-solid fa-basket-shopping text-4xl"></i
          ></a>
          <a
            class=""
            id="__ba_panel"
            aria-label="Accessibility Tools"
            onclick="alert('Please disable any ad-blockers and refresh the page to use the accessibility tools.')"
            href="/"
          >
            <i class="fa-solid fa-universal-access text-4xl"></i>
          </a>
          <!-- {if logged_in} -->
          <a class="" onClick="getBearerToken()" href="#" aria-label="Login">
            <i class="fa-solid fa-circle-user text-4xl"></i>
          </a>
          <!-- {/if} -->
        </div>
        <div v-else class="mb-4 flex gap-6 md:hidden">
          <div v-if="signedIn" class="flex flex-col justify-center gap-y-3">
            <button
              id="__ba_panel"
              onclick="alert('Please disable any ad-blockers and refresh the page to use the accessibility tools.')"
              class="bg-black px-4 py-1 text-center text-white hover:bg-white hover:text-black"
              aria-label="Listen with the ReachDeck Toolbar"
              title="Listen with the ReachDeck Toolbar"
              type="button"
            >
              Accessibility Tools
            </button>
            <!-- {if logged_in} -->
            <a
              class="bg-black px-4 py-1 text-center text-white hover:bg-white hover:text-black"
              onClick="getBearerToken()"
              >Member Dashboard</a
            >
            <a
              class="bg-black px-4 py-1 text-center text-white hover:bg-white hover:text-black"
              href="/sign-out"
              >Sign Out</a
            >
          </div>
          <!-- {if:else} -->
          <div v-else class="flex flex-col justify-center gap-y-3">
            <button
              class="bg-black px-4 py-1 text-center text-white hover:bg-white hover:text-black"
              aria-label="Listen with the ReachDeck Toolbar"
              title="Listen with the ReachDeck Toolbar"
              type="button"
            >
              Accessibility Tools
            </button>
            <a
              class="bg-black px-4 py-1 text-center text-white hover:bg-white hover:text-black"
              href="/sign-in"
              >Associate Sign In</a
            >
            <a
              class="bg-black px-4 py-1 text-center text-white hover:bg-white hover:text-black"
              href="/sign-in/sso"
              >Student Sign In</a
            >
          </div>
          <!-- {/if} -->
          <div class="flex flex-col items-center justify-center gap-4">
            <a
              class=""
              href="/search#gsc.tab=0"
              aria-label="Search the website"
            >
              <i class="fa-solid fa-magnifying-glass text-4xl"></i
            ></a>
            <a class="" href="/shop/basket" aria-label="View your basket">
              <i class="fa-solid fa-basket-shopping text-4xl"></i
            ></a>
          </div>
        </div>
        <div
          id="mobileItems"
          class="flex flex-col text-2xl md:hidden"
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
            :class="`${index != menuData.sections.length - 1 && 'border-b-2 border-black'} p${index == 0 ? 'b' : index == menuData.sections.length - 1 ? 't' : 'y'}-3 flex items-center justify-between`"
          >
            <p class="font-bold">{{ section.name }}</p>
            <i class="fa-solid fa-caret-right mr-2"></i>
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
            <i class="fa-solid fa-caret-left mr-2 text-3xl"></i>
            <p class="text-4xl font-bold">{{ section.name }}</p>
          </button>
          <ul class="mt-5 flex flex-col gap-2 text-lg">
            <li
              v-for="(subheading, index) in section.links"
              :key="subheading.name"
              :class="`${index != section.links.length - 1 && 'border-b-2 border-black pb-3'} ${index != 0 && 'pt-3'}`"
            >
              <a :href="subheading.link" class="hover:underline">{{
                subheading.name
              }}</a>
            </li>
          </ul>
        </div>
        <div class="mb-8 hidden justify-end md:flex lg:hidden">
          <div v-if="signedIn" class="flex gap-3 text-sm">
            <a
              class="flex items-center"
              href="/search#gsc.tab=0"
              aria-label="Search the website"
            >
              <i class="fa-solid fa-magnifying-glass text-2xl"></i
            ></a>
            <a
              class="flex items-center"
              href="/shop/basket"
              aria-label="View your basket"
            >
              <i class="fa-solid fa-basket-shopping text-2xl"></i
            ></a>
            <button
              class="flex items-center bg-black px-4 py-1 text-white hover:bg-white hover:text-black"
              aria-label="Listen with the ReachDeck Toolbar"
              title="Listen with the ReachDeck Toolbar"
              type="button"
            >
              Accessibility Tools
            </button>
            <!-- {if logged_in} -->
            <a
              class="flex items-center bg-black px-4 py-1 text-white hover:bg-white hover:text-black"
              onClick="getBearerToken()"
              >Member Dashboard</a
            >
            <a
              class="flex items-center bg-black px-4 py-1 text-white hover:bg-white hover:text-black"
              href="/sign-out"
              >Sign Out</a
            >
          </div>
          <!-- {if:else} -->
          <div v-else class="flex gap-3 text-sm">
            <a
              class="flex items-center"
              href="/search#gsc.tab=0"
              aria-label="Search the website"
            >
              <i class="fa-solid fa-magnifying-glass text-2xl"></i
            ></a>
            <a
              class="flex items-center"
              href="/shop/basket"
              aria-label="View your basket"
            >
              <i class="fa-solid fa-basket-shopping text-2xl"></i
            ></a>
            <button
              class="flex items-center bg-black px-4 py-1 text-white hover:bg-white hover:text-black"
              aria-label="Listen with the ReachDeck Toolbar"
              title="Listen with the ReachDeck Toolbar"
              type="button"
            >
              Accessibility Tools
            </button>
            <a
              class="flex items-center bg-black px-4 py-1 text-white hover:bg-white hover:text-black"
              href="/sign-in"
              >Associate Sign In</a
            >
            <a
              class="flex items-center bg-black px-4 py-1 text-white hover:bg-white hover:text-black"
              href="/sign-in/sso"
              >Student Sign In</a
            >
          </div>
          <!-- {/if} -->
        </div>
        <div
          class="hidden border-b-2 border-black md:grid md:grid-cols-3 lg:grid-cols-6"
        >
          <div
            v-for="section in menuData.sections"
            :key="section.name"
            class="flex flex-col"
          >
            <div
              class="flex h-1/5 w-full items-end border-b-2 border-black pb-2 pr-10"
            >
              <p class="font-bold">{{ section.name }}</p>
            </div>
            <div class="h-4/5 pb-7 pt-3">
              <ul class="flex flex-col gap-2 text-sm">
                <li v-for="subheading in section.links" :key="subheading.name">
                  <a :href="subheading.link" class="hover:underline">{{
                    subheading.name
                  }}</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="mt-9 flex flex-wrap justify-between gap-y-2">
          <div class="mb-5 flex flex-wrap gap-5 text-2xl md:text-base">
            <a
              v-for="mainButton in menuData.mainButtons"
              :key="mainButton.name"
              class="w-36 rounded-[60px] bg-black px-4 py-1 text-center font-bold text-white hover:bg-[#f2cb50] hover:text-black"
              :href="mainButton.link"
              >{{ mainButton.name }}</a
            >
          </div>
          <div class="flex gap-3">
            <a
              v-for="socialPlatform in menuData.socials"
              :key="socialPlatform.name"
              :aria-label="socialPlatform.name"
              :href="socialPlatform.link"
              target="_blank"
              ><i :class="`fa-brands text-2xl ${socialPlatform.icon}`"></i
            ></a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v6.5.1/css/all.css"
    crossorigin="anonymous"
  />
</template>
<script>
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
                link: "/student-life/sport",
              },
              {
                name: "Societies A-Z",
                link: "/student-life/societies",
              },
              {
                name: "Adopt an Activity",
                link: "/student-life/adopt-an-activity",
              },
              {
                name: "Volunteering & Fundraising",
                link: "/student-life/volunteering",
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
                name: "Suggestions",
                link: "/suggestions",
              },
              {
                name: "Campaign & Projects",
                link: "/your-voice/campaigns-and-projects",
              },
              {
                name: "Research & Insight",
                link: "/your-voice/research-insight",
              },
            ],
          },
          {
            name: "Communities & Leaders",
            closed: true,
            links: [
              {
                name: "Academic Reps",
                link: "/your-voice/academic-reps",
              },
              {
                name: "Officers and Representation",
                link: "/your-voice/officers",
              },
              {
                name: "Colleges",
                link: "/student-life/colleges",
              },
            ],
          },
          {
            name: "Resources",
            closed: true,
            links: [
              {
                name: "Student Group Resource Hub",
                link: "https://resource-hub.yusu.org",
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
                name: "The Advice & Support Centre",
                link: "/advice-support",
              },
              {
                name: "Online Support Guides",
                link: "/advice-support/support-a-z",
              },
              {
                name: "Cost of Living Support",
                link: "/student-life/cost-of-living",
              },
              {
                name: "Complaints",
                link: "/advice-support/complaints",
              },
            ],
          },
          {
            name: "About Us",
            closed: true,
            links: [
              {
                name: "About YorkSU",
                link: "/about-us",
              },
              {
                name: "Policies and Documents",
                link: "/about-us/documents",
              },
              {
                name: "Jobs",
                link: "https://apply.yusu.org",
              },
              {
                name: "Contact Us",
                link: "/about-us/contact-us",
              },
              {
                name: "Sustainability at YorkSU",
                link: "/sustainability",
              },
            ],
          },
        ],
        mainButtons: [
          {
            name: "Events",
            link: "/events",
          },
          {
            name: "Venues",
            link: "/venues",
          },
          {
            name: "Shop",
            link: "/shop",
          },
          {
            name: "News",
            link: "/news",
          },
        ],
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
