<template>
  <div id="skiptocontent"><a href="#maincontent">skip to main content</a></div>
  <HeroHeader :homepage="true" />
  <div
    id="maincontent"
    class="container mx-auto flex flex-col items-center justify-center py-20"
  >
    <div class="flex justify-center text-center">
      <h2 class="pb-16 text-3xl font-bold">How can we help today?</h2>
    </div>
    <QuickLinks />
  </div>
  <div class="bg-beige">
    <div class="bg-beige container mx-auto py-20 text-center">
      <h2 class="pb-8 text-3xl font-bold">Welcome Tickets Go Live In..</h2>
      <Countdown date="2025-10-01T20:00:00" />
      <timeLock
        class="mt-8"
        visible-from="2025-10-01T20:00:00"
        visible-until="2025-10-01T20:00:00"
      >
        <div class="flex justify-center pt-2">
          <Button is-primary title="Get your Welcome Tickets" url="/events" />
        </div>
      </timeLock>
    </div>
    <div class="bg-beige container mx-auto pb-20">
      <Adverts />
    </div>
  </div>
  <div class="container mx-auto py-20">
    <Sabbs />
  </div>
  <div class="bg-beige">
    <div class="container mx-auto py-20">
      <News :embedded="true" :homepage="true" />
    </div>
  </div>
  <Footer />
</template>
<script>
import HeroHeader from "../../components/HeroHeader/heroheader.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import QuickLinks from "../../components/quickLinks/quickLinks.ce.vue";
import News from "../../components/news/news.ce.vue";
import Sabbs from "../../components/Sabbs/sabbs.ce.vue";
import Adverts from "../../components/Adverts/adverts.ce.vue";
import Countdown from "../../components/countdown/countdown.ce.vue";
import timeLock from "../../components/time-lock/time-lock.ce.vue";
import Button from "../../components/button/button.ce.vue";
export default {
  props: {
    title: { type: String, default: "" },
    componenttitle: { type: String, default: "" },
    selectedparents: { type: String, default: "" },
  },
  components: {
    HeroHeader,
    Footer,
    QuickLinks,
    News,
    Sabbs,
    Adverts,
    Countdown,
    timeLock,
    Button,
  },
  methods: {},
};
</script>
