<template>
  <div class="tile mb-4 flex justify-center pb-2 lg:pb-3">
    <div
      class="relative h-full w-full bg-white shadow transition md:max-w-[282px]"
      :class="{ 'animate-pulse': loading, 'hover:scale-105': !wishlist }"
    >
      <a class="group flex h-full flex-col text-black no-underline" :href="url">
        <div class="relative flex aspect-square items-center justify-center">
          <img
            v-if="image"
            class="aspect-square bg-cover bg-center object-cover"
            :src="image"
            alt=""
            loading="lazy"
          />
          <img
            v-else-if="group && group.thumbnail_url"
            class="aspect-square bg-cover bg-center object-cover"
            :src="group.thumbnail_url"
            alt=""
            loading="lazy"
          />
          <div
            v-else-if="loading"
            class="aspect-square bg-slate-200 bg-cover bg-center"
          ></div>
          <img
            v-else
            class="aspect-square bg-cover bg-center"
            :src="randomImage(section)"
            alt=""
            loading="lazy"
          />
          <div v-if="wishlist" class="absolute right-2 top-2">
            <InterestButton :activity-id="id" is-heart />
          </div>
        </div>
        <div v-if="!loading" class="flex h-full flex-col justify-between p-6">
          <div class="flex flex-col">
            <p v-if="premiumEvent" class="text-xs font-semibold text-gray-800">
              York SU Featured Event
            </p>

            <p v-if="shopGroupName" class="text-xs font-semibold text-gray-800">
              {{ shopGroupName }}
            </p>
            <p
              v-if="group && group.name"
              class="text-sm font-semibold text-gray-800"
            >
              {{ group.name }}
            </p>
            <h3 v-if="title" class="mb-2 line-clamp-3 font-semibold lg:text-lg">
              {{ title }}
            </h3>
          </div>
          <p v-if="text" class="font-semibold">{{ text }}</p>
          <div class="flex flex-col gap-y-1">
            <p v-if="location" class="text-sm font-semibold text-gray-800">
              {{ location.name }}
            </p>
            <div class="flex flex-wrap gap-x-2">
              <p v-if="date" class="text-sm font-semibold">
                {{ formatDate(date) }}
              </p>
              <p
                v-if="date && startTime && !news"
                class="text-sm font-semibold"
              >
                {{ startTime }}
              </p>
            </div>
          </div>
          <div v-if="!date && !text">
            <p class="flex items-center font-semibold">
              Discover
              <FontAwesomeIcon
                icon="fas fa-arrow-right"
                class="ml-2 h-4 w-4 transition group-hover:translate-x-4"
              />
            </p>
          </div>
        </div>
        <div v-else class="h-[136px]">
          <Loading :loading="loading" text></Loading>
        </div>
      </a>

      <div v-if="categories">
        <div
          v-if="categories.length"
          class="group absolute top-2.5 ml-2 mr-3 flex max-h-[232.33px] max-w-full flex-col overflow-y-auto rounded bg-[#40454d]"
        >
          <div class="flex items-center">
            <FontAwesomeIcon icon="fas fa-tag" class="h-8 w-8 p-2 text-white" />
            <p class="m-0 flex items-center pr-2 text-white">
              {{ categories.length }}
            </p>
          </div>
          <div class="hidden group-hover:flex">
            <div class="pb-4 pl-1 pr-5 text-white">
              <ul class="mb-0 list-none ps-[10px]">
                <li v-for="category in categories" :key="category.id">
                  <a :href="categoryLink + '=' + category.id"
                    ><span>{{ category.name }}</span></a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "https://cdn.jsdelivr.net/npm/moment@2.30.1/+esm";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faArrowRight,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { randomImageUrl } from "../../_common/randomImage.mjs";
import Loading from "../loading/loading.ce.vue";
import InterestButton from "../interest-button/interest-button.ce.vue";

library.add(faTag, faArrowLeft, faArrowRight);

export default {
  components: { FontAwesomeIcon, Loading, InterestButton },
  props: {
    id: {
      type: Number,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    groupimage: {
      type: String,
      default: null,
    },
    date: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
    group: {
      type: Object,
      default: null,
    },
    productId: {
      type: Number,
      default: null,
    },
    shopGroupName: {
      type: String,
      default: null,
    },
    categories: {
      type: String,
      default: null,
    },
    categoryLink: {
      type: String,
      default: "/news?categories",
    },
    brand: {
      type: String,
      default: null,
    },
    section: {
      type: String,
      default: "primary",
    },
    appendCategory: {
      type: String,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    news: {
      type: Boolean,
      default: false,
    },
    premiumEvent: {
      type: Boolean,
      default: false,
    },
    wishlist: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    randomImage(section) {
      return randomImageUrl(section);
    },
    formatDate(date) {
      return moment(date).format("DD MMMM YYYY");
    },
    wrapURL(URL) {
      return "'" + URL + "'";
    },
  },
  computed: {
    startTime() {
      return moment(String(this.date)).format("hh:mm a");
    },
  },
};
</script>
