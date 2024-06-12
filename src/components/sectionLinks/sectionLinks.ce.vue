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
        <!-- {if section_is_active}
        <li class="flex justify-center break-words">
          <a class="w-full h-full btn bg-light-blue" href="{section_url}">
            {section_name}
          </a>
        </li>
        {if:else} -->
        <li class="flex justify-center break-words">
          <a class="btn btn-student-life h-full w-full" href="{section_url}">
            {section_name}
          </a>
        </li>
        <!-- {/if} -->
        <!-- {/sections} -->
      </ul>
      <!-- {sections} -->
      <!-- {if section_has_items AND section_is_active} -->
      <ul class="mt-6 flex list-none flex-wrap gap-3">
        <!-- {sections_items} -->
        <!-- {if item_is_active}
        <li class="">
          <a
            class="btn bg-primary-pink py-1 font-thin px-10 text-center w-full"
            href="{item_link}"
          >
            {item_text}
          </a>
        </li> -->
        <!-- {if:else} -->
        <li class="">
          <a
            class="btn btn-secondary w-full px-10 text-center"
            href="{item_link}"
          >
            {item_text}
          </a>
        </li>
        <!-- {/if} -->
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
<script>
export default {};
</script>
