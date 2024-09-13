<template>
  <div class="container mx-auto">
    <div class="flex flex-col">
      <div class="flex flex-col">
        <h1 class="text-4xl font-bold">Nominations</h1>
      </div>
      <p>{ Insert details tab here }</p>
      <div class="flex flex-col">
        <h2 class="text-3xl font-semibold">Nomination Form</h2>
        <!-- Alerts -->
        {if nomination_submitted == 0}
        <div class="border-l-4 border-red-400 bg-red-100 p-2">
          <h2 class="text-xl">
            <span class="font-semibold">Heads up!</span> Please save all
            sections individually before completing the final submission.
          </h2>
        </div>
        {/if} {if error_count}
        <div class="border-l-4 border-red-400 bg-red-100 p-2">
          <h2 class="text-xl">Uh oh! There appears to be a few errors...</h2>
          {validation_errors}
          <ul>
            <li>{errors}</li>
          </ul>
          {/validation_errors}
        </div>
        {/if} {if success_message}
        <div class="border-l-4 border-green-400 bg-green-100 p-2">
          <h2 class="text-xl">Success!</h2>
          <p>{success_message}</p>
        </div>
        {/if} {if nomination_submitted == 1}
        <div class="border-l-4 border-green-400 bg-green-100 p-2">
          <h2 class="text-xl">Success!</h2>
          <p>
            Your nomination was submitted on {submitted_date} with reference
            number #{submitted_reference_number}.
          </p>
        </div>
        {/if} {if nomination_approved == 1}
        <div class="border-l-4 border-green-400 bg-green-100 p-2">
          <h2 class="text-xl">Success!</h2>
          <p>Your nomination has been approved.</p>
        </div>
        {/if}
        <!-- Alerts -->
        <!-- Nomination Form -->
        {if election_document_count > 0} {election_documents}
        <form method="post" enctype="multipart/form-data" id="{field_name}">
          <input type="hidden" name="do" value="update" />
          <input type="hidden" name="document" value="{field_name}" />
          <fieldset>
            {if field_method == "TEXT"} {if field_type == "INPUT"}
            <label class="mb-2"
              >{field_title} {if field_required}
              <span class="text-red-600">* Required</span>
              {/if}
            </label>
            {if field_name == 'can_name'}
            <p class="text-sm">
              Please use this field if you would like to run under a different
              name to your University registered name, or you are a Part-time
              Officer candidate running in a pair.
            </p>
            {if:elseif field_name == 'pronouns'}
            <p class="text-sm">e.g. She/Her/Hers</p>
            {if:elseif field_name == 'manifesto_summary'}
            <p class="text-sm">
              Please use three bullet points to summarise your manifesto ideas.
            </p>
            {/if}
            <input
              name="item"
              class="form-input"
              type="text"
              placeholder="Preferred Name"
              autocomplete="given-name"
              {if field_disabled==1}disabled{/if}
              required
            />
            {/if} {/if}
          </fieldset>
        </form>
        {/election_documents} {/if}
        <!-- Nomination Form -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ElectionsNominate",
};
</script>
