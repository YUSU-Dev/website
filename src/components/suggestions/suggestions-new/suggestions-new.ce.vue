<!-- eslint-disable -->
<template>
  {embed="core-components/.hero-header" title="New Idea"
  image_url="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_Student_Voice.jpg"}

  <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>

  {exp:su_suggestions:newIdea}

  <div class="container mx-auto">

    <div class="flex flex-col gap-y-6">

      <!--{embed="global/.breadcrumb" title="New SUggestion"}-->
      <yorksu-button title="Back to Forum" url="/suggestions" arrow is-primary class="mb-10"></yorksu-button>

      {if success == 1}

      <div class="border-l-4 border-green-400 bg-green-100 p-2">
        <h2 class="mb-0 text-xl">Success!</h2>
        <p>
          Thank you for submitting an idea, question, view or experience to York SU Big Ideas.
          Your submission will be reviewed and published on the website within 2 days, unless it
          is considered unsuitable. Once on the website other students will be able to express
          interest in your submission, add comments and, where appropriate, a Sabbatical Officer
          will be assigned to feed back to you.
        </p>
      </div>

      {if:else}
      {exp:channel:entries channel="pages"}
      <!-- Page Content -->
      <div>
        {page_content}
      </div>
      {/exp:channel:entries}

      <div class="my-10">
        <div class="flex flex-col gap-y-2">
          <h2 class="font-semibold">Please note...</h2>
          <ul>
            <li>
              <p><em class="">Your University registered name will be published
                  alongside your idea. We cannot accommodate anonymous submissions, however if you do
                  not identify as your University registered name and publication would cause
                  distress, please email <a href="mailto:engagement@yorksu.org">engagement@yorksu.org</a> and we
                  will help find a way for you to have your idea heard.</em></p>
            </li>
            <li>
              <p><em>Once submitted, you will be unable to change your idea.
                  If you wish to alter it in any way, please email the Student Voice team at <a
                    href="mailto:engagement@yorksu.org">engagement@yorksu.org</a> as soon as
                  possible.</em></p>
            </li>
          </ul>
        </div>
      </div>

      {if errors != ""}

      <div class="border-l-4 border-red-400 bg-red-100 p-2">
        <h2 class="mb-0 text-xl">
          Uh oh! There appears to be a few errors...
        </h2>
        <ul>
          <li>{error}</li>
        </ul>
      </div>

      {/if}

      <h2 class="text-2xl font-semibold">My Big Idea</h2>

      <form class="flex flex-col gap-y-6" method="post" role="form">

        <div class="form-group flex flex-col gap-y-2">

          <label class="" for="suggestions_categories_id">Idea Type</label>

          <select required id="suggestions_categories_id" name="suggestions_categories_id"
            class="form-control rounded border p-1">

            <option value="">Select a type...</option>

            {drop_down}
            {if id != 6}
            <option value="{id}" data-default-title="{default_title}" data-default-description="{default_description}"
              data-explanation="{explanation}">
              {name}
            </option>
            {/if}

            {/drop_down}

          </select>

          <small class="form-text text-muted g-font-size-default g-mt-10">Provides you with a framework to
            build your idea from</small>

          <div id="explanation" class="my-6" role="alert" style="display:none;">
            <div class="">
              <p id="explanation-content" class=""></p>
            </div>
          </div>

        </div>

        <div class="form-group flex flex-col gap-y-2">

          <label class="" for="title">Idea Title</label>

          <input required id="title" name="title" class="form-control rounded required border p-1"
            onkeyup="charcountupdate(this.value, this.id)" />

          <div class="flex flex-col">
            <p class="mb-0">Max Characters: <span class="font-semibold">150</span></p>
            <p class="">Character Count: <span class="font-semibold" id="title-character-count">0</span></p>
          </div>
        </div>

        <div class="form-group flex flex-col gap-y-2">
          <label class="" for="description">Idea Detail</label>
          <textarea id="description" name="description" class="form-control rounded border p-1" rows="7"
            required onkeyup="charcountupdate(this.value, this.id)"></textarea>
          <div class="flex flex-col">
            <p class="mb-0">Max Characters: <span class="font-semibold">2000</span></p>
            <p class="">Character Count: <span class="font-semibold" id="description-character-count">0</span></p>
          </div>
        </div>

        <div class="clearfix">
          <button type="submit" id="suggestion-submit" class="btn btn-primary">Submit</button>
        </div>

      </form>
      {/if}
    </div>
  </div>

  <script>
  $('#suggestions_categories_id').change(function () {
    var explanation = $('#suggestions_categories_id option:selected').data('explanation');
    if(!explanation) {
      $('#explanation').hide();
      return;
    }
    $('#explanation-content').text(explanation);
    $('#explanation').show();
  });

  function charcountupdate(str, id) {
    var lng = str.length;
    document.getElementById(id + '-character-count').innerHTML = lng;
  }
  </script>

  {/exp:su_suggestions:newIdea}

  {embed="core-components/.footer" js="jquery.charCount|new_suggestion" vue_comp="button"}
</template>

<script>
export default {
  name: 'SuggestionsNew',
};
</script>
