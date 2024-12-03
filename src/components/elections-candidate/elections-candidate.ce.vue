<template>
  <article class="body-style">
    <div class="container mx-auto">
      <div class="flex flex-col gap-y-6">
        <Button
          title="Back to all candidates"
          href="/elections/candidates"
          arrow
          is-student-voice
        />

        <div class="flex flex-col gap-4">
          <h2 class="text-3xl">{{ electionName }} candidate</h2>

          <div class="flex flex-col gap-4 md:flex-row">
            <img
              v-if="document_photo"
              class="max-w-"
              :src="document_photo"
              :alt="'Candidate Headshot: ' + candidate.name"
            />

            <div class="flex flex-col justify-end">
              <h3 class="text-2xl">{{ candidate.name }}</h3>
              <h4 class="text-xl">{{ candidate.pronouns }}</h4>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-6">
          <div>
            <h3 class="text-2xl">MANIFESTO SUMMARY</h3>
            {{ candidate.manifesto_summary }}
          </div>

          <div>
            <h3 class="text-2xl">MANIFESTO</h3>
            <p>{{ document_manifesto }}</p>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import axios from "../../_common/axios.mjs";
import Button from "../button/button.ce.vue";
export default {
  name: "ElectionsCandidate",
  components: {
    Button,
  },
  props: {
    electionId: {
      type: String,
      default: "",
    },
    candidateId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      electionName: "",
      candidate: {},
      document_manifesto: "",
      document_photo: "",
    };
  },
  mounted() {
    this.getCandidates();
  },
  methods: {
    async getCandidates() {
      var self = this;
      try {
        const [electionResponse, pronounsResponse, manifestoSummaryResponse] =
          await Promise.all([
            axios.get("https://pluto.sums.su/api/elections/" + this.electionId),
            axios.get(
              "https://yorksu.org/elections/candidate-pronouns/" +
                this.electionId +
                "/" +
                this.candidateId,
            ),
            axios.get(
              "https://yorksu.org/elections/candidate-manifesto-summary/" +
                this.electionId +
                "/" +
                this.candidateId,
            ),
          ]);

        self.electionName = electionResponse.data.name;
        self.candidate = electionResponse.data.candidates.find(
          (candidate) => candidate.id == self.candidateId,
        );
        self.document_manifesto = self.candidate.assets.document_manifesto;
        self.document_photo = self.candidate.assets.document_photo;
        self.candidate.pronouns = pronounsResponse.data;
        self.candidate.manifesto_summary = manifestoSummaryResponse.data;
        console.log(self.candidate);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
