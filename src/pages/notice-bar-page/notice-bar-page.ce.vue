<template>
  <TimeLock :visible-from="visibleFrom" :visible-until="visibleUntil">
    <NoticeBar>
      <p>This is a notice!</p>
    </NoticeBar>
  </TimeLock>
  <Navbar />
  <div>Hello, World!</div>
  <Footer />
</template>

<script>
import Navbar from "../../components/Navbar/navbar.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import NoticeBar from "../../components/notice-bar/notice-bar.ce.vue";
import TimeLock from "../../components/time-lock/time-lock.ce.vue";
export default {
  name: "NoticeBarPage",
  components: {
    Navbar,
    Footer,
    NoticeBar,
    TimeLock,
  },
  props: {
    visibleFrom: {
      type: String,
      default: "",
    },
    visibleUntil: {
      type: String,
      default: "",
    },
  },
};
</script>
