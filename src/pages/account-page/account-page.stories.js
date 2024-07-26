import "./account-page.component.js";

export default {
  title: "Pages/Account Page",
  component: "account-page",
};

export const Default = {
  args: {
    sub_groups: [
      {
        name: "York SU Emails",
        options: [
          { name: "Student News", value: "option1" },
          { name: "Sabbs In Short", value: "option2" },
          { name: "Union Elections", value: "option3" },
          { name: "Awards", value: "option4" },
        ],
      },
      {
        name: "Commercial Services",
        options: [
          { name: "Venue Offers", value: "option1" },
          { name: "Job Alerts", value: "option2" },
        ],
      },
      {
        name: "Research and Surveys",
        options: [{ name: "Your Say Survey", value: "option1" }],
      },
    ],
  },
};
