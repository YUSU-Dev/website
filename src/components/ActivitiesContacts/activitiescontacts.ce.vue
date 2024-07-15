<template>
  <div class="grid grid-cols-3 gap-y-2 sm:flex sm:flex-col sm:gap-y-0">
    <a v-if="email" :href="'mailto:' + email">
      <div class="flex flex-col">
        <div class="flex items-center gap-x-2">
          <FontAwesomeIcon icon="fa-core fa-envelope" class="h-4 w-4" />
          <h3 class="mb-0 text-lg font-bold">Email</h3>
        </div>
        <div class="text-lg">
          <p class="">{{ email }}</p>
        </div>
      </div>
    </a>
    <a v-if="facebook" :href="'https://facebook.com/' + facebook">
      <div class="flex flex-col">
        <div class="flex items-center gap-x-2">
          <FontAwesomeIcon icon="fa-brands fa-facebook" class="h-4 w-4" />
          <h3 class="mb-0 text-lg font-bold">Facebook</h3>
        </div>
        <div class="text-lg">
          <p class="">{{ facebook }}</p>
        </div>
      </div>
    </a>
    <a v-if="instagram" :href="'https://www.instagram.com/' + instagram">
      <div class="flex flex-col">
        <div class="flex items-center gap-x-2">
          <FontAwesomeIcon icon="fa-brands fa-instagram" class="h-4 w-4" />
          <h3 class="mb-0 text-lg font-bold">Instagram</h3>
        </div>
        <div class="text-lg">
          <p class="">{{ instagram }}</p>
        </div>
      </div>
    </a>
    <a v-if="twitter" :href="'https://www.x.com/' + twitter">
      <div class="flex flex-col">
        <div class="flex items-center gap-x-2">
          <FontAwesomeIcon icon="fa-brands fa-x-twitter" class="h-4 w-4" />
          <h3 class="mb-0 text-lg font-bold">X</h3>
        </div>
        <div class="text-lg">
          <p class="">{{ twitter }}</p>
        </div>
      </div>
    </a>
    <a v-if="youtube" :href="'https://www.youtube.com/channel/' + youtube">
      <div class="flex flex-col">
        <div class="flex items-center gap-x-2">
          <FontAwesomeIcon icon="fa-brands fa-youtube" class="h-4 w-4" />
          <h3 class="mb-0 text-lg font-bold">Youtube</h3>
        </div>
        <div class="text-lg">
          <p class="">{{ name }}</p>
        </div>
      </div>
    </a>
    <a v-if="discord" :href="'https://www.discord.gg/' + discord">
      <div class="flex flex-col">
        <div class="flex items-center gap-x-2">
          <FontAwesomeIcon icon="fa-brands fa-discord" class="h-4 w-4" />
          <h3 class="mb-0 text-lg font-bold">Discord</h3>
        </div>
        <div class="text-lg">
          <p class="">{{ name }}</p>
        </div>
      </div>
    </a>
    <a v-if="tiktok" :href="'https://www.tiktok.com/' + tiktok">
      <div class="flex flex-col">
        <div class="flex items-center gap-x-2">
          <FontAwesomeIcon icon="fa-brands fa-tiktok" class="h-4 w-4" />
          <h3 class="mb-0 text-lg font-bold">Tiktok</h3>
        </div>
        <div class="text-lg">
          <p class="">{{ tiktok }}</p>
        </div>
      </div>
    </a>
  </div>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
  faYoutube,
  faDiscord,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
library.add(
  faFacebook,
  faXTwitter,
  faInstagram,
  faYoutube,
  faDiscord,
  faTiktok,
  faEnvelope,
);
export default {
  props: {
    name: {
      type: String,
      default: null,
    },
    facebook: {
      type: String,
      default: null,
    },
    instagram: {
      type: String,
      default: null,
    },
    twitter: {
      type: String,
      default: null,
    },
    youtube: {
      type: String,
      default: null,
    },
    discord: {
      type: String,
      default: null,
    },
    tiktok: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
  },
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {};
  },
  methods: {
    wrapURL(URL) {
      return "'" + URL + "'";
    },
  },
};
</script>
