import "./activities.component.js";

export default {
  title: "Components/Activities",
  component: "activities",
};

export const Default = {
  args: {
    selectedparents: "2,24,39",
  },
};
export const ParentWithTitle = {
  args: {
    selectedparents: "2,24,39",
    title: "Societies, Sports Clubs, and Volunteering",
  },
};
export const ShortView = {
  args: {
    selectedcategory: "23",
  },
};

export const ShortViewWithTitle = {
  args: {
    selectedcategory: "23",
    title: "Hes East",
  },
};
