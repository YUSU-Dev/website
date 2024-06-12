<template>
  <body>
    <main class="container mx-auto my-7">
      <Button title="Back to News" isPrimary="true" arrow="true" url="/news" />
      <h2 class="mb-5 mt-10 text-3xl font-bold">
        {{ Article.title ?? Article not Found }}
      </h2>
      <p v-if="Article.snippet" class="mb-3">{{ Article.snippet }}</p>
      <p v-if="Article.date" class="mb-5">{{ Article.date }}</p>
      <hr />
      <article id="news-article" v-html="Article.body" class="my-5"></article>
    </main>
  </body>
</template>
<style>
@import "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css";
</style>
<script>
import axios from "../../_common/axios.mjs";
import Button from "../button/button.ce.vue";
export default {
  components: {
    Button,
  },
  props: ["siteid", "articleid"],
  data() {
    return {
      Article: {},
      loading: false,
    };
  },
  created() {
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
      .catch(function (response) {
        window.location.href = "/news";
      });
  },
};
</script>
