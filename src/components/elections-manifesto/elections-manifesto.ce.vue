<template>
  <div class="flex flex-col gap-y-6">
    <h2 class="text-3xl font-bold">Edit Manifesto</h2>

    <div class="flex flex-col">
      <div
        v-for="election in elections"
        :key="election.title"
        class="flex w-full items-center justify-between gap-x-2 border-b-2 py-2"
      >
        <h3 class="mb-0 text-xl">{{ election.title }}</h3>
        <Button
          title="Edit"
          :href="'/elections/nominate/' + election.id"
          is-student-voice
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../button/button.ce.vue";
export default {
  name: "ElectionsManifesto",
  components: {
    Button,
  },
  data() {
    return {
      elections: [
        {
          title: "UNION AFFAIRS OFFICER",
          id: "2311",
        },
        {
          title: "UNION DEVELOPMENT OFFICER",
          id: "2312",
        },
        {
          title: "ACADEMIC OFFICER",
          id: "2313",
        },
        {
          title: "SPORTS OFFICER",
          id: "2318",
        },
        {
          title: "EQUALITY AND INCLUSION OFFICER",
          id: "2314",
        },
        {
          title: "COMMUNITY AND WELLBEING OFFICER",
          id: "2315",
        },
        {
          title: "ACTIVITIES OFFICER",
          id: "2317",
        },
      ],
    };
  },
};
</script>
