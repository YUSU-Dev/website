<!-- eslint-disable -->
<template>
  {embed="core-components/.hero-header" title="Big Ideas"
  image_url="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_Student_Voice.jpg"}

  <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/timeago@1.6.7/jquery.timeago.min.js"></script>

  <style>
    .tab-button {
      white-space: nowrap;
    }

    @media (min-width: 1280px) {
      .vote-item {
        /* Putting this here as the tailwind class hasn't been generated on the website */
        max-width: calc(50% - 0.375rem);
      }
    }

    @media (min-width: 476px) {
      .go-to-idea {
        border-left: solid #e5e7eb;
        padding-left: 0.5rem;
      }
    }

    .go-to-idea {
      min-width: 89px;
    }

    .vote-active {
      color: #f2682f !important;
    }
  </style>

  <div class="container mx-auto">
    <div>
      {exp:channel:entries channel="pages"}
      <!-- Page Content -->
      <div>
        {page_content}
      </div>
      {/exp:channel:entries}
      <div class="">
        <div class="my-10">
          <a class="btn btn-student-voice" href="/suggestions/new">
            Submit a new idea
          </a>
        </div>
        {exp:su_suggestions:voteList}
        <div class="">
          <div>
            <!-- Nav tabs -->
            <ul role="tablist" data-target="tabs" class="flex flex-wrap gap-2 pl-0 mb-10">
              {tabs}
              <li class="list-none ">
                <a class="btn btn-student-voice flex items-center gap-2 tab-button" data-toggle="tab"
                  href="javascript:tab({id});" role="tab" id="tab-{id}">
                  {name}
                  <span class="">{suggestions_count}</span>
                </a>
              </li>
              {/tabs}
            </ul>
            <!-- End Nav tabs -->

            <!-- Tab panes -->
            <div id="tabs" class="tab-content g-mb-40">
              {tabs}
              <div class="hidden tab-panel" id="tab{id}" role="tabpanel">
                <!-- Taglines Bordered -->
                <div
                  class="g-brd-around g-brd-gray-light-v4 g-brd-2 g-brd-primary-left g-line-height-1_8 my-10 g-px-20 g-mb-30"
                  role="alert">
                  {blurb}
                </div>
                <!-- End Taglines Bordered -->
                {if loggedIn != 1}
                <div class="alert fade show g-brd-around g-brd-orange rounded-0 mb-10" role="alert">
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
                      <p class="m-0 g-font-size-14">Log in if you wish to vote and add to the
                        discussion!</p>
                    </div>
                  </div>
                </div>

                {/if} {if hasSuggestions == 1}
                <div class="mb-10">
                  <div class="vote-items flex flex-wrap gap-3">
                    {suggestions}
                    <div
                      class="border rounded-sm hover:shadow-sm p-3 flex flex-col xs:flex-row gap-2 justify-between grow sm:max-w-[50%] vote-item">
                      <div class="flex flex-col justify-between">
                        <div id="vote-actions" class="vote-actions flex gap-2 items-center">
                          {if canVote == 1}
                          <i role="button" aria-label="vote up" id="vote-up-{suggestionID}"
                            data-suggestion-id="{suggestionID}"
                            class="fa fa-thumbs-up vote-up g-color-gray-light-v1 vote vote-up-{suggestionID} {if votedUp == 1}vote-active{/if}"></i>
                          {/if}
                          {if fast_tracked == 1}
                          <div class="g-color-primary tooltips no-vote-action" data-toggle="tooltip"
                            data-placement="bottom"
                            title="This idea has been fast-tracked as the Executive Committee have agreed that they want to take this idea forward to be put into action.">
                            <i class="fas fa-bolt"></i>
                          </div>
                          {if:else}
                          <div id="vote-count-{suggestionID}" data-upvote-count="{upVotes}"
                            data-novote-count="{noVotes}" data-downvote-count="{downVotes}">
                            {votes} Votes
                          </div>
                          {/if}
                          {if canVote == 1}<i role="button" aria-label="vote down" id="vote-down-{suggestionID}"
                            data-suggestion-id="{suggestionID}"
                            class="fa fa-thumbs-down vote-down vote vote-down-{suggestionID} g-color-gray-light-v1 {if votedDown == 1}vote-active{/if}"></i>
                          {/if}
                        </div>
                        <div>
                          <h2 class="font-semibold text-base mb-0">
                            {title}
                          </h2>
                        </div>
                        <div class="flex flex-col">
                          <div class="text-sm">
                            Submitted by {memberName} {if canVote == 1}with voting closing
                            <time class="timeago" datetime="{expirationDateISO}"></time>{/if}
                          </div>
                          <div class="text-sm">
                            {commentCount} comment{if commentCount != 1}s{/if}
                          </div>
                        </div>
                      </div>
                      <div class="border-l go-to-idea">
                        <a href="/suggestions/view/{suggestionID}"
                          class="h-full w-full flex flex-col gap-y-2 justify-center">
                          <p class="mb-0 text-center">Go to Idea</p>
                          <i class="fa-solid fa-arrow-right text-center"></i>
                        </a>
                      </div>
                    </div>
                    {/suggestions}
                  </div>
                </div>

                {if:else}
                <!-- nothing to show notification -->
                <article class="mb-10">

                  <!-- Article Content -->
                  <div class="flex flex-col gap-y-2">
                    <h4 class="flex gap-2 items-center">
                      <i class="fas fa-question icon-question"></i>
                      No ideas to display
                    </h4>
                    <em class="g-font-style-normal">There are no ideas to display at the moment</em>
                  </div>
                  <!-- End Article Content -->

                </article>
                <!-- end of nothing to show notification -->
                {/if}
              </div>
              {/tabs}
            </div>
            {/exp:su_suggestions:voteList}
            <!-- End Tab panes -->

          </div>
        </div>
      </div>
    </div>
  </div>
  <script>
    $(document).ready(function () {
      $.timeago.settings.allowFuture = true;
      $("time.timeago").timeago();
      $('.tab-content').children(":first").removeClass('hidden');
      $('.tab-button').first().addClass('btn-student-voice-active');
    });

    $('.vote-up').click(function () {
      var suggestionId = $(this).data('suggestion-id');
      vote(suggestionId, 1);
      $('.vote-down-' + suggestionId).removeClass('vote-active');
      $('.vote-up-' + suggestionId).addClass('vote-active');
    });

    $('.vote-down').click(function () {
      var suggestionId = $(this).data('suggestion-id');
      vote(suggestionId, -1);
      $('.vote-up-' + suggestionId).removeClass('vote-active');
      $('.vote-down-' + suggestionId).addClass('vote-active');
    });

    function tab(Id) {
      $('.tab-button').removeClass('btn-student-voice-active');
      $('#tab-' + Id).addClass('btn-student-voice-active');
      $('.tab-panel').addClass('hidden');
      $('#tab' + Id).toggleClass('hidden');
    }

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
  </script>
  {embed="core-components/.footer" js="socialSharer|jquery.timeago|suggestions"}
</template>

<script>
export default {
  name: 'Suggestions',
};
</script>
