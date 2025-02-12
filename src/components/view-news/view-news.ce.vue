<template>
  <main class="mb-7">
    <Button title="Back to News" is-primary="true" arrow="true" url="/news" />
    <h2 class="mt-10 mb-5 text-3xl font-bold">
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
    <div
      v-if="articleAge"
      class="mb-2 flex flex-row items-center gap-2 border-l-4 border-yellow-400 bg-yellow-100 p-2"
    >
      <FontAwesomeIcon icon="fas fa-clock" class="h-4 w-4" />
      <h3 class="mb-0 text-lg">This article is {{ articleAge }}</h3>
    </div>
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.13/+esm";

library.add(faClock);
export default {
  components: {
    Button,
    Loading,
    FontAwesomeIcon,
  },
  props: {
    siteid: { type: String, default: "" },
    articleid: { type: Number, default: 0 },
  },
  data() {
    return {
      Article: {},
      articleAge: "",
      loading: true,
      image: "",
    };
  },
  methods: {
    randomImage() {
      return randomImageUrl("primary");
    },
    getArticleAge(articleDate) {
      const cleanedDate = articleDate.replace(/(\d+)(st|nd|rd|th)/, "$1");
      const now = dayjs();
      const article = dayjs(cleanedDate, "DD MMMM YYYY");
      const diffMonths = now.diff(article, "month");
      const diffYears = now.diff(article, "year");
      if (diffYears == 1) {
        return `more than ${diffYears} year old.`;
      } else if (diffYears > 1) {
        return `more than ${diffYears} years old.`;
      } else if (diffMonths > 6) {
        return `more than 6 months old.`;
      } else if (diffMonths > 3) {
        return `more than 3 months old.`;
      } else {
        return null;
      }
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
        self.articleAge = self.getArticleAge(self.Article.date);
        self.loading = false;
      })
      .catch(function () {
        // window.location.href = "/news";
      });
  },
};
</script>
