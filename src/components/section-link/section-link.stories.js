import "./section-link.component.js";

export default {
  title: "Components/SectionLinks/Section Link",
  component: "section-link",
};

export const Default = {
  args: {
    sectionName: "Section Name",
    sectionUrl: "#",
    sectionIsActive: false,
  },
};

export const Advice = {
  args: {
    sectionName: "Section Name",
    sectionUrl: "#",
    sectionIsActive: false,
    sectionArea: "advice-support",
  },
};

export const SectionItem = {
  args: {
    sectionName: "Section Name",
    sectionUrl: "#",
    sectionIsActive: false,
    isSectionItem: false,
  },
};
