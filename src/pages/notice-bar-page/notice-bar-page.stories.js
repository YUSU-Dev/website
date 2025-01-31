import "./notice-bar-page.component.js";

export default {
  title: "Pages/Notice Bar Page",
  component: "notice-bar-page",
};

export const Default = {};

export const WithTimeLock = {
  args: {
    visibleFrom: "2022-01-01T00:00:00Z",
    visibleUntil: "2026-01-01T00:00:00Z",
  },
};
