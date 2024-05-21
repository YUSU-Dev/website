import Pagination from "./pagination.vue";

export default {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  }
};

export const Default = {
  args: {
    loading: false,
    Array: [1, 2, 3, 4, 5],
    Page: 1,
    MoreResults: true,
    PreviousResults: false,
  }
};
