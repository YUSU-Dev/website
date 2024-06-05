import "./navbar.component.js";

export default {
  title: "Components/Navbar",
  component: "navbar",
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
