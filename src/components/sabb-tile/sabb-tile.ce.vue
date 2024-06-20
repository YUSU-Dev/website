<template>
  <a class="group flex w-fit" :href="url">
    <div class="relative w-fit text-white">
      <div class="aspect-[141/161] w-full bg-cover md:h-[322px] md:w-[282px]">
        <img
          :src="img"
          :alt="name + ', ' + position"
          class="h-full w-full object-cover"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black to-transparent to-60%"
        ></div>
      </div>
      <div class="absolute bottom-4 w-full px-4">
        <h4 class="mb-2 text-lg md:text-xl">
          {{ name }}
        </h4>
        <h5 class="text-sm md:text-base">
          {{ position }}
        </h5>
        <div class="mt-2 hidden items-center text-sm md:flex md:text-base">
          <p class="">View Profile</p>
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
    position: { type: String, default: "" },
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
