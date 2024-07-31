<template>
  <main class="mb-7">
    <Button title="Back to News" is-primary="true" arrow="true" url="/news" />
    <h2 class="mb-5 mt-10 text-3xl font-bold">
      {{ Article.title ?? "Loading..." }}
    </h2>
    <div class="mb-4">
      <div class="gap-4 md:flex">
        <img :src="image" alt="" class="h-[200px]" />
        <div>
          <p v-if="Article.snippet" class="mb-3">{{ Article.snippet }}</p>
          <p v-if="Article.date" class="mb-5">{{ Article.date }}</p>
        </div>
      </div>
    </div>
    <hr />
    <article
      id="news-article"
      v-html="Article.body"
      class="body-style mb-5"
    ></article>
    <Loading :loading="loading" text></Loading>
  </main>
</template>
<style>
@import "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css";
</style>
<script>
import axios from "../../_common/axios.mjs";
import { randomImageUrl } from "../../_common/randomImage.mjs";
import Button from "../button/button.ce.vue";
import Loading from "../loading/loading.ce.vue";

export default {
  components: {
    Button,
    Loading,
  },
  props: {
    siteid: { type: String, default: "" },
    articleid: { type: Number, default: 0 },
  },
  data() {
    return {
      Article: {},
      loading: true,
      image: "",
    };
  },
  methods: {
    randomImage() {
      return randomImageUrl("primary");
    },
  },
  mounted() {
    var self = this;
    self.image = self.randomImage();
    self.loading = true;
    axios
      .get("https://pluto.sums.su/api/news/" + self.articleid, {
        headers: {
          "X-Site-Id": self.siteid,
        },
      })
      .then(function (response) {
        self.Article = response.data;
        if (self.Article.thumbnail) {
          self.image = self.Article.thumbnail;
        }
        self.loading = false;
      })
      .catch(function () {
        // window.location.href = "/news";
      });
  },
};
</script>
