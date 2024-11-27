<!-- eslint-disable -->
<template>
  {embed="core-components/.hero-header" title="View Idea"
  image_url="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_Student_Voice.jpg"}

  <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>
  <script src="https://assets-cdn.sums.su/YU/JS/linkify/linkify.min.js"></script>
  <script src="https://assets-cdn.sums.su/YU/JS/linkify/linkify-jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/timeago@1.6.7/jquery.timeago.min.js"></script>

  <style>
    .char-count {
      color: #555 !important;
    }

    textarea::placeholder {
      color: #555;
    }

    .feedback-img {
      width: 80px;
      height: 80px;
    }

    .disabled,
    .disabled:hover {
      cursor: not-allowed;
      background-color: #ccc;
    }

    .vote-active {
      color: #f2682f !important;
    }
  </style>

  {exp:su_suggestions:viewIdea suggestion="{segment_3}"}

  <div class="container mx-auto">

    <yorksu-button title="Back to Forum" url="/suggestions" arrow is-primary class="mb-10"></yorksu-button>

    <h2 class="text-3xl">{title}</h2>


    <article class="">
      <div class="">

        <div class="my-10">
          <ul class="flex gap-2 text-uppercase list-none pl-0">

            <li class="list-inline-item g-mr-10 g-mb-10 g-mb-0--xs">
              <div style="font-size: 14px; padding: 0px 5px; border: 1px solid;" class="rounded text-uppercase tooltips"
                data-toggle="tooltip" data-placement="bottom" title="{statusDescription}">
                {statusDateFormatted} - {status}
              </div>
            </li>

            {if fast_tracked == 1}

            <li class="list-inline-item g-mb-10 g-mb-0--lg">
              <div style="font-size: 14px; padding: 0px 5px; border: 1px solid;" class="rounded text-uppercase tooltips"
                data-toggle="tooltip" data-placement="bottom" title=""
                data-original-title="This idea has been fast-tracked as the Executive Committee have agreed that they want to take this idea forward to be put into action.">
                {fast_tracked_date} - Fast-tracked
              </div>
            </li>

            {/if}

            {if suggestionsCategoryId == 6}
            <li class="list-inline-item g-mb-10 g-mb-0--lg">
              <p class="text-primary-red"><i class="fas fa-tags"></i> Covid-19</p>
            </li>

            {/if}

            <div class="clearfix"></div>

          </ul>
        </div>

        {if loggedIn != 1 && votingOpen == 1}

        <div class="my-10" role="alert">
          <div class="media">
            <div class="d-flex g-mr-10">
              <span class="d-flex g-mr-10 g-mt-5">
                <i class="icon-info g-font-size-25"></i>
              </span>
            </div>
            <div class="media-body">
              <div class="d-flex justify-content-between">
                <p class="m-0"><strong>Want to take part?</strong></p>
              </div>
              <p class="m-0 g-font-size-14">Please log in if you wish to vote and take part in the
                discussion!</p>
            </div>
          </div>
        </div>

        {/if}

        <div class="vote-item vote-item-view my-10">

          <div class="vote-actions mb-6 text-xl flex gap-x-2 items-center">

            {if canVote == 1}
            <a>
              <i role="button" aria-label="vote up" id="vote-up"
                class="fa fa-thumbs-up vote-up vote-up-{id} g-color-gray-light-v1 {if votedUp == 1}vote-active{/if}"
                data-suggestion-id="{id}"></i>
            </a>
            {/if}

            {if fast_tracked == 1}

            <div class="text-advice-green font-semibold mb-2"
              title="This idea has been fast-tracked as the Executive Committee have agreed that they want to take this idea forward to be put into action.">
              <p class="flex items-center gap-x-2 mb-0"><i class="fas fa-bolt"></i> Fast Tracked</p>
            </div>

            {if:else}

            <div id="vote-count-{id}" {if canVote !=1}class="no-vote-action g-mt-15" {/if} data-upvote-count="{upVotes}"
              data-novote-count="{noVotes}" data-downvote-count="{downVotes}">{votes}
              Votes</div>

            {/if}

            {if canVote == 1}
            <a>
              <i role="button" aria-label="vote" id="vote-down"
                class="fa fa-thumbs-down vote-down vote-down-{id} g-color-gray-light-v1 {if votedDown == 1}vote-active{/if}"
                data-suggestion-id="{id}"></i>
            </a>
            {/if}

          </div>

          <!--<a href="/suggestions/view/{id}" class="vote-title g-mb-10">{title}</a>-->

          <p class="linkify g-ml-50 g-mb-10">{description}</p>

          <div class="vote-date">
            Submitted by <span class="font-semibold">{memberName}</span> {if canVote == 1}with voting closing <time
              class="timeago" datetime="{expirationDateISO}"></time>{/if}
          </div>

        </div>

        {if hasFeedback}

        <div class="flex flex-col gap-y-4">

          <div class="">
            <h3 class="text-2xl font-bold">Student
              Leader Feedback</h3>
          </div>

          <div class="flex flex-col gap-y-4">
            {feedback}

            <div class="border rounded flex flex-col gap-4 p-4">

              <div class="flex gap-2">
                <img class="feedback-img" src="{feedback_image}" alt="{feedback_name}, {feedback_position}">
                <div class="flex flex-col justify-center">
                  <h4 class="font-semibold mb-0">
                    {feedback_name}
                  </h4>
                  <span class="g-color-gray-dark-v4 g-font-size-12" style="color: #000 !important;">{feedback_position}
                    <time class="timeago" datetime="{feedback_date_iso}"></time></span>
                </div>
              </div>

              <div class="">

                <div class="g-mb-15">
                  <p class="linkify g-color-gray-dark-v2">{feedback_text}</p>
                </div>

              </div>

            </div>

            {/feedback}
          </div>

        </div>

        {/if}

        <div class="flex flex-col gap-y-6 my-10">

          <div class="">
            <h3 class="text-2xl font-bold">
              {commentCount} Comment(s)</h3>
          </div>

          <div class="flex flex-col gap-y-4">

            {if hasComments == 1}

            {comments}
            <div class="border rounded p-4">
              <div id="comment-{commentID}" class="flex flex-col gap-4">

                <div class="">
                  <h4 class="font-semibold mb-0">
                    {commentMemberName}
                  </h4>
                  <p class="">
                    <time class="timeago" datetime="{commentDateISO}"></time>
                  </p>
                </div>

                <div class="g-mb-15">
                  <p class="g-color-gray-dark-v2">{comment}</p>
                </div>

                {if loggedIn == 1}

                <ul class="list-none flex flex-wrap gap-2 pl-0">

                  {if commentCanReport == 1}

                  <li class="list-inline-item ml-auto">
                    <a style="cursor:pointer" id="report-comment-{commentID}"
                      class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover report-comment"
                      data-comment-id="{commentID}">
                      <i role="button" aria-label="report" class="icon-flag  far fa-flag g-pos-rel g-top-1 g-mr-3"></i>
                      Report
                    </a>
                  </li>

                  {/if}

                  {if commentCanDelete == 1 && canVote == 1}

                  <li class="list-inline-item ml-auto">
                    <a style="cursor:pointer"
                      class="u-link-v5 g-color-gray-dark-v4 g-color-primary--hover delete-comment"
                      data-comment-id="{commentID}">
                      <i role="button" aria-label="delete"
                        class="icon-trash fas fa-trash  g-pos-rel g-top-1 g-mr-3"></i>
                      Delete
                    </a>
                  </li>

                  {/if}

                </ul>

                {/if}

                <div class="report-form" id="report-form-{commentID}" style="display:none">

                  <hr>

                  <!-- Report Form -->
                  <div class="flex flex-col gap-y-2">
                    <h5 class="">
                      Report This Comment
                    </h5>

                    <div class="" id="report-form-{commentID}">
                      <select title="Report Options" id="report-option-{commentID}"
                        class="form-control rounded border p-1">
                        {reportOptions}
                        <option value="{val}">{txt}</option>
                        {/reportOptions}
                      </select>
                    </div>
                    <div class="flex gap-2">
                      <button class="btn btn-primary report-comment-cancel" type="button"
                        data-comment-id="{commentID}">Cancel</button>
                      <button class="btn btn-primary report-comment-submit" type="button"
                        data-comment-id="{commentID}">Submit</button>
                    </div>
                  </div>

                  <!-- End of Report Form -->
                </div>
              </div>
            </div>
            {/comments}

            {if:else}
            <div class="">

              <!-- Article Content -->
              <div class="flex flex-col gap-y-2">
                <h4 class="font-semibold">No Comments to display</h4>
                <em class="g-font-style-normal">There are no comments to display at the moment.</em>
              </div>
              <!-- End Article Content -->

            </div>
            {/if}
          </div>

        </div>

        <div class="flex flex-col gap-y-6">

          {if votingOpen == 1}

          <div class="">
            <h3 class="text-2xl font-bold">Add a
              Comment</h3>
          </div>

          {if logged_in > 0}

          <form class="flex flex-col">
            <div class="">
              <label for="new-comment" class="sr-only">New Comment</label>
              <textarea id="new-comment" class="form-control rounded w-full border p-2"
                onkeyup="charcountupdate(this.value)" rows="8" placeholder="Have your say..."
                data-maxlength="400"></textarea>
              <p class="mb-0">Max Characters: <span class="font-semibold">4000</span></p>
              <p class="">Character Count: <span class="font-semibold" id="character-count">0</span></p>
            </div>

            <button type="button" disabled id="new-comment-submit" data-suggestion-id="{id}"
              class="btn btn-primary w-max disabled disabled:bg-gray-400 disabled:hover:cursor-not-allowed">
              Submit Comment
            </button>
          </form>

          <!-- Article Content -->
          <div class="flex flex-col gap-y-2">
            <h4 class=" font-semibold">Please note...</h4>
            <em class="">We encourage you to comment on these ideas and welcome
              healthy debate. All comments are recorded and York SU is able to identify the author. By
              submitting this comment, you agree that it does not contain any language or content that
              may cause offense or be deemed discriminatory based on an individual's personal
              characteristics. Any comments that do contain such things may result in the author being
              subject to York SU’s disciplinary procedures.</em>
            <p>Also note that your submission will appear on the webpage alongside your University
              registered name.</p>
          </div>
          <!-- End Article Content -->

          {if:else}

          <div class="flex flex-col gap-y-2">
            <h4 class=" font-semibold">Want to get involved?</h4>
            <p><em class="">Please log in if you wish to comment and take part in the
                discussion!</em></p>
          </div>

          {/if}

          {/if}

        </div>

      </div>

      {if showSL == "1"}

      <div class="my-10 flex flex-col gap-y-6">

        <div class="">
          <h3 class="text-2xl font-bold">Assigned To</h3>
        </div>

        <div class="flex gap-2">
          {if slImageUrl}
          <img class="feedback-img" src="{slImageUrl}" alt="">
          {if:else}
          <img class="img-fluid img-thumbnail rounded-circle g-mb-20"
            src="https://3206af7111780558b7b3-c0c78907890fbb9cb201844d036b4a41.ssl.cf3.rackcdn.com/YUSU_logo_single.jpg"
            alt="">
          {/if}
          <div class="flex flex-col justify-center">
            <h4 class="font-semibold mb-0">
              {slName}
            </h4>
            <span class="g-color-gray-dark-v4 g-font-size-12" style="color: #000 !important;">{slPosition}</span>
          </div>
        </div>

      </div>

      {/if}

    </article>

  </div>

  <script>
    $(document).ready(function () {
      $.timeago.settings.allowFuture = true;
      $("time.timeago").timeago();
    });
        $('p.linkify').linkify();
        // report flag clicked
        $('.report-comment').click(function () {
            var comment = $(this).data('comment-id');
            $('#report-form-' + comment).show();
        });

        $('#vote-up').click(function () {
            var suggestion = $(this).data('suggestion-id');
            vote(suggestion, 1);
            $('.vote-down-' + suggestion).removeClass('vote-active');
            $('.vote-up-' + suggestion).addClass('vote-active');
        });

        $('#vote-down').click(function () {
            var suggestion = $(this).data('suggestion-id');
            vote(suggestion, -1);
            $('.vote-up-' + suggestion).removeClass('vote-active');
            $('.vote-down-' + suggestion).addClass('vote-active');
        });

        // cancel report comment button
        $('.report-comment-cancel').click(function () {
            var comment = $(this).data('comment-id');
            $('#report-form-' + comment).hide();
        });

        // submit report comment button
        $('.report-comment-submit').click(function () {
            var comment = $(this).data('comment-id');
            reportComment(comment);
            $('#report-form-' + comment).hide();
        });

        $('#new-comment-submit').click(function () {
            var commentContent = $('#new-comment').val();
            var suggestionId = $(this).data('suggestion-id');
            submitComment(commentContent, suggestionId);
        });

        $('.delete-comment').click(function () {
            var comment = $(this).data('comment-id');
            deleteComment(comment);
        });

        function vote(suggestionId, vote) {
          $.ajax({
            url: "/suggestions/vote",
            type: "POST",
            data: {
              sugg_id: suggestionId,
              vote: vote
            },
            success: function (data) {
              var response = JSON.parse(data)
              console.log(response);
              if (response.success == true) {
                location.reload();
              }
              else {
                if (response.error_message == 'Sorry, you cannot change your vote after 24 hours.\n') {
                  alert(response.error_message)
                }
              }
            },
            error: function (error) {
              console.log(error);
            },
          });
        }

        function reportComment(commentId) {
          var reportOption = '#report-option-' + commentId
          $.ajax({
            url: "/suggestions/report-comment",
            type: "POST",
            data: {
              comm_id: commentId,
              opt_id: $(reportOption).val()
            },
            success: function (data) {
              console.log(data);
            },
            error: function (error) {
              console.log(error);
            },
          });
        };
        function submitComment(commentContent, suggestionId) {
          console.log('Content: ' + commentContent, 'Suggestion ID: ' + suggestionId);
          $.ajax({
            url: "/suggestions/submit-comment",
            type: "POST",
            data: {
              sugg_id: suggestionId,
              comment: commentContent
            },
            success: function (data) {
              console.log(data);
              location.reload();
            },
            error: function (error) {
              console.log(error);
            },
          });
        }

        function deleteComment(commentId) {
          $.ajax({
            url: "/suggestions/delete-comment",
            type: "POST",
            data: {
              comm_id: commentId
            },
            success: function (data) {
              console.log(data);
              location.reload();
            },
            error: function (error) {
              console.log(error);
            },
          });
        }

        function charcountupdate(str) {
          var lng = str.length;
          if (lng > 0) {
            $('#new-comment-submit').prop('disabled', false);
            $('#new-comment-submit').removeClass('disabled');
          } else {
            $('#new-comment-submit').prop('disabled', true);
            $('#new-comment-submit').addClass('disabled');
          }
          document.getElementById('character-count').innerHTML = lng;
        }
    </script>

  {/exp:su_suggestions:viewIdea}
  {embed="core-components/.footer" js="socialSharer|jquery.timeago|jquery.charCount|suggestions|view_suggestion"
  vue_comp="button" }
</template>

<script>
export default {
  name: 'SuggestionsView',
};
</script>
