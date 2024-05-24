import Modal from "./modal.ce.vue";

export default {
  title: "Elements/Modal",
  component: Modal,
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
