<script>
import Button from "../button/button.ce.vue";
export default {
  components: {
    Button,
  },
  data() {
    return {
      LinksList: [
        {
          title: "Home",
          href: "/",
          icon: "home",
        },
        {
          title: "About",
          href: "/about",
          icon: "info",
        },
        {
          title: "Contact",
          href: "/contact",
          icon: "mail",
        },
        {
          title: "Blog",
          href: "/blog",
          icon: "blog",
        },
        {
          title: "Services",
          href: "/services",
          icon: "services",
        },
        {
          title: "FAQ",
          href: "/faq",
          icon: "faq",
        },
      ],
    };
  },
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <a v-for="(link, index) in LinksList" :key="index" :href="link.href">
      <Button
        :title="link.title"
        isPrimary="True"
        class="px-10 text-center h-36 block"
      />
    </a>
  </div>
</template>
