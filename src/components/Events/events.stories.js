import "./events.component.js";

export default {
  title: "Components/Events/Index",
  component: "events",
};

export const Default = {
  args: {},
};

export const ShortView = {
  args: {
    typeid: "19",
  },
};

export const GroupView = {
  args: {
    groupid: "23",
  },
};

export const GroupViewNoResults = {
  args: {
    groupid: "1",
    title: "Events",
    icon: true,
  },
};
