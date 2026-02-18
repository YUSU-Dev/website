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
          id: "2428",
        },
        {
          title: "ACADEMIC OFFICER",
          id: "2432",
        },
        {
          title: "SPORTS OFFICER",
          id: "2430",
        },
        {
          title: "COMMUNITY AND INCLUSION OFFICER",
          id: "2434",
        },
        {
          title: "ACTIVITIES OFFICER",
          id: "2431",
        },
      ],
    };
  },
};
</script>
