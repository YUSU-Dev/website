<template>
  <!-- Breadcrumb Navigation -->
  <div class="container mx-auto pb-8 pt-12 font-serif text-sm">
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
export default {};
</script>
