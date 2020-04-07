# Whitelabel 2020

This project is based on the Whitelabel 2020 frontend scaffold. 

## To Run Locally
```bash
yarn install
yarn local
```

## Components
Whitelabel is primarily based on:
* [Typescript](https://www.typescriptlang.org) (newest version, 3.8 as of now)
* [React](https://reactjs.org) (newest version, 16.7 as of now)
* [Next.js](https://nextjs.org) (newest version, 9.3 as of now) as an SSR-enabled React framework
* [MobX](https://mobx.js.org) (newest version, 5.9 as of now) for state management
* [MobX-state-tree](https://mobx-state-tree.js.org) (newest version, 3.11 as of now) as an opinionated MobX-based state container

It also uses, but does not necessarily rely on:
* [axios](https://github.com/axios/axios) for HTTP calls
* [nookies](https://github.com/maticzav/nookies) to read cookies on the server and the client with a unified interface
* [ESLint](https://eslint.org) for linting
* [Prettier](https://prettier.io) for code formatting

## SSR
Whitelabel leverages server-side rendering by Next.js for increased performance and SEO. As it is primarily intended for fully dynamic web-apps, it does not make use of Next.js's Automatic Static Optimization mechanism, but instead falls back on full SSR for all pages. This comes with a few caveats to keep in mind:

* It is _not_ possible to read browser _local storage_ in many cases (explicitly within `getInitialProps`). It is therefore not recommended (and usually also not required) to actively use local storage at all (modules may still do so implicitly). 
* When it comes to persisting an access token to the application between launches, a traditional cookie is a great alternative. These are automatically sent both to the server _and_ available to the client. This enables SSR to even render private data that the cookie enables access to. Whitelabel is preconfigured to look for a cookie called `wljwt` and load it into the auth store when the app boots. Afterwards, the cookie is ignored and the session token from the auth store is used.
* After SSR, all props and states are serialized, sent to the browser and locally de-serialized again. Only plain JavaScript `Objects` survive this procedure, custom prototypes will be lost. While MobX-state-tree automatically serializes and restores the root store, so it can fully recover, you may want to keep this in mind for page-specific states. 

## State Management
Whitelabel uses Mob

## Configuration Management
Whitelabel leverages Next.js configuration handling to make sure secrets stay on the server (`serverRuntimeConfig`) while publicly required information (e.g. API location) is also provided to the client (`publicRuntimeConfig`). 

Both collections can be configured in the `configuration` directory, where two separate configuration files await. _development_ values are used by Next.js when running `next dev` (we do so in `yarn local`), _production_ values come into effect when running `next build` and `next start`. Both stages can be either filled with static values or environment variable values.

When adding additional configuration properties, ensure to also update the interface at `src/interfaces/RuntimeConfig.ts`. Configuration can be accessed using `getConfig()` from `next/config` and by using the `config` environment inside the MST tree.

## Styling
