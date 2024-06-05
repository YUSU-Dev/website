import "./modal.component.js";

export default {
  title: "Elements/Modal",
  component: "modal",
};

export const Default = {
  args: {
    signedIn: false,
  },
};

export const signedIn = {
  args: {
    signedIn: true,
  },
};
