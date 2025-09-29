<template>
  <div class="masonry-container w-full">
    <div
      v-for="department in departments"
      :key="department.name"
      class="masonry-item mb-4 break-inside-avoid rounded border-2"
    >
      <div class="h-2 w-full" :class="`${department.colour}`"></div>
      <div class="p-4">
        <h3 class="mb-2 text-xl font-bold">{{ department.name }}</h3>
        <ul class="list-disc pl-[18px]">
          <li v-for="email in department.emails" :key="email.email">
            <div v-if="email.description" class="mb-1 text-sm">
              {{ email.description }}
            </div>
            <a
              :href="`mailto:${email.email}`"
              class="break-all text-blue-800 underline"
              >{{ email.email }}</a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="masonry-item mb-4 break-inside-avoid rounded border-2">
      <div class="bg-primary-red h-2 w-full"></div>
      <div class="p-4">
        <h3 class="mb-2 text-xl font-bold">Social Media</h3>
        <div class="flex items-center justify-center py-4">
          <ul class="flex gap-8">
            <li>
              <a
                href="https://facebook.com/yorkunisu"
                aria-label="York SU Facebook"
              >
                <FontAwesomeIcon
                  icon="fa-brands fa-facebook"
                  class="h-8 w-8"
                ></FontAwesomeIcon>
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/yorkunisu"
                aria-label="York SU Instagram"
              >
                <FontAwesomeIcon
                  icon="fa-brands fa-instagram"
                  class="h-8 w-8"
                ></FontAwesomeIcon>
              </a>
            </li>
            <li>
              <a href="https://x.com/yorkunisu" aria-label="York SU X">
                <FontAwesomeIcon
                  icon="fa-brands fa-x-twitter"
                  class="h-8 w-8"
                ></FontAwesomeIcon>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactUsTiles",
  data() {
    return {
      departments: [
        {
          name: "Advice and Support Centre",
          emails: [{ email: "advice@yorksu.org", description: "" }],
          colour: "bg-advice-green",
        },
        {
          name: "Societies & Student Media",
          emails: [{ email: "societies@yorksu.org", description: "" }],
          colour: "bg-mustard",
        },
        {
          name: "Sports",
          emails: [
            {
              email: "collegesport@yorksu.org",
              description: "For college sport enquiries:",
            },
            {
              email: "socialsport@yorksu.org",
              description: "For social sport enquiries:",
            },
            {
              email: "sportsadmin@yorksu.org",
              description: "For BUCS enquiries:",
            },
          ],
          colour: "bg-mustard",
        },
        {
          name: "Helpdesk",
          emails: [
            {
              email: "helpdesk@yorksu.org",
              description: "For helpdesk enquiries:",
            },
            {
              email: "transport@yorksu.org",
              description: "For transport enquiries:",
            },
          ],
          colour: "bg-light-pink",
        },
        {
          name: "IT",
          emails: [{ email: "it@yorksu.org", description: "" }],
          colour: "bg-beige",
        },
        {
          name: "Events and advertising",
          emails: [
            { email: "events@yorksu.org", description: "For event enquiries:" },
            {
              email: "advertising@yorksu.org",
              description: "For advertising enquiries:",
            },
          ],
          colour: "bg-primary-red",
        },
        {
          name: "Communications",
          emails: [{ email: "communications@yorksu.org", description: "" }],
          colour: "bg-primary-red",
        },
        {
          name: "Student Voice",
          emails: [{ email: "engagement@yorksu.org", description: "" }],
          colour: "bg-primary-red",
        },
        {
          name: "Finance",
          emails: [
            {
              email: "finance@yorksu.org",
              description: "For student group and general enquiries:",
            },
            {
              email: "finance-payment-request@yorksu.org",
              description: "For student group payment request authorisations:",
            },
            {
              email: "finance-suppliers@yorksu.org",
              description: "For buying enquiries:",
            },
            {
              email: "finance-customer@yorksu.org",
              description: "For selling enquiries:",
            },
          ],
          colour: "bg-mustard",
        },
        {
          name: "Complaints",
          emails: [{ email: "complaints@yorksu.org", description: "" }],
          colour: "bg-mustard",
        },
      ],
    };
  },
};
</script>
