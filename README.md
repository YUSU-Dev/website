<!-- markdownlint-disable-file -->
<p align="center">
  <img width="150px" src="https://assets-cdn.sums.su/YU/website/img/yusu-logo-black-icon.png" alt="" loading="lazy">
</p>

# YUSU Website Components

[![Build and Upload to R2](https://github.com/YUSU-Dev/Vue-3-Components/actions/workflows/build.yml/badge.svg)](https://github.com/YUSU-Dev/Vue-3-Components/actions/workflows/build.yml)
[![pages-build-deployment](https://github.com/YUSU-Dev/Vue-3-Components/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/YUSU-Dev/Vue-3-Components/actions/workflows/pages/pages-build-deployment)
[![Storybook Tests](https://github.com/YUSU-Dev/Vue-3-Components/actions/workflows/storybook-tests.yml/badge.svg)](https://github.com/YUSU-Dev/Vue-3-Components/actions/workflows/storybook-tests.yml)

A UI testing and development environment for YUSU website. This repo has two functions, one is to dynamically generate the JS files for our website

## Installing

To get started, clone this repo and run `npm ci`.
To use Storybook, run `npm run storybook`.

### Opinionated conventions used

- For naming of directories or files we should use kebab-case.
- Vue files should end `.ce.vue`

## Usage on the YUSU Website

Any merges to `main` on this repo will automatically be deployed to https://assets.yusu.org (hosted on Cloudflare R2). More information on how to add to the website can be found in [storybook](storybook.digital.yusu.org/?path=/docs/introduction--docs)

## Contributing

We have a couple of resources to help you with contributing.

- To find out more about the different types of contributions, the criteria or how to raise issues read [how to contribute](https://storybook.digital.yusu.org/?path=/docs/contributing--docs).
- Make sure to also read our [coding standards and technical instructions](CONTRIBUTING.md).

## Need Help?

Looking to add this on your website and don't know where to start? Reach out to us on the [SU Digital CoP](https://discord.gg/fCF3Ugm8). We can also develop components for your own website in your branding reach out to us on the [SU Digital CoP](https://discord.gg/fCF3Ugm8) or email us on [it@yusu.org](mailto:it@yusu.org) to discuss pricing.

## Security

If you've found a vulnerability, we want to know so that we can fix it. [Our security policy](SECURITY.md) tells you how to do this.

## License

Copyright © 2024 York University Students' Union

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the [License](LICENSE).
