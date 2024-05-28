<template>
  <nav class="w-full bg-beige sticky left-0 top-0">
    <div class="container mx-auto flex justify-between px-4 3xl:px-0">
      <div class="my-7">
        <img
          class="h-[77px] block sm:hidden"
          src="https://assets-cdn.sums.su/YU/IMG/Website/new_logo_cropped_beige.png"
          alt="University of York Students' Union"
        />
        <img
          class="h-[77px] hidden sm:block"
          src="https://assets-cdn.sums.su/YU/IMG/Website/new_logo_beige.png"
          alt="University of York Students' Union"
        />
      </div>
      <div class="flex flex-col my-5 justify-center">
        <div v-if="signedIn" class="mb-4 text-sm hidden lg:flex">
          <button
            id="__ba_panel"
            onclick="alert('Please disable any ad-blockers and refresh the page to use the accessibility tools.')"
            class="bg-black hover:bg-white text-white hover:text-black px-4 py-1"
            aria-label="Listen with the ReachDeck Toolbar"
            title="Listen with the ReachDeck Toolbar"
            type="button"
          >
            Accessibility Tools
          </button>
          <!-- {if logged_in} -->
          <a
            class="bg-black hover:bg-white text-white hover:text-black ml-3 px-4 py-1"
            onClick="getBearerToken()"
            >Student Dashboard</a
          >
          <a
            class="bg-black hover:bg-white text-white hover:text-black ml-3 px-4 py-1"
            href="/sign-out"
            >Sign Out</a
          >
        </div>
        <!-- {if:else} -->
        <div v-else class="mb-4 text-sm hidden lg:flex">
          <button
            class="bg-black hover:bg-white text-white hover:text-black px-4 py-1"
            aria-label="Listen with the ReachDeck Toolbar"
            title="Listen with the ReachDeck Toolbar"
            type="button"
          >
            Accessibility Tools
          </button>
          <a
            class="bg-black hover:bg-white text-white hover:text-black ml-3 px-4 py-1"
            href="/sign-in"
            >Associate Sign In</a
          >
          <a
            class="bg-black hover:bg-white text-white hover:text-black ml-3 px-4 py-1"
            href="/sign-in/sso"
            >Student Sign In</a
          >
          <!-- {/if} -->
        </div>
        <div class="flex justify-end items-center">
          <a class="hidden lg:flex" href="/search#gsc.tab=0"
            ><i class="fa-solid fa-magnifying-glass text-3xl"></i
          ></a>
          <a class="hidden lg:flex" href="/shop/basket"
            ><i class="fa-solid fa-basket-shopping text-3xl ml-6"></i
          ></a>
          <button
            class="ml-12 text-4xl"
            @click="toggleNavbar"
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
      class="absolute w-full bg-beige left-0 top-[133px] max-h-[calc(100vh-133px)] overflow-y-auto"
    >
      <div class="navbar container mx-auto hidden px-4 3xl:px-0 pb-12">
        <div v-if="icons" class="flex flex-wrap md:hidden mt-4 mb-8 gap-4">
          <a class="" href="/search#gsc.tab=0">
            <i class="fa-solid fa-magnifying-glass text-4xl"></i
          ></a>
          <a class="" href="/shop/basket">
            <i class="fa-solid fa-basket-shopping text-4xl"></i
          ></a>
          <a
            class=""
            id="__ba_panel"
            onclick="alert('Please disable any ad-blockers and refresh the page to use the accessibility tools.')"
            href="/"
          >
            <i class="fa-solid fa-universal-access text-4xl"></i>
          </a>
          <!-- {if logged_in} -->
          <a class="" onClick="getBearerToken()" href="#">
            <i class="fa-solid fa-circle-user text-4xl"></i>
          </a>
          <!-- {/if} -->
        </div>
        <div v-else class="flex md:hidden gap-6 mb-4">
          <div v-if="signedIn" class="flex flex-col justify-center gap-y-3">
            <button
              id="__ba_panel"
              onclick="alert('Please disable any ad-blockers and refresh the page to use the accessibility tools.')"
              class="bg-black hover:bg-white text-white hover:text-black px-4 py-1 text-center"
              aria-label="Listen with the ReachDeck Toolbar"
              title="Listen with the ReachDeck Toolbar"
              type="button"
            >
              Accessibility Tools
            </button>
            <!-- {if logged_in} -->
            <a
              class="bg-black hover:bg-white text-white hover:text-black px-4 py-1 text-center"
              onClick="getBearerToken()"
              >Member Dashboard</a
            >
            <a
              class="bg-black hover:bg-white text-white hover:text-black px-4 py-1 text-center"
              href="/sign-out"
              >Sign Out</a
            >
          </div>
          <!-- {if:else} -->
          <div v-else class="flex flex-col justify-center gap-y-3">
            <button
              class="bg-black hover:bg-white text-white hover:text-black px-4 py-1 text-center"
              aria-label="Listen with the ReachDeck Toolbar"
              title="Listen with the ReachDeck Toolbar"
              type="button"
            >
              Accessibility Tools
            </button>
            <a
              class="bg-black hover:bg-white text-white hover:text-black px-4 py-1 text-center"
              href="/sign-in"
              >Associate Sign In</a
            >
            <a
              class="bg-black hover:bg-white text-white hover:text-black px-4 py-1 text-center"
              href="/sign-in/sso"
              >Student Sign In</a
            >
          </div>
          <!-- {/if} -->
          <div class="flex flex-col justify-center items-center gap-4">
            <a class="" href="/search#gsc.tab=0">
              <i class="fa-solid fa-magnifying-glass text-4xl"></i
            ></a>
            <a class="" href="/shop/basket">
              <i class="fa-solid fa-basket-shopping text-4xl"></i
            ></a>
          </div>
        </div>
        <div id="mobileItems" class="flex flex-col md:hidden text-2xl">
          <button
            @click="toggleMobileItem('activities')"
            class="border-black border-b-2 pb-3 flex justify-between items-center"
          >
            <p class="font-bold">Activities</p>
            <i class="fa-solid fa-caret-right mr-2"></i>
          </button>
          <button
            @click="toggleMobileItem('voice')"
            class="border-black border-b-2 py-3 flex justify-between items-center"
          >
            <p class="font-bold">Student Voice</p>
            <i class="fa-solid fa-caret-right mr-2"></i>
          </button>
          <button
            @click="toggleMobileItem('communities')"
            class="border-black border-b-2 py-3 flex justify-between items-center text-left"
          >
            <p class="font-bold">Communities & Leaders</p>
            <i class="fa-solid fa-caret-right mr-2"></i>
          </button>
          <button
            @click="toggleMobileItem('resources')"
            class="border-black border-b-2 py-3 flex justify-between items-center"
          >
            <p class="font-bold">Resources</p>
            <i class="fa-solid fa-caret-right mr-2"></i>
          </button>
          <button
            @click="toggleMobileItem('support')"
            class="border-black border-b-2 py-3 flex justify-between items-center"
          >
            <p class="font-bold">Support</p>
            <i class="fa-solid fa-caret-right mr-2"></i>
          </button>
          <button
            @click="toggleMobileItem('about')"
            class="pt-3 flex justify-between items-center"
          >
            <p class="font-bold">About Us</p>
            <i class="fa-solid fa-caret-right mr-2"></i>
          </button>
        </div>
        <div id="activities" class="hidden">
          <button
            @click="toggleMobileItem('activities')"
            class="flex items-center"
          >
            <i class="fa-solid fa-caret-left mr-2 text-3xl"></i>
            <p class="font-bold text-4xl">Activities</p>
          </button>
          <ul class="flex flex-col gap-2 text-lg mt-5">
            <li class="border-black border-b-2 pb-3">
              <a href="/student-life/clubs-and-socs" class="hover:underline"
                >Sports A-Z</a
              >
            </li>
            <li class="border-black border-b-2 pt-1 pb-3">
              <a href="/student-life/clubs-and-socs" class="hover:underline"
                >Societies A-Z</a
              >
            </li>
            <li class="border-black border-b-2 pt-1 pb-3">
              <a href="/student-life/adopt-an-activity" class="hover:underline"
                >Adopt an Activity</a
              >
            </li>
            <li class="pt-1">
              <a href="/student-life/volunteering" class="hover:underline"
                >Volunteering & Fundraising</a
              >
            </li>
          </ul>
        </div>
        <div id="voice" class="hidden">
          <button @click="toggleMobileItem('voice')" class="flex items-center">
            <i class="fa-solid fa-caret-left mr-2 text-3xl"></i>
            <p class="font-bold text-4xl">Student Voice</p>
          </button>
          <ul class="flex flex-col gap-2 text-lg mt-5">
            <li class="border-black border-b-2 pb-3">
              <a href="/elections" class="hover:underline">Elections</a>
            </li>
            <li class="border-black border-b-2 pt-1 pb-3">
              <a href="/suggestions" class="hover:underline">Suggestions</a>
            </li>
            <li class="border-black border-b-2 pt-1 pb-3">
              <a
                href="/your-voice/campaigns-and-projects"
                class="hover:underline"
                >Campaign & Projects</a
              >
            </li>
            <li class="pt-1">
              <a href="/your-voice/research-insight" class="hover:underline"
                >Research & Insight</a
              >
            </li>
          </ul>
        </div>
        <div id="communities" class="hidden">
          <button
            @click="toggleMobileItem('communities')"
            class="flex items-center"
          >
            <i class="fa-solid fa-caret-left mr-2 text-3xl"></i>
            <p class="font-bold text-4xl">Communities & Leaders</p>
          </button>
          <ul class="flex flex-col gap-2 text-lg mt-5">
            <li class="border-black border-b-2 pb-3">
              <a href="/your-voice/academic-reps" class="hover:underline"
                >Academic Reps</a
              >
            </li>
            <li class="border-black border-b-2 pt-1 pb-3">
              <a href="/your-voice/officers" class="hover:underline"
                >Your Sabbs</a
              >
            </li>
            <li class="pt-1">
              <a href="/student-life/colleges" class="hover:underline"
                >Colleges</a
              >
            </li>
          </ul>
        </div>
        <div id="resources" class="hidden">
          <button
            @click="toggleMobileItem('resources')"
            class="flex items-center"
          >
            <i class="fa-solid fa-caret-left mr-2 text-3xl"></i>
            <p class="font-bold text-4xl">Resources</p>
          </button>
          <ul class="flex flex-col gap-2 text-lg mt-5">
            <li class="border-black border-b-2 pb-3">
              <a
                href="https://resource-hub.yusu.org"
                target="_blank"
                class="hover:underline"
                >Student Group Resource Hub</a
              >
            </li>
            <li class="pt-1">
              <a href="/events/book-event" class="hover:underline"
                >Book an Event</a
              >
            </li>
          </ul>
        </div>
        <div id="support" class="hidden">
          <button
            @click="toggleMobileItem('support')"
            class="flex items-center"
          >
            <i class="fa-solid fa-caret-left mr-2 text-3xl"></i>
            <p class="font-bold text-4xl">Support</p>
          </button>
          <ul class="flex flex-col gap-2 text-lg mt-5">
            <li class="border-black border-b-2 pb-3">
              <a href="/advice-support" class="hover:underline"
                >The Advice & Support Centre</a
              >
            </li>
            <li class="border-black border-b-2 pt-1 pb-3">
              <a href="/advice-support/support-a-z" class="hover:underline"
                >Online Support Guides</a
              >
            </li>
            <li class="border-black border-b-2 pt-1 pb-3">
              <a href="/student-life/cost-of-living" class="hover:underline"
                >Cost of Living Support</a
              >
            </li>
            <li class="pt-1">
              <a href="/advice-support/complaints" class="hover:underline"
                >Complaints</a
              >
            </li>
          </ul>
        </div>
        <div id="about" class="hidden">
          <button @click="toggleMobileItem('about')" class="flex items-center">
            <i class="fa-solid fa-caret-left mr-2 text-3xl"></i>
            <p class="font-bold text-4xl">About Us</p>
          </button>
          <ul class="flex flex-col gap-2 text-lg mt-5">
            <li class="border-black border-b-2 pb-3">
              <a href="/about-us" class="hover:underline">About YorkSU</a>
            </li>
            <li class="border-black border-b-2 pt-1 pb-3">
              <a href="/about-us/documents" class="hover:underline"
                >Policies and Documents</a
              >
            </li>
            <li class="border-black border-b-2 pt-1 pb-3">
              <a
                href="https://apply.yusu.org"
                target="_blank"
                class="hover:underline"
                >Jobs</a
              >
            </li>
            <li class="border-black border-b-2 pt-1 pb-3">
              <a href="/about-us/contact-us" class="hover:underline"
                >Contact Us</a
              >
            </li>
            <li class="border-black border-b-2 pt-1 pb-3">
              <a href="/sustainability" class="hover:underline"
                >Sustainability at YorkSU</a
              >
            </li>
          </ul>
        </div>
        <div class="hidden md:flex lg:hidden justify-end mb-8">
          <div v-if="signedIn" class="flex text-sm gap-3">
            <a class="flex items-center" href="/search#gsc.tab=0">
              <i class="fa-solid fa-magnifying-glass text-2xl"></i
            ></a>
            <a class="flex items-center" href="/shop/basket">
              <i class="fa-solid fa-basket-shopping text-2xl"></i
            ></a>
            <button
              class="bg-black hover:bg-white text-white hover:text-black px-4 py-1 flex items-center"
              aria-label="Listen with the ReachDeck Toolbar"
              title="Listen with the ReachDeck Toolbar"
              type="button"
            >
              Accessibility Tools
            </button>
            <!-- {if logged_in} -->
            <a
              class="bg-black hover:bg-white text-white hover:text-black px-4 py-1 flex items-center"
              onClick="getBearerToken()"
              >Member Dashboard</a
            >
            <a
              class="bg-black hover:bg-white text-white hover:text-black px-4 py-1 flex items-center"
              href="/sign-out"
              >Sign Out</a
            >
          </div>
          <!-- {if:else} -->
          <div v-else class="flex text-sm gap-3">
            <a class="flex items-center" href="/search#gsc.tab=0">
              <i class="fa-solid fa-magnifying-glass text-2xl"></i
            ></a>
            <a class="flex items-center" href="/shop/basket">
              <i class="fa-solid fa-basket-shopping text-2xl"></i
            ></a>
            <button
              class="bg-black hover:bg-white text-white hover:text-black px-4 py-1 flex items-center"
              aria-label="Listen with the ReachDeck Toolbar"
              title="Listen with the ReachDeck Toolbar"
              type="button"
            >
              Accessibility Tools
            </button>
            <a
              class="bg-black hover:bg-white text-white hover:text-black px-4 py-1 flex items-center"
              href="/sign-in"
              >Associate Sign In</a
            >
            <a
              class="bg-black hover:bg-white text-white hover:text-black px-4 py-1 flex items-center"
              href="/sign-in/sso"
              >Student Sign In</a
            >
          </div>
          <!-- {/if} -->
        </div>
        <div
          class="hidden md:grid md:grid-cols-3 lg:grid-cols-6 border-black border-b-2"
        >
          <div class="flex flex-col">
            <div
              class="border-black border-b-2 flex items-end pb-2 pr-10 w-full h-1/5"
            >
              <p class="font-bold">Activities</p>
            </div>
            <div class="h-4/5 pt-3 pb-7">
              <ul class="flex flex-col gap-2 text-sm">
                <li>
                  <a href="/student-life/clubs-and-socs" class="hover:underline"
                    >Sports A-Z</a
                  >
                </li>
                <li>
                  <a href="/student-life/clubs-and-socs" class="hover:underline"
                    >Societies A-Z</a
                  >
                </li>
                <li>
                  <a
                    href="/student-life/adopt-an-activity"
                    class="hover:underline"
                    >Adopt an Activity</a
                  >
                </li>
                <li>
                  <a href="/student-life/volunteering" class="hover:underline"
                    >Volunteering & Fundraising</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="flex flex-col">
            <div
              class="border-black border-b-2 flex items-end pb-2 pr-10 w-full h-1/5"
            >
              <p class="font-bold">Student Voice</p>
            </div>
            <div class="h-4/5 pt-3 pb-7">
              <ul class="flex flex-col gap-2 text-sm">
                <li>
                  <a href="/elections" class="hover:underline">Elections</a>
                </li>
                <li>
                  <a href="/suggestions" class="hover:underline">Suggestions</a>
                </li>
                <li>
                  <a
                    href="/your-voice/campaigns-and-projects"
                    class="hover:underline"
                    >Campaign & Projects</a
                  >
                </li>
                <li>
                  <a href="/your-voice/research-insight" class="hover:underline"
                    >Research & Insight</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="flex flex-col">
            <div
              class="border-black border-b-2 flex items-end pb-2 pr-10 w-full h-1/5"
            >
              <p class="font-bold">Communities & Leaders</p>
            </div>
            <div class="h-4/5 pt-3 pb-7">
              <ul class="flex flex-col gap-2 text-sm">
                <li>
                  <a href="/your-voice/academic-reps" class="hover:underline"
                    >Academic Reps</a
                  >
                </li>
                <li>
                  <a href="/your-voice/officers" class="hover:underline"
                    >Your Sabbs</a
                  >
                </li>
                <li>
                  <a href="/student-life/colleges" class="hover:underline"
                    >Colleges</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="flex flex-col">
            <div
              class="border-black border-b-2 flex items-end pb-2 pr-10 w-full h-1/5"
            >
              <p class="font-bold">Resources</p>
            </div>
            <div class="h-4/5 pt-3 pb-7">
              <ul class="flex flex-col gap-2 text-sm">
                <li>
                  <a
                    href="https://resource-hub.yusu.org"
                    target="_blank"
                    class="hover:underline"
                    >Student Group Resource Hub</a
                  >
                </li>
                <li>
                  <a href="/events/book-event" class="hover:underline"
                    >Book an Event</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="flex flex-col">
            <div
              class="border-black border-b-2 flex items-end pb-2 pr-10 w-full h-1/5"
            >
              <p class="font-bold">Support</p>
            </div>
            <div class="h-4/5 pt-3 pb-7">
              <ul class="flex flex-col gap-2 text-sm">
                <li>
                  <a href="/advice-support" class="hover:underline"
                    >The Advice & Support Centre</a
                  >
                </li>
                <li>
                  <a href="/advice-support/support-a-z" class="hover:underline"
                    >Online Support Guides</a
                  >
                </li>
                <li>
                  <a href="/student-life/cost-of-living" class="hover:underline"
                    >Cost of Living Support</a
                  >
                </li>
                <li>
                  <a href="/advice-support/complaints" class="hover:underline"
                    >Complaints</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="flex flex-col">
            <div
              class="border-black border-b-2 flex items-end pb-2 pr-10 w-full h-1/5"
            >
              <p class="font-bold">About Us</p>
            </div>
            <div class="h-4/5 pt-3 pb-7">
              <ul class="flex flex-col gap-2 text-sm">
                <li>
                  <a href="/about-us" class="hover:underline">About YorkSU</a>
                </li>
                <li>
                  <a href="/about-us/documents" class="hover:underline"
                    >Policies and Documents</a
                  >
                </li>
                <li>
                  <a
                    href="https://apply.yusu.org"
                    target="_blank"
                    class="hover:underline"
                    >Jobs</a
                  >
                </li>
                <li>
                  <a href="/about-us/contact-us" class="hover:underline"
                    >Contact Us</a
                  >
                </li>
                <li>
                  <a href="/sustainability" class="hover:underline"
                    >Sustainability at YorkSU</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap justify-between mt-9 gap-y-2">
          <div class="flex flex-wrap gap-5 mb-5 text-2xl md:text-base">
            <a
              class="bg-black hover:bg-[#f2cb50] font-bold text-white hover:text-black px-4 py-1 rounded-[60px] w-36 text-center"
              href="/events"
              >Events</a
            >
            <a
              class="bg-black hover:bg-[#f2cb50] font-bold text-white hover:text-black px-4 py-1 rounded-[60px] w-36 text-center"
              href="/venues"
              >Venues</a
            >
            <a
              class="bg-black hover:bg-[#f2cb50] font-bold text-white hover:text-black px-4 py-1 rounded-[60px] w-36 text-center"
              href="/shop"
              >Shop</a
            >
            <a
              class="bg-black hover:bg-[#f2cb50] font-bold text-white hover:text-black px-4 py-1 rounded-[60px] w-36 text-center"
              href="/news"
              >News</a
            >
          </div>
          <div class="flex gap-3">
            <a href="https://facebook.com/yorkunisu" target="_blank"
              ><i class="fa-brands fa-facebook text-2xl"></i
            ></a>
            <a href="https://instagram.com/yorkunisu" target="_blank"
              ><i class="fa-brands fa-instagram text-2xl"></i
            ></a>
            <a href="https://tiktok.com/@yorkunisu" target="_blank"
              ><i class="fa-brands fa-tiktok text-2xl"></i
            ></a>
            <a href="https://x.com/yorkunisu" target="_blank"
              ><i class="fa-brands fa-x-twitter text-2xl"></i
            ></a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <link
    rel="stylesheet"
    href="https://assets.yorksu.org/components/components.css"
  />
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
  methods: {
    toggleNavbar() {
      document.querySelector(".navbar").classList.toggle("hidden");
    },
    toggleMobileItem(item) {
      document.querySelector("#mobileItems").classList.toggle("hidden");
      document.querySelector("#" + item).classList.toggle("hidden");
    },
  },
};
</script>
