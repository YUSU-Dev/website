import "./activity-page.component.js";

export default {
  title: "PageContent/Activity View Page",
  component: "activity-page",
};

export const Default = {
  args: {
    groupId: "7",
  },
  parameters: {
    a11y: {
      disable: true, // Disables the a11y check for this specific story, because it's user submitted content and will always fail.
    },
  },
};

export const CollegeSport = {
  args: {
    groupId: "267",
  },
  parameters: {
    a11y: {
      disable: true, // Disables the a11y check for this specific story, because it's user submitted content and will always fail.
    },
  },
};

export const animalCrossing = {
  args: {
    groupId: "387",
  },
  parameters: {
    a11y: {
      disable: true, // Disables the a11y check for this specific story, because it's user submitted content and will always fail.
    },
  },
};
