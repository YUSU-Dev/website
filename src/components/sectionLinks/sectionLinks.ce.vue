<template>
  <!-- Section Links -->
  <!-- {exp:su_sections:GetSidebarMenu sectionKey="{embed:section_id}" }
  {if has_sections} -->
  <div class="container mx-auto justify-center">
    <div class="relative mt-6 flex w-full flex-col pb-4 text-center">
      <ul class="flex flex-wrap gap-3 pl-0">
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
      <ul class="mt-6 flex list-none flex-wrap gap-3 pl-0">
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
