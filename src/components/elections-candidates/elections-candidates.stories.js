import "./elections-candidates.component.js";

export default {
  title: "Components/Elections/Elections Candidates",
  component: "elections-candidates",
};

export const Default = {
  args: {
    electionId: "2209",
  },
  parameters: {
    a11y: {
      config: {
        rules: [{ id: "empty-heading", enabled: false }],
      },
      options: {},
      manual: true,
    },
  },
};
