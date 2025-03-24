<template>
  <div class="container mx-auto pt-12 pb-2 font-serif text-sm">
    <p>
      <a class="text-black no-underline hover:underline" href="/">Home</a>
      <span v-if="firstSegmentName">
        >
        <a
          class="text-black no-underline hover:underline"
          :href="firstSegmentUrl"
        >
          {{ firstSegmentName }}
        </a>
      </span>
      <span v-if="secondSegmentName">
        >
        <a
          class="text-black no-underline hover:underline"
          :href="secondSegmentUrl"
        >
          {{ secondSegmentName }}
        </a>
      </span>
      <span v-if="groupName">
        >
        <a
          class="text-black no-underline hover:underline"
          :href="'/activities/view/' + groupUrl"
        >
          {{ groupName }}
        </a>
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: "ActivityBreadcrumb",
  props: {
    groupId: {
      type: String,
      default: null,
    },
    categoryId: {
      type: String,
      default: null,
    },
    categoryName: {
      type: String,
      default: null,
    },
    groupName: {
      type: String,
      default: null,
    },
    groupUrl: {
      type: String,
      default: null,
    },
  },
  mounted() {
    this.getFirstSegment();
    this.getSecondSegment();
  },
  data() {
    return {
      firstSegmentName: null,
      firstSegmentUrl: null,
      secondSegmentName: null,
      secondSegmentUrl: null,
    };
  },
  methods: {
    getFirstSegment() {
      this.firstSegmentName = this.categoryName;
      if (this.categoryName == "Colleges") {
        this.firstSegmentUrl = "/colleges";
      } else if (
        this.categoryName == "Volunteering" ||
        this.categoryName == "Volunteering Groups"
      ) {
        this.firstSegmentName = "Volunteering";
        this.firstSegmentUrl = "/volunteering";
      } else if (
        this.categoryName == "College Sport (Groups)" ||
        this.categoryName == "College Sport" ||
        this.categoryName == "James College Sports" ||
        this.categoryName == "Alcuin College Sports" ||
        this.categoryName == "Vanbrugh College Sports" ||
        this.categoryName == "Constantine College Sports" ||
        this.categoryName == "Derwent College Sports" ||
        this.categoryName == "Goodricke College Sports" ||
        this.categoryName == "Halifax College Sports" ||
        this.categoryName == "Langwith College Sports" ||
        this.categoryName == "Anne Lister & David Kato College Sports" ||
        this.categoryName == "Hes East College Sports"
      ) {
        this.firstSegmentName = "College Sport";
        this.firstSegmentUrl = "/sport/college-sport";
      } else if (this.categoryName == "Sports") {
        this.firstSegmentUrl = "/sport";
      } else if (this.categoryName == "Adopt an Activity") {
        this.firstSegmentUrl = "/adopt-an-activity";
      } else if (
        this.categoryName == "Departments" ||
        this.categoryName == "Arts and Humanities Faculty" ||
        this.categoryName == "Sciences Faculty" ||
        this.categoryName == "Social Sciences Faculty"
      ) {
        this.firstSegmentName = "Academic Reps";
        this.firstSegmentUrl = "/academic-reps";
      } else if (this.categoryName == "Networks") {
        this.firstSegmentUrl = "/networks";
      } else {
        this.firstSegmentName = "Societies";
        this.firstSegmentUrl = "/societies";
      }
    },
    getSecondSegment() {
      if (this.categoryName == "James College Sports") {
        this.secondSegmentUrl = "/activities/view/James-Sport";
      } else if (this.categoryName == "Alcuin College Sports") {
        this.secondSegmentUrl = "/activities/view/Alcuin-Sport";
      } else if (this.categoryName == "Vanburgh College Sports") {
        this.secondSegmentUrl = "/activities/view/vanbrugh_sport";
      } else if (this.categoryName == "Constantine College Sports") {
        this.secondSegmentUrl = "/activities/view/Constantine-Sport";
      } else if (this.categoryName == "Derwent College Sports") {
        this.secondSegmentUrl = "/activities/view/derwent-sport";
      } else if (this.categoryName == "Goodricke College Sports") {
        this.secondSegmentUrl = "/activities/view/goodricke-sport";
      } else if (this.categoryName == "Halifax College Sports") {
        this.secondSegmentUrl = "/activities/view/halifax-sport";
      } else if (this.categoryName == "Langwith College Sports") {
        this.secondSegmentUrl = "/activities/view/langwith-sport";
      } else if (
        this.categoryName == "Anne Lister & David Kato College Sports"
      ) {
        this.secondSegmentUrl = "/activities/view/lister_kato_sport";
      }

      if (this.secondSegmentUrl) {
        this.secondSegmentName = this.categoryName;
      }
    },
  },
};
</script>
