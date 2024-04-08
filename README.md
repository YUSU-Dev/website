# YUSU Vue 3 Components

A development environment for Vue components for the YUSU website.

## Running

Soon™ there will be a way to serve the components locally while developing.

## Building

Run `npm run build` to build the component JS into the `dist/` folder.

To use them in production, you will need to reference the component file - make sure you use `<script type="module">` otherwise it will not work.

## Adding a component

To write a component, create a folder for it, and inside it create a `.vue` file for it - inside it you can use any standard Vue features.

To ensure it gets picked up by the build process and can be used on the website, you need to create a small wrapper file.
For a component named `foo`, it must be named `foo.component.js` and will look like this:

```js
import { register } from "../_common/registerComponent";
import Foo from "./foo.vue";

register(Foo);
```

## Storybook

You can use [Storybook](https://storybook.js.org/) to give you an environment to develop your component in.
Create a file called `foo.stories.js` that looks something like this:

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

Storybook's [Vue tutorial](https://storybook.js.org/tutorials/intro-to-storybook/vue/en/get-started/) may be useful.
