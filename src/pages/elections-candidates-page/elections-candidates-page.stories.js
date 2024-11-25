import "./elections-candidates-page.component.js";

export default {
  title: "Pages/Elections/Elections Candidates Page",
  component: "elections-candidates-page",
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
