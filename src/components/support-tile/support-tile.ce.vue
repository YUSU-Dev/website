<template>
  <a class="group flex" :href="url">
    <div class="relative text-white">
      <div class="aspect-square w-full bg-cover md:max-w-[282px]">
        <img :src="img" :alt="name" class="h-full w-full object-cover" />
      </div>
      <div class="absolute inset-0 flex w-full flex-col justify-center px-4">
        <h4 class="mb-2 xxs:text-sm xs:text-lg md:text-xl">
          {{ name }}
        </h4>
        <div class="mt-2 hidden items-center text-sm md:flex md:text-base">
          <p class="">Learn more</p>
          <FontAwesomeIcon
            icon="fas fa-arrow-right"
            class="ml-2 h-4 w-4 text-white transition group-hover:translate-x-4"
          >
          </FontAwesomeIcon>
        </div>
      </div>
    </div>
  </a>
</template>
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowRight);

export default {
  props: {
    img: { type: String, default: "" },
    name: { type: String, default: "" },
    url: { type: String, default: "" },
  },
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {};
  },
};
</script>
