<template>
  <div class="flex flex-col gap-y-6">
    <h2 class="text-3xl font-bold">Edit Manifesto</h2>

    <div class="flex flex-col">
      <div
        class="flex w-full items-center justify-between gap-x-2 border-b-2 py-2"
      >
        <h3 class="mb-0 text-xl">UNION AFFAIRS OFFICER</h3>
        <Button title="Edit" href="/elections/nominate/1946" is-student-voice />
      </div>

      <div
        class="flex w-full items-center justify-between gap-x-2 border-b-2 py-2"
      >
        <h3 class="mb-0 text-xl">UNION DEVELOPMENT OFFICER</h3>
        <Button title="Edit" href="/elections/nominate/1946" is-student-voice />
      </div>

      <div
        class="flex w-full items-center justify-between gap-x-2 border-b-2 py-2"
      >
        <h3 class="mb-0 text-xl">ACADEMIC OFFICER</h3>
        <Button title="Edit" href="/elections/nominate/1946" is-student-voice />
      </div>

      <div
        class="flex w-full items-center justify-between gap-x-2 border-b-2 py-2"
      >
        <h3 class="mb-0 text-xl">SPORTS OFFICER</h3>
        <Button title="Edit" href="/elections/nominate/1946" is-student-voice />
      </div>

      <div
        class="flex w-full items-center justify-between gap-x-2 border-b-2 py-2"
      >
        <h3 class="mb-0 text-xl">EQUALITY AND INCLUSION OFFICER</h3>
        <Button title="Edit" href="/elections/nominate/1946" is-student-voice />
      </div>

      <div
        class="flex w-full items-center justify-between gap-x-2 border-b-2 py-2"
      >
        <h3 class="mb-0 text-xl">COMMUNITY AND WELLBEING OFFICER</h3>
        <Button title="Edit" href="/elections/nominate/1946" is-student-voice />
      </div>

      <div class="flex w-full items-center justify-between gap-x-2 py-2">
        <h3 class="mb-0 text-xl">ACTIVITIES OFFICER</h3>
        <Button title="Edit" href="/elections/nominate/1946" is-student-voice />
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
};
</script>
