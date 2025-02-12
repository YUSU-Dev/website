<template>
    <div>

                <form method="post">

                    <input type="hidden" name="do" value="vote">
                    <input type="hidden" name="election_id" value="{election_id}">
                    <h2 class="text-3xl font-bold">Candidates</h2>
                    <div class="grid xxs:grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 my-10">
                        <button type="button" v-for="candidate in candidates" :key="candidate.id"
                            class="flex flex-col h-full shadow border" @click="handleVote(candidate.id)"
                            :class="{ 'selected-candidate': selectedCandidates.includes(candidate.id) }">
                            <div class="relative">
                                <div class="absolute flex w-full justify-end">
                                    <div v-if="candidate.voteOrder"
                                        class="bg-voice-orange w-8 h-8 flex items-center justify-center rounded-full m-2">
                                        <p>{{ candidate.voteOrder }}</p>
                                    </div>
                                </div>
                                <div v-if="candidate.assets.document_photo">
                                    <img :src="candidate.assets.document_photo" alt="" draggable="false" />
                                </div>
                                <div v-else>
                                    <img src="https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Red.webp" alt="" draggable="false" />
                                </div>
                            </div>
                            <div class="flex flex-col p-2 w-full h-full text-start">
                                <h3 class="text-lg font-semibold truncate xs:text-wrap">{{ candidate.name }}</h3>
                                <div v-if="candidate.id != 9" class="flex flex-col sm:flex-row justify-between flex-grow">
                                    <p class="truncate xs:text-wrap">{{ candidate.pronouns }}</p>
                                    <div class="flex justify-end items-end">
                                        <button type="button" class="" @click.stop="viewManifesto(candidate.id)"
                                            aria-label="View manifesto">
                                            <FontAwesomeIcon icon="fa-solid fa-circle-info" class="w-6 h-6">
                                            </FontAwesomeIcon>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>

                    <hr>

                    
                    <div v-if="spoiltVote == '1'" class="flex gap-x-2 items-center my-10">
                        <input id="spoil-vote" class="w-5 h-5" type="checkbox" name="spoilt" v-model="voteSpoiled"
                            aria-labelledby="spoil-vote-label" @click="doSpoilVote()">
                        <label id="spoil-vote-label" class="text-lg">Spoil Vote</label>
                    </div>

                    <hr>

                    <div class="flex flex-col gap-y-4">

                        <div class="flex gap-x-4">
                            <button type="button" id="clear-vote" class="btn btn-student-voice" @click="clearVotes()">Clear Votes</button>
                            <button type="button" class="btn btn-student-voice" @click="submitVotes()">Review and Submit</button>
                        </div>

                        <p><em>If you're having issues voting please contact <a
                                    href="mailto:elections@yorksu.org">elections@yorksu.org</a>.</em></p>

                    </div>

                </form>

    <CandidateModal v-if="candidate" :candidate-id="String(candidate.id)" :election-id="String(election.id)"
        :candidate-name="candidate.name" :modal-closed="ModalClosed" @close="ModalClosed = true" />
    <VoteModal :modal-closed="VoteModalClosed" :votes="votes" :candidates="candidates" :vote-spoiled="voteSpoiled" @close="VoteModalClosed = true" />
</div>
</template>

<script>
import axios from "../../_common/axios.mjs";
import CandidateModal from "../candidate-modal/candidate-modal.ce.vue";
import VoteModal from "../vote-modal/vote-modal.ce.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
library.add(faCircleInfo);
export default {
    name: "ElectionsVote",
    props: {
        electionId: {
            type: String,
            default: "",
        },
        spoiltVote: {
            type: String,
            default: '',
        },
    },
    components: {
        CandidateModal,
        VoteModal,
        FontAwesomeIcon,
    },
    data() {
        return {
            election: [],
            candidates: [],
            candidate: "",
            votes: [],
            selectedCandidates: [],
            ModalClosed: true,
            VoteModalClosed: true,
            voteSpoiled: false,
        };
    },
    mounted() {
        // console.log(this.candidate);
        this.getCandidates();
    },
    methods: {
        async getCandidates() {
            var self = this;
            self.ModalClosed = true;
            try {
                const [electionsResponse, pronounsResponse] =
                    await Promise.all([
                        axios.get("https://pluto.sums.su/api/elections/" + this.electionId),
                        axios.get("https://yorksu.org/elections/all-candidate-pronouns/" + this.electionId),
                    ]);
                // console.log(electionsResponse.data);
                self.election = electionsResponse.data;
                self.candidates = electionsResponse.data.candidates;
                let cleanedData = pronounsResponse.data.replace(/,\s*([\]}])/g, '$1');
                let JSONData = JSON.parse(cleanedData);
                self.candidates.forEach(candidate => {
                    const pronouns = JSONData.find(pronoun => pronoun.id == candidate.id);
                    if (pronouns) {
                        candidate.pronouns = pronouns.pronouns;
                    }
                    candidate.voteOrder = null;
                });
            } catch (error) {
                console.error(error);
            }
        },
        handleVote(candidateId) {
            if (this.voteSpoiled) {
                this.voteSpoiled = false;
            }
            const candidate = this.candidates.find(candidate => candidate.id === candidateId);
            if (this.votes.includes(candidateId)) {
                this.votes = this.votes.filter(id => id !== candidateId);
                this.selectedCandidates = this.selectedCandidates.filter(id => id !== candidateId);
                candidate.voteOrder = null;
            } else {
                this.votes.push(candidateId);
                this.selectedCandidates.push(candidateId);
                candidate.voteOrder = this.votes.length;
            }
            this.votes.forEach((id, index) => {
                const candidate = this.candidates.find(candidate => candidate.id === id);
                candidate.voteOrder = index + 1;
            });
            // console.log(this.votes);
        },
        viewManifesto(candidateId) {
            // console.log(candidateId);
            this.candidate = this.candidates.find(candidate => candidate.id === candidateId);
            // console.log(this.candidate);
            this.ModalClosed = false;
        },
        clearVotes() {
            this.votes = [];
            this.selectedCandidates = [];
            this.candidates.forEach(candidate => {
                candidate.voteOrder = null;
            });
        },
        doSpoilVote() {
            if (this.votes.length > 0) {
                this.clearVotes();
            }
        },
        submitVotes() {
            if (this.votes.length > 0 && this.voteSpoiled == false) {
                console.log("Voting submitted, votes: ");
                console.log(this.votes);
                this.VoteModalClosed = false;
            } else if (this.votes.length == 0 && this.voteSpoiled) {
                console.log("Vote spoiled");
                this.VoteModalClosed = false;
            } else {
                console.log("Please vote for at least 1 candidate or spoil your vote.");
            }
        },
    }
};
</script>
