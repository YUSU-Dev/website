import "./activities.component.js";

export default {
  title: "Components/Activities/Activities Index",
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

export const SelectedSingleParent = {
  args: {
    selectedparents: "24",
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

export const Wishlist = {
  args: {
    selectedparents: "2,24,39",
    wishlist: true,
  },
};
