<!-- eslint-disable -->
<template>
  <!-- {exp:su_elections:voteForm election_id="{segment_3}"
  activity_id="{segment_4}"} {embed="core-components/.header" title='Vote'}

  <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script> -->
  <div class="container mx-auto">
    <div class="flex flex-col gap-y-6">
      <h1 class="mb-6 text-4xl font-bold">Vote</h1>

      <div class="border-l-4 border-gray-400 bg-gray-100 p-2">
        <h2 class="mb-0 text-xl">
          York SU uses the Single Transferable Voting System. You need to vote
          in order of preference, with 1 being your first preference (i.e. the
          candidate you want to win). This is so that if the person you want to
          win does not win, your second preference is taken into account.
        </h2>
      </div>

      {if valid_vote}

      <div class="border-l-4 border-green-400 bg-green-100 p-2">
        <h2 class="mb-0 text-xl">Success!</h2>
        <p>Your vote was successfully registered.</p>
      </div>

      {/if}

      <div class="flex flex-col gap-y-6">
        <!-- Details -->
        <div class="flex flex-col">
          <h2 class="text-2xl">
            <i class="fa fa-tasks"></i>
            {election_name}
          </h2>
          <div class="form-group">
            <div class="flex flex-col gap-x-12 sm:flex-row">
              <div class="flex flex-col">
                <h3 class="mb-0 text-xl">Election Method</h3>
                <p>{election_method}</p>
                <h3 class="mb-0 text-xl">No. of Positions</h3>
                <p>{number_of_positions}</p>
              </div>
              <div class="flex flex-col">
                <h3 class="mb-0 text-xl">Voting Opens</h3>
                <p>{voting_opens}</p>
                <h3 class="mb-0 text-xl">Voting Closes</h3>
                <p>{voting_closes}</p>
              </div>
            </div>
            <hr />
            <div class="flex flex-col">
              <h3 class="mb-0 text-xl">Description</h3>
              <p>{election_description}</p>
            </div>
          </div>
        </div>
        <!-- Details -->

        {if error_count}
        <div class="border-l-4 border-red-400 bg-red-100 p-2">
          <h2 class="mb-0 text-xl">
            Uh oh! There appears to be a few errors...
          </h2>
          {validation_errors}
          <ul>
            <li>{error}</li>
          </ul>
          {/validation_errors}
        </div>
        {/if}
        <ElectionsVote election-id="2209" spoilt-vote="true" />
      </div>
    </div>
  </div>
  <!-- {embed="core-components/.footer"}
  {/exp:su_elections:voteForm} -->
</template>

<script>
import ElectionsVote from "../../components/elections-vote/elections-vote.ce.vue";
export default {
  name: "ElectionsVoting",
  components: {
    ElectionsVote,
  },
};
</script>
