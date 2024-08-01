import "./elections-list.component.js";

export default {
  title: "Components/Elections List",
  component: "elections-list",
};

export const Default = {
  args: {
    openNominationCount: 0,
  },
};

export const WithElections = {
  args: {
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
    ],
  },
};
