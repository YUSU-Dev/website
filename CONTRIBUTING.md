# Contributing to YUSU Website

Welcome and thank you for contributing to YUSU website. This guide will take you through the technical considerations for contributing.

## Code of Conduct

The YUSU has adopted the [Contributor Covenant](https://www.contributor-covenant.org/). Please familiarise yourself with our full [conduct principles](/CODE_OF_CONDUCT.md).

## How to contribute

To find out more about the different types of contributions, the criteria or how to raise issues read [how to contribute](https://storybook.digital.yusu.org/?path=/docs/contributing--docs).

### Making a suggestion or raising a bug

You can help us speed up the development of our Design System by contributing new guidance, improving existing guidance or raising bugs.

Before getting started, please check our [Github issues](https://github.com/YUSU-Dev/Vue-3-Components/issues) page to check whether a similar bug or suggestion already exists. If not, create a ticket with as much information as possible. The IT team will review the issue and get back to you, but important bugs will be reviewed sooner.

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

Storybook's [Vue tutorial](https://storybook.js.org/tutorials/intro-to-storybook/vue/en/get-started/) may be useful.

## Building Vue Components

### Creating a new component or page quickly

Run `npm run new -- -c component-name` or `npm run new -- -p page-name` for a component or page respectively. This generates all the basic stuff you'll need to make a new component or page. Full details are in the [utils/component-cli.cjs](./utils/component-cli.cjs) file.

### Manually Adding a component

If you don't wish to do the above then you do the following. Create a folder for it, and inside it create a `.vue` file for it - inside it you can use any standard Vue features.

To ensure it gets picked up by the build process and can be used on the website, you need to create a small wrapper file.
For a component named `foo`, it must be named `foo.component.js` and will look like this:

```js
import { register } from "../_common/registerComponent";
import Foo from "./foo.vue";

register("foo", Foo);
```

You can now use it anywhere on the website as the `<yusu-foo>` tag.

## Data Fetching

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

## Icons

We use Font Awesome using the SVG-based method, using the `@fortawesome/vue-fontawesome` helper library. To use an icon in a component, do this:

```vue
<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faArrowRight /* any other icons */,
} from "@fortawesome/free-solid-svg-icons";

library.add(faTag, faArrowLeft /* any other icons */);

export default {
  components: {
    FontAwesomeIcon,
    // ...
  },
};
</script>
<template>
  <div>
    <!-- Don't forget to give it an explicit size, otherwise it might not be visible! -->
    <FontAwesomeIcon icon="fas fa-tag" class="h-8 w-8" />
  </div>
</template>
```

> [!WARNING]
>
> For reasons unknown, Font Awesome's CSS helpers (e.g. `fa-spin`) don't work.
> Use the respective Tailwind utilities (e.g. `animate-spin`) instead.

## Using Third-Party Libraries

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

## Testing web-components on a website

If you want to try out your work-in-progress components on the live website, run `npm run dev`, then go to http://localhost:3000 for instructions.
(Obviously please only do this in a test environment, not on a public-facing page!)
