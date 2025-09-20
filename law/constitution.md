# RISU Constitution

## Core Principles

### I. Goal is at the README.md

The ultimate goal of this project is described in README.md at the project root.
Every time you make a specification or a plan, you should first read the README.md and follow it.

### II. React Router 

This project is built upon React Router Framework Mode.

Before you implement Application layer, you must read `law/react-router-law.md` and strictly follow it.

### III. Domain Driven Development

* Each domain has its own directory `app/domain/[domain name]`.
* Domain objects go in `models.ts` as Zod schema. `models.ts` must be independent from specific persistence technologies (e.g., PostgresQL or Drizzle). it also never include codes for app-layer (e.g., form input schema).
* Unique identifier of every domain objects must be typed as branded types  (like `type Branded<T, Brand> = T & { readonly __brand: Brand }; → type Meters = Branded<number, "meters">;`). Instances with the branded types must be created only in lifecycle.ts. DO NOT create new instances with the branded types in any other places.
* Each domain object has a **Factory** (ensures correct type and defaults) in `lifecycle.ts`.
* Each domain object has a **Repository** (static `get`, `save` only; no business logic) in `lifecycle.ts`.
* **Services** go in `services.ts` as pure functions. They take domain objects, return updated copies, never mutate args, and never access storage. All services need unit tests.
* Services must not depend on UI (`app/routes/*`) or storage (`app/domain/[domain name]/lifecycle.ts`). They must remain usable even if those layers are fully rewritten. Any UI- or storage-dependent functions should be colocated in the Route Module or lifecycle.ts.
* Simple CRUD shouldn't be services. They should be acheved just by calling factories (C) and repositories `get` (R), `save` (U) and `delete`(D)
* Each domain must have an `index.ts` exposing minimal APIs to other domains and the app. These APIs must only combine models, factories, repositories, and services, never contain original logic.
* Only functions exported from `domain/[domain name]/index.ts` can be used in outside of the domain directly.
* React Router's Route Modules can use them domain APIs only in `loader/action/clientLoader/clientAction`. DO NOT use domain modules in Route Components. Route Components just render domain objects and forward user input.

When creating specifications, always define what the domain objects are, what the business logic is, and how they are connected to realize the functionality.

### VI. Schema validation with Zod

* Every domain object and form input should be validated.
* Domain objects should be defined with Zod schema with strict constraints (including min/max, length etc, not only types) in `models.ts`. The types of them should also be defined as inferred types from Zod schema.
* A form input should be defined in the route module it is used as a Zod schema.
* Every schema validation should be built with Zod. No self-implementation is allowed.

### V. Strict UI implementation rules

- We use shadcn/ui components which can be installed with `npx shadcn@latest add {component name}`. 
- When you need a new component, use one of the following three methods in order of priority from top to bottom.
  - use shadcn/ui components with their default style
  - use shadcn/ui components with custom style
  - create components by composing shadcn/ui components
  - implement components by yourself
- use tailwind css only for styling shapes and colors of HTML elements and texts. Never use it for defining layouts and placements of elements
- Use css modules only for defining layouts and placements of elements. Never use it for styling shapes and colors
- Prefer grid layout over other methods such as flex and, if applicable, the best way is to use `grid-template-areas`.

## Governance

TBD

**Version**: 0.0.0 | **Ratified**: 2025-09-04 | **Last Amended**: 2025-09-04
