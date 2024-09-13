<template>
  {embed="core-components/.hero-header" title="Suggestions"
  image_url="https://assets-cdn.sums.su/YU/website/img/Banners/1500x400_Web_Banners_Student_Voice.jpg"}
  <div class="container mx-auto">
    <div>
      {exp:channel:entries channel="pages"}
      <!-- Page Content -->
      <article>{page_content}</article>
      {/exp:channel:entries}
      <div class="">
        <a class="btn btn-student-voice" href="/suggestions/new">
          Make a new suggestion
        </a>
        {exp:su_suggestions:voteList}
        <div class="">
          <div>
            <!-- Nav tabs -->
            <ul role="tablist" data-target="tabs" class="flex gap-2">
              {tabs}
              <li class="list-none">
                <a
                  class="btn btn-student-voice {if active == 1}btn-student-voice-active{/if}"
                  data-toggle="tab"
                  href="#tab{id}"
                  role="tab"
                >
                  {name}
                  <span
                    class="inline-flex items-center bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600"
                    >{suggestions_count}</span
                  >
                </a>
              </li>
              {/tabs}
            </ul>
            <!-- End Nav tabs -->

            <!-- Tab panes -->
            <div id="tabs" class="tab-content g-mb-40">
              {tabs}
              <div class="block" id="tab{id}" role="tabpanel">
                <!-- Taglines Bordered -->
                <div
                  class="g-brd-around g-brd-gray-light-v4 g-brd-2 g-brd-primary-left g-line-height-1_8 g-py-10 g-px-20 g-mb-30"
                  role="alert"
                >
                  {blurb}
                </div>
                <!-- End Taglines Bordered -->
                {if loggedIn != 1}
                <div
                  class="alert fade show g-brd-around g-brd-orange rounded-0 g-mt-10"
                  role="alert"
                >
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
                      <p class="g-font-size-14 m-0">
                        Log in if you wish to vote and add to the discussion!
                      </p>
                    </div>
                  </div>
                </div>

                {/if} {if hasSuggestions == 1}
                <div class="container">
                  <div class="vote-items row justify-content-center">
                    {suggestions}
                    <div
                      class="vote-item border-dark col-12 col-md-5 m-3 rounded border p-3"
                    >
                      <div class="vote-actions">
                        {if canVote == 1}
                        <a>
                          <i
                            role="button"
                            aria-label="vote up"
                            id="vote-up-{suggestionID}"
                            data-suggestion-id="{suggestionID}"
                            class="fa fa-thumbs-up vote-up g-color-gray-light-v1 {if votedUp == 1}active{/if}"
                          ></i>
                        </a>
                        {/if} {if fast_tracked == 1}
                        <div
                          class="g-color-primary tooltips no-vote-action"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="This idea has been fast-tracked as the Executive Committee have agreed that they want to take this idea forward to be put into action."
                        >
                          <i class="fas fa-bolt"></i>
                        </div>
                        <!-- {if:else}
                      <div id="vote-count-{suggestionID}" {if canVote !=1 }class="no-vote-action"
                           {/if} data-upvote-count="{upVotes}" data-novote-count="{noVotes}"
                           data-downvote-count="{downVotes}">{votes} Votes</div>
                      {/if} -->
                        {if canVote==1}
                        <a>
                          <i
                            role="button"
                            aria-label="vote down"
                            id="vote-down-{suggestionID}"
                            data-suggestion-id="{suggestionID}"
                            class="fa fa-thumbs-down vote-down g-color-gray-light-v1 {if votedDown == 1}active{/if}"
                          ></i>
                        </a>
                        {/if}
                      </div>
                      <a href="/suggestions/view/{suggestionID}" class="text-sm"
                        >{title}</a
                      >
                      <div class="text-sm">
                        Submitted by {memberName} {if canVote == 1}with voting
                        closing
                        <time
                          class="timeago"
                          datetime="{expirationDateISO}"
                        ></time
                        >{/if}
                      </div>
                      <div class="text-sm">
                        <a href="/suggestions/view/{suggestionID}"
                          >{commentCount} comment{if commentCount != 1}s{/if}</a
                        >
                      </div>
                    </div>
                    {/suggestions}
                  </div>
                </div>

                {if:else}
                <!-- nothing to show notification -->
                <article
                  class="d-md-table text-md-left w-100 g-bg-white g-mb-1 g-brd-around g-brd-black-opacity-0_4 rounded-0 text-center"
                >
                  <div
                    class="d-md-table-cell g-valign-middle g-py-10 g-px-20 text-center"
                  >
                    <span
                      class="d-block g-font-size-40 g-line-height-1 g-color-gray-dark-v2 u-icon-v1"
                    >
                      <i class="fas fa-question icon-question"></i>
                    </span>
                  </div>

                  <!-- Article Content -->
                  <div class="d-md-table-cell g-valign-middle g-py-15 g-px-20">
                    <h4 class="h6 text-uppercase g-font-weight-700">
                      <p class="g-color-gray-dark-v2 g-mb-0">
                        No ideas to display
                      </p>
                    </h4>
                    <em class="g-font-style-normal"
                      >There are no ideas to display at the moment</em
                    >
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
  {embed="core-components/.footer" js="socialSharer|jquery.timeago|suggestions"}
</template>

<script>
export default {
  name: "SuggestionsIndex",
};
</script>
