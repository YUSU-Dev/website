<template>
  <div class="mb-4 px-2 pb-2 lg:px-3 lg:pb-3">
    <div class="relative h-full shadow transition hover:scale-105">
      <a class="group text-black no-underline" :href="url">
        <img
          v-if="image"
          class="aspect-square bg-cover bg-center object-cover"
          :src="image"
          alt=""
          loading="lazy"
        />
        <img
          v-else
          class="aspect-square bg-cover bg-center"
          :src="randomImage()"
          alt=""
          loading="lazy"
        />
        <div class="flex h-[136px] flex-col justify-between p-6">
          <h3 class="mb-2 line-clamp-2 text-xl font-semibold">{{ title }}</h3>
          <p v-if="date" class="font-semibold">{{ formatDate(date) }}</p>
          <p v-if="shopGroupName" class="font-semibold">{{ shopGroupName }}</p>
          <p v-if="text" class="font-semibold">{{ text }}</p>
          <div v-if="!date && !text">
            <p class="font-semibold">
              Discover
              <i
                class="fa-solid fa-arrow-right ml-2 transition group-hover:translate-x-4"
              ></i>
            </p>
          </div>
          <div v-if="productId">
            <a class="btn btn-secondary mt-2" href="#">
              <span class="font-semibold" @click="addToBasket(productId)">
                Add to basket
              </span>
            </a>
          </div>
        </div>
      </a>

      <div v-if="categories">
        <div
          v-if="categories.length"
          class="group absolute top-2.5 ml-2 mr-3 flex max-h-[232.33px] max-w-full flex-col overflow-y-auto rounded bg-[#40454d]"
        >
          <div class="flex">
            <i class="fa-solid fa-tag p-2 text-white"></i>
            <p class="m-0 flex items-center pr-2 text-white">
              {{ categories.length }}
            </p>
          </div>
          <div class="hidden group-hover:flex">
            <div class="pb-4 pl-1 pr-5 text-white">
              <ul class="mb-0 list-none ps-[10px]">
                <li v-for="category in categories" :key="category.id">
                  <span
                    @click="appendCategory(category.id)"
                    style="cursor: pointer"
                  >
                    &#x2022; <span class="underline">{{ category.name }}</span>
                  </span>
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
export default {
  props: [
    "url",
    "title",
    "image",
    "date",
    "text",
    "addToBasket",
    "productId",
    "shopGroupName",
    "categories",
    "Brand",
    "appendCategory",
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
