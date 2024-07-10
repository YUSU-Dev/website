<template>
  <main class="my-7">
    <Button title="Back to News" is-primary="true" arrow="true" url="/news" />
    <h2 class="mb-5 mt-10 text-3xl font-bold">
      {{ Article.title ?? "Loading..." }}
    </h2>
    <div class="mb-4">
      <div class="gap-4 md:flex">
        <img
          :src="Article.thumbnail ?? randomImage()"
          alt=""
          class="h-[200px]"
        />
        <div>
          <p v-if="Article.snippet" class="mb-3">{{ Article.snippet }}</p>
          <p v-if="Article.date" class="mb-5">{{ Article.date }}</p>
        </div>
      </div>
    </div>
    <hr />
    <article id="news-article" v-html="Article.body" class="mb-5"></article>
    <div v-if="loading" class="animate-pulse">
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
  </main>
</template>
<style>
@import "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css";
</style>
<script>
import axios from "../../_common/axios.mjs";
import { randomImageUrl } from "../../_common/randomImage.mjs";
import Button from "../button/button.ce.vue";

export default {
  components: {
    Button,
  },
  props: {
    siteid: { type: String, default: "" },
    articleid: { type: Number, default: 0 },
  },
  data() {
    return {
      Article: {},
      loading: true,
      images: [
        "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Red.webp",
        "https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Blue.webp",
      ],
    };
  },
  methods: {
    randomImage() {
      return randomImageUrl("primary");
    },
  },
  mounted() {
    var self = this;
    self.loading = true;
    axios
      .get("https://pluto.sums.su/api/news/" + self.articleid, {
        headers: {
          "X-Site-Id": self.siteid,
        },
      })
      .then(function (response) {
        self.Article = response.data;
        self.loading = false;
      })
      .catch(function () {
        // window.location.href = "/news";
      });
  },
};
</script>
