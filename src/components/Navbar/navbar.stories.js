import Navbar from "./navbar.ce.vue";

export default {
  title: "Components/Navbar",
  component: Navbar,
};

export const Default = {
  args: {
    signedIn: false,
  },
};

export const icons = {
  args: {
    signedIn: true,
    icons: true,
  },
};
