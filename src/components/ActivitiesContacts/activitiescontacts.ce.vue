<template>
  <a :href="'mailto:' + email">
    <div v-if="email" class="flex p-2">
      <div class="w-4/12">
        <FontAwesomeIcon icon="fa-core fa-envelope" class="h-16 w-16 p-1" />
      </div>
      <div class="w-8/12">
        <p class="text-3xl font-bold">Email</p>
        <p class="text-2xl">{{ email }}</p>
      </div>
    </div>
  </a>
  <a :href="'https://facebook.com/' + facebook">
    <div v-if="facebook" class="flex p-2">
      <div class="w-4/12">
        <FontAwesomeIcon icon="fa-brands fa-facebook" class="h-16 w-16 p-1" />
      </div>
      <div class="w-8/12">
        <p class="text-3xl font-bold">Facebook</p>
        <p class="text-2xl">{{ facebook }}</p>
      </div>
    </div>
  </a>
  <a :href="'https://www.instagram.com/' + instagram">
    <div v-if="instagram" class="flex p-2">
      <div class="w-4/12">
        <FontAwesomeIcon icon="fa-brands fa-instagram" class="h-16 w-16 p-1" />
      </div>
      <div class="w-8/12">
        <p class="text-3xl font-bold">Instagram</p>
        <p class="text-2xl">{{ instagram }}</p>
      </div>
    </div>
  </a>
  <a :href="'https://www.x.com/' + twitter">
    <div v-if="twitter" class="flex p-2">
      <div class="w-4/12">
        <FontAwesomeIcon icon="fa-brands fa-x-twitter" class="h-16 w-16 p-1" />
      </div>
      <div class="w-8/12">
        <p class="text-3xl font-bold">X</p>
        <p class="text-2xl">{{ twitter }}</p>
      </div>
    </div>
  </a>
  <a :href="'https://www.youtube.com/channel/' + youtube">
    <div v-if="youtube" class="flex p-2">
      <div class="w-4/12">
        <FontAwesomeIcon icon="fa-brands fa-youtube" class="h-16 w-16 p-1" />
      </div>
      <div class="w-8/12">
        <p class="text-3xl font-bold">Youtube</p>
        <p class="text-2xl">{{ name }}</p>
      </div>
    </div>
  </a>
  <a :href="'https://www.discord.gg/' + discord">
    <div v-if="discord" class="flex p-2">
      <div class="w-4/12">
        <FontAwesomeIcon icon="fa-brands fa-discord" class="h-16 w-16 p-1" />
      </div>
      <div class="8/12">
        <p class="text-3xl font-bold">Discord</p>
        <p class="text-2xl">{{ name }}</p>
      </div>
    </div>
  </a>
  <a :href="'https://www.tiktok.com/' + tiktok">
    <div v-if="tiktok" class="flex p-2">
      <div class="w-4/12">
        <FontAwesomeIcon icon="fa-brands fa-tiktok" class="h-16 w-16 p-1" />
      </div>
      <div class="w-8/12">
        <p class="text-3xl font-bold">Tiktok</p>
        <p class="text-2xl">{{ tiktok }}</p>
      </div>
    </div>
  </a>
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
  props: [
    "name",
    "facebook",
    "instagram",
    "twitter",
    "youtube",
    "discord",
    "tiktok",
    "email",
  ],
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
