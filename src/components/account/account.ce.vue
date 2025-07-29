<template>
  <div class="flex w-full flex-col justify-center gap-x-12 gap-y-8 sm:flex-row">
    <ul class="flex flex-col gap-y-2">
      <li
        v-for="section in sections"
        :key="section.title"
        class="btn-primary shadow-xs"
        :class="{ 'bg-light-pink!': activeSection === section.title }"
      >
        <button
          @click="activeSection = section.title"
          class="h-full w-full px-5 py-2 text-start text-xl"
        >
          {{ section.title }}
        </button>
      </li>
    </ul>

    <div
      class="hidden grow flex-col"
      :class="{ 'flex!': activeSection === 'Me' }"
    >
      <div class="h-min w-full bg-gray-100 px-3 py-2">
        <h2 class="text-xl font-semibold">My Details</h2>
      </div>
      <div class="mt-4 mb-10 flex flex-col gap-y-8 px-3 py-2">
        <div class="grid w-fit grid-cols-1 gap-y-2 sm:grid-cols-2">
          <p class="font-semibold">Full Name:</p>
          <p>Daniel Parker</p>
          <p class="font-semibold">University Email:</p>
          <p>daniel.parker@york.ac.uk</p>
        </div>
        <div class="flex flex-col">
          <h3 class="mb-4 text-lg font-semibold">Preferred Name</h3>
          <label for="preferred_name" class="mb-2"
            >Change your preferred name</label
          >
          <input
            id="preferred_name"
            name="preferred_name"
            class="form-input mb-2"
            type="text"
            placeholder="Preferred name"
            autocomplete="given-name"
            required
          />
          <button
            type="submit"
            class="btn btn-primary mb-4 flex w-fit items-center px-4"
          >
            Submit
          </button>
          <div class="flex flex-col gap-x-4 gap-y-2 lg:flex-row">
            <button class="btn btn-primary flex w-fit items-center">
              Reset preferred name
            </button>
            <p>
              * This will reset any changes you have made to your Preferred
              first name
            </p>
          </div>
        </div>
      </div>
      <div class="h-min w-full bg-gray-100 px-3 py-2">
        <h2 class="text-xl font-semibold">My Academic Details</h2>
      </div>
      <div class="mt-4 flex flex-col gap-y-8 px-3 py-2">
        <div class="grid w-fit grid-cols-2 gap-x-4 gap-y-2">
          <p class="font-semibold">College:</p>
          <p>N/A</p>
          <p class="font-semibold">School:</p>
          <p>N/A</p>
          <p class="font-semibold">Course:</p>
          <p>N/A</p>
          <p class="font-semibold">Year of Study:</p>
          <p>N/A</p>
        </div>
      </div>
    </div>

    <!-- <div
      class="hidden grow"
      :class="{ 'flex!': activeSection === 'Interests' }"
    >
      <div class="p-2">
        <h2 class="text-2xl font-semibold">My Interests</h2>
      </div>
    </div> -->

    <div
      class="hidden grow flex-col"
      :class="{ 'flex!': activeSection === 'Activities' }"
    >
      <div class="h-min w-full bg-gray-100 px-3 py-2">
        <h2 class="text-xl font-semibold">My Activities</h2>
      </div>
      <div class="mt-4 mb-10 flex flex-col gap-y-8 px-3 py-2">
        <div class="flex flex-col">
          <h3 class="mb-4 text-lg font-semibold">Nothing to show</h3>
          <p>
            You are not currently involved in any activities. If you'd like to
            join one, <a href="/sports">take a look here.</a>
          </p>
        </div>
      </div>
      <div class="h-min w-full bg-gray-100 px-3 py-2">
        <h2 class="text-xl font-semibold">My Committees</h2>
      </div>
      <div class="mt-4 mb-10 flex flex-col gap-y-8 px-3 py-2">
        <div class="flex flex-col">
          <h3 class="mb-4 text-lg font-semibold">Nothing to show</h3>
          <p>You are not currently involved in any committees.</p>
        </div>
      </div>
    </div>

    <div
      class="hidden grow flex-col"
      :class="{ 'flex!': activeSection === 'Purchases' }"
    >
      <div class="h-min w-full bg-gray-100 px-3 py-2">
        <h2 class="text-xl font-semibold">My Purchase History</h2>
      </div>
      <div class="mt-4 mb-10 flex flex-col gap-y-8 px-3 py-2">
        <div class="flex flex-col">
          <h3 class="mb-4 text-lg font-semibold">Nothing to show</h3>
          <p>There are currently no purchases to show.</p>
        </div>
      </div>
    </div>

    <div
      class="hidden grow flex-col"
      :class="{ 'flex!': activeSection === 'Settings' }"
    >
      <div class="h-min w-full bg-gray-100 px-3 py-2">
        <h2 class="text-xl font-semibold">Email Subscriptions</h2>
      </div>
      <div
        v-for="group in sub_groups"
        :key="group.name"
        class="mt-4 flex flex-col px-3 py-2"
      >
        <h3 class="mb-4 text-lg font-semibold">{{ group.name }}</h3>
        <div
          v-for="option in group.options"
          :key="option.name"
          class="flex gap-x-4"
        >
          <input type="checkbox" class="checked:bg-mustard!" checked />
          <p>{{ option.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable vue/prop-name-casing -->
<script>
export default {
  name: "Account",
  props: {
    sub_groups: { type: Array, default: null },
  },
  data() {
    return {
      activeSection: "Me",
      sections: [
        {
          title: "Me",
        },
        // { To be rolled out later
        //   title: "Interests",
        // },
        {
          title: "Activities",
        },
        {
          title: "Purchases",
        },
        {
          title: "Settings",
        },
      ],
    };
  },
};
</script>
