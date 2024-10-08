import "./activities-page.component.js";

export default {
  title: "Pages/Student Life/Activities Page",
  component: "activities-page",
};

export const Default = {
  args: {
    activityid: 483,
    pageurl: "society-pages",
  },
  parameters: {
    a11y: {
      disable: true, // Disables the a11y check for this specific story, because it's user submitted content and will always fail.
    },
  },
};
