# Website 
[![Build and Publish Storybook to GitHub Pages](https://github.com/YUSU-Dev/Vue-3-Components/actions/workflows/deploy-gh-pages.yml/badge.svg)](https://github.com/YUSU-Dev/Vue-3-Components/actions/workflows/deploy-gh-pages.yml) [![Build and Upload to R2](https://github.com/YUSU-Dev/Vue-3-Components/actions/workflows/build.yml/badge.svg)](https://github.com/YUSU-Dev/Vue-3-Components/actions/workflows/build.yml)

A UI testing and development environment for York SU website. This repo has two functions, one is to dynamically generate the JS files for our website

To get started, clone this repo and run `npm ci`.

## Storybook

You can use [Storybook](https://storybook.js.org/) to give you an environment to develop your component in.
If you have a component in a file called `foo.vue`, create a file called `foo.stories.js` that looks something like this:

```js
import Foo from "./foo.vue";

export default {
  title: "Foo",
  component: Foo,
};

export const Default = {
  args: {
    // Any props your component takes
  }
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

You can now use it anywhere on the website as the `<yusu-foo>` tag.

### Using Third-Party Libraries

You can use third-party libraries using standard JavaScript `import` syntax.
However, currently(™) the bundler won't bundle them into the component bundle <sup>the word "bundle" doesn't look real anymore</sup>.

There are two solutions for this:
1. Import directly from a CDN (unpkg.com is a good one). If so, make sure you use the ESM version of the library.
2. For commonly used libraries (currently `vue` and `axios`) we've configured build-time import rewrites, so you can write `import from "vue"` and the built JS will reference it from unpkg. You can see these in `rollup.config.mjs` (look for `importMap`).
    (Watch out! This does the same thing as standard [import maps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap), but at **build time**, not runtime, because import maps' [browser support](https://caniuse.com/import-maps), particularly on mobile, isn't wide enough yet.)

### Developing

If you want to try out your work-in-progress components on the live website, run `npm run dev`, then go to http://localhost:3000 for instructions.
(Obviously please only do this in a test environment, not on a public-facing page!)

### Using on the Website

Any merges to `main` on this repo will automatically be deployed to https://assets.yorksu.org (hosted on Cloudflare R2).

To use them in production, you will need to reference the component file - make sure you use `<script type="module">` otherwise it will not work. For example:

```html
<yusu-activities siteid="" title="Clubs and Societies" selectedparents="2,24,39"></yusu-activities>
<script type="module" src="https://assets.yorksu.org/components/activities.component.js"></script>
```

Soon™ there will be a streamlined way of doing this using Expression Engine templates.
