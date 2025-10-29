<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center"
    @click.self="$emit('close')"
  >
    <div
      class="mx-4 flex max-h-[90vh] w-full max-w-4xl flex-col rounded-lg bg-white shadow-xl"
    >
      <div
        class="flex items-center justify-between rounded-t border-b border-gray-200 bg-white px-6 py-4"
      >
        <h2 v-if="!loading" class="text-2xl font-bold text-gray-900">
          {{ opportunity.name }}
        </h2>
        <div v-else class="h-8 w-64 animate-pulse rounded bg-gray-200"></div>

        <button
          @click="$emit('close')"
          class="text-gray-400 transition-colors hover:text-gray-600"
          aria-label="Close Modal"
        >
          <FontAwesomeIcon icon="fa-solid fa-times" class="h-6 w-6" />
        </button>
      </div>

      <div class="flex overflow-y-auto p-6">
        <div v-if="loading" class="space-y-4">
          <div class="h-4 animate-pulse rounded bg-gray-200"></div>
          <div class="h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
          <div class="h-4 w-1/2 animate-pulse rounded bg-gray-200"></div>
        </div>

        <div v-else-if="opportunity" class="space-y-6">
          <div class="flex flex-col gap-6 md:flex-row">
            <div
              class="h-48 w-full overflow-hidden rounded bg-gray-200 md:w-80"
            >
              <img
                v-if="opportunity.thumbnail_url"
                :src="opportunity.thumbnail_url"
                :alt="opportunity.name"
                class="h-full w-full object-cover"
              />
              <div
                v-else
                class="flex h-full w-full items-center justify-center bg-gray-300"
              >
                <FontAwesomeIcon
                  icon="fa-solid fa-briefcase"
                  class="h-12 w-12 text-gray-600"
                />
              </div>
            </div>

            <div class="flex-1 space-y-4">
              <div>
                <h3 class="mb-2 text-lg font-semibold text-gray-900">
                  Organisation
                </h3>
                <p class="text-gray-700">{{ opportunity.organisation_name }}</p>
                <a
                  v-if="opportunity.organisation_website"
                  :href="`https://${opportunity.organisation_website}`"
                  target="_blank"
                  class="text-blue-600 underline hover:text-blue-800"
                >
                  {{ opportunity.organisation_website }}
                </a>
              </div>

              <div class="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                <div v-if="opportunity.start_date || opportunity.end_date">
                  <h4 class="mb-1 font-semibold text-gray-900">Duration</h4>
                  <div class="flex items-center text-gray-600">
                    <FontAwesomeIcon
                      icon="fa-solid fa-calendar"
                      class="mr-2 h-3 w-3"
                    />
                    <span v-if="opportunity.start_date && opportunity.end_date">
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
                </div>

                <div v-if="opportunity.available_places">
                  <h4 class="mb-1 font-semibold text-gray-900">Availability</h4>
                  <div class="flex items-center text-gray-600">
                    <FontAwesomeIcon
                      icon="fa-solid fa-users"
                      class="mr-2 h-3 w-3"
                    />
                    <span
                      v-if="opportunity.available_places === -1"
                      class="font-semibold"
                    >
                      Unlimited spaces available
                    </span>
                    <span v-else>
                      {{
                        opportunity.available_places - opportunity.taken_places
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
                </div>

                <div v-if="opportunity.location">
                  <h4 class="mb-1 font-semibold text-gray-900">Location</h4>
                  <div class="flex items-start text-gray-600">
                    <FontAwesomeIcon
                      icon="fa-solid fa-map-marker-alt"
                      class="mt-1 mr-2 h-3 w-3"
                    />
                    <div v-html="opportunity.location"></div>
                  </div>
                </div>

                <div v-if="opportunity.dbs">
                  <h4 class="mb-1 font-semibold text-gray-900">Requirements</h4>
                  <span
                    class="flex w-fit items-center rounded bg-red-100 px-2 py-1 text-xs font-semibold text-red-800"
                  >
                    DBS Required
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div v-if="opportunity.tasks">
            <h3 class="mb-3 text-lg font-semibold text-gray-900">
              Tasks & Responsibilities
            </h3>
            <div v-html="opportunity.tasks"></div>
          </div>

          <div v-if="opportunity.support">
            <h3 class="mb-3 text-lg font-semibold text-gray-900">
              Support Provided
            </h3>
            <div v-html="opportunity.support"></div>
          </div>

          <div v-if="opportunity.qualities">
            <h3 class="mb-3 text-lg font-semibold text-gray-900">
              Desired Qualities
            </h3>
            <div v-html="opportunity.qualities"></div>
          </div>

          <div v-if="opportunity.availability">
            <h3 class="mb-3 text-lg font-semibold text-gray-900">
              Availability Requirements
            </h3>
            <div v-html="opportunity.availability"></div>
          </div>

          <div v-if="opportunity.additional_information">
            <h3 class="mb-3 text-lg font-semibold text-gray-900">
              Additional Information
            </h3>
            <div v-html="opportunity.additional_information"></div>
          </div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div v-if="opportunity.skills && opportunity.skills.length > 0">
              <h3 class="mb-3 text-lg font-semibold text-gray-900">Skills</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="skill in opportunity.skills"
                  :key="skill.id"
                  class="rounded bg-gray-100 px-3 py-1 text-sm text-gray-800"
                >
                  {{ skill.name }}
                </span>
              </div>
            </div>

            <div
              v-if="opportunity.categories && opportunity.categories.length > 0"
            >
              <h3 class="mb-3 text-lg font-semibold text-gray-900">
                Categories
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="category in opportunity.categories"
                  :key="category.id"
                  class="bg-mustard rounded px-3 py-1 text-sm text-black"
                >
                  {{ category.name }}
                </span>
              </div>
            </div>

            <div v-if="opportunity.schools && opportunity.schools.length > 0">
              <h3 class="mb-3 text-lg font-semibold text-gray-900">Schools</h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="school in opportunity.schools"
                  :key="school.id"
                  class="rounded bg-gray-100 px-3 py-1 text-sm text-gray-800"
                >
                  {{ school.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex justify-end gap-3 rounded-b border-t border-gray-200 bg-gray-50 px-6 py-4"
      >
        <button
          @click="$emit('close')"
          class="rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
        >
          Close
        </button>
        <a
          v-if="
            opportunity &&
            opportunity.organisation_website &&
            (opportunity.available_places === -1 ||
              opportunity.available_places - opportunity.taken_places > 0)
          "
          :href="`https://${opportunity.organisation_website}`"
          target="_blank"
          class="bg-mustard rounded px-6 py-2 text-center font-medium text-black transition-opacity hover:opacity-85"
        >
          Apply for this Opportunity
        </a>
        <button
          v-else-if="opportunity"
          disabled
          class="cursor-not-allowed rounded bg-gray-300 px-6 py-2 font-medium text-gray-500"
        >
          Fully Booked
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBriefcase,
  faCalendar,
  faMapMarkerAlt,
  faUsers,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

library.add(faBriefcase, faCalendar, faMapMarkerAlt, faUsers, faTimes);

export default {
  name: "EmployabilityModal",
  components: {
    FontAwesomeIcon,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    opportunity: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["close"],
  methods: {
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
  },
};
</script>
