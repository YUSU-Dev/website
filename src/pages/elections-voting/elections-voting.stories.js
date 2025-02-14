import "./elections-voting.component.js";

export default {
  title: "Pages/Elections/Elections Voting",
  component: "elections-voting",
};

export const Default = {
  parameters: {
    a11y: {
      disable: true, // Disables the a11y check for this specific story, because of an accessibility issue we are looking in to. [WEB-459]
    },
  },
};
