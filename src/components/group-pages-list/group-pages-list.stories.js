import "./group-pages-list.component.js";

export default {
  title: "Components/Activities/Group Pages List",
  component: "group-pages-list",
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
