<template>
  <main class="w-full">
    <div class="container mx-auto">
      <div class="flex flex-col gap-y-12">
        <div class="flex flex-col gap-y-4" data-animation="fadeIn">
          <h2 class="text-5xl font-bold sm:text-6xl md:text-7xl xl:text-8xl">
            OUR STRATEGY
          </h2>
          <p>
            We are the University of York Students’ Union. We exist to make sure
            every student at York gets the most out of their time here. From
            hosting events, to running elections, overseeing clubs and
            societies, and providing a helping hand when it’s needed. The work
            we do is led by seven elected sabbatical officers, who represent
            students to the University, the city of York, and nationally.
          </p>
        </div>
        <div class="flex flex-col gap-y-4">
          <h3 class="text-center text-2xl font-semibold">Our Sabbs</h3>

          <Sabbs no-title />
        </div>
        <div class="bg-mustard mx-auto h-6 w-10/12"></div>
        <div class="flex flex-col gap-y-12">
          <h2 class="text-end text-4xl font-bold">OUR MISSION</h2>
          <div class="flex justify-center">
            <p class="text-center text-3xl font-semibold md:w-8/12">
              "To <span class="text-primary-red">empower</span> students, create
              <span class="text-primary-blue">connections</span>, and break down
              barriers so members can flourish as both students and citizens"
            </p>
          </div>
          <div
            class="mx-auto flex w-full max-w-4xl flex-col gap-x-4 gap-y-6 sm:flex-row"
          >
            <div
              class="flex flex-col gap-y-6 border border-[#eee] px-6 py-12 text-center shadow-lg hover:scale-105"
            >
              <h3 class="text-primary-red xs:text-3xl text-2xl font-semibold">
                EMPOWER
              </h3>
              <p>
                Empowering students to shape their education and communities, by
                enhancing their confidence, knowledge and capacity to drive
                transformative change.
              </p>
            </div>
            <div
              class="flex flex-col gap-y-6 border border-[#eee] px-6 py-12 text-center shadow-lg hover:scale-105"
            >
              <h3 class="text-primary-blue xs:text-3xl text-2xl font-semibold">
                CREATE CONNECTIONS
              </h3>
              <p>
                Students are more connected - with themselves, each other, and
                the communities around them, sharing experiences, developing and
                learning together.
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-y-8">
          <h2 class="text-4xl font-bold">Our Goals (by 2025)</h2>
          <h3 class="text-xl font-semibold">And how we are doing</h3>
          <div class="flex flex-col gap-y-8 border-l-2 border-black py-6">
            <div class="relative flex items-center pl-4">
              <div
                class="absolute -left-[8.6px] h-4 w-4 rounded-full bg-black"
              ></div>
              <p>
                See more than 70% of all students engage with us (through
                memberships, event attendance, being a representative, and/or
                voting in the elections)
                <span class="text-sm text-gray-500">
                  - In 2024/25, 64% of all eligible students have been tracked
                  in some form of engagement with the SU - so we haven't quite
                  met this target.
                </span>
              </p>
            </div>
            <div class="relative flex items-center pl-4">
              <div
                class="absolute -left-[8.6px] h-4 w-4 rounded-full bg-black"
              ></div>
              <p>
                We want to see 80% of students feel part of a community at the
                University of York.
                <span class="text-sm text-gray-500">
                  - In 2024/25, we asked students in the First Impressions
                  Survey "I feel I have had opportunities to become part of a
                  community at University", which saw an average of just over
                  80% agree. This average fell slightly to just below 80% in the
                  Lasting Impressions Survey carried out later in the year.
                </span>
              </p>
            </div>
            <div class="relative flex items-center pl-4">
              <div
                class="absolute -left-[8.6px] h-4 w-4 rounded-full bg-black"
              ></div>
              <p>
                We will invest £2 million per year in student services,
                generated through Union activity.
                <span class="text-sm text-gray-500">
                  - In 2024/25, we exceeded this target with an income of
                  £2,347,855 to invest back into student services.
                </span>
              </p>
            </div>
          </div>
        </div>
        <div class="bg-mustard mx-auto h-6 w-10/12"></div>
        <div class="flex flex-col gap-y-8">
          <h2 class="text-4xl font-bold">MAKING IT HAPPEN</h2>
          <h3 class="text-xl font-semibold">
            Our key ‘enablers’ (how we are working to achieve these goals)
          </h3>
          <div class="flex">
            <div
              class="xs:px-10 flex items-center justify-center px-6 text-4xl font-bold"
            >
              1
            </div>
            <div class="flex flex-col">
              <h4 class="text-lg font-semibold">Using data and insight</h4>
              <p>
                We will create a deep, continually developing understanding of
                the union’s members, their needs and the environment. This will
                include individual and collective engagement tracking and
                research.
              </p>
            </div>
          </div>
          <div class="flex">
            <div class="flex flex-col">
              <h4 class="text-lg font-semibold">Effective decision making</h4>
              <p>
                With innovative, efficient decision-making, we can address the
                needs, insights and interests of our members quickly, allocating
                resources to have the best impact possible.
              </p>
            </div>
            <div
              class="xs:px-10 flex items-center justify-center px-6 text-4xl font-bold"
            >
              2
            </div>
          </div>
          <div class="flex">
            <div
              class="xs:px-10 flex items-center justify-center px-6 text-4xl font-bold"
            >
              3
            </div>
            <div class="flex flex-col">
              <h4 class="text-lg font-semibold">Powerful communication</h4>
              <p>
                With consistent communications, we can engage and mobilise
                students, driving constant feedback and insight into student
                life.
              </p>
            </div>
          </div>
        </div>
        <div class="bg-mustard mx-auto h-6 w-10/12"></div>
        <div class="flex flex-col gap-y-8">
          <h2 class="text-4xl font-bold">
            WHAT DOES THIS ALL MEAN FOR STUDENTS?
          </h2>
          <p>
            Each year, our new set of Sabbatical Officers create a group
            manifesto to guide their work for the upcoming year. Using the York
            SU strategy as a foundation, they build upwards to create tangible
            and measurable actions, which are more immediately related to the
            student journey here in York(such as house prices) creating a local
            action plan for the year.
          </p>
        </div>
      </div>
    </div>
    <div class="bg-beige">
      <div class="container mx-auto py-12">
        <div class="flex flex-col gap-y-8">
          <h3 class="text-center text-2xl font-semibold">
            their focusses for 2025/26 are:
          </h3>
          <div class="flex flex-col gap-x-4 gap-y-4 md:flex-row">
            <div
              class="flex justify-center gap-y-6 border border-[#eee] bg-white p-6 text-center shadow-lg hover:scale-105 md:w-1/4 md:p-12"
            >
              <p class="mb-0 flex items-center font-semibold">
                Inclusion and Wellbeing
              </p>
            </div>
            <div
              class="flex justify-center gap-y-6 border border-[#eee] bg-white p-6 text-center shadow-lg hover:scale-105 md:w-1/4 md:p-12"
            >
              <p class="mb-0 flex items-center font-semibold">Cost of Living</p>
            </div>
            <div
              class="flex justify-center gap-y-6 border border-[#eee] bg-white p-6 text-center shadow-lg hover:scale-105 md:w-1/4 md:p-12"
            >
              <p class="mb-0 flex items-center font-semibold">Employability</p>
            </div>
            <div
              class="flex justify-center gap-y-6 border border-[#eee] bg-white p-6 text-center shadow-lg hover:scale-105 md:w-1/4 md:p-12"
            >
              <p class="mb-0 flex items-center font-semibold">
                Access to campus spaces
              </p>
            </div>
          </div>
          <!-- <article class="body-style flex justify-center">
            <a
              href="https://assets-cdn.sums.su/YU/Documents/sabb_stratrgy.pdf"
              class="text-lg"
              >Read the full manifesto here</a
            >
          </article> -->
        </div>
      </div>
    </div>
    <div class="container mx-auto py-12">
      <div class="flex flex-col gap-y-8">
        <h2 class="text-4xl font-bold">OUR IMPACT REPORT</h2>
        <p>
          A great way of measuring both the impact of the Union and our students
          - and also a great practice in acknowledging the positive things that
          come from collaborating - is the annual Impact Report - a celebration
          of all the good things from that academic year. But it’s also a chance
          to reflect on what could have been done differently and look forward
          to the year ahead!
        </p>
        <Button
          title="View The Impact Report"
          is-primary
          url="https://assets-cdn.sums.su/YU/Documents/Impact-Reports/York_SU_Impact_Report_2023-24.pdf"
        />
      </div>
    </div>
  </main>
</template>

<script>
import Sabbs from "../Sabbs/sabbs.ce.vue";
import Button from "../button/button.ce.vue";
export default {
  name: "Strategy",
  components: {
    Button,
    Sabbs,
  },
};
</script>
