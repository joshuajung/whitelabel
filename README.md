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

Please always feel free to refer to the respective docs. :-)

## SSR
Whitelabel leverages server-side rendering by Next.js for increased performance and SEO. As it is primarily intended for fully dynamic web-apps, it does not make use of Next.js's Automatic Static Optimization mechanism, but instead falls back on full SSR for all pages. 

This comes with a few caveats to keep in mind:
* It is _not_ possible to read browser _local storage_ in many cases (explicitly within `getInitialProps`). It is therefore not recommended (and usually also not required) to actively use local storage at all (modules may still do so implicitly). 
* When it comes to persisting an access token to the application between launches, a traditional cookie is a great alternative. These are automatically sent both to the server _and_ available to the client. This enables SSR to even render private data that the cookie enables access to. Whitelabel is preconfigured to look for a cookie called `wljwt` and load it into the auth store when the app boots. Afterwards, the cookie is ignored and the session token from the auth store is used.
* After SSR, all props and states are serialized, sent to the browser and locally de-serialized again. Only plain JavaScript `Objects` survive this procedure, custom prototypes will be lost. While MobX-state-tree automatically serializes and restores the root store, so it can fully recover, you may want to keep this in mind for page-specific states. 

## State Management
Whitelabel uses MobX-state-tree to manage its main application state, at home at `src/store/RootStore.ts`. It can be extended by additional substores and services (see `src/store/substores` and `src/store/services` respectively). These can in return use reusable store models (see `src/store/models`). Models can also be used in entirely separate, decentralized states (e.g. in ephemeral component states).

Some things to keep in mind:
* Every sub-tree of the store that may be referenced from another location of the same store should come with an interface of the form `interface IMyNode extends Instance<typeof MyNode> {}` to avoid circular dependencies that can break TypeScript and to increase performance, also see https://github.com/mobxjs/mobx-state-tree/issues/1406.
* Services should always offer their features in the `volatile` part of their tree type.
* Usage of `async` and `await` within (volatile) actions is discouraged, instead use `flow` and `yield` (see https://mobx-state-tree.js.org/concepts/async-actions). 

## Configuration Management
Whitelabel leverages Next.js configuration handling to make sure secrets stay on the server (`serverRuntimeConfig`) while publicly required information (e.g. API location) is also provided to the client (`publicRuntimeConfig`). 

Both collections can be configured in the `configuration` directory, where two separate configuration files await. _development_ values are used by Next.js when running `next dev` (we do so in `yarn local`), _production_ values come into effect when running `next build` and `next start`. Both stages can be either filled with static values or environment variable values.

When adding additional configuration properties, ensure to also update the interface at `src/interfaces/RuntimeConfig.ts`. Configuration can be accessed using `getConfig()` from `next/config` and by using the `config` environment inside the MST tree.

## Auth
Out of the box, Whitelabel uses an `AuthGate` component that reads route-based authorization information from the `src/auth/authorizations.ts` file to serve as a simple gate keeper. Actual authentication and authorization should obviously happen on the server.

When using the included `ApiService` to make API calls, Whitelabel will automatically send the user token from the `AuthStore` with each API request. To persist the token, a cookie is used (also see [SSR](#ssr)).

## Styling
Whitelabel comes with Sass parsing and an auto-prefixer, so it's possible to write nice and native SCSS without needing to worry too much about browser compatibility. It should also not be necessary to use `Reactstrap` - the SCSS version of Bootstrap is embedded and you can use all components right out of the box (and/or style them by modifying Bootstrap variables beforehand). 

## Upgrading Notes
In general, Whitelabel is supposed to always support latest versions of all dependencies (obviously take care with major upgrades). There may be temporary exemptions though, to be mentioned here:
* `@types/mobx-devtools-mst` should stay at `0.9.0`, as later versions have (accidentally?) removed all type information.
