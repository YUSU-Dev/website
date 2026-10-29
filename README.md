<!-- markdownlint-disable-file -->
<p align="center">
  <img width="150px" src="https://assets-cdn.sums.digital/YU/website/img/yorksu-logo-black-icon.png" alt="" loading="lazy">
</p>

# York SU Website Components

[![Build and Upload to R2](https://github.com/YUSU-Dev/website/actions/workflows/build.yml/badge.svg)](https://github.com/YUSU-Dev/website/actions/workflows/build.yml)
[![Storybook Tests](https://github.com/YUSU-Dev/website/actions/workflows/storybook-tests.yml/badge.svg)](https://github.com/YUSU-Dev/website/actions/workflows/storybook-tests.yml)

The Vue.js component library for the University of York Students' Union website. This repository is both a development environment and the source of the components that run on yorksu.org. Components are built as Vue Custom Elements (web components) and served from `https://assets.yorksu.org`, where the York SU website (hosted on the SUMS platform) loads them.

## ✨ Features

- **Vue Custom Elements**: Components exported as web components for maximum compatibility
- **Storybook Integration**: Interactive component documentation and testing environment
- **Release-based Deployment**: Publishing a GitHub Release builds the components and uploads them to Cloudflare R2
- **Design System**: Consistent UI components following York SU branding guidelines
- **Accessibility First**: Built with accessibility standards in mind

## 🚀 Quick Start

### Prerequisites

- Node.js (version 22 LTS)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/YUSU-Dev/website.git
   cd website
   ```

2. Install dependencies:

   ```bash
   npm ci
   ```

3. Start the development environment:
   ```bash
   npm run storybook
   ```
   This will launch Storybook at `http://localhost:6006` where you can view and interact with all components.

### Development Workflow

- **`npm run storybook`** - Start Storybook development server
- **`npm run dev`** - Start the local development server (served at `http://localhost:3000`)
- **`npm run build`** - Build production-ready components into `dist/`
- **`npm run build-css`** - Build Tailwind CSS styles
- **`npm run new -- -c component-name`** - Generate a new component
- **`npm run new -- -p page-name`** - Generate a new page
- **`npm run test-storybook`** - Run Storybook tests (needs a running Storybook, see `.github/workflows/storybook-tests.yml`)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── button/
│   │   ├── button.ce.vue       # Vue component file
│   │   ├── button.component.js # Component registration (build entrypoint)
│   │   └── button.stories.js   # Storybook stories
│   └── [other components]/
├── pages/              # Full page components
├── docs/               # Documentation files
└── _common/            # Shared utilities and helpers
```

Every `*.component.js` file is a separate Rollup entrypoint, so each one is built to its own file in `dist/`.

## 🎨 Component Development

### Creating a New Component

Use our CLI tool to quickly scaffold a new component:

```bash
npm run new -- -c my-component
```

This creates:

- `my-component.ce.vue` - The Vue component
- `my-component.component.js` - Component registration
- `my-component.stories.js` - Storybook stories

The registration file calls `register('my-component', MyComponent)`, which defines the custom element `<yorksu-my-component>`. All tags are prefixed with `yorksu-`.

### Component Guidelines

- Use **kebab-case** for all file and directory names
- Vue files must end with `.ce.vue` (Custom Element)
- Follow the Options API pattern for Vue components
- Include comprehensive Storybook stories for each component
- Ensure components are accessible and follow WCAG guidelines

See the [Contributing Guide](CONTRIBUTING.md) for the API (axios) wrapper, icons and other conventions.

### Example Component Structure

```vue
<!-- button.ce.vue -->
<template>
  <button class="btn" :class="variant" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (value) => ["primary", "secondary"].includes(value),
    },
  },
  methods: {
    handleClick(event) {
      this.$emit("click", event);
    },
  },
};
</script>
```

## 🚢 Deployment

**Merging to `main` does not deploy anything.** Components only go live when a GitHub Release is published.

1. Merge your pull request to `main` and check the Storybook Tests workflow is green.
2. Publish a new GitHub Release from `main`. Tags are plain semantic versions with no `v` prefix, for example `1.8.75`.
3. Publishing the release runs the [Build and Upload to R2](.github/workflows/build.yml) workflow. It runs `npm ci`, then `npm run build && npm run build-css`, uploads `dist/` to the `components/` folder of the `website-assets` Cloudflare R2 bucket, and creates a Sentry release.
4. The files are then served from `https://assets.yorksu.org/components/`.

The workflow needs the repository secrets `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` and the Sentry secrets. Do not put these values in the repository.

### If the live site still shows the old version

- The workflow may have failed. Check the Actions tab first.
- `assets.yorksu.org` is cached by Cloudflare. Purging individual URLs does not always work for this domain, and bare `*.component.js` entrypoint files have been seen served stale after a deploy. If a normal purge does not help, use Purge Everything in Cloudflare.
- Hard refresh, or check in a private window, before assuming the deploy failed.

## 🌐 Usage on York SU Website

### Adding Components to Your Site

1. Include the component script. Each component is built as `NAME.component.js`:

   ```html
   <script type="module" src="https://assets.yorksu.org/components/NAME.component.js"></script>
   ```

2. Use the component in your HTML with the `yorksu-` prefix:
   ```html
   <yorksu-NAME></yorksu-NAME>
   ```

Replace `NAME` with the component's folder name, for example `my-component` becomes `my-component.component.js` and `<yorksu-my-component>`. The site's stylesheet is served from `https://assets.yorksu.org/components/components.css`.

For detailed integration instructions and each component's attributes, visit our [Storybook documentation](https://storybook.digital.yorksu.org/?path=/docs/introduction--docs).

## 🛠️ Development Tools

- **Vue 3** with Options API
- **Tailwind CSS** for styling
- **Storybook** for component development and documentation
- **ESLint & Prettier** for code quality
- **Rollup** for bundling
- **Husky** for git hooks

## 📖 Documentation

- **[Storybook](https://storybook.digital.yorksu.org/)** - Interactive component documentation
- **[Contributing Guide](CONTRIBUTING.md)** - Technical contribution guidelines
- **[Style Guide](src/docs/style-guide.mdx)** - Design system guidelines
- **Infrastructure and DNS** - How the website, Cloudflare, DNS and deployments fit together is documented internally on the York SU docs site (staff sign-in required)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for detailed instructions.

### Quick Contributing Steps

1. Check [existing issues](https://github.com/YUSU-Dev/website/issues)
2. Fork the repository
3. Create a feature branch
4. Make your changes
5. Add/update tests and stories
6. Submit a pull request

### Coding Standards

- Use **npm** for dependency management
- Write Vue components using the **Options API**
- Export components as **Custom Elements**
- Follow **kebab-case** naming conventions
- Include comprehensive **Storybook stories**
- Ensure **accessibility compliance**

## 🎯 Project Goals

This component library aims to:

- Provide consistent UI components across York SU digital properties
- Improve development efficiency through reusable components
- Maintain high accessibility and usability standards
- Enable rapid prototyping and development
- Foster collaboration between teams

## 🔧 Troubleshooting

### Common Issues

**Storybook won't start:**

- Ensure Node.js version 22 LTS is installed
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and run `npm ci`

**Components not updating:**

- Check if you're editing the `.ce.vue` file (not `.vue`)
- Ensure component is properly registered in the `.component.js` file
- Restart Storybook after making changes

**Merged but not live on yorksu.org:**

- Merging does not deploy. Publish a GitHub Release (see [Deployment](#-deployment))
- Check the Build and Upload to R2 run succeeded, then see the cache notes above

**Build failures:**

- Check ESLint errors: `npx eslint src/`
- Verify all imports are correct
- Ensure Tailwind classes are valid

### Getting Help

- 🎮 [SU Digital CoP Discord](https://discord.gg/fCF3Ugm8)
- 📧 Email: [it@yorksu.org](mailto:it@yorksu.org)
- 🐛 [GitHub Issues](https://github.com/YUSU-Dev/website/issues)

## 🔒 Security

If you've found a vulnerability, we want to know so that we can fix it. [Our security policy](SECURITY.md) tells you how to do this.

## 📄 License

Copyright © 2024 University of York Students' Union

This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the [License](LICENSE).
