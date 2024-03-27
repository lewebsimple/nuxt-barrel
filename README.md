# Nuxt Barrel

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt module for automatic barrel files.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/github/your-org/@lewebsimple/nuxt-barrel?file=playground%2Fapp.vue)

## Features

- ⛰ Named exports from a certain glob pattern become properties of an auto-imported object
- 🔥 HMR of files in the glob pattern

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add @lewebsimple/nuxt-barrel
```

Configure the auto-imported objects and their respective glob patterns like so:

```ts
export default defineNuxtConfig({
  barrel: {
    myBarrel: ["server/barrel/*.ts"],
  },
})
```

That's it! You can now use `myBarrel` in the server space of your Nuxt app ✨

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/@lewebsimple/nuxt-barrel/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/@lewebsimple/nuxt-barrel

[npm-downloads-src]: https://img.shields.io/npm/dm/@lewebsimple/nuxt-barrel.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/@lewebsimple/nuxt-barrel

[license-src]: https://img.shields.io/npm/l/@lewebsimple/nuxt-barrel.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/@lewebsimple/nuxt-barrel

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
