<!-- eslint-disable -->
<template>
    <!-- {exp:su_elections:voteForm election_id="{segment_3}" activity_id="{segment_4}"}
    {embed="core-components/.header" title='Vote'} -->

    <!-- <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script> -->

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
                    <h2 class="text-3xl font-bold">Candidates</h2>
                    <div class="grid xxs:grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 my-10">
                        <button type="button" v-for="candidate in candidates" :key="candidate.id"
                            class="flex flex-col shadow border" @click="handleVote(candidate.id)"
                            :class="{ 'selected-candidate': selectedCandidates.includes(candidate.id) }">
                            <div v-if="candidate.assets.document_photo">
                                <img :src="candidate.assets.document_photo" alt="" />
                            </div>
                            <div v-else>

                            </div>
                            <div class="flex flex-col p-2 w-full text-start">
                                <h3 class="text-lg font-semibold truncate xs:text-wrap">{{ candidate.name }}</h3>
                                <p class="truncate xs:text-wrap">{{ candidate.pronouns }}</p>
                            </div>
                        </button>
                    </div>

                    <hr>

                    {if spoilt_votes == 1}
                    <div class="flex gap-x-2 items-center my-10">
                        <input id="spoil-vote" class="w-5 h-5" type="checkbox" name="spoilt" value="Y" aria-labelledby="spoil-vote-label">
                        <label id="spoil-vote-label" class="text-lg">Spoil Vote</label>
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



    <!-- {embed="core-components/.footer"}
    {/exp:su_elections:voteForm} -->


    <!-- <script type="text/javascript">
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
</script> -->
</template>

<script>
import axios from "../../_common/axios.mjs";
export default {
    name: "ElectionsVote",
    props: {
        electionId: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            candidates: [],
            votes: [],
            selectedCandidates: [],
        };
    },
    mounted() {
        this.getCandidates();
    },
    methods: {
        async getCandidates() {
            var self = this;
            try {
                const [electionsResponse, pronounsResponse] =
                    await Promise.all([
                        axios.get("https://pluto.sums.su/api/elections/" + this.electionId),
                        axios.get("https://yorksu.org/elections/all-candidate-pronouns/" + this.electionId),
                    ]);
                self.candidates = electionsResponse.data.candidates;
                let cleanedData = pronounsResponse.data.replace(/,\s*([\]}])/g, '$1');
                let JSONData = JSON.parse(cleanedData);
                self.candidates.forEach(candidate => {
                    const pronouns = JSONData.find(pronoun => pronoun.id == candidate.id);
                    if (pronouns) {
                        candidate.pronouns = pronouns.pronouns;
                    }
                });
            } catch (error) {
                console.error(error);
            }
        },
        handleVote(candidateId) {
            if (this.votes.includes(candidateId)) {
                this.votes = this.votes.filter(id => id !== candidateId);
                this.selectedCandidates = this.selectedCandidates.filter(id => id !== candidateId);
            } else {
                this.votes.push(candidateId);
                this.selectedCandidates.push(candidateId);
            }
            console.log(this.votes);
        }
    }
};
</script>
