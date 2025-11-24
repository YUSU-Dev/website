<template>
  <article class="body-style">
    <div class="container mx-auto">
      <div class="flex flex-col gap-y-6">
        <Button
          title="Back to all candidates"
          href="/elections/candidates"
          arrow
          is-student-voice
          v-if="!embedded"
        />

        <div class="flex flex-col gap-4">
          <div v-if="electionName">
            <h2 v-if="!loading" class="text-3xl">
              {{ electionName }} candidate
            </h2>
            <Loading :loading="loading" text />
          </div>

          <div class="flex flex-col gap-4 md:flex-row">
            <div v-if="document_photo" class="max-h-96 max-w-96">
              <img
                v-if="!loading"
                class="h-full w-full"
                :src="document_photo"
                :alt="'Candidate Headshot: ' + candidate.name"
              />
              <Loading
                :loading="loading"
                image
                :text="false"
                class="h-96 w-96"
              />
            </div>

            <div v-if="!loading" class="flex flex-col justify-end">
              <h3 v-if="candidate.name" class="text-2xl">
                {{ candidate.name }}
              </h3>
              <h4
                v-if="!candidate.pronouns.includes('{document_pronouns}')"
                class="text-xl"
              >
                {{ candidate.pronouns }}
              </h4>
            </div>
            <Loading :loading="loading" text />
          </div>
        </div>

        <div class="flex flex-col gap-6">
          <div v-if="!loading">
            <h3 class="text-2xl">MANIFESTO SUMMARY</h3>
            <div class="body-style" v-html="candidate.manifesto_summary"></div>
          </div>
          <Loading :loading="loading" text />

          <div v-if="!loading">
            <h3 class="text-2xl">MANIFESTO</h3>
            <div class="body-style" v-html="document_manifesto"></div>
          </div>
          <Loading :loading="loading" text />
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import axios from "../../_common/axios.mjs";
import Button from "../button/button.ce.vue";
import Loading from "../loading/loading.ce.vue";
export default {
  name: "ElectionsCandidate",
  components: {
    Button,
    Loading,
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
    embedded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      electionName: "",
      candidate: {},
      document_manifesto: "",
      document_photo: "",
      loading: false,
    };
  },
  mounted() {
    this.getCandidates();
  },
  methods: {
    async getCandidates() {
      var self = this;
      self.loading = true;
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
      } catch (error) {
        console.error(error);
      }
      self.loading = false;
    },
  },
};
</script>
