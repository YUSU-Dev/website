import "./pagination.component.js";

export default {
  title: "Elements/Pagination",
  component: "pagination",
  parameters: {
    layout: "centered",
  },
};

export const Default = {
  args: {
    loading: false,
    Array: [1, 2, 3, 4, 5],
    Page: 3,
    moreResults: true,
    previousResults: false,
  },
};
