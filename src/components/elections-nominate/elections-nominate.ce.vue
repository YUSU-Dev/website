<!-- eslint-disable -->
<template>
  <style>
    .cr-boundary {
      width: 100% !important;
      aspect-ratio: 1 / 1;
      height: auto !important;
    }
  </style>
  {exp:su_elections:nominationForm election_id="{segment_3}"
  activity_id="{segment_4}"} {embed="core-components/.header"
  title="Nominations"}

  <script src="https://cdn.ckeditor.com/4.17.1/standard/ckeditor.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/croppie@2.6.5/croppie.min.js"></script>
  <script type="text/javascript" src="https://assets-cdn.sums.su/YU/JS/image-cropper.js"></script>
  <script type="text/javascript" src="https://assets-cdn.sums.su/YU/JS/elections-char-count.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/croppie@2.6.5/croppie.min.css" rel="stylesheet">
  <div class="container mx-auto">
    <div class="flex flex-col gap-y-6">
      <div class="flex flex-col">
        <h1 class="text-4xl font-bold mb-6">Nominations</h1>
        <h2 class="text-3xl font-semibold">Details</h2>
        <div class="flex flex-col sm:flex-row gap-x-12 form-group">
          <div class="flex flex-col">
            <h3 class="text-xl mb-0">Position</h3>
            <p>{election_name} <span class="text-sm">{election_sub_name}</span></p>
            <h3 class="text-xl mb-0">No. of Positions</h3>
            <p>{number_of_positions}</p>
            <h3 class="text-xl mb-0">Election Method</h3>
            <p>{election_method}</p>
          </div>
          <div class="flex flex-col">
            <h3 class="text-xl mb-0" class="sub-heading text-muted">Nominations Open</h3>
            <p>{nominations_open}</p>
            <h3 class="text-xl mb-0" class="sub-heading text-muted">Nominations Close</h3>
            <p>{nominations_close}</p>
            <h3 class="text-xl mb-0" class="sub-heading text-muted">Voting Opens</h3>
            <p>{voting_opens}</p>
            <h3 class="text-xl mb-0" class="sub-heading text-muted">Voting Closes</h3>
            <p>{voting_closes}</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-y-2">
        <h2 class="text-3xl font-semibold">Nomination Form</h2>
        <!-- Alerts -->
        <div class="flex flex-col gap-y-4 py-4">
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
      </div>
        <!-- Alerts -->
        <!-- Nomination Form -->
        <div class="flex flex-col gap-y-2">
          {if election_document_count > 0} {election_documents}
          <form method="post" enctype="multipart/form-data" id="{field_name}">
            <input type="hidden" name="do" value="update" />
            <input type="hidden" name="document" value="{field_name}" />
            <fieldset class="flex flex-col gap-y-1">
              {if field_method == "TEXT"} {if field_type == "INPUT"}
              <label class=""
                >{field_title} {if field_required AND field_complete == 0}
                <span class="text-red-600">* Required</span>
                {if:elseif field_complete == 1}
                <i class="fa fa-check text-green-500" aria-hidden="true"></i>
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
                {if field_max_characters}
                onkeyup="charcountupdate(this.value, 'count-{field_name}')"
                {if:elseif field_max_words}
                onkeyup="UpdateWordCount(this.value, 'count-{field_name}')"
                {/if}
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
                    class="btn btn-primary"
                    value="Save"
                  >
                    Save
                  </button>
                </div>
                {/if} {if field_view == 1}
                <a
                  href="{field_url}"
                  target="_blank"
                  class="btn btn-primary"
                  >View</a
                >
                {/if}
              </div>
              <p class="text-sm">
                {if field_max_characters}
                <span class="font-semibold">Max Characters:</span>
                {field_max_characters}
                <span class="font-semibold">Character Count: <span id="count-{field_name}">0</span></span>
                {/if}
                {if field_max_words}
                <span class="font-semibold">Max Words:</span>
                {field_max_words}
                <span class="font-semibold">Word Count: <span id="count-{field_name}">0</span></span>
                {/if}
              </p>
              {/if}
              {if field_type == "TEXTAREA"}
              <label class=""
                >{field_title} {if field_required AND field_complete == 0}
                <span class="text-red-600">* Required</span>
                {if:elseif field_complete == 1}
                <i class="fa fa-check text-green-500" aria-hidden="true"></i>
                {/if}
              </label>
              <div class="form-group p-0">
                <textarea
                {if field_max_characters}
                onkeyup="charcountupdate(this.value, 'count-{field_name}')"
                {if:elseif field_max_words}
                onkeyup="UpdateWordCount(this.value, 'count-{field_name}')"
                {/if}
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
                <span class="font-semibold">Character Count: <span id="count-{field_name}">0</span></span>
                {/if}
                {if field_max_words}
                <span class="font-semibold">Max Words:</span>
                {field_max_words}
                <span class="font-semibold">Word Count: <span id="count-{field_name}">0</span></span>
                {/if}
              </p>
                {if field_view == 1}
                  <a href="{field_url}" target="_blank" class="btn btn-primary">View</a>
                {/if}
                {if field_save == 1}
                  <input type="submit" class="btn btn-primary" value="Save">
                {/if}
              </div>
              {/if}
              {/if}
              {if field_method == "WYSIWYG"}
              {if field_type == "WYSIWYG"}
              <label class=""
                >{field_title} {if field_required AND field_complete == 0}
                <span class="text-red-600">* Required</span>
                {if:elseif field_complete == 1}
                <i class="fa fa-check text-green-500" aria-hidden="true"></i>
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
                <p class="text-sm">
                  {if field_max_characters}
                  <span class="font-semibold">Max Characters:</span>
                  {field_max_characters}
                  {/if}
                  {if field_max_words}
                  <span class="font-semibold">Max Words:</span>
                  {if field_name == 'manifesto'}
                  500
                  {if:elseif field_name == 'manifesto_summary'}
                  {field_max_words}
                  {/if}
                  {/if}</p>
                  <p class="text-sm">Content may look different after saving due to a filtering process that is applied to the content.</p>
                  <p class="text-sm">Please do not add images, as they won't be displayed.</p>     
              </div>
              <div class="flex justify-end">
                                        {if field_view == 1}
                                            <a href="{field_url}" target="_blank" class="btn btn-primary">View</a>
                                        {/if}
                                        {if field_save == 1}
                                            <input type="submit" class="btn btn-primary" value="Save">
                                        {/if}
                                    </div>
              <script>
              CKEDITOR.replace('{field_title}',{
                customConfig: 'https://sassets.sumsmanagement.com/web/ckeditor/config.js',
              });
              </script>
              {/if}
              {/if}
              {if field_method == "UPLOAD"}
              <label class=""
                >{field_title} {if field_required AND field_complete == 0}
                <span class="text-red-600">* Required</span>
                {if:elseif field_complete == 1}
                <i class="fa fa-check text-green-500" aria-hidden="true"></i>
                {/if}
              </label>
              <div class="form-group">
                {if field_name == "photo"}
                <p class="text-sm">
                  <span class="font-semibold">File Types:</span>{field_file_types}
                  <span class="font-semibold">Max Size:</span> {field_max_size}
                  {if field_image == 1}
                  <span class="font-semibold">Dimensions Must Be:</span>{field_dimensions}{/if}
                </p>
                <div>
                  <a href="{field_url}" target="_blank" id="thumb__container"><img src="{field_value}"
                    id="nom__thumbnail"></a>
                    <i class="ai-check reg__icon upload__confirmed" id="thumb__check"></i>
                    <script>
                    $('#nom__thumbnail').each(function () {
                      if (this.src == '{field_url}') {
                        //If it has source
                        $('#thumb__check').show();
                        $('#thumb__check').css('display', 'inline-block');
                      }
                    });
                    </script>
                </div>
                <!-- Hidden input fields for submission -->
                <input type="hidden" class="image-data" id="document_{field_name}" name="item" {if field_disabled==1}disabled{/if}>
                  <!-- Visible image select input -->
                   <input class="crop__upload" type="file" src="#" name="itemUploader" id="crop__upload" {if field_disabled==1}disabled{/if}>
                    <!-- Preview of cropped image before saving, after crop. Hidden after save -->
                     <div class="mgn__b--2" id="preview-container" style="display: none;">
                      <p>Image Preview: </p>
                      <img id="upload-preview" name="itemHidden" src="" />
                    </div>
                    <!-- Popup Modal for cropping image -->
                    <div id="crop__modal" class="cropModal" style="display: none;">
                      <div class="cropmodalcontent">
                        <!-- Modal Close -->
                         <p class="closeElectionModalPopup text-end mb-0">
                          <a href="javascript:closeModal();" onclick="closeModal();" id="close-btn-{candidate_id}">&times;</a>
                        </p>
                        <div class="modaldesktop">
                          <div class="modalheadline">
                            <p>Image Preview: </p>
                          </div>
                          <div class="modaltext">
                          <!-- Placeholder for image -->
                           <img id="my__image--d" src="" style="display: none;" />
                           <!-- Crop and Rotate buttons -->
                            <div class="g__4--m g__8--t g__12--d ta__c--d ta__c--m ta__c--t flex flex-wrap gap-4 mb-4">
                              {if field_save == 1}
                              <div class="btn btn-primary vanilla-rotate w-min flex flex-row gap-x-2 items-center" id="rotate" data-deg="-90" style="display: none;">Rotate <i class="fas fa-sync-alt"></i></div>
                              <div class="btn btn-primary w-min" id="cropBtn" value="Crop" style="display: none;">Save</div>
                              {/if}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- Popup Modal for cropping image ends -->
                {if:else}
                <input class="form-control margin-bottom-20 rounded-0" type="file" id="document_{field_name}" name="item" {if field_disabled==1}disabled{/if}>
                  <p class="text-sm">
                    <span class="font-semibold">File Types:</span>{field_file_types}
                    {if field_image == 1}
                    <span class="font-semibold">Dimensions Must Be:</span>{field_dimensions}
                    {/if}
                  </p>
                {/if}
              </div>
              <div class="flex justify-end">
                {if field_view == 1}
                <a href="{field_url}" target="_blank" class="btn btn-primary">View</a>
                {/if}
              </div>
              {/if}
              {if field_method == "SELECT"}
              <div class="form-group">
                <label class="mb-2">
                  {field_title}
                </label>
                <select name="item" class="form-control" {if field_required} required {/if}>
                  {field_options}
                  <option value="{option_val}"
                  {if field_value==option_val}selected{/if}>
                    {option_txt}
                  </option>
                  {/field_options}
                </select>
              </div>
              <div class="flex justify-end">
                {if field_view == 1}
                <a href="{field_url}" target="_blank" class="btn btn-primary">View</a>
                {/if}
                {if field_save == 1}
                <input type="submit" class="btn btn-sm u-btn-primary" value="Save">
                {/if}
              </div>
              {/if}
            </fieldset>
          </form>
          {/election_documents} {/if}
                     <!-- form 3 - submit everything -->
                    {if nomination_submitted == 0}
                    <form method="post" id="process-submission">
                        <input type="hidden" name="submission" value="true">
                        <h5>Ready to submit everything? <small style="display:block" class="g-mt-10">Make sure that
                                you've pressed 'save' on each item above.</small></h5>
                        <p class="text-sm"><em>If you're having issues with submitting a nomination
                                    please contact <a
                                        href="mailto:elections@yusu.org">elections@yorksu.org</a></em></p>
                        <hr class="g-brd-gray-light-v4 g-mx-minus-30">
                        {if allow_submission == 1}
                        <ul class="pl-0 flex flex-col gap-y-2 mb-2">
                          <li class="flex items-center gap-x-2">
                            <div class="">
                                <input type="checkbox" name="declare" value="1" class="declare" required>
                            </div>
                            <div class="">
                                <p class="text-sm mb-0">I confirm I have read YUSU's privacy policy, with specific reference to the handling of my personal data as detailed in the 'Elections and Student Voice' and 'Information we may share with other organisations' sections.  </small></p>
                            </div>
                        </li>
                        <li class="flex items-center gap-x-2">
                            <div class="">
                                <input type="checkbox" name="declare_rules" value="1" class="declare" required>
                            </div>
                            <div class="">
                                <p class="text-sm mb-0">I confirm I have read and agree to the <a target="_blank" href="https://docs.google.com/document/d/1ZJ9gxPlEmwk1o3WLY_szsOiz2yCvuiiunOgzF4MWkPw/edit?usp=sharing">College Election rules</a></p>
                            </div>
                        </li>
                        <li class="flex items-center gap-x-2">
                            <div class="">
                                <input type="checkbox" name="declare_privacy" value="1" class="declare" required>
                            </div>
                            <div class="">
                                <p class="text-sm mb-0">I agree to the collection and publication of my name, pronouns, manifesto information and provided photograph to ensure a fair democratic voting process; and for the sharing of that data, together with my email address, with student media groups for the purposes of organising election events and promotion.</p>
                            </div>
                        </li>
                          <li class="flex items-center gap-x-2">
                            <div class="">
                                <input type="checkbox" name="declare_success" value="1" class="declare" required>
                            </div>
                            <div class="">
                                <p class="text-sm mb-0">If I am successful in the election process, I agree to my name, pronouns, email address, manifesto commitments and provided photograph being used by YUSU, and shared with student media for the purposes of declaring the election results and fulfilling the responsibilities of my elected position.</p>
                            </div>
                        </li>
                        </ul>
                        <p class="text-sm">An email confirmation will be sent upon successful submission.</p>
                        <button class="btn btn-primary"
                            onclick="javascript:declareSubmission();">Submit</button>
                        <script type="text/javascript">
                            function declareSubmission() {
                                if (!confirm('Are you sure you wish to submit your nomination?')) return;
                                if ($(".declare:checked").length == $(".declare").length) {
                                    $('#process-submission').submit();
                                }
                            }
                        </script>
                        {/if}
                    </form>
                    {/if}
                    <!-- end of form 3 -->
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
