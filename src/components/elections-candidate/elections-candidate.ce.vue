<template>
  {embed="core-components/.hero-header" title='Candidate'
  image_url="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_Student_Voice.jpg"}
  <div class="container mx-auto">
    <div class="flex flex-col gap-y-6">
      <yorksu-button
        title="Back to all candidates"
        href="/elections/candidates"
        arrow
        is-student-voice
      ></yorksu-button>

      <div class="flex flex-col gap-4">
        {exp:su_elections:electionCandidates raw="true"
        election_id="{segment_3}" parse="inward"} {if hasCandidates == 0}
        {if:else} {candidates} {candidate} {if {candidate_id} == {segment_4}}

        <h2 class="">
          <u>
            {if {segment_3} == 2179} UNION AFFAIRS OFFICER {if:elseif
            {segment_3} == 2180} UNION DEVELOPMENT OFFICER {if:elseif
            {segment_3} == 2174} ACADEMIC OFFICER {if:elseif {segment_3} ==
            2178} SPORTS OFFICER {if:elseif {segment_3} == 2177} EQUALITY AND
            INCLUSION OFFICER {if:elseif {segment_3} == 2176} COMMUNITY AND
            WELLBEING OFFICER {if:elseif {segment_3} == 2175} ACTIVITIES OFFICER
            {/if} CANDIDATE</u
          >
        </h2>

        <div class="flex flex-col gap-4 md:flex-row">
          <img
            class="max-w-"
            src="{document_photo}"
            alt="Candidate Headshot: {name}"
          />

          <div class="flex flex-col justify-end">
            <h3 class="text-2xl">{name}</h3>
            <h4 class="text-xl">{document_pronouns}</h4>

            <!-- <h4><u>BLURB</u></h4>
          <p>{document_blurb}</p> -->
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <div>
          <h3 class="text-2xl">MANIFESTO SUMMARY</h3>
          {document_manifesto_summary}
        </div>

        <div>
          <h3 class="text-2xl">MANIFESTO</h3>
          <p>{document_manifesto}</p>
        </div>
      </div>
    </div>

    {/if} {/candidate} {/candidates} {/if}
    {/exp:su_elections:electionCandidates}
  </div>
  {embed="core-components/.footer" vue_comp="button"}
</template>

<script>
export default {
  name: "ElectionsCandidate",
};
</script>
