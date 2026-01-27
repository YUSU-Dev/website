import "./button.component.js";

export default {
  title: "Elements/Button",
  component: "button",
  parameters: {
    docs: {
      description: {
        component: `
### Usage

To use this component on your page, you need to include the component script:

#### Component Import Script
\`\`\`html
<script type="module" src="https://assets.yorksu.org/components/button.component.js"></script>
\`\`\`
        `,
      },
      source: {
        transform: (code, storyContext) => {
          const { args } = storyContext;
          let attributes = [];

          // Always include title if it exists
          if (args.title) {
            attributes.push(`title="${args.title}"`);
          }

          // Include type if it exists
          if (args.type) {
            attributes.push(`type="${args.type}"`);
          }

          // Include URL if it exists and is not the default
          if (args.url && args.url !== "javascript:;") {
            attributes.push(`url="${args.url}"`);
          }

          // Include target if it's not the default
          if (args.target && args.target !== "_self") {
            attributes.push(`target="${args.target}"`);
          }

          // Include boolean props if they're true
          if (args.arrow) {
            attributes.push(`arrow`);
          }

          if (args.selected) {
            attributes.push(`selected`);
          }

          if (args.isTertiary) {
            attributes.push(`is-tertiary`);
          }

          return `<yorksu-button ${attributes.join(" ")}></yorksu-button>`;
        },
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "The text displayed on the button",
    },
    type: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "student-life",
        "student-voice",
        "advice-support",
      ],
      description: "The button style type",
    },
    url: {
      control: "text",
      description: "The URL the button links to",
    },
    target: {
      control: "select",
      options: ["_self", "_blank", "_parent", "_top"],
      description: "Specifies where to open the linked document",
    },
    arrow: {
      control: "boolean",
      description: "Shows an arrow icon on the button",
    },
    selected: {
      control: "boolean",
      description: "Shows the button in its selected/active state",
    },
    // Hide individual boolean props from controls
    isPrimary: {
      control: false,
      description:
        "Makes the button use primary styling (use 'type' prop instead)",
    },
    isSecondary: {
      control: false,
      description:
        "Makes the button use secondary styling (use 'type' prop instead)",
    },
    isTertiary: {
      control: false,
      description:
        "Makes the button use tertiary styling (use 'type' prop instead)",
    },
    isStudentLife: {
      control: false,
      description:
        "Makes the button use student life styling (use 'type' prop instead)",
    },
    isStudentVoice: {
      control: false,
      description:
        "Makes the button use student voice styling (use 'type' prop instead)",
    },
    isAdviceAndSupport: {
      control: false,
      description:
        "Makes the button use advice and support styling (use 'type' prop instead)",
    },
  },
};

export const PrimaryButton = {
  args: {
    title: "Primary Button",
    type: "primary",
  },
};

export const PrimaryButtonActive = {
  args: {
    title: "Primary Button",
    type: "primary",
    selected: true,
  },
};

export const PrimaryButtonWithArrow = {
  args: {
    title: "Primary Button",
    type: "primary",
    arrow: true,
  },
};

export const PrimaryButtonWithUrl = {
  args: {
    title: "Primary Button",
    type: "primary",
    url: "https://yorksu.org/home",
  },
};

export const SecondaryButton = {
  args: {
    title: "Secondary Button",
    type: "secondary",
  },
};

export const SecondaryButtonWithArrow = {
  args: {
    title: "Secondary Button",
    type: "secondary",
    arrow: true,
  },
};

export const TertiaryButton = {
  args: {
    title: "Tertiary Button",
    isTertiary: true,
  },
};

export const StudentLifeButton = {
  args: {
    title: "Student Life Button",
    type: "student-life",
  },
};

export const StudentLifeButtonWithArrow = {
  args: {
    title: "Student Life Button",
    type: "student-life",
    arrow: true,
  },
};

export const StudentVoiceButton = {
  args: {
    title: "Student Voice Button",
    type: "student-voice",
  },
};

export const StudentVoiceButtonWithArrow = {
  args: {
    title: "Student Voice Button",
    type: "student-voice",
    arrow: true,
  },
};

export const AdviceAndSupportButton = {
  args: {
    title: "Advice Button",
    type: "advice-support",
  },
};

export const AdviceAndSupportButtonWithArrow = {
  args: {
    title: "Advice Button",
    type: "advice-support",
    arrow: true,
  },
};
