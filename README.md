# Whitelabel 2020

This project is based on the Whitelabel 2020 frontend scaffolding. 

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

## Configuration Management
Whitelabel leverages Next.js configuration handling to make sure secrets stay on the server (`serverRuntimeConfig`) while publicly required information (e.g. API location) is also provided to the client (`publicRuntimeConfig`). 

Both collections can be configured in the `configuration` directory, where two separate configuration files await. _development_ values are used by Next.js when running `next dev` (we do so in `yarn local`), _production_ values come into effect when running `next build` and `next start`. Both stages can be either filled with static values or environment variable values.

When adding additional configuration properties, ensure to also update the interface at `src/interfaces/RuntimeConfig.ts`. Configuration can be accessed using `getConfig()` from `next/config` and by using the `config` environment inside the MST tree.

## Styling
