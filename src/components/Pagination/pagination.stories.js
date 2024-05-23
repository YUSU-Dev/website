import Pagination from "./pagination.ce.vue";

export default {
  title: "Elements/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
};

export const Default = {
  args: {
    loading: false,
    Array: [1, 2, 3, 4, 5],
    Page: 1,
    MoreResults: true,
    PreviousResults: false,
  },
};
