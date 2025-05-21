<template>
  <div class="flex">
    <div class="w-full bg-repeat">
      <div
        class="flex h-full items-center justify-center bg-cover bg-center bg-repeat-y"
        :style="{ 'background-image': 'url(' + image + ')' }"
      >
        <div class="flex-col items-center justify-center">
          <div class="grid place-items-center gap-y-2">
            <br />
            <img
              v-if="groupLogo"
              :src="groupLogo"
              class="h-48 w-48 items-center object-contain"
              alt=""
            />
            <div
              v-if="group"
              class="mx-2 w-fit max-w-full gap-y-2 bg-white px-6 py-3"
            >
              <h1
                class="w-full text-center text-2xl font-bold break-words sm:text-3xl"
              >
                {{ decodedGroup }}
              </h1>
            </div>
            <div
              v-if="category"
              class="mx-2 w-fit max-w-full bg-white px-6 py-3"
            >
              <h1
                class="w-full text-center text-2xl font-bold break-words sm:text-2xl"
              >
                {{ category }}
              </h1>
            </div>
          </div>
          <br />
          <div
            v-if="showButtons"
            class="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 p-4 md:flex-none"
          >
            <a
              :href="'/shop?activity_id=' + id"
              class="btn hover:bg-light-blue group flex w-fit items-center bg-white"
              >Memberships & Products
            </a>
            <a
              :href="'/events?activity=' + id"
              class="btn hover:bg-light-blue group flex w-fit items-center bg-white"
              >Events</a
            >
            <a
              v-if="constitution"
              :href="constitution"
              class="btn hover:bg-light-blue group flex w-fit items-center bg-white"
              target="_blank"
              >Constitution</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { randomImageUrl } from "../../_common/randomImage.mjs";

export default {
  props: {
    image: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      default: null,
    },
    id: {
      type: Number,
      default: null,
    },
    group: {
      type: String,
      default: "",
    },
    logo: {
      type: String,
      default: null,
    },
    constitution: {
      type: String,
      default: null,
    },
  },
  components: {},
  data() {
    return {
      groupLogo: {
        type: String,
      },
      showButtons: {
        type: Boolean,
        default: true,
      },
    };
  },
  mounted() {
    if (
      [
        "Departments",
        "Arts and Humanities Faculty",
        "Sciences Faculty",
        "Social Sciences Faculty",
        "Faculties",
        "Adopt an Activity",
      ].includes(this.category)
    ) {
      this.showButtons = false;
    }
    this.getGroupLogo();
  },
  methods: {
    wrapURL(URL) {
      return "'" + URL + "'";
    },
    getGroupLogo() {
      if (!this.logo) {
        return (this.groupLogo = randomImageUrl("student-life"));
      }
      return (this.groupLogo = this.logo);
    },
  },
  computed: {
    decodedGroup() {
      if (!this.group) return "";
      return this.group
        .replace(/&#39;/g, "'")
        .replace(/&#8217;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&#8220;/g, '"')
        .replace(/&#8221;/g, '"')
        .replace(/&lsquo;/g, "'")
        .replace(/&rsquo;/g, "'")
        .replace(/&ldquo;/g, '"')
        .replace(/&rdquo;/g, '"');
    },
  },
};
</script>
