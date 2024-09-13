<template>
  {exp:su_elections:nominationForm election_id="{segment_3}"
  activity_id="{segment_4}"} {embed="core-components/.header"
  title="Nominations"}

  <script src="https://cdn.ckeditor.com/4.17.1/standard/ckeditor.js"></script>

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
          <h2 class="mb-0 text-xl">
            <span class="font-semibold">Heads up!</span> Please save all
            sections individually before completing the final submission.
          </h2>
        </div>
        {/if} {if error_count}
        <div class="border-l-4 border-red-400 bg-red-100 p-2">
          <h2 class="mb-0 text-xl">
            Uh oh! There appears to be a few errors...
          </h2>
          {validation_errors}
          <ul>
            <li>{errors}</li>
          </ul>
          {/validation_errors}
        </div>
        {/if} {if success_message}
        <div class="border-l-4 border-green-400 bg-green-100 p-2">
          <h2 class="mb-0 text-xl">Success!</h2>
          <p>{success_message}</p>
        </div>
        {/if} {if nomination_submitted == 1}
        <div class="border-l-4 border-green-400 bg-green-100 p-2">
          <h2 class="mb-0 text-xl">Success!</h2>
          <p>
            Your nomination was submitted on {submitted_date} with reference
            number #{submitted_reference_number}.
          </p>
        </div>
        {/if} {if nomination_approved == 1}
        <div class="border-l-4 border-green-400 bg-green-100 p-2">
          <h2 class="mb-0 text-xl">Success!</h2>
          <p>Your nomination has been approved.</p>
        </div>
        {/if}
        <!-- Alerts -->
        <!-- Nomination Form -->
        <div class="flex flex-col gap-y-6">
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
                Please use three bullet points to summarise your manifesto
                ideas.
              </p>
              {/if}
              <div class="input-group flex">
                <input
                name="item"
                id="{field_name}"
                class="form-input"
                type="text"
                autocomplete="given-name"
                onkeyup="UpdateWordCount(this.value, 'count-{field_name}')"
                {if field_disabled==1}disabled{/if}
                  {if field_required}required{/if}
                  {if field_name =='manifesto_summary'} 
                  placeholder="Action 1. Action 2. Action 3."
                  {if:elseif field_name =='pronouns'}
                  placeholder="she/her/hers"
                  {/if} value="{field_value}"
                />
                {if field_save == 1}
                <div class="input-group-append">
                  <button
                    type="submit"
                    aria-label="save"
                    class="btn btn-block btn-secondary h-full bg-black px-1"
                    value="Save"
                  >
                    Save
                  </button>
                </div>
                {/if} {if field_view == 1}
                <a
                  href="{field_url}"
                  target="_blank"
                  class="btn btn-block btn-secondary h-full bg-black px-1"
                  >View</a
                >
                {/if}
              </div>
              <p class="text-sm">
                {if field_max_characters}
                <span class="font-semibold">Max Characters:</span>
                {field_max_characters}
                {/if}
                {if field_max_words}
                <span class="font-semibold">Max Words:</span>
                {field_max_words}
                {/if}
                <span class="font-semibold">Word Count: <span id="count-{field_name}">0</span></span>
              </p>
              {/if}
              {if field_type == "TEXTAREA"}
              <label class="mb-2"
                >{field_title} {if field_required}
                <span class="text-red-600">* Required</span>
                {/if}
              </label>
              <div class="form-group p-0 mb-2">
                <textarea
                  onkeyup="UpdateWordCount(this.value, 'count-{field_name}')" 
                  id="{field_name}"
                  class="form-control p-2 w-full"
                  rows="6"
                  name="item"
                  {if field_disabled==1}disabled{/if}
                  placeholder="{if field_required} Required {/if}">
                  {field_value}
                </textarea>
              </div>
              <div class="flex justify-between">
              <p class="text-sm">
                {if field_max_characters}
                <span class="font-semibold">Max Characters:</span>
                {field_max_characters}
                {/if}
                {if field_max_words}
                <span class="font-semibold">Max Words:</span>
                {field_max_words}
                {/if}
                <span class="font-semibold">Word Count: <span id="count-{field_name}">0</span></span>
              </p>
                {if field_view == 1}
                  <a href="{field_url}" target="_blank" class="btn btn-block btn-secondary h-full bg-black px-1">View</a>
                {/if}
                {if field_save == 1}
                  <input type="submit" class="btn btn-block btn-secondary h-full bg-black px-1" value="Save">
                {/if}
              </div>
              {/if}
              {/if}
              {if field_method == "WYSIWYG"}
              {if field_type == "WYSIWYG"}
              <label class="mb-2"
                >{field_title} {if field_required}
                <span class="text-red-600">* Required</span>
                {/if}
              </label>
              <div class="form-group">
                {if field_name == 'manifesto'}
                <p class="text-sm">Your manifesto is your primary opportunity to explain to potential voters why they should vote for you.</p>
                {if:elseif field_name == 'manifesto_summary'}
                <p class="text-sm">Please use three bullet points to summarise your manifesto ideas.</p>
                {/if}
                <textarea
                 class="form-control p-2 w-full" 
                 rows="6" id="{field_title}" 
                 name="item" 
                 {if field_disabled == 1}disabled{/if}>
                  {field_value}
                </textarea>
              </div>
              <script>
              CKEDITOR.replace('{field_title}',{
                customConfig: 'https://sassets.sumsmanagement.com/web/ckeditor/config.js',
              });
              </script>
              {/if}
              {/if}
              {if field_method == "UPLOAD"}
              <label class="mb-2"
                >{field_title} {if field_required}
                <span class="text-red-600">* Required</span>
                {/if}
              </label>
              {/if}
            </fieldset>
          </form>
          {/election_documents} {/if}
        </div>
        <!-- Nomination Form -->
      </div>
    </div>
  </div>
  {embed="core-components/.footer"} {/exp:su_elections:nominationForm}
</template>

<script>
export default {
  name: "ElectionsNominate",
};
</script>
