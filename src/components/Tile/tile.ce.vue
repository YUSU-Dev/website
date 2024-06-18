<template>
  <div class="mb-4 px-2 pb-2 lg:px-3 lg:pb-3">
    <div
      class="relative h-full bg-white shadow transition hover:scale-105"
      :class="{ 'animate-pulse': loading }"
    >
      <a class="group text-black no-underline" :href="url">
        <img
          v-if="image"
          class="aspect-square bg-cover bg-center object-cover"
          :src="image"
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
          :src="randomImage()"
          alt=""
          loading="lazy"
        />
        <div v-if="!loading" class="flex flex-col justify-between p-6">
          <p v-if="shopGroupName" class="text-xs font-semibold text-gray-800">
            {{ shopGroupName }}
          </p>
          <h3 v-if="title" class="mb-2 line-clamp-2 font-semibold lg:text-xl">
            {{ title }}
          </h3>
          <p v-if="date" class="font-semibold">{{ formatDate(date) }}</p>
          <p v-if="text" class="font-semibold">{{ text }}</p>
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
          <div class="flex-1 space-y-6 px-5 py-5">
            <div class="sr-only">Loading</div>
            <div class="h-2 rounded bg-slate-200"></div>
            <div class="space-y-3">
              <div class="grid grid-cols-3 gap-4">
                <div class="col-span-2 h-2 rounded bg-slate-200"></div>
                <div class="col-span-1 h-2 rounded bg-slate-200"></div>
              </div>
              <div class="h-2 rounded bg-slate-200"></div>
            </div>
          </div>
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
                  <!-- <span
                    @click="appendCategory(category.id)"
                    style="cursor: pointer"
                  > -->
                  <span>{{ category.name }}</span>
                  <!-- </span> -->
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

library.add(faTag, faArrowLeft, faArrowRight);

export default {
  components: { FontAwesomeIcon },
  props: [
    "url",
    "title",
    "image",
    "date",
    "text",
    "productId",
    "shopGroupName",
    "categories",
    "Brand",
    "appendCategory",
    "loading",
  ],
  data() {
    return {
      images: [
        "https://assets-cdn.sums.su/YU/IMG/NewBrand/500x500_Red.jpg",
        "https://assets-cdn.sums.su/YU/IMG/NewBrand/500x500_Blue.jpg",
      ],
    };
  },
  methods: {
    randomImage() {
      return this.images[Math.floor(Math.random() * this.images.length)];
    },
    formatDate(date) {
      return moment(date).format("DD MMMM YYYY");
    },
    wrapURL(URL) {
      return "'" + URL + "'";
    },
  },
};
</script>
