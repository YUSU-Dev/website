import "./accordion.component.js";

export default {
  title: "Components/Accordion",
  component: "accordion",
};

export const Default = {
  args: {
    label: "test",
  },
};

export const StudentLife = {
  args: {
    label: "Student Life",
    isStudentLife: true,
  },
};

export const StudentVoice = {
  args: {
    label: "Student Voice",
    isStudentVoice: true,
  },
};
