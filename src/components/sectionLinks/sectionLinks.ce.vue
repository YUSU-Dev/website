<template>
  <!-- Section Links -->
  <!-- {exp:su_sections:GetSidebarMenu sectionKey="{embed:section_id}" }
  {if has_sections} -->
  <div class="container mx-4 mx-auto justify-center py-10">
    <div
      class="relative mt-6 flex w-full max-w-4xl flex-col px-2 pb-4 text-center lg:px-3"
    >
      <ul class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <!-- {sections} -->
        <li class="flex justify-center break-words">
          <SectionLink
            :section-is-active="section_is_active"
            :section-name="item_text"
            :section-url="item_link"
            :section-area="advice"
          />
        </li>
        <!-- {/sections} -->
      </ul>
      <!-- {sections} -->
      <!-- {if section_has_items AND section_is_active} -->
      <ul class="mt-6 flex list-none flex-wrap gap-3">
        <!-- {sections_items} -->
        <li class="">
          <SectionLink
            :section-is-active="item_is_active"
            :section-name="item_text"
            :section-url="item_link"
            :is-section-item="true"
          />
        </li>
        <!-- {/sections_items} -->
      </ul>
      <!-- {/if} -->
      <!-- {/sections} -->
    </div>
  </div>
  <!-- {/if}
  {/exp:su_sections:GetSidebarMenu} -->
  <!-- End Section Links -->
</template>
<!-- eslint-disable vue/prop-name-casing -->
<script>
import SectionLink from "../section-link/section-link.ce.vue";
export default {
  props: {
    section_is_active: {
      type: Boolean,
      required: true,
    },
    item_text: {
      type: String,
      required: true,
    },
    item_link: {
      type: String,
      required: true,
    },
    item_is_active: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    SectionLink,
  },
};
</script>
