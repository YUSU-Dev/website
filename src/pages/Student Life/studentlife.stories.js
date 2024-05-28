import StudentLife from "./studentlife.ce.vue";

export default {
  title: "Pages/StudentLife",
  component: StudentLife,
};

export const Sports = {
  args: {
    title: "Sports",
    selectedparents: "24",
  },
};

export const Societies = {
  args: {
    title: "Societies",
    selectedparents: "2",
  },
};

export const Volunteering = {
  args: {
    title: "Volunteering",
    selectedparents: "39",
  },
};
