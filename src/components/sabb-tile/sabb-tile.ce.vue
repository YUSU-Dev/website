<template>
  <a class="group flex w-fit" :href="url">
    <div class="relative w-fit text-white">
      <div
        class="aspect-[141/161] w-full bg-cover md:h-[322px] md:w-[282px]"
        :alt="name + ', ' + position"
        :style="{
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 40%), url('${img}')`,
        }"
      ></div>
      <h4
        class="absolute bottom-12 left-4 text-xl transition group-hover:-translate-y-7"
      >
        {{ name }}
      </h4>
      <h5
        class="invisible absolute bottom-12 left-4 opacity-0 transition group-hover:visible group-hover:opacity-100"
      >
        {{ position }}
      </h5>
      <div class="absolute bottom-4 left-4 mt-2 flex items-center">
        <p class="text-base">View Profile</p>
        <FontAwesomeIcon
          icon="fas fa-arrow-right"
          class="ml-2 h-4 w-4 text-white transition group-hover:translate-x-4"
        >
        </FontAwesomeIcon>
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
  props: ["img", "name", "position", "url"],
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {};
  },
};
</script>
