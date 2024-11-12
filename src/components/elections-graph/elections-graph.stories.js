import "./elections-graph.component.js";

export default {
  title: "Components/Elections Graph",
  component: "elections-graph",
};

export const Default = {
  args: {
    title: "Test Data",
    id: "test-graph",
    data: [
      {
        name: "testdata1",
        total_votes: 100,
      },
      {
        name: "testdata2",
        total_votes: 200,
      },
      {
        name: "testdata3",
        total_votes: 300,
      },
    ],
  },
};
