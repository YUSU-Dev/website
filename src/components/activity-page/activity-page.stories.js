import "./activity-page.component.js";

export default {
  title: "PageContent/Activity View Page",
  component: "activity-page",
  parameters: {},
  tags: ["no-tests"], // Because this is user submitted content it will fail A11y tests.
};

export const Default = {
  args: {
    activity: {
      id: 7,
      name: "CyberSoc",
      description:
        '<p>Have you ever been curious about the secret lives of hackers? </p><p>Do you want to explore securing and exploiting computers for fun and profit? CyberSoc is for you! </p><p>We are a dedicated bunch of enthusiasts and learners, hosting a range of fun activities for beginners and veterans of cyber security alike. </p><p>Come along to one of our workshops or lectures to learn how to secure your personal devices, disappear from the internet, and even compete in hacking competitions!</p><hr><h4>Meeting Times</h4><p>Wednesdays 19:00, weekly. Stay tuned to our mailing list or <a href="https://discord.cybersoc.co.uk/" target="_blank" rel="noopener">discord</a> for venue and details!</p><hr><h4>Get Involved </h4><p>We are open to all students, and encourage those from all backgrounds to come along! </p><p>All are welcome to attend our practical hacking sessions and cyber security lectures but please consider joining up as a member to support us and have a say in how the society is run.</p><p>Email us and we\'re always happy to chat.</p>',
      activity_category_id: 4,
      thumbnail_url:
        "https://d7c4643dcbda7415a35e-80960cc71f8ebfe47418d0eb60e429bc.ssl.cf3.rackcdn.com/ac_thumb_7_b6d098_CyberSoc.png",
      facebook: "cybersocyork",
      instagram: "cybersocyork",
      twitter: "cybersocyork",
      youtube: "",
      discord: "mUeP5j2",
      tiktok: null,
      url_name: "cybersoc",
      email_address: "cyber@yusu.org",
      badges: [],
      category: "Academic and Educational",
    },
  },
};
