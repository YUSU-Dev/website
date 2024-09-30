<!-- eslint-disable -->
<template>
    {exp:su_elections:voteForm election_id="{segment_3}" activity_id="{segment_4}"}
    {embed="core-components/.header" title='Vote'}

    <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>

    <div class="container mx-auto">

        <div class="flex flex-col gap-y-6">

            <h1 class="text-4xl font-bold mb-6">Vote</h1>

            {if election_id != "1937"}
            <div class="border-l-4 border-gray-400 bg-gray-100 p-2">
                <h2 class="mb-0 text-xl">
                    York SU uses the Single Transferable Voting System. You need to vote in order of preference,
                    with 1 being your first preference (i.e. the candidate you want to win). This is so that if
                    the person you want to win does not win, your second preference is taken into account.
                </h2>
            </div>
            {/if}

            <div class="info">
            </div>

            {if valid_vote}

            <div class="border-l-4 border-green-400 bg-green-100 p-2">
                <h2 class="mb-0 text-xl">Success!</h2>
                <p>
                    Your vote was successfully registered.
                </p>
            </div>

            {/if}


            <div class="flex flex-col gap-y-6">
                <!-- Details -->
                <div class="flex flex-col">
                    <h2 class="text-2xl">
                        <i class="fa fa-tasks"></i>
                        {election_name} <small>{election_sub_name}</small>
                    </h2>
                    <div class="form-group">
                        <div class="flex flex-col sm:flex-row gap-x-12">
                            <div class="flex flex-col">
                                <h3 class="text-xl mb-0">Election Method</h3>
                                <p>{election_method}</p>
                                {if election_id != "1937"}
                                <h3 class="text-xl mb-0">No. of Positions</h3>
                                <p>{number_of_positions}</p>
                                {/if}
                            </div>
                            <div class="flex flex-col">
                                <h3 class="text-xl mb-0">Voting Opens</h3>
                                <p>{voting_opens}</p>
                                <h3 class="text-xl mb-0">Voting Closes</h3>
                                <p>{voting_closes}</p>
                            </div>
                        </div>
                        <hr>
                        <div class="flex flex-col">
                            <h3 class="text-xl mb-0">Description</h3>
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

                <form method="post">

                    <input type="hidden" name="do" value="vote">
                    <input type="hidden" name="election_id" value="{election_id}">

                    <div class="flex flex-col gap-y-6 my-10">
                        {candidates}
                        <div class="flex flex-col gap-y-4 form-group p-4">


                            <div class="flex flex-col sm:flex-row gap-4">

                                <div class="">
                                    {if document_photo != ""}
                                    <img src="{document_photo}" class="max-h-40 aspect-square">
                                    {/if}
                                </div>

                                <div class="flex flex-col">
                                    <h2 class="text-3xl font-bold mb-0">{candidate_name}</h2>
                                    {if document_pronouns != ""}
                                    <p class="text-lg font-semibold">({document_pronouns})</p>
                                    {/if}
                                    {if document_blurb != ""}
                                    <p class="">{document_blurb}</p>
                                    {/if}
                                </div>

                            </div>

                            <div class="flex flex-col gap-y-2">
                                {if document_manifesto_summary != ""}
                                <div class="border-l-4 border-gray-400 bg-gray-100 p-2">
                                    <a href="javascript:manifestoSummary({candidate_id});">
                                        <h3 class="text-2xl mb-0 flex items-center gap-x-2">Manifesto
                                            Summary <i id="manifesto-summary-chevron"
                                                class="fa-solid fa-chevron-down"></i>
                                        </h3>
                                    </a>
                                    <p id="manifesto-summary-{candidate_id}" class="hidden">{document_manifesto_summary}
                                    </p>
                                </div>
                                {/if}
                                {if manifesto_text != ""}
                                <div class="border-l-4 border-gray-400 bg-gray-100 p-2">
                                    <a href="javascript:manifesto({candidate_id});">
                                        <h3 class="text-2xl mb-0 flex items-center gap-x-2">Full Manifesto (Reason
                                            for Standing) <i id="manifesto-chevron"
                                                class="fa-solid fa-chevron-down"></i>
                                        </h3>
                                    </a>
                                    <p id="manifesto-{candidate_id}" class="hidden">{manifesto_text}</p>
                                </div>
                                {/if}
                            </div>

                            <div>
                                {if method == "S"}

                                <select class="bg-gray-100 p-1 rounded" name="candidate[{candidate_id}]">
                                    {options}
                                    {if option == 0}
                                    <option value="{option}" {if option_selected} selected {/if}>-
                                    </option>
                                    {if:else}
                                    <option value="{option}" {if option_selected} selected {/if}>
                                        {option}</option>
                                    {/if}
                                    {/options}
                                </select>

                                {if:elseif method == "R"}

                                <div class="flex items-center gap-x-2">
                                    <input class="w-5 h-5" name="candidate" value="{candidate_id}"
                                        id="candidate-{candidate_id}" type="checkbox">
                                    <label class="text-lg">Vote</label>
                                </div>

                                {/if}
                            </div>

                        </div>
                        {/candidates}
                    </div>

                    <hr>

                    {if spoilt_votes == 1}
                    <div class="flex gap-x-2 items-center my-10">
                        <input id="spoil-vote" class="w-5 h-5" type="checkbox" name="spoilt" value="Y">
                        <label class="text-lg">Spoil Vote</label>
                    </div>
                    <div class="clearfix"></div>
                    {/if}

                    <hr>

                    <div class="flex flex-col gap-y-4">

                        <div class="flex gap-x-4">
                            <button type="button" id="clear-vote" class="btn btn-primary">Clear Vote</button>
                            <button type="submit" class="btn btn-primary">Submit</button>
                        </div>

                        <p><em>If you're having issues voting please contact <a
                                    href="mailto:elections@yorksu.org">elections@yorksu.org</a>.</em></p>

                    </div>

                </form>

            </div>



        </div>

    </div>



    {embed="core-components/.footer"}
    {/exp:su_elections:voteForm}


    <script type="text/javascript">
    function manifesto(manifestoID) {
        $('#manifesto-' + manifestoID).toggleClass('hidden');
        $('#manifesto-chevron').toggleClass('fa-chevron-down');
        $('#manifesto-chevron').toggleClass('fa-chevron-up');
    }

    function manifestoSummary(manifestoID) {
        $('#manifesto-summary-' + manifestoID).toggleClass('hidden');
        $('#manifesto-summary-chevron').toggleClass('fa-chevron-down');
        $('#manifesto-summary-chevron').toggleClass('fa-chevron-up');
    }

    $('#clear-vote').click(function () {
        $('input[name="candidate"]').prop('checked', false);
        $('.candidate-list').val('');
        $('input[name="spoilt"]').prop('checked', false);
        $('.candidate-list').removeAttr('disabled');
        $('.candidate-list').val('');
        $('input[name="candidate"]').prop('disabled', false);
        $('input[name="candidate"]').prop('checked', false);
    });

    $('#spoil-vote').click(function () {
        if ($(this).is(':checked')) {
            $('.candidate-list').attr('disabled', 'true');
            $('.candidate-list').val('');
            $('input[name="candidate"]').prop('disabled', true);
            $('input[name="candidate"]').prop('checked', false);
        } else {
            $('.candidate-list').removeAttr('disabled');
            $('.candidate-list').val('');
            $('input[name="candidate"]').prop('disabled', false);
            $('input[name="candidate"]').prop('checked', false);
        }
    });

    $('#view-role-desc').click(function () {
        $('#role-description').show();
    });
</script>
</template>

<script>
export default {
    name: "ElectionsVote",
};
</script>
