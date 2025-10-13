<template>
  <div
    class="xs:flex-row flex h-min w-full flex-col items-center gap-x-8 gap-y-4 rounded-lg bg-gray-100 p-4 shadow-sm md:w-fit md:flex-col"
  >
    <img
      alt="Photo of {{ officer.name }}"
      class="xs:w-[200px] aspect-square h-fit w-full rounded-full object-contain md:w-[300px]"
      :src="
        officer.imageUrl ||
        'https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Yellow.webp'
      "
    />
    <div class="flex w-full flex-col justify-center md:justify-start">
      <h2 class="text-2xl font-semibold">{{ officer.name }}</h2>
      <p>{{ position }}</p>
      <div class="mt-4">
        <ActivitiesContacts
          :facebook="officer.facebook"
          :email="officer.email"
          :twitter="officer.twitter"
          :instagram="officer.instagram"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ActivitiesContacts from "../ActivitiesContacts/activitiescontacts.ce.vue";
export default {
  name: "OfficerTile",
  components: {
    ActivitiesContacts,
  },
  props: {
    uri: {
      type: String,
      default: "",
    },
    position: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      officers: [
        {
          uri: "union-affairs",
          name: "Lewis Parrey",
          imageUrl:
            "https://assets-cdn.sums.su/YU/Student_voice/LP_website_pic.jpg",
          email: "unionaffairsofficer@yorksu.org",
          twitter: "AffairsYorkSU",
          instagram: "affairsyorksu",
          facebook: "",
        },
        {
          uri: "union-development",
          name: "Anna Lindberg",
          imageUrl:
            "https://assets-cdn.sums.su/YU/Student_voice/ALB_website_pic.jpg",
          email: "uniondevofficer@yorksu.org",
          twitter: "developyorksu",
          instagram: "developmentyorksu",
          facebook: "developmentyorksu",
        },
        {
          uri: "academic",
          name: "Aya Haidar",
          imageUrl:
            "https://assets-cdn.sums.su/YU/Student_voice/AYA_H_website_pic.jpg",
          email: "academicofficer@yorksu.org",
          twitter: "",
          instagram: "academicyorksu",
          facebook: "",
        },
        {
          uri: "equality",
          name: "Abi Harrison",
          imageUrl:
            "https://assets-cdn.sums.su/YU/Student_voice/AH_website_pic.jpg",
          email: "equalityinclusionofficer@yorksu.org",
          twitter: "",
          instagram: "equalityyorksu",
          facebook: "",
        },
        {
          uri: "community",
          name: "Sam Dickinson",
          imageUrl:
            "https://assets-cdn.sums.su/YU/Student_voice/SD_website_pic.jpg",
          email: "communitywellbeingofficer@yorksu.org",
          twitter: "",
          instagram: "communityyorksu",
          facebook: "",
        },
        {
          uri: "activities",
          name: "Kaitlyn Beattie-Zarb",
          imageUrl:
            "https://assets-cdn.sums.su/YU/Student_voice/KBZ_website_pic.jpg",
          email: "activitiesofficer@yorksu.org",
          twitter: "",
          instagram: "activitiesyorksu",
          facebook: "",
        },
        {
          uri: "sport",
          name: "Darcy Graham",
          imageUrl:
            "https://assets-cdn.sums.su/YU/Student_voice/DG_website_pic.jpg",
          email: "sportofficer@yorksu.org",
          twitter: "",
          instagram: "sportsyorksu",
          facebook: "",
        },
      ],
    };
  },
  computed: {
    officer() {
      return this.officers.find((officer) => officer.uri === this.uri) || {};
    },
  },
};
</script>
