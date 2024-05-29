<template>
  <!-- Section Links -->
  <!-- {exp:su_sections:GetSidebarMenu sectionKey="{embed:section_id}" } -->
  <!-- {if has_sections} -->
  <div class="grid grid-rows-2 gap-4">
    <!--- Below is an example -->
    <div class="grid md:grid-cols-4 gap-2">
      <!-- {sections} -->
      <div class="btn btn-student-life px-10 text-center" href="{section_url}">
        {section_name}
      </div>
      <div class="btn btn-student-life px-10 text-center" href="{section_url}">
        {section_name}
      </div>
      <div class="btn btn-student-life px-10 text-center" href="{section_url}">
        {section_name}
      </div>
      <!-- {/sections} -->
    </div>
    <!-- {sections} -->
    <!-- {if section_has_items AND item_is_active} -->
    <div class="grid md:grid-cols-8">
      <div class="btn btn-student-life px-10 text-center" href="{item_link}">
        {item_text}
      </div>
    </div>
    <!-- {/if} -->
    <!-- {/sections} -->
  </div>
  <!-- {/if} -->
  <!-- {/exp:su_sections:GetSidebarMenu} -->
  <!-- End Section Links -->
</template>
<script>
import "../../main.css";
export default {};
</script>
