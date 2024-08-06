<template>
  <div class="flex-col gap-y-2 sm:gap-y-0" v-if="!loading">
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
    <a v-if="facebook" :href="facebookURL">
      <div class="flex flex-col">
        <div class="flex items-center gap-x-2">
          <FontAwesomeIcon icon="fa-brands fa-facebook" class="h-4 w-4" />
          <h3 class="mb-0 text-lg font-bold">Facebook</h3>
        </div>
        <div class="text-lg">
          <p class="">{{ facebookDisplay }}</p>
        </div>
      </div>
    </a>
    <a v-if="instagram" :href="instagramURL">
      <div class="flex flex-col">
        <div class="flex items-center gap-x-2">
          <FontAwesomeIcon icon="fa-brands fa-instagram" class="h-4 w-4" />
          <h3 class="mb-0 text-lg font-bold">Instagram</h3>
        </div>
        <div class="text-lg">
          <p class="">{{ instagramDisplay }}</p>
        </div>
      </div>
    </a>
    <a v-if="twitter" :href="twitterURL">
      <div class="flex flex-col">
        <div class="flex items-center gap-x-2">
          <FontAwesomeIcon icon="fa-brands fa-x-twitter" class="h-4 w-4" />
          <h3 class="mb-0 text-lg font-bold">X</h3>
        </div>
        <div class="text-lg">
          <p class="">{{ twitterDisplay }}</p>
        </div>
      </div>
    </a>
    <a v-if="youtube" :href="youtubeURL">
      <div class="flex flex-col">
        <div class="flex items-center gap-x-2">
          <FontAwesomeIcon icon="fa-brands fa-youtube" class="h-4 w-4" />
          <h3 class="mb-0 text-lg font-bold">Youtube</h3>
        </div>
        <div class="text-lg">
          <p class="">{{ youtubeDisplay }}</p>
        </div>
      </div>
    </a>
    <a v-if="discord" :href="discordURL">
      <div class="flex flex-col">
        <div class="flex items-center gap-x-2" v-if="!isSlack">
          <FontAwesomeIcon icon="fa-brands fa-discord" class="h-4 w-4" />
          <h3 class="mb-0 text-lg font-bold">Discord</h3>
        </div>
        <div class="flex items-center gap-x-2" v-if="isSlack">
          <FontAwesomeIcon icon="fa-brands fa-slack" class="h-4 w-4" />
          <h3 class="mb-0 text-lg font-bold">Slack</h3>
        </div>
        <div class="text-lg">
          <p class="">{{ discordDisplay }}</p>
        </div>
      </div>
    </a>
    <a v-if="tiktok" :href="tiktokURL">
      <div class="flex flex-col">
        <div class="flex items-center gap-x-2">
          <FontAwesomeIcon icon="fa-brands fa-tiktok" class="h-4 w-4" />
          <h3 class="mb-0 text-lg font-bold">Tiktok</h3>
        </div>
        <div class="text-lg">
          <p class="">{{ tiktokDisplay }}</p>
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
  faSlack,
} from "@fortawesome/free-brands-svg-icons";
library.add(
  faFacebook,
  faXTwitter,
  faInstagram,
  faYoutube,
  faDiscord,
  faTiktok,
  faEnvelope,
  faSlack,
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
    return {
      facebookDisplay: "",
      facebookURL: "",
      instagramDisplay: "",
      instagramURL: "",
      twitterDisplay: "",
      twitterURL: "",
      youtubeDisplay: "",
      youtubeURL: "",
      discordDisplay: "",
      discordURL: "",
      tiktokDisplay: "",
      tiktokURL: "",
      isSlack: false,
      loading: true,
    };
  },
  methods: {
    wrapURL(URL) {
      return "'" + URL + "'";
    },
    setContacts() {
      if (this.facebook) {
        if (this.facebook.includes("facebook.com")) {
          this.facebookDisplay = this.name;
          this.facebookURL = this.facebook;
          if (!this.facebookURL.startsWith("https://")) {
            this.facebookURL = "https://" + this.facebookURL;
          }
        } else {
          this.facebookDisplay = this.facebook;
          this.facebookURL = "https://facebook.com/" + this.facebook;
        }
      }
      if (this.instagram) {
        if (this.instagram.includes("instagram.com")) {
          this.instagramDisplay = this.name;
          this.instagramURL = this.instagram;
          if (!this.instagramURL.startsWith("https://")) {
            this.instagramURL = "https://" + this.instagramURL;
          }
        } else {
          this.instagramDisplay = this.instagram;
          this.instagramURL = "https://www.instagram.com/" + this.instagram;
        }
      }
      if (this.twitter) {
        if (
          this.twitter.includes("x.com") ||
          this.twitter.includes("twitter.com")
        ) {
          this.twitterDisplay = this.name;
          this.twitterURL = this.twitter;
          if (!this.twitterURL.startsWith("https://")) {
            this.twitterURL = "https://" + this.twitterURL;
          }
        } else {
          this.twitterDisplay = this.twitter;
          this.twitterURL = "https://www.x.com/" + this.twitter;
        }
      }
      if (this.youtube) {
        this.youtubeDisplay = this.name;
        if (this.youtube.includes("youtube.com")) {
          this.youtubeURL = this.youtube;
          if (!this.youtubeURL.startsWith("https://")) {
            this.youtubeURL = "https://" + this.youtubeURL;
          }
        } else {
          this.youtubeURL = "https://www.youtube.com/channel/" + this.youtube;
        }
      }
      if (this.discord) {
        this.discordDisplay = this.name;
        if (this.discord.includes("slack.com")) {
          this.isSlack = true;
        }
        if (this.discord.includes("discord.gg") || this.isSlack) {
          this.discordURL = this.discord;
          if (!this.discordURL.startsWith("https://")) {
            this.discordURL = "https://" + this.discordURL;
          }
        } else {
          this.discordURL = "https://www.discord.gg/" + this.discord;
        }
      }
      if (this.tiktok) {
        if (this.tiktok.includes("tiktok.com")) {
          this.tiktokDisplay = this.name;
          this.tiktokURL = this.tiktok;
          if (!this.tiktokURL.startsWith("https://")) {
            this.tiktokURL = "https://" + this.tiktokURL;
          }
        } else {
          this.tiktokDisplay = this.tiktok;
          this.tiktokURL = "https://www.tiktok.com/" + this.tiktok;
        }
      }
    },
  },
  created() {
    this.loading = true;
    this.setContacts();
    this.loading = false;
  },
};
</script>
