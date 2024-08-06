import "./elections-resources.component.js";

export default {
  title: "Components/Elections Resources",
  component: "elections-resources",
};

export const Default = {
  args: {
    page_content: `
    <div class="flex flex-col gap-y-4">
        <h2 class="text-2xl font-bold">Why vote?</h2>
        <p>
          <a
            href="https://assets-cdn.sums.su/YU/elections2023/Why_vote.jpg"
            target="_blank"
            >Why Voting Matters</a
          >
        </p>
        <p>
          <a href="https://yusu.org/news/article/key_achievements"
            >Key Achievements by Past Officers</a
          >
        </p>
        <p>
          <a href="https://yusu.org/news/tag/yusuggestions"
            >Past Policies - Then and Now</a
          >
        </p>
      </div>

      <div class="flex flex-col gap-y-4">
        <h2 class="text-2xl font-bold">Thinking about running?</h2>
        <p>
          <a
            href="https://assets-cdn.sums.su/YU/elections2023/YUSU_Elections_-_Nominate.pdf"
            target="_blank"
            >What do I need to nominate?</a
          >
        </p>
        <p>
          <a
            href="https://assets-cdn.sums.su/YU/Documents/Voice/Officer_Manifesto_Library.pdf"
            >Manifesto library</a
          >
        </p>
        <p>
          <a
            href="https://assets-cdn.sums.su/YU/elections2023/YUSU_Elections_Handbooks.pdf"
            >What are elections all about?</a
          >
        </p>
        <p>
          <a
            href="https://docs.google.com/document/d/1er-sATjUvgp5AumVWV41-uMkSKJJyCHrdSifaK0PbX0/edit?usp=sharing"
            target="_blank"
            >YUSU Officer Election Rules</a
          >
        </p>
      </div>

      <div class="flex flex-col gap-y-4">
        <h2 class="text-2xl font-bold">What is it like being an Officer?</h2>
        <p>
          Below are interviews with past Student Union officers talking about
          their time in the role and where it has led them in life.
        </p>
        <p>
          <a
            href="https://www.youtube.com/watch?v=DQUitNnWLsA&amp;t=3s"
            target="_blank"
            >Interview with Gemma Turner</a
          >
        </p>
        <p>
          <a href="https://www.youtube.com/watch?v=c1lxeMq8xIY" target="_blank"
            >Interview with Lee Macneall</a
          >
        </p>
        <p>
          <a
            href="https://www.youtube.com/watch?v=73glZ75cmdo&amp;t=120s"
            target="_blank"
            >Interview with Laura Carruthers</a
          >
        </p>
        <p>
          <a
            href="https://assets-cdn.sums.su/YU/uploads/Being_a_Sabb.pdf"
            target="_blank"
            >Being a Sabb</a
          >&nbsp;-
          <a
            href="https://docs.google.com/document/d/1pF5kobh-KOmVCngjWX4PsnLZpIamd9mAM_2TiPwP0fo/edit?usp=sharing"
            target="_blank"
            >[plain text version]</a
          >
        </p>
      </div>

      <div class="flex flex-col gap-y-4">
        <h2 class="text-2xl font-bold">Skills workshops</h2>
        <p>
          <a
            href="https://www.youtube.com/watch?v=w5Ph13yATr0&amp;t=2s"
            target="_blank"
            >Introduction to Leadership</a
          >
        </p>
        <p>
          <a
            href="https://www.youtube.com/watch?v=xkkw-Dxz8-g&amp;t=8s"
            target="_blank"
            >Introduction to Professional Communication</a
          >
        </p>
        <p>
          <a
            href="https://www.youtube.com/watch?v=GkZ3wyDAfSE&amp;t=2s"
            target="_blank"
            >Introduction to Project Management</a
          >
        </p>
        <p>
          <a
            href="https://www.youtube.com/watch?v=OWkpDg0ZLSU&amp;t=7s"
            target="_blank"
            >Hack Yourself - Campaigning and building a personal brand</a
          >
        </p>
        <p>
          <a
            href="https://www.youtube.com/watch?v=65YbyEHjsEA&amp;t=56s"
            target="_blank"
            >Student Activism - theories and discussion with inspirational past
            officer Effy Hayle</a
          >
        </p>
      </div>

      <div class="flex flex-col gap-y-4">
        <h2 class="text-2xl font-bold">Useful reading</h2>
        <p>
          <a
            href="https://www.york.ac.uk/media/abouttheuniversity/UniversityOfYork_APP_2020-21_V1_10007167%20(2).pdf"
            target="_blank"
            >University of York&rsquo;s Access and Participation Plan 2020/21 -
            2024/25
          </a>
        </p>
        <p>
          <a href="https://wonkhe.com/" target="_blank">WonkHe</a> - a platform
          with lots of useful articles about Higher Education and
          Students&rsquo; Unions. Subscribe for free!
        </p>
        <p><a href="https://www.nus.org.uk/" target="_blank">NUS Website</a></p>
        <p>
          <a href="https://www.officeforstudents.org.uk/" target="_blank"
            >Office for Students Website</a
          >
        </p>
        <p>
          <a
            href="https://www.york.ac.uk/about/mission-strategies/"
            target="_blank"
            >University of York&rsquo;s Strategy</a
          >
        </p>
        <p>
          <a
            href="https://assets-cdn.sums.su/YU/Documents/YUSU_Impact_Report_2021-22.pdf"
            target="_blank"
            >YUSU Impact Report 2021/22</a
          >
        </p>
        <p>
          <a
            href="https://www.huffpost.com/entry/write-manifesto_b_5575496?guccounter=1&amp;guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&amp;guce_referrer_sig=AQAAAKCdAV4asO1V1e__974tgDk-ijGC3ZSSvBoRNmuYVZIwp2OmZ6X2ZzRIyxC-TjvUgzC-9REa1rqYUBPMgyaOEyjnpWeWb6CVt91B1nKGy6IZN5HlTT2gH3jAbKvdGfy53Mw3jP7KjqtOamcLlHSoOKJqvbMsFIRoSwq5jC2Se2EP"
            target="_blank"
            >How to write a manifesto</a
          >
        </p>
      </div>

      <div class="flex flex-col gap-y-4">
        <h2 class="text-2xl font-bold">Contact us</h2>
        <p>
          We have a wide range of staff who can help and support you through the
          election process. There is a staff member for every role and you can
          contact them for information about the role, advice and support. If
          you are interested in talking to a member of staff that works closely
          with a specific role, email
          <a href="mailto:elections@yusu.org">elections@yusu.org</a> and we will
          point you in the right direction.
        </p>
        <p>
          <a href="https://yusu.org/about-us/staff"
            >You can learn more about our staff structure here.</a
          >
        </p>
      </div>
    `,
    terms: [
      {
        terminology: "Active campaigning",
        explanation:
          "<p>The time when candidates seek out students’ vote through distributing materials, putting up posters, talking people and promoting themselves online</p>",
      },
      {
        terminology: "By-Elections",
        explanation:
          "<p>A special set of elections held outside the usual election period to fill a vacant role</p>",
      },
      {
        terminology: "Candidate",
        explanation:
          "<p>A student who has put themselves forward in an election to represent you!</p>",
      },
      {
        terminology: "Debate",
        explanation:
          "<p>An event where candidates can discuss campaign issues, usually involving audience questions</p>",
      },
      {
        terminology: "Delegate",
        explanation:
          "<p>A person chosen or elected to represent others, usually at a conference. We elect delegates to represent the needs of York students at the National Union of Students Conference</p>",
      },
      {
        terminology: "Deputy Returning Officer (DRO)",
        explanation:
          "<p>The person who oversees the validity of the elections, including making sure that candidates follow the rules</p>",
      },
      {
        terminology: "Election Results Night (ERN)",
        explanation:
          "<p>The night when we announce the results of the Election! This is open to all students and often broadcasted by our Student Media groups</p>",
      },
      {
        terminology: "Liberation networks",
        explanation:
          "<p>Networks that support and represent specific groups of students, such as BAME students, Disabled students, local and commuting students, LGBTQ+ students and/or working-class students. We have eight liberation networks, as well as two community networks (Environment & Ethics, Raising and Giving), and each are represented by <a href='https://yorksu.org/officers'>Part-time Officers</a> who are elected by you!</p>",
      },
      {
        terminology: "Manifesto",
        explanation:
          "<p>A published list of policies, campaigns and ideas that a candidate would like to work on if they are elected</p>",
      },
      {
        terminology: "Nomination",
        explanation:
          "<p>The way that students put themselves forward to become a candidate in an election. If you encounter any issues nominating yourself, you can get in touch with <a href='mailto:elections@yusu.org'>elections@yusu.org</a></p>",
      },
      {
        terminology: "National Union of Students (NUS)",
        explanation:
          "<p>This is the national voice of students which helps students campaign and provides advice. They host a national conference that we send delegates to in order to vote on national policy</p>",
      },
      {
        terminology: "Part-time Officers",
        explanation:
          "<p>Students elected to lead Networks. These are voluntary roles that are held alongside a student’s studies, which makes them part-time rather than full-time roles</p>",
      },
      {
        terminology: "Polling station",
        explanation: "<p>A physical location where you can vote</p>",
      },
      {
        terminology: "Re-Open Nominations (RON)",
        explanation:
          "<p>An option to select if you do not agree with any of the candidates. If RON wins, a new election for that position is held</p>",
      },
      {
        terminology: "Quorum",
        explanation:
          "<p>The minimum number of votes required for a policy or referendum to be valid</p>",
      },
      {
        terminology: "Referendum",
        explanation:
          "<p>When all students are asked to give their opinion or make a decision on an issue. Referendum are typically made up of “for” and “against” campaigns</p>",
      },
      {
        terminology: "Sabbs",
        explanation:
          "<p>Short for “Sabbatical Officer”, these are officers who are elected to work full-time, representing students. A “sabbatical” is a paid period of leave. We use this term since students can take a sabbatical at any point of their studies to become a Sabb, including the period following their final year</p>",
      },
      {
        terminology: "Self-define",
        explanation:
          "<p>This is how you identify yourself. Our liberation networks require students to self-define as a member which that network represents. It might seem obvious to yourself that you define as Black or as a woman or LGBT+ or working class etc. but we use self-definition to avoid any confusion</p>",
      },
      {
        terminology: "Single-Transferable Vote (STV)",
        explanation:
          "<p>A voting system where you rank candidates by preference</p>",
      },
      {
        terminology: "Trustee",
        explanation:
          "<p>A person who is responsible for overseeing the work of the Union and setting the strategic direction. Our <a href='https://yorksu.org/about-us'>Trustee Board</a> includes three elected Student Trustees, and each Sabb is also a Trustee. There are also appointed external members of the board</p>",
      },
      {
        terminology: "Vote",
        explanation: "<p>A formal indication of your candidate choice(s)</p>",
      },
      {
        terminology: "Yorksu",
        explanation:
          "<p>University of York Students’ Union! We’re here for all students and are led by your elected officers to represent your voice. Whilst we work closely with the University on many projects, we are a separate, charitable organisation</p>",
      },
    ],
    faqs: [
      {
        question: "Can I run as a First or Second Year student?",
        answer: `
        <p>Absolutely! If you get elected as a Faculty Rep, Part-Time Officer or Accountability and Scrutiny Chair, you carry out your responsibilities alongside your studies in your second or third year. If you are elected as a Sabbatical Officer, the University lets you take a year out of your studies to work full-time!</p>
        `,
      },
      {
        question: "Are these roles only for undergraduates?",
        answer: `
        <p>Nope! Any postgrad currently at the University can run for a position! In fact, we really encourage it. We don’t often have postgraduate candidates, meaning that the unique learning and student experiences they go through aren’t always fully represented, which needs to change. The only role restricted to undergraduate students only are the Faculty Rep positions.</p>
        <p>Part-Time Officer positions and other non-sabbatical roles (Faculty Rep and Accountability and Scrutiny Chair) require a continuous period of study throughout your time in office. This means you cannot stand as an Officer if you are moving from an Undergraduate course to a Masters course, or Masters course to PhD.</p>
        `,
      },
      {
        question: "Can I run for any position?",
        answer: `
        <p>*Nearly* any position! Faculty Reps need to be studying in that Faculty and for some of the Part-Time Officer roles you need to identify as part of the community you intend to represent (for example, you need to identify as LGBTQ+ to nominate yourself to be LGBTQ+ Officer). You can find the full eligibility details of each role on our Positions page. Be aware that you can only nominate yourself for one position!</p>
        `,
      },
      {
        question: "Can I run if I’m an International student?",
        answer: `
        <p>Yes, and you should! 20% of all students at the University of York are international, meaning there are loads of students who would benefit from you representing their views.</p>
        <p>You can run for any role as long as you are physically in York for the next academic year. If you get elected to a full-time Sabbatical role, you won’t need a new Visa. The University will sponsor your Tier 4 Visa, which allows you to work and undertake a full-time Sabbatical Officer post. You can do the role part way through your course or in the academic year directly after you finish.</p>
        `,
      },
      {
        question: "Do I need to have lots of experience?",
        answer: `
        <p>Nope! All roles involve a range of skills, experiences and viewpoints to be effective meaning there is no ‘one-size-fits-all’ candidate out there.</p>
        <p>People from all sorts of different backgrounds run in the elections. What matters most is that you’re passionate about the role, have ambitious but realistic ideas for improving student life, and are willing to work with others to make them happen. Whichever role you’re interested in, you will get training and support from staff at YUSU who will help develop your ideas and get the most out of your year in office.</p>
        `,
      },
      {
        question: "I don’t think I can run a campaign on my own!",
        answer: `
        <p>Everybody feels like this, don’t worry! Every candidate gets a staff mentor and we’ll put on loads of training workshops for skills like public speaking and social media to help you run a great campaign. If you’re going for a PTO position, you can run as a pair with another student and share the role if you win!</p>
        `,
      },
      {
        question: "Do I need to know lots of people to be a candidate?",
        answer: `
        <p>Candidates sometimes feel like they don’t know enough people to run, but we work hard to give everybody an equal platform to ensure students hear about you and understand your ideas. We publish your manifesto online, run engagement events, and student media groups will promote all candidates! You don’t have to lead a big Society, College or other student group to win!</p>
        `,
      },
      {
        question: "How much time does being an Officer involve?",
        answer: `
        <p>Being a Sabbatical Officer is a full time job with a 35 hour per week flexi-time contract (meaning if you end up working over those hours during a busy week, you can take that time back later on).</p>
        <p>The Part Time Officers, Faculty Rep and Accountability and Scrutiny Chair roles are voluntary so the time commitments are less and much more flexible. We estimate the time commitment is around 5 hours a week for Faculty Reps during term time and about 5-10 hours for PTOs. But it is really up to you to manage your time and there will be busier periods like any voluntary role. Remember your degree does come first and we’ll be here to help you manage your work effectively.</p>
        `,
      },
      {
        question: "Will running in the election cost me money?",
        answer: `
        <p>You don’t have to spend a penny if you don’t want to and lots of people have won without spending much at all. However, we want to make sure that you’re not left out of pocket. There is a maximum budget of £35 (all of which is reimbursable) for Full-Time Officer candidates and £25 (all of which is reimbursable) for Part-Time Officer candidates and all other positions.</p>
        `,
      },
      {
        question: "When do I need to finalise my manifesto?",
        answer: `
        <p>It’s okay if you haven’t come up with your full manifesto by the time you nominate. You will have a whole additional week after the nomination deadline to work on your manifesto. During this week (which we call Development Week) there will be workshops and resources to help you fine-tune your ideas. We encourage you to also come and have a chat with YUSU staff members who have extensive knowledge which can help you to decide what is and isn’t an achievable manifesto promise.</p>
        `,
      },
    ],
  },
};
