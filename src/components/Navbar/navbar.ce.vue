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
            class="bg-black hover:bg-white text-white hover:text-black px-4 py-1"
            aria-label="Listen with the ReachDeck Toolbar"
            title="Listen with the ReachDeck Toolbar"
            type="button"
          >
            Accessibility Tools
          </button>
          <a
            class="bg-black hover:bg-white text-white hover:text-black ml-3 px-4 py-1"
            >Member Dashboard</a
          >
          <a
            class="bg-black hover:bg-white text-white hover:text-black ml-3 px-4 py-1"
            >My Account</a
          >
        </div>
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
            >Associate Sign In</a
          >
          <a
            class="bg-black hover:bg-white text-white hover:text-black ml-3 px-4 py-1"
            >Student Sign In</a
          >
        </div>
        <div class="flex justify-end items-center">
          <a class="hidden lg:flex" href="https://yusu.org/search#gsc.tab=0"
            ><i class="fa-solid fa-magnifying-glass text-3xl"></i
          ></a>
          <a class="hidden lg:flex" href="https://yusu.org/shop/basket"
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
          <a class="" href="https://yusu.org/search#gsc.tab=0">
            <i class="fa-solid fa-magnifying-glass text-4xl"></i
          ></a>
          <a class="" href="https://yusu.org/shop/basket">
            <i class="fa-solid fa-basket-shopping text-4xl"></i
          ></a>
          <a class="" href="/">
            <i class="fa-solid fa-universal-access text-4xl"></i>
          </a>
          <a class="" href="/">
            <i class="fa-solid fa-circle-user text-4xl"></i>
          </a>
        </div>
        <div v-else class="flex md:hidden gap-6 mb-4">
          <div v-if="signedIn" class="flex flex-col justify-center gap-y-3">
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
              >Member Dashboard</a
            >
            <a
              class="bg-black hover:bg-white text-white hover:text-black px-4 py-1 text-center"
              >My Account</a
            >
          </div>
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
              >Associate Sign In</a
            >
            <a
              class="bg-black hover:bg-white text-white hover:text-black px-4 py-1 text-center"
              >Student Sign In</a
            >
          </div>
          <div class="flex flex-col justify-center items-center gap-4">
            <a class="" href="https://yusu.org/search#gsc.tab=0">
              <i class="fa-solid fa-magnifying-glass text-4xl"></i
            ></a>
            <a class="" href="https://yusu.org/shop/basket">
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
              <a href="/" class="hover:underline">Sports A-Z</a>
            </li>
            <li class="border-black border-b-2 pt-1 pb-3">
              <a href="/" class="hover:underline">Societies A-Z</a>
            </li>
            <li class="border-black border-b-2 pt-1 pb-3">
              <a href="/" class="hover:underline">Adopt an Activity</a>
            </li>
            <li class="pt-1">
              <a href="/" class="hover:underline">Volunteering & Fundraising</a>
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
              <a href="/" class="hover:underline">Elections</a>
            </li>
            <li class="border-black border-b-2 pt-1 pb-3">
              <a href="/" class="hover:underline">Suggestions</a>
            </li>
            <li class="pt-1">
              <a href="/" class="hover:underline">Campaign & Projects</a>
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
              <a href="/" class="hover:underline">Academic Reps</a>
            </li>
            <li class="border-black border-b-2 pt-1 pb-3">
              <a href="/" class="hover:underline">Your Sabbs</a>
            </li>
            <li class="border-black border-b-2 pt-1 pb-3">
              <a href="/" class="hover:underline">Liberation Networks</a>
            </li>
            <li class="pt-1">
              <a href="/" class="hover:underline">Colleges</a>
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
              <a href="/" class="hover:underline">Student Group Resource Hub</a>
            </li>
            <li class="pt-1">
              <a href="/" class="hover:underline">Book an Event</a>
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
              <a href="/" class="hover:underline"
                >The Advice & Support Centre</a
              >
            </li>
            <li class="border-black border-b-2 pt-1 pb-3">
              <a href="/" class="hover:underline">Online Support Guides</a>
            </li>
            <li class="pt-1">
              <a href="/" class="hover:underline">Cost of Living Support</a>
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
              <a href="/" class="hover:underline">About YorkSU</a>
            </li>
            <li class="border-black border-b-2 pt-1 pb-3">
              <a href="/" class="hover:underline">Jobs</a>
            </li>
            <li class="border-black border-b-2 pt-1 pb-3">
              <a href="/" class="hover:underline">Contact Us</a>
            </li>
            <li class="border-black border-b-2 pt-1 pb-3">
              <a href="/" class="hover:underline">Sustainability Hub</a>
            </li>
            <li class="pt-1">
              <a href="/" class="hover:underline">Research & Insight</a>
            </li>
          </ul>
        </div>
        <div class="hidden md:flex lg:hidden justify-end mb-8">
          <div v-if="signedIn" class="flex text-sm gap-3">
            <a
              class="flex items-center"
              href="https://yusu.org/search#gsc.tab=0"
            >
              <i class="fa-solid fa-magnifying-glass text-2xl"></i
            ></a>
            <a class="flex items-center" href="https://yusu.org/shop/basket">
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
              >Member Dashboard</a
            >
            <a
              class="bg-black hover:bg-white text-white hover:text-black px-4 py-1 flex items-center"
              >My Account</a
            >
          </div>
          <div v-else class="flex text-sm gap-3">
            <a
              class="flex items-center"
              href="https://yusu.org/search#gsc.tab=0"
            >
              <i class="fa-solid fa-magnifying-glass text-2xl"></i
            ></a>
            <a class="flex items-center" href="https://yusu.org/shop/basket">
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
              >Associate Sign In</a
            >
            <a
              class="bg-black hover:bg-white text-white hover:text-black px-4 py-1 flex items-center"
              >Student Sign In</a
            >
          </div>
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
                <li><a href="/" class="hover:underline">Sports A-Z</a></li>
                <li><a href="/" class="hover:underline">Societies A-Z</a></li>
                <li>
                  <a href="/" class="hover:underline">Adopt an Activity</a>
                </li>
                <li>
                  <a href="/" class="hover:underline"
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
                <li><a href="/" class="hover:underline">Elections</a></li>
                <li><a href="/" class="hover:underline">Suggestions</a></li>
                <li>
                  <a href="/" class="hover:underline">Campaign & Projects</a>
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
                <li><a href="/" class="hover:underline">Academic Reps</a></li>
                <li><a href="/" class="hover:underline">Your Sabbs</a></li>
                <li>
                  <a href="/" class="hover:underline">Liberation Networks</a>
                </li>
                <li><a href="/" class="hover:underline">Colleges</a></li>
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
                  <a href="/" class="hover:underline"
                    >Student Group Resource Hub</a
                  >
                </li>
                <li><a href="/" class="hover:underline">Book an Event</a></li>
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
                  <a href="/" class="hover:underline"
                    >The Advice & Support Centre</a
                  >
                </li>
                <li>
                  <a href="/" class="hover:underline">Online Support Guides</a>
                </li>
                <li>
                  <a href="/" class="hover:underline">Cost of Living Support</a>
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
                <li><a href="/" class="hover:underline">About YorkSU</a></li>
                <li><a href="/" class="hover:underline">Accountability</a></li>
                <li><a href="/" class="hover:underline">Jobs</a></li>
                <li><a href="/" class="hover:underline">Contact Us</a></li>
                <li>
                  <a href="/" class="hover:underline">Sustainability Hub</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap justify-between mt-9 gap-y-2">
          <div class="flex flex-wrap gap-5 mb-5 text-2xl md:text-base">
            <a
              class="bg-black hover:bg-[#f2cb50] font-bold text-white hover:text-black px-4 py-1 rounded-[60px] w-36 text-center"
              >Events</a
            >
            <a
              class="bg-black hover:bg-[#f2cb50] font-bold text-white hover:text-black px-4 py-1 rounded-[60px] w-36 text-center"
              >Venues</a
            >
            <a
              class="bg-black hover:bg-[#f2cb50] font-bold text-white hover:text-black px-4 py-1 rounded-[60px] w-36 text-center"
              >Shop</a
            >
            <a
              class="bg-black hover:bg-[#f2cb50] font-bold text-white hover:text-black px-4 py-1 rounded-[60px] w-36 text-center"
              >News</a
            >
          </div>
          <div class="flex gap-3">
            <a><i class="fa-brands fa-facebook text-2xl"></i></a>
            <a><i class="fa-brands fa-instagram text-2xl"></i></a>
            <a><i class="fa-brands fa-tiktok text-2xl"></i></a>
            <a><i class="fa-brands fa-x-twitter text-2xl"></i></a>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <link rel="stylesheet" href="../../main.css" />
</template>
<style src="../../main.css"></style>
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
