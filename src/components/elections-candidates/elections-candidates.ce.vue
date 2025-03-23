<template>
  <div class="body-style flex flex-col gap-y-8">
    <h2 v-if="electionName" class="text-3xl font-bold">{{ electionName }}</h2>
    <div
      class="xxs:grid-cols-2 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5"
    >
      <div v-for="candidate in candidates" :key="candidate.id">
        <a
          class="group flex"
          :href="'/elections/candidate/' + electionId + '/' + candidate.id"
        >
          <div class="relative text-white shadow-sm transition hover:scale-105">
            <div class="aspect-141/161 bg-cover">
              <img
                :src="candidate.assets.document_photo"
                alt=""
                class="h-full w-full object-cover"
              />
              <div
                class="absolute inset-0 bg-linear-to-t from-black to-transparent to-60%"
              ></div>
            </div>
            <div class="absolute bottom-4 w-full px-4">
              <h3 class="text-lg md:text-xl">
                {{ candidate.name }}
              </h3>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../_common/axios.mjs";
export default {
  name: "ElectionsCandidates",
  props: {
    electionId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      electionName: "",
      candidates: [],
    };
  },
  created() {
    this.getCandidates();
  },
  methods: {
    async getCandidates() {
      var self = this;
      await axios
        .get("https://pluto.sums.su/api/elections/" + this.electionId)
        .then(function (response) {
          self.electionName = response.data.name;
          self.candidates = response.data.candidates.filter(
            (candidate) => candidate.id !== 9,
          );
          self.candidates = self.candidates.sort(() => Math.random() - 0.5);
        });
    },
  },
};
</script>
