# Website

[![Build and Upload to R2](https://github.com/YUSU-Dev/Vue-3-Components/actions/workflows/build.yml/badge.svg)](https://github.com/YUSU-Dev/Vue-3-Components/actions/workflows/build.yml)

A UI testing and development environment for York SU website. This repo has two functions, one is to dynamically generate the JS files for our website

To get started, clone this repo and run `npm ci`.

## Storybook

You can use [Storybook](https://storybook.js.org/) to give you an environment to develop your component in. We are using web components within storybook to ensure that there is good compatibility between components and the website. As such to include a vue file in a story you'll need to do the below.
If you have a component in a file called `foo.vue`, create a file called `foo.stories.js` that looks something like this:

```js
import "./foo.component.js";

export default {
  title: "Foo",
  component: "foo",
};

export const Default = {
  args: {
    // Any props your component takes
  },
};

// Any other stories here
```

To use Storybook, run `npm run storybook`.

Storybook's [Vue tutorial](https://storybook.js.org/tutorials/intro-to-storybook/vue/en/get-started/) may be useful.

## Building Vue Components

### Adding a component

To write a component, create a folder for it, and inside it create a `.vue` file for it - inside it you can use any standard Vue features.

To ensure it gets picked up by the build process and can be used on the website, you need to create a small wrapper file.
For a component named `foo`, it must be named `foo.component.js` and will look like this:

```js
import { register } from "../_common/registerComponent";
import Foo from "./foo.vue";

register("foo", Foo);
```

You can now use it anywhere on the website as the `<yorksu-foo>` tag.

### Data Fetching

Use [axios](https://axios-http.com/docs/intro).

Specifically, import it from [src/\_common/axios.mjs](./src/_common/axios.mjs), which is our own version with a few helpful configurations.
For requests to the SUMS Pluto API it'll automatically set the `X-Site-Id` header so you don't need to pass it.
Also, when running in Storybook it'll use a local proxy to get around CORS issues.

Here's an example:

```vue
<!-- src/components/foo/foo.vue -->
<script>
import axios from "../../_common/axios.mjs";
export default {
  data() {
    return {
      groups: [],
    };
  },
  async created() {
    const res = await axios.get("https://pluto.sums.su/api/groups");
    this.groups = res.data;
  },
};
</script>
```

### Icons

We use Font Awesome using the SVG-based method, using the `@fortawesome/vue-fontawesome` helper library. To use an icon in a component, do this:

```vue
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faArrowRight, /* any other icons */ } from "@fortawesome/free-solid-svg-icons";

library.add(faTag, faArrowLeft, /* any other icons */);

export default {
  components: {
    FontAwesomeIcon,
    // ...
  }
};
</script>
<template>
<div>
  <!-- Don't forget to give it an explicit size, otherwise it might not be visible! -->
  <FontAwesomeIcon icon="fas fa-tag" class="w-8 h-8" />
</div>
</template>
```

> [!WARNING]
>
> For reasons unknown, Font Awesome's CSS helpers (e.g. `fa-spin`) don't work.
> Use the respective Tailwind utilities (e.g. `animate-spin`) instead.

### Using Third-Party Libraries

You can use third-party libraries using standard JavaScript `import` syntax, as long as

- they're in ES Modules format
- you import from a CDN using the full https:// URL
  The built file will contain an `import`, so you don't need to add it as a separate script tag.

We use JSDelivr (https://jsdelivr.com) as our CDN of choice (because it's allow-listed in the Content-Security-Policy at the SUMS level), so use that in preference to other CDNs.
You can request that it [bundle a library as ESM](https://www.jsdelivr.com/esm) by adding `+esm` to the URL.

> [!TIP]
> The JSDelivr website suggests you use https://esm.run URLs for ES Modules.
> Because of our Content-Security-Policy this won't work.
> However, an esm.run URL just redirects to a JSDelivr URL, so you can visit it once to find out what the real URL is.
>
> For example, if I go to `https://esm.run/moment` it redirects me to `https://cdn.jsdelivr.net/npm/moment/+esm`.

For example, if you wanted to use Moment.js in your component:

```vue
<script>
import moment from "https://cdn.jsdelivr.net/npm/moment@2.30.1/+esm";
export default {
  data() {
    return {
      time: moment().format("HH:mm"),
    };
  },
};
</script>
<template>
  <div>The time is {{ time }}</div>
</template>
```

### Developing

If you want to try out your work-in-progress components on the live website, run `npm run dev`, then go to http://localhost:3000 for instructions.
(Obviously please only do this in a test environment, not on a public-facing page!)

### Using on the Website

Any merges to `main` on this repo will automatically be deployed to https://assets.yorksu.org (hosted on Cloudflare R2).

#### Expression Engine Embedding onto pages

To use these files with York SU's instance of Expression Engine you will just need to include the component(s) in the footer embed and then add it to the main html. For example:

```html
{embed="core-components/.hero-header" title='title' page_header="seo
description" image_url='banner url' } ...
<yorksu-activities
  siteid=""
  title="Clubs and Societies"
  selectedparents="2,24,39"
></yorksu-activities>
... {embed="core-components/.footer" vue_comp="activities"}
```

Behind the scenes this is passed to the `.footer-assets` file which has the following code snippet.

```html
{exp:su_website_formatter:jsFormat js="{embed:vue_comp}"} {if js_count > 0} {js}
<script
  type="module"
  src="https://assets.yorksu.org/components/{url}.component.js"
></script>
{/js} {/if} {/exp:su_website_formatter:jsFormat}
```

#### Manual addition to pages

To use them in production, not using the above method you will need to reference the component file - make sure you use `<script type="module">` otherwise it will not work. For example:

```html
<yorksu-activities
  siteid=""
  title="Clubs and Societies"
  selectedparents="2,24,39"
></yorksu-activities>
<script
  type="module"
  src="https://assets.yorksu.org/components/activities.component.js"
></script>
```

You will also need to add the stylesheet - there's one shared across all the components so you only need to add it once:

```html
<link
  rel="stylesheet"
  href="https://assets.yorksu.org/components/components.css"
/>
```
