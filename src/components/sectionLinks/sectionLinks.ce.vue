<template>
  <!-- Section Links -->
  <!-- {exp:su_sections:GetSidebarMenu sectionKey="{embed:section_id}" } -->
  <!-- {if has_sections} -->
  <div class="container mx-auto py-10 justify-center">
    <div
      class="relative flex flex-col mt-6 px-2 lg:px-3 pb-4 text-center w-full max-w-4xl"
    >
      <ul class="grid gap-4 grid-cols-1 md:grid-cols-3">
        <!--- Below is an example -->
        <!-- {sections} -->
        <li class="flex justify-center break-words">
          <a class="w-full h-full btn btn-student-life" href="{section_url}">
            {section_name}
          </a>
        </li>
        <li class="flex justify-center break-words">
          <a class="w-full h-full btn btn-student-life" href="{section_url}">
            {section_name}
          </a>
        </li>
        <li class="flex justify-center break-words">
          <a class="w-full h-full btn btn-student-life" href="{section_url}">
            {section_name}
          </a>
        </li>
        <li class="flex justify-center break-words">
          <a class="w-full h-full btn btn-student-life" href="{section_url}">
            {section_name}
          </a>
        </li>
        <li class="flex justify-center break-words">
          <a class="w-full h-full btn btn-student-life" href="{section_url}">
            {section_name}
          </a>
        </li>
        <!-- {/sections} -->
      </ul>
      <!-- {sections} -->
      <!-- {if section_has_items AND item_is_active} -->
      <ul class="flex flex-wrap mt-6 gap-3">
        <li class="">
          <a
            class="btn btn-secondary px-10 text-center w-full"
            href="{item_link}"
          >
            {item_text} nfenjfewkmlefmklfeml;fmmafsdkmsakl;mdsal;km
          </a>
        </li>
        <li class="">
          <a
            class="btn btn-secondary px-10 text-center w-full"
            href="{item_link}"
          >
            {item_text}
          </a>
        </li>
        <li class="">
          <a
            class="btn btn-secondary px-10 text-center w-full"
            href="{item_link}"
          >
            {item_text}
          </a>
        </li>
        <li class="">
          <a
            class="btn btn-secondary px-10 text-center w-full"
            href="{item_link}"
          >
            {item_text}
          </a>
        </li>
        <li class="">
          <a
            class="btn btn-secondary px-10 text-center w-full"
            href="{item_link}"
          >
            {item_text}
          </a>
        </li>
        <li class="">
          <a
            class="btn btn-secondary px-10 text-center w-full"
            href="{item_link}"
          >
            {item_text}
          </a>
        </li>
      </ul>
      <!-- {/if} -->
      <!-- {/sections} -->
    </div>
  </div>
  <!-- {/if} -->
  <!-- {/exp:su_sections:GetSidebarMenu} -->
  <!-- End Section Links -->
</template>
<script>
import "../../main.css";
export default {};
</script>
