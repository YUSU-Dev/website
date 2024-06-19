import "./studentlife.component.js";

export default {
  title: "Pages/StudentLife",
  component: "studentlife",
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

export const Multiple = {
  args: {
    title: "Multiple",
    selectedparents: "2,24,39",
    componenttitle: "Search for a Society, Sport Club or Volunteering Group",
  },
};
