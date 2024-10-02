import "./group-page.component.js";

export default {
  title: "Components/Activities/Group Page",
  component: "group-page",
};

export const Default = {
  args: {
    groupId: 483,
    pageUrl: "society-pages",
  },
  parameters: {
    a11y: {
      disable: true, // Disables the a11y check for this specific story, because it's user submitted content and will always fail.
    },
  },
};
