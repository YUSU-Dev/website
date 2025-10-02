import "./view-news.component.js";

export default {
  title: "Page Content/News/View News",
  component: "view-news",
};

export const Default = {
  args: {
    articleid: "2102",
  },
};

export const NoImage = {
  args: {
    articleid: "2104",
  },
};

export const OldArticle = {
  args: {
    articleid: "1348",
  },
};

export const WithCategories = {
  args: {
    articleid: "2266",
    categoryName: "Student Life|Freshers|",
  },
};
