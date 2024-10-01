import "./activities-view-page.component.js";

export default {
  title: "Page Content/Activity Page/Activities View without Header",
  component: "activities-view-page",
};

export const Default = {};

export const ury = {
  args: {
    activityid: 134,
    constitution: "https://placeholder.com/500x500",
  },
  parameters: {
    a11y: {
      disable: true, // Disables the a11y check for this specific story, because it's user submitted content and will always fail.
    },
  },
};
