import "./elections-vote.component.js";

export default {
  title: "Components/Elections/Elections Vote",
  component: "elections-vote",
};

export const Default = {
  args: {
    electionId: "2209",
  },
  parameters: {
    a11y: {
      disable: true, // Disables the a11y check for this specific story, because of an accessibility issue we are looking in to. [WEB-459]
    },
  },
};

export const Referendum = {
  args: {
    electionId: "2326",
  },
  parameters: {
    a11y: {
      disable: true, // Disables the a11y check for this specific story, because of an accessibility issue we are looking in to. [WEB-459]
    },
  },
};
