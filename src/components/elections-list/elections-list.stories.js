import "./elections-list.component.js";

export default {
  title: "Page Content/Elections/Elections List",
  component: "elections-list",
};

export const Default = {
  args: {
    page_content: `
    <p>
          The Students’ Union is here to ensure that every single student at
          York feels like their voice is heard meaning you collectively decide
          who is going to represent your interests and improve the lives of
          students where it matters most. We are always searching for students
          who are passionate about making positive change; whether it’s tackling
          the cost of living, fighting for a more inclusive campus or ensuring
          that students have the best possible academic experience at
          University.
        </p>
        <p>
          If you care about your University and the students in it, it’s time to
          make a difference.
        </p>
        <p>
          You can get in touch with
          <a href="mailto:elections@yusu.org">elections@yusu.org</a> if you have
          any questions.
        </p>
    `,
    nomination_page_content: `
    <p>
          Nominating yourself means that you want to advocate for the interests
          of your fellow students and ensure their University experience is the
          best it can be. Before you nominate, make sure you know what you’ll
          need for your nomination. You can find all that information on
          yusu.org/elections or get in touch with
          <a href="mailto:elections@yusu.org">elections@yusu.org</a> if you have
          any questions.
        </p>
    `,
    voting_page_content: `
    <p>
          Vote below for any current YUSU elections. Please note that certain
          elections such as Course Reps and College Officers can only be seen by
          members of the relevant faculties/colleges.
        </p>
    `,
    openNominationCount: 0,
  },
};

export const WithElections = {
  args: {
    page_content: `
    <p>
          The Students’ Union is here to ensure that every single student at
          York feels like their voice is heard meaning you collectively decide
          who is going to represent your interests and improve the lives of
          students where it matters most. We are always searching for students
          who are passionate about making positive change; whether it’s tackling
          the cost of living, fighting for a more inclusive campus or ensuring
          that students have the best possible academic experience at
          University.
        </p>
        <p>
          If you care about your University and the students in it, it’s time to
          make a difference.
        </p>
        <p>
          You can get in touch with
          <a href="mailto:elections@yusu.org">elections@yusu.org</a> if you have
          any questions.
        </p>
    `,
    nomination_page_content: `
    <p>
          Nominating yourself means that you want to advocate for the interests
          of your fellow students and ensure their University experience is the
          best it can be. Before you nominate, make sure you know what you’ll
          need for your nomination. You can find all that information on
          yusu.org/elections or get in touch with
          <a href="mailto:elections@yusu.org">elections@yusu.org</a> if you have
          any questions.
        </p>
    `,
    voting_page_content: `
    <p>
          Vote below for any current YUSU elections. Please note that certain
          elections such as Course Reps and College Officers can only be seen by
          members of the relevant faculties/colleges.
        </p>
    `,
    openNominationCount: 2,
    nominations: [
      {
        election_id: 1,
        election_name: "Election 1",
        nominations_close: "02/08/2024",
      },
      {
        election_id: 2,
        election_name: "Election 2",
        nominations_close: "02/08/2024",
      },
    ],
    openVotingCount: 2,
    voting: [
      {
        election_id: 1,
        election_name: "Election 1",
        voting_close: "02/08/2024",
        has_voted: false,
      },
      {
        election_id: 2,
        election_name: "Election 2",
        voting_close: "02/08/2024",
        has_voted: true,
      },
    ],
    faqs: [
      {
        question: "We use Single Transferable Voting (STV). What is STV?",
        answer: `
        <p>STV is a voting system that uses ranked-choice ballots. This gives you the option to ‘rank’ your preferred candidates. This means that when the candidate with the least votes is removed from the leadership contest, the votes given to them move to people’s second preferences and so on, until one candidate is the winner!</p>
        <p>Still unsure? These videos break it down for you:</p>
        <ul>
          <li><a href="https://www.youtube.com/watch?v=J1GLiPkXnII" target="_blank">What is Single Transferable Voting?</a></li>
          <li><a href="https://www.youtube.com/watch?v=ebqYVlB0UP0" target="_blank">STV voting on the Death Star in 1 minute</a></li>
        </ul>
        `,
        open: false,
      },
      {
        question: "Does STV allow tactical voting?",
        answer: `<p>Tactically, only ranking your best mate as first preference will not necessarily put the other candidates at a disadvantage. A candidate can win not by having the most ‘first’ votes from their own supporters, but by being ranked highly amongst everybody’s preferences. This makes the election more democratic and representative. Only ranking your first preference also means that you throw away your other opinions about who you’d rather win!</p>`,
        open: false,
      },
      {
        question: "How do you vote?",
        answer: `
        <p>
        You can vote on a desktop, mobile phone or through the SUMS App (<a
          href="https://apps.apple.com/gb/app/students-union/id1549685999"
          target="_blank"
          >Available from iOS App Store</a
        >.
        <a
          href="https://play.google.com/store/apps/details?id=com.studentsunionapp&gl=US&pli=1"
          target="_blank"
          >Available on Google Play Store</a
        >).
      </p>
      <ol>
        <li>Select which role you’d like to vote for</li>
        <li>View each candidate</li>
        <li>
          Vote using the STV system, ranking your choices.
          <a
            href="https://www.youtube.com/watch?v=J1GLiPkXnII&feature=youtu.be"
            target="_blank"
            >Further explanation</a
          >
        </li>
        <li>
          You may also choose to spoil your vote by ticking “Spoil vote” at the
          bottom of your ballot, which is a way to demonstrate your
          dissatisfaction with the available candidates while still
          participating in the democratic process.
          <a href="https://votingcounts.org.uk/spoilt-ballot" target="_blank"
            >Further explanation</a
          >
        </li>
        <li>
          You will automatically be taken to the next available role to vote
          for. If you would not like to vote for that role, you can return to
          the election homepage by clicking “Elections” at the top of the ballot
        </li>
      </ol>
      <p>
        If you need further assistance, want to find out more about voting or
        encounter any technical errors, get in touch with
        <a href="mailto:elections@yusu.org">elections@yusu.org</a>
      </p>
        `,
      },
      {
        question: "Who is R.O.N.?",
        answer: `
        <p>R.O.N isn't a candidate, but instead stands for ‘Re-Open Nominations’. You are able to vote for only R.O.N, or if you have voted for your preferred candidates and feel that the remaining candidates listed are not suitable for the position. Once you’ve voted for R.O.N, you may continue to rank candidates if you still would like to state your opinion about who gets elected. If R.O.N is elected to a position, then we will re-open nominations and hold another election for that position at a later date.</p>
        `,
      },
    ],
  },
};
