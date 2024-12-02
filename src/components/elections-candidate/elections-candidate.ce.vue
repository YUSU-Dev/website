<template>
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
            <!-- <h4 class="text-xl">{document_pronouns}</h4> -->
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <!-- <div>
          <h3 class="text-2xl">MANIFESTO SUMMARY</h3>
          {document_manifesto_summary}
        </div> -->

        <div>
          <article class="body-style">
            <h3 class="text-2xl">MANIFESTO</h3>
            <p>{{ document_manifesto }}</p>
          </article>
        </div>
      </div>
    </div>

    <!-- {/if} {/candidate} {/candidates} {/if}
    {/exp:su_elections:electionCandidates} -->
  </div>
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
      // var self = this;
      // await axios
      //   .get("https://pluto.sums.su/api/elections/" + this.electionId)
      //   .then(function (response) {
      //     self.electionName = response.data.name;
      //     self.candidate = response.data.candidates.find(
      //       (candidate) => candidate.id == self.candidateId,
      //     );
      //     self.document_manifesto = self.candidate.assets.document_manifesto;
      //     self.document_photo = self.candidate.assets.document_photo;
      //   });
      await axios
        .get("https://yorksu.org/elections/candidate-api/" + this.electionId)
        .then(function (response) {
          const data = response.data
            .replace(/&bull;/g, "•")
            .replace(/&mdash;/g, "—")
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace(/&amp;/g, "&")
            .replace(/<br \/>/g, "\n");
          const parsedData = JSON.parse(data);
          console.log(parsedData);
        });
    },
  },
};
</script>
