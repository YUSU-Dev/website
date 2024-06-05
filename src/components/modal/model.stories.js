import Modal from "./modal.ce.vue";

export default {
  title: "Elements/Modal",
  component: Modal,
};

export const Default = {
  args: {
    signedIn: false,
    modalClosed: false,
    title: "Basket Error",
  },
};

export const signedIn = {
  args: {
    signedIn: true,
    modalClosed: false,
    title: "Basket Error",
    errorDescription: "You need to sign in to add items to your basket",
  },
};

export const signedOut = {
  args: {
    signedIn: false,
    modalClosed: false,
    title: "Basket Error",
    errorDescription: "You need to sign in to add items to your basket",
  },
};
