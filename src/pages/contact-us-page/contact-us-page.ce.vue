<template>
  <HeroHeader
    image="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_General.jpg"
    title="Contact Us"
  />
  <div
    class="body-style container mx-auto flex flex-col items-center justify-center pb-20"
  >
    <article>
      <h2 class="mb-2">York SU building opening times</h2>

      <p>
        Semester opening times:&nbsp;10am - 4pm, Monday to Friday, (from Monday
        8 September).
      </p>

      <p>
        Vacation opening times: 11am - 2pm, Monday to Friday,&nbsp;(until Friday
        5 September).
      </p>

      <p>&nbsp;</p>

      <h2 class="mb-2">Got a question?</h2>

      <p>
        Search through
        <a
          href="https://support.yorksu.org/support/home"
          class="text-blue-800 underline"
          >our FAQs</a
        >&nbsp;to&nbsp;find the answer!
      </p>

      <p>&nbsp;</p>

      <h2 class="mb-3">Get in touch</h2>

      <h3 class="mb-2">General enquiries</h3>

      <p>
        Come and visit us in the Union building during our opening hours, give
        us a ring on 01904 323724, or send us an email at
        <a href="mailto:helpdesk@yorksu.org" class="text-blue-800 underline"
          >helpdesk@yorksu.org</a
        >.
      </p>

      <p>&nbsp;</p>

      <h3 class="mb-6">Specific enquiries</h3>

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
    </article>
  </div>

  <div class="body-style flex w-full justify-center bg-[#f7f7f7]">
    <div class="container flex flex-col gap-8">
      <h2><meta charset="utf-8" />Where to find us</h2>
      <div class="flex w-full flex-wrap gap-8">
        <div class="flex flex-grow">
          <iframe
            allowfullscreen=""
            aria-hidden="false"
            frameborder="0"
            height="450"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d814.8908980123266!2d-1.0549032676943715!3d53.945621565148834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879303476496f6d%3A0xdc7fdec68c2a4ed!2sUniversity%20of%20York%20Students'%20Union%20(YUSU)!5e0!3m2!1sen!2suk!4v1613489348499!5m2!1sen!2suk"
            class="w-full"
            style="border: 0"
            tabindex="0"
            title="Location of York SU Reception on Google Maps"
          ></iframe>
        </div>

        <div>
          <p>
            University of York Students&#39; Union<br />
            The Student Centre<br />
            James College<br />
            Newton Way<br />
            York<br />
            North Yorkshire<br />
            YO10 5DD<br />
            United Kingdom
          </p>
        </div>
      </div>
    </div>
  </div>

  <article>
    <div class="body-style container mx-auto flex flex-col py-20">
      <h3 class="mb-2">Accessing campus buildings&nbsp;</h3>

      <p>
        You can view accessibility information for the Students&#39; Union and
        many other University buildings on the
        <a
          href="https://www.accessable.co.uk/university-of-york/access-guides/sc-yusu-student-centre"
          class="text-blue-800 underline"
        >
          AccessAble website</a
        >, or on the free AccessAble App.
      </p>

      <p>The AccessAble guide gives an overview of:</p>

      <ul class="list-disc pl-[18px]">
        <li>How to navigate the building</li>
        <li>Location of accessible toilets</li>
        <li>The layout and content of the different rooms</li>
      </ul>

      <p>&nbsp;</p>
    </div>
  </article>
  <Footer />
</template>

<script>
import HeroHeader from "../../components/HeroHeader/heroheader.ce.vue";
import Footer from "../../components/Footer/footer.ce.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
library.add(faFacebook, faInstagram, faXTwitter);
export default {
  name: "ContactUsPage",
  components: {
    HeroHeader,
    Footer,
    FontAwesomeIcon,
  },
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
