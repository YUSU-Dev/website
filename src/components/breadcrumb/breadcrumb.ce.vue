<template>
  <!-- Breadcrumb Navigation -->
  <div class="font-serif text-sm container mx-auto my-4">
    <!-- {exp:su_sections:generateBreadcrumbNew title="{embed:title}"} -->
    <p>
      <!-- {breadcrumbs} -->

      <!--- Below is an example -->
      <a class="text-black no-underline hover:underline" href="/">Home</a> >
      <a class="text-black no-underline hover:underline" href="/"> Events</a>

      <!-- <a class="text-black no-underline hover:underline" href="{crumb_link}">{crumb_text}</a>
        {if crumb_not_last}>{/if}
        {/breadcrumbs} -->
    </p>
    <!-- {/exp:su_sections:generateBreadcrumbNew} -->
  </div>
  <!-- End Breadcrumb Navigation -->
</template>
<script>
import "../../main.css";
export default {};
</script>
