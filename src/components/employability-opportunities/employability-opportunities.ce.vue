<template>
  <div id="employability-opportunities" class="w-full">
    <div v-if="title" class="mb-4">
      <h2 class="text-3xl font-bold">{{ title }}</h2>
    </div>

    <div class="grid grid-cols-10">
      <!-- Filters -->
      <div
        class="z-2 order-1 col-span-10 mb-5 xl:order-2 xl:col-span-3 xl:pl-4"
      >
        <div class="sticky top-4 rounded-lg border bg-gray-50 p-6">
          <div class="mb-5">
            <label for="search">
              <h2 class="mb-2 text-xl font-semibold">Search</h2>
            </label>
            <div class="flex">
              <input
                class="w-full rounded-l border border-black bg-white p-2"
                type="text"
                aria-label="search for opportunities"
                name="search"
                placeholder="Search opportunities..."
                v-model="searchTerm"
                @input="searchOpportunities"
              />
              <div>
                <button
                  type="submit"
                  aria-label="Submit"
                  class="h-full rounded-r border border-l-0 border-black bg-black px-2"
                  @click="searchOpportunities"
                >
                  <FontAwesomeIcon
                    icon="fa-solid fa-search"
                    class="h-4 w-4 text-white"
                  />
                </button>
              </div>
            </div>
          </div>

          <div class="mb-5" v-if="categories.length > 0">
            <label for="categories">
              <h2 class="mb-2 text-xl font-semibold">Category</h2>
            </label>
            <div class="categories-dropdown rounded border bg-white">
              <v-select
                class="dropdown-compact"
                label="name"
                :options="categories"
                :model-value="selectedCategory"
                @update:model-value="selectCategory"
                placeholder="All Categories"
                :clearable="true"
                :reduce="(category) => category"
              >
              </v-select>
            </div>
          </div>

          <div class="mb-2" v-if="skills.length > 0">
            <label for="skills">
              <h2 class="mb-2 text-xl font-semibold">Skills</h2>
            </label>
            <div class="rounded border bg-white">
              <v-select
                class="dropdown-compact"
                label="name"
                :options="skills"
                :model-value="selectedSkills"
                @update:model-value="selectSkills"
                placeholder="All Skills"
                multiple
                :clearable="true"
                :reduce="(skill) => skill"
              >
              </v-select>
            </div>
          </div>
        </div>
      </div>
      <!-- End of Filters -->
      <div class="order-1 col-span-10 xl:order-1 xl:col-span-7 xl:pr-4">
        <!-- Loading -->
        <div v-if="loading" class="mb-6">
          <div
            class="flex animate-pulse flex-col overflow-hidden rounded-lg border bg-gray-50 md:flex-row"
          >
            <div
              class="relative h-48 w-full flex-shrink-0 bg-gray-300 md:h-auto md:w-56"
            ></div>
            <div
              class="flex min-h-32 flex-1 flex-col justify-between bg-white p-4"
            >
              <div class="flex-1">
                <div class="mb-3">
                  <div class="mb-1 flex items-start justify-between gap-3">
                    <div class="flex-1">
                      <div class="mb-2 h-6 rounded bg-gray-300"></div>
                      <div class="h-6 w-3/4 rounded bg-gray-300"></div>
                    </div>
                    <div class="hidden flex-shrink-0 md:block">
                      <div class="h-8 w-24 rounded bg-gray-300"></div>
                    </div>
                  </div>
                  <div class="mt-2 h-4 w-1/2 rounded bg-gray-200"></div>
                </div>
                <div class="mb-3 flex flex-wrap gap-4">
                  <div class="h-4 w-32 rounded bg-gray-200"></div>
                  <div class="h-4 w-24 rounded bg-gray-200"></div>
                </div>
                <div class="space-y-2">
                  <div class="flex flex-wrap gap-1">
                    <div class="h-6 w-16 rounded bg-gray-200"></div>
                    <div class="h-6 w-20 rounded bg-gray-200"></div>
                    <div class="h-6 w-14 rounded bg-gray-200"></div>
                  </div>
                  <div>
                    <div class="mb-1 h-4 w-12 rounded bg-gray-200"></div>
                    <div class="flex flex-wrap gap-1">
                      <div class="h-5 w-16 rounded bg-gray-100"></div>
                      <div class="h-5 w-20 rounded bg-gray-100"></div>
                      <div class="h-5 w-18 rounded bg-gray-100"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="mt-4 border-t border-gray-100 pt-3">
                <div class="h-10 w-full rounded bg-gray-300 md:w-32"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- End of Loading -->
        <!-- No Results -->
        <div v-else-if="opportunities.length === 0">
          <h2 class="mt-16 mb-4 text-center text-2xl font-semibold">
            No Opportunities Found
          </h2>
          <p class="text-center text-gray-500">
            Try adjusting your filters or search terms.
          </p>
        </div>
        <!-- End of No Results -->
        <!-- Opportunities -->
        <div v-else class="z-1">
          <div class="mb-6 space-y-4">
            <div
              v-for="opportunity in opportunities"
              :key="opportunity.id"
              class="flex flex-col overflow-hidden rounded-lg border bg-gray-50 duration-200 hover:bg-gray-100 md:flex-row"
            >
              <div
                class="relative h-48 w-full overflow-hidden bg-gray-200 md:h-auto md:w-56"
              >
                <img
                  v-if="opportunity.thumbnail_url"
                  :src="opportunity.thumbnail_url"
                  :alt="opportunity.name"
                  class="h-full w-full object-cover object-center"
                  loading="lazy"
                />
                <div
                  v-else
                  class="flex h-full w-full items-center justify-center bg-gray-300"
                >
                  <img
                    class="h-full w-full object-cover object-center"
                    src="https://assets-cdn.sums.su/YU/website/img/placeholders/500x500_Yellow.webp"
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div v-if="opportunity.dbs" class="absolute top-2 right-2">
                  <span
                    class="rounded bg-[#DE2F1B] px-2 py-1 text-xs font-semibold text-white shadow-sm"
                  >
                    DBS Required
                  </span>
                </div>
              </div>
              <div
                class="flex min-h-32 flex-1 flex-col justify-between bg-white p-4"
              >
                <div class="flex-1">
                  <div class="mb-3">
                    <div class="mb-1 flex items-start justify-between gap-3">
                      <h3
                        class="line-clamp-2 flex-1 text-lg font-semibold text-gray-900"
                      >
                        {{ opportunity.name }}
                      </h3>
                      <div
                        v-if="
                          opportunity.available_places &&
                          opportunity.available_places !== -1
                        "
                        class="hidden md:flex"
                      >
                        <span
                          class="flex items-center rounded bg-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700"
                        >
                          <FontAwesomeIcon
                            icon="fa-solid fa-users"
                            class="mr-1.5 h-4 w-4"
                          />
                          {{
                            opportunity.available_places -
                            opportunity.taken_places
                          }}
                          {{
                            opportunity.available_places -
                              opportunity.taken_places ===
                            1
                              ? "space"
                              : "spaces"
                          }}
                          available
                        </span>
                      </div>
                      <div
                        v-else-if="opportunity.available_places === -1"
                        class="hidden md:flex"
                      >
                        <span
                          class="flex items-center rounded bg-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700"
                        >
                          <FontAwesomeIcon
                            icon="fa-solid fa-users"
                            class="mr-1.5 h-4 w-4"
                          />
                          Unlimited spaces
                        </span>
                      </div>
                    </div>
                    <p class="text-sm font-medium text-gray-600">
                      {{ opportunity.organisation_name }}
                    </p>
                  </div>
                  <div class="mb-3 flex flex-wrap gap-4 text-sm text-gray-600">
                    <div
                      v-if="opportunity.start_date || opportunity.end_date"
                      class="flex items-center"
                    >
                      <FontAwesomeIcon
                        icon="fa-solid fa-calendar"
                        class="mr-2 h-3 w-3"
                      />
                      <span
                        v-if="opportunity.start_date && opportunity.end_date"
                      >
                        {{ formatDate(opportunity.start_date) }} -
                        {{ formatDate(opportunity.end_date) }}
                      </span>
                      <span v-else-if="opportunity.start_date">
                        From {{ formatDate(opportunity.start_date) }}
                      </span>
                      <span v-else-if="opportunity.end_date">
                        Until {{ formatDate(opportunity.end_date) }}
                      </span>
                    </div>
                    <div
                      v-if="opportunity.location && opportunity.location.trim()"
                      class="flex items-center"
                    >
                      <FontAwesomeIcon
                        icon="fa-solid fa-map-marker-alt"
                        class="mr-2 h-3 w-3 flex-shrink-0"
                      />
                      <span v-html="opportunity.location"></span>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <div
                      v-if="
                        opportunity.categories &&
                        opportunity.categories.length > 0
                      "
                      class="flex flex-wrap gap-1"
                    >
                      <span
                        v-for="category in expandedCategories[opportunity.id]
                          ? opportunity.categories
                          : opportunity.categories.slice(0, 2)"
                        :key="category.id"
                        class="bg-mustard rounded px-2 py-1 text-xs font-medium text-black"
                      >
                        {{ category.name }}
                      </span>
                      <button
                        v-if="opportunity.categories.length > 2"
                        @click="toggleCategoriesExpanded(opportunity.id)"
                        class="cursor-pointer rounded bg-gray-200 px-2 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-300"
                      >
                        {{
                          expandedCategories[opportunity.id]
                            ? "show less"
                            : `+${opportunity.categories.length - 2} more`
                        }}
                      </button>
                    </div>
                    <div
                      v-if="opportunity.skills && opportunity.skills.length > 0"
                    >
                      <h4 class="mb-1 text-sm font-semibold text-gray-800">
                        Skills:
                      </h4>
                      <div class="flex flex-wrap gap-1">
                        <span
                          v-for="skill in expandedSkills[opportunity.id]
                            ? opportunity.skills
                            : opportunity.skills.slice(0, 5)"
                          :key="skill.id"
                          class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800"
                        >
                          {{ skill.name }}
                        </span>
                        <button
                          v-if="opportunity.skills.length > 5"
                          @click="toggleSkillsExpanded(opportunity.id)"
                          class="cursor-pointer rounded bg-gray-200 px-2 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-300"
                        >
                          {{
                            expandedSkills[opportunity.id]
                              ? "show less"
                              : `+${opportunity.skills.length - 5} more`
                          }}
                        </button>
                      </div>
                    </div>
                    <div
                      v-if="
                        opportunity.available_places &&
                        opportunity.available_places !== -1
                      "
                      class="mt-3 md:hidden"
                    >
                      <span
                        class="flex items-center rounded-full bg-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700"
                      >
                        <FontAwesomeIcon
                          icon="fa-solid fa-users"
                          class="mr-1.5 h-4 w-4"
                        />
                        {{
                          opportunity.available_places -
                          opportunity.taken_places
                        }}
                        {{
                          opportunity.available_places -
                            opportunity.taken_places ===
                          1
                            ? "space"
                            : "spaces"
                        }}
                        available
                      </span>
                    </div>
                    <div
                      v-else-if="opportunity.available_places === -1"
                      class="mt-3 md:hidden"
                    >
                      <span
                        class="flex items-center rounded-full bg-gray-200 px-3 py-1.5 text-sm font-semibold text-gray-700"
                      >
                        <FontAwesomeIcon
                          icon="fa-solid fa-users"
                          class="mr-1.5 h-4 w-4"
                        />
                        Unlimited spaces
                      </span>
                    </div>
                  </div>
                </div>
                <div class="mt-4 border-t border-gray-100 pt-3">
                  <button
                    @click="viewOpportunity(opportunity.id)"
                    class="bg-mustard hover:bg-mustard w-full rounded px-6 py-2 text-sm font-medium text-black transition-colors duration-200 hover:opacity-85 md:w-auto"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <Pagination
            v-if="hasMoreResults || hasPreviousResults"
            :loading="loading"
            :array="opportunities"
            :load-page="loadPage"
            :page="currentPage"
            :more-results="hasMoreResults"
            :previous-results="hasPreviousResults"
          />
        </div>
      </div>
    </div>

    <!-- Opportunity Detail Modal -->
    <EmployabilityModal
      :is-open="modalOpen"
      :opportunity="selectedOpportunity"
      :loading="loadingOpportunity"
      @close="closeModal"
    />
  </div>
</template>

<style>
@import "https://cdn.jsdelivr.net/npm/vue-select@3.16.0/dist/vue-select.css";
</style>
<script>
import axios from "../../_common/axios.mjs";
import Pagination from "../Pagination/Pagination.ce.vue";
import EmployabilityModal from "../employability-modal/employability-modal.ce.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSpinner,
  faSearch,
  faBriefcase,
  faCalendar,
  faMapMarkerAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import vSelect from "vue-select";

library.add(
  faSpinner,
  faSearch,
  faBriefcase,
  faCalendar,
  faMapMarkerAlt,
  faUsers,
);

export default {
  name: "EmployabilityOpportunities",
  props: {
    title: {
      type: String,
      default: "Employability Opportunities",
    },
    perpage: {
      type: Number,
      default: 12,
    },
  },
  components: {
    Pagination,
    EmployabilityModal,
    FontAwesomeIcon,
    "v-select": vSelect,
  },
  data() {
    return {
      opportunities: [],
      categories: [],
      skills: [],
      searchTerm: "",
      selectedCategory: null,
      selectedSkills: [],
      currentPage: 1,
      pages: [],
      perPage: this.perpage,
      hasMoreResults: false,
      hasPreviousResults: false,
      loading: true,
      expandedCategories: {},
      expandedSkills: {},
      modalOpen: false,
      selectedOpportunity: null,
      loadingOpportunity: false,
    };
  },
  created() {
    this.initializeComponent();
  },
  methods: {
    async initializeComponent() {
      this.loading = true;
      try {
        await Promise.all([this.getCategories(), this.getSkills()]);
        await this.getOpportunities();
      } finally {
        this.loading = false;
      }
    },

    async getCategories() {
      const response = await axios.get(
        "https://pluto.sums.su/api/employability/categories",
      );
      this.categories = response.data;
    },

    async getSkills() {
      const response = await axios.get(
        "https://pluto.sums.su/api/employability/skills",
      );
      this.skills = response.data;
    },

    async getOpportunities(resetPagination = true) {
      if (resetPagination) {
        this.currentPage = 1;
        this.pages = [1];
      }

      const params = new URLSearchParams({
        perPage: this.perPage.toString(),
        page: this.currentPage.toString(),
      });

      // Add filters
      if (this.searchTerm) {
        params.append("searchTerm", this.searchTerm);
      }
      if (this.selectedCategory) {
        params.append("categoryId", this.selectedCategory.id.toString());
      }
      if (this.selectedSkills && this.selectedSkills.length > 0) {
        const skillIds = this.selectedSkills.map((skill) => skill.id).join(",");
        params.append("skillIds", skillIds);
      }

      const response = await axios.get(
        `https://pluto.sums.su/api/employability/opportunities?${params}`,
      );

      this.opportunities = response.data.data;

      this.hasMoreResults = !!response.data.next_page_url;
      this.hasPreviousResults = !!response.data.prev_page_url;
    },

    selectCategory(category) {
      this.selectedCategory = category;
      this.currentPage = 1;
      this.pages = [1];
      this.getOpportunities(true);
    },

    selectSkills(skills) {
      this.selectedSkills = skills || [];
      this.currentPage = 1;
      this.pages = [1];
      this.getOpportunities(true);
    },

    searchOpportunities() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.currentPage = 1;
        this.pages = [1];
        this.getOpportunities(true);
      }, 300);
    },

    async loadPage(pageNumber = null) {
      if (pageNumber) {
        this.currentPage = pageNumber;
      } else {
        this.currentPage++;
      }

      if (this.pages.indexOf(this.currentPage) === -1) {
        this.pages.push(this.currentPage);
      }

      await this.getOpportunities(false);

      const opportunitiesTop = document.querySelector(
        "#employability-opportunities",
      );
      if (opportunitiesTop) {
        opportunitiesTop.scrollIntoView({ behavior: "smooth" });
        opportunitiesTop.focus();
      }
    },

    async viewOpportunity(opportunityId) {
      this.loadingOpportunity = true;
      this.modalOpen = true;

      const response = await axios.get(
        `https://pluto.sums.su/api/employability/opportunities/${opportunityId}`,
      );

      this.selectedOpportunity = response.data;
      this.loadingOpportunity = false;
    },

    closeModal() {
      this.modalOpen = false;
      this.selectedOpportunity = null;
    },

    formatDate(dateInput) {
      if (!dateInput) return "";

      const date =
        typeof dateInput === "number"
          ? new Date(dateInput * 1000)
          : new Date(dateInput);

      if (isNaN(date.getTime())) return "";

      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    },

    toggleCategoriesExpanded(opportunityId) {
      this.expandedCategories = {
        ...this.expandedCategories,
        [opportunityId]: !this.expandedCategories[opportunityId],
      };
    },

    toggleSkillsExpanded(opportunityId) {
      this.expandedSkills = {
        ...this.expandedSkills,
        [opportunityId]: !this.expandedSkills[opportunityId],
      };
    },
  },
};
</script>
