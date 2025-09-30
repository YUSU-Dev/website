<template>
  <HeroHeader
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_Student_Life.jpg"
    title="Social Sport"
  />
  <div class="container mx-auto">
    <EventTimetable :button-title="'Social Sport Timetable'" :type-id="30" />
  </div>
  <div id="main" class="body-style container mx-auto">
    <!-- Main Content -->
    <article>
      <!-- Page Content -->
      <h2><meta charset="utf-8" />Social Sport Sessions</h2>

      <p>
        Play for fun! No commitment. No pressure. No experience needed. Our
        Social Sport programme enables you to take part in a range of
        activities, no matter what level you play at. We&nbsp;offer&nbsp;weekly
        turn-up-and-play sessions that you can attend on your own or with
        friends, no matter your ability.&nbsp;
      </p>

      <p><meta charset="utf-8" /></p>

      <p dir="ltr">
        Some sessions charge a small fee, but most are free! Please register
        your interest via the events below.
      </p>

      <p dir="ltr">&nbsp;</p>

      <h2 dir="ltr">Social Sport Leagues</h2>

      <p dir="ltr"><meta charset="utf-8" /></p>

      <p dir="ltr">
        You can also take part in social sport leagues. These are fun,
        semi-competitive opportunities. Play with and against friends,
        housemates, or student groups. Keep an eye on this page for more details
        on these throughout the year.
      </p>

      <p dir="ltr">&nbsp;</p>

      <h2 dir="ltr">More information</h2>

      <p dir="ltr">
        If you have any questions about getting involved with any of these
        activities, please contact socialsport@yorksu.org
      </p>
      <!-- End Page Content -->
    </article>
    <div>
      <Events typeid="30" title="Events" icon=""></Events>
    </div>
  </div>
  <Footer />
</template>

<script>
import HeroHeader from "../../components/HeroHeader/heroheader.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import Events from "../../components/Events/events.ce.vue";
import EventTimetable from "../../components/event-timetable/event-timetable.ce.vue";
export default {
  name: "SocialSportPage",
  components: {
    HeroHeader,
    Footer,
    Events,
    EventTimetable,
  },
};
</script>
