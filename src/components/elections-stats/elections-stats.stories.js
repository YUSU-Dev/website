import "./elections-stats.component.js";

export default {
  title: "Components/Elections/Elections Stats",
  component: "elections-stats",
};

export const Default = {
  args: {
    all: true,
  },
};

export const SizesEnabled = {
  args: {
    all: true,
    sizesEnabled: true,
  },
};
