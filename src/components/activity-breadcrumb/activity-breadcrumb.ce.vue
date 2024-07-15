<template>
  <div class="font-serif text-sm">
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
      } else if (this.categoryName == "Volunteering") {
        this.firstSegmentUrl = "/volunteering";
      } else if (
        this.categoryName == "College Sport (Groups)" ||
        this.categoryName == "College Sport" ||
        this.categoryId == "30" ||
        this.categoryId == "31" ||
        this.categoryId == "32" ||
        this.categoryId == "33" ||
        this.categoryId == "34" ||
        this.categoryId == "35" ||
        this.categoryId == "36" ||
        this.categoryId == "37" ||
        this.categoryId == "38"
      ) {
        this.firstSegmentName = "College Sport";
        this.firstSegmentUrl = "/sport/college-sport";
      } else if (this.categoryId == "1") {
        this.firstSegmentName = "Sport";
        this.firstSegmentUrl = "/sport";
      } else {
        this.firstSegmentName = "Societies";
        this.firstSegmentUrl = "/societies";
      }
    },
    getSecondSegment() {
      if (this.categoryId == "30") {
        this.secondSegmentName = "James Sport";
        this.secondSegmentUrl = "/activities/view/James-Sport";
      } else if (this.categoryId == "31") {
        this.secondSegmentName = "Alcuin Sport";
        this.secondSegmentUrl = "/activities/view/Alcuin-Sport";
      } else if (this.categoryId == "32") {
        this.secondSegmentName = "Vanburgh Sport";
        this.secondSegmentUrl = "/activities/view/vanbrugh_sport";
      } else if (this.categoryId == "33") {
        this.secondSegmentName = "Constantine Sport";
        this.secondSegmentUrl = "/activities/view/Constantine-Sport";
      } else if (this.categoryId == "34") {
        this.secondSegmentName = "Derwent Sport";
        this.secondSegmentUrl = "/activities/view/derwent-sport";
      } else if (this.categoryId == "35") {
        this.secondSegmentName = "Goodricke Sport";
        this.secondSegmentUrl = "/activities/view/goodricke-sport";
      } else if (this.categoryId == "36") {
        this.secondSegmentName = "Halifax Sport";
        this.secondSegmentUrl = "/activities/view/halifax-sport";
      } else if (this.categoryId == "37") {
        this.secondSegmentName = "Langwith Sport";
        this.secondSegmentUrl = "/activities/view/langwith-sport";
      } else if (this.categoryId == "38") {
        this.secondSegmentName = "Anne Lister and Kato Sport";
        this.secondSegmentUrl = "/activities/view/lister_kato_sport";
      }
    },
  },
};
</script>
