# [1.7.0](https://github.com/pulgueta/nequi-node/compare/v.1.6.4...v.1.7.0) (2026-07-08)


### Features

* **server:** add gift codes (Códigos Plata) module ([6c969f6](https://github.com/pulgueta/nequi-node/commit/6c969f6))


### Bug Fixes

* **server:** align endpoints and schemas with official API specs ([f3bf1da](https://github.com/pulgueta/nequi-node/commit/f3bf1da))
* **server:** harden auth, request handling and error contract ([21c2175](https://github.com/pulgueta/nequi-node/commit/21c2175))
* **server:** require documentType and documentNumber together in dispersions ([b636bdc](https://github.com/pulgueta/nequi-node/commit/b636bdc))
* **lint:** address biome warnings ([806578a](https://github.com/pulgueta/nequi-node/commit/806578a))


### Documentation

* **server:** document new options, gift codes and error fields ([60325b5](https://github.com/pulgueta/nequi-node/commit/60325b5))


### Build System and CI

* **server:** repair typecheck gate and ship CJS build with types ([71e1587](https://github.com/pulgueta/nequi-node/commit/71e1587))
* **server:** pin node engine to >=24 ([7bd8644](https://github.com/pulgueta/nequi-node/commit/7bd8644))
* **workflows:** use pnpm instead of bun ([ca7f412](https://github.com/pulgueta/nequi-node/commit/ca7f412))
* **release:** enable npm trusted publishing ([cba8571](https://github.com/pulgueta/nequi-node/commit/cba8571))
* **release:** update semantic release action ([674f807](https://github.com/pulgueta/nequi-node/commit/674f807))
* **release:** restore package release config ([911ff6b](https://github.com/pulgueta/nequi-node/commit/911ff6b))
* **release:** avoid release commits ([6ee89d2](https://github.com/pulgueta/nequi-node/commit/6ee89d2))


# [1.6.4](https://github.com/pulgueta/nequi-node/compare/v1.6.0...v.1.6.4) (2026-01-29)


### Features

* integrate Turbo for task management and add documentation for Nequi SDK ([3d43e4b](https://github.com/pulgueta/nequi-node/commit/3d43e4b))


### Code Refactoring

* remove unnecessary schema for main class options ([7288554](https://github.com/pulgueta/nequi-node/commit/7288554))


### Documentation

* remove docs that do not exist ([ec9ac2a](https://github.com/pulgueta/nequi-node/commit/ec9ac2a))


# [1.6.0](https://github.com/pulgueta/nequi-node/compare/v1.0.0...v1.6.0) (2026-01-28)


### Features

* build package with tsup ([fe8f8e0](https://github.com/pulgueta/nequi-node/commit/fe8f8e0))
* create sandbox app to test sdk ([461155b](https://github.com/pulgueta/nequi-node/commit/461155b))


### Bug Fixes

* apply greptile suggestions on base path and auth uri, remove unused env property ([d9e7d67](https://github.com/pulgueta/nequi-node/commit/d9e7d67))
* fix package versions and out directory ([135a199](https://github.com/pulgueta/nequi-node/commit/135a199))


### Code Refactoring

* improve type-safety and validations ([4d7e8a6](https://github.com/pulgueta/nequi-node/commit/4d7e8a6))
* infer types with zod schemas ([0184c5f](https://github.com/pulgueta/nequi-node/commit/0184c5f))


### Documentation

* update docs ([8300d19](https://github.com/pulgueta/nequi-node/commit/8300d19))
* update README ([360c44e](https://github.com/pulgueta/nequi-node/commit/360c44e))


### Build System and CI

* add support for node 18 ([5f54c37](https://github.com/pulgueta/nequi-node/commit/5f54c37))
* update release workflow ([c506f4a](https://github.com/pulgueta/nequi-node/commit/c506f4a))


# 1.0.0 (2024-09-02)


### Bug Fixes

* **ci:** do not depend on other action ([043fe98](https://github.com/pulgueta/nequi-node-sdk/commit/043fe980c432fc1886d724b24a420802f281db5e))
* **ci:** install pnpm before installing node ([0a4a145](https://github.com/pulgueta/nequi-node-sdk/commit/0a4a14518c98988f66491416a34e58e03c575a30))
* **ci:** use correct actions for publishing ([1cf8f74](https://github.com/pulgueta/nequi-node-sdk/commit/1cf8f7420380b7a054142c006cee3e4ed400fba6))


### Features

* add base request methods, authentication and qr class ([02e10ff](https://github.com/pulgueta/nequi-node-sdk/commit/02e10ff1ed16ef1b8f858394b5d2076af609c8be))
* add body to qr request ([5f89e01](https://github.com/pulgueta/nequi-node-sdk/commit/5f89e01b85d65120a647e5f3cc4140df4e86c371))
* complete api integration with classes ([3178bfe](https://github.com/pulgueta/nequi-node-sdk/commit/3178bfeb8a7168d3f6599ebef6c7dc2b31e8fc64))
