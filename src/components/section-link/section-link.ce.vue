<template>
  <Button
    :title="sectionName"
    :type="type"
    :url="sectionUrl"
    :selected="sectionIsActive"
    :class="{
      'w-full px-8 text-center': isSectionItem,
      'h-full w-full px-6': !isSectionItem,
    }"
  />
</template>

<script>
import Button from "../button/button.ce.vue";
export default {
  name: "SectionLink",
  props: {
    sectionName: {
      type: String,
      required: true,
    },
    sectionUrl: {
      type: String,
      required: true,
    },
    sectionIsActive: {
      type: Boolean,
      default: false,
    },
    isSectionItem: {
      type: Boolean,
      default: false,
    },
    sectionArea: {
      type: String,
      default: "primary",
    },
  },
  data() {
    return {
      type: "",
    };
  },
  components: {
    Button,
  },
  created() {
    if (this.isSectionItem) {
      this.type = "secondary";
    } else {
      this.type = this.sectionArea;
    }
  },
};
</script>
