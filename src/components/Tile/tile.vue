<template>
    <div class="mb-4 px-2 lg:px-3 pb-2 lg:pb-3">
          <div class="transition hover:scale-105 relative shadow h-full">
            <a class="group" :href="'/news/item/' + url">
              <div v-if="image" class="aspect-square bg-cover bg-center"
                :style="{ 'background-image': 'url(' + image + ')' }">
              </div>
              <div v-else class="aspect-square bg-cover bg-center" :style="{ 'background-image': randomImage() }">
              </div>
              <div class="p-6 h-[136px] flex flex-col justify-between">
                <h3 class="text-xl mb-2 font-semibold line-clamp-2">{{ title }}</h3>
                <p v-if="date" class="font-semibold">{{ formatDate(date) }}</p>
                <p v-if="text" class="font-semibold">{{ text }}</p>
                <div v-if="!date && !text">
                  <p class="font-semibold">Discover <i class="fa-solid fa-arrow-right ml-2 group-hover:translate-x-4 transition"></i></p>
                </div>
              </div>
            </a>
            <div v-if="categories"
              class="rounded flex flex-col absolute bg-[#40454d] top-2.5 ml-2 mr-3 max-w-full max-h-[232.33px] overflow-y-auto group">
              <div class="flex">
                <i class="fa-solid fa-tag p-2 text-white"></i>
                <p class="m-0 pr-2 flex items-center text-white">{{ categories.length }}</p>
              </div>
              <div class="hidden group-hover:flex">
                <div class="pl-1 pr-5 pb-4 text-white">
                  <ul class="ps-[10px] mb-0 list-none">
                    <li v-for="category in categories" :key="category.id">
                      <span @click="appendCategory(category.id)" style="cursor: pointer">
                        &#x2022; <span class="underline">{{ category.name }}</span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>

          </div>
        </div>
</template>
<script>
export default {
  props: ["url", "title", "image", "date", "text", "categories", "Brand"],
  data() {
    return {
      images: ['https://assets-cdn.sums.su/YU/IMG/NewBrand/500x500_Red.jpg', 'https://assets-cdn.sums.su/YU/IMG/NewBrand/500x500_Blue.jpg'],
      studentLifeImages: ['https://assets-cdn.sums.su/YU/IMG/NewBrand/500x500_Red.jpg', 'https://assets-cdn.sums.su/YU/IMG/NewBrand/500x500_Blue.jpg']
    };
  },
  methods: {
    randomImage() {
      return `url("${this.images[Math.floor(Math.random() * this.images.length)]
        }")`;
    },
    formatDate(date) {
      return moment(date).format("DD MMMM YYYY");
    },
  }
};
</script>