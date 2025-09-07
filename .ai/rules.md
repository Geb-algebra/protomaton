# General Coding Rules

This is a set of rules you have to follow

## employed technologies

- Typescript for implementing an entire project
- React: for implementing UI
- Vite: bundler
- react router v7 (formerly remix)
- zod: for validating domain objects
- drizzle: as an ORM
- hono: for HTTP server
- tailwind css: for styling shapes and colors of HTML elements and texts (not used for defining layouts and placements of elements)
- css modules: for defining layouts and placements of elements (not used for styling shapes and colors)
- shadcn/ui: for UI components

## design rules

Every project should follow the manners of domain driven design. Specifically,

- Create a dedicated directory for each domain.
- Domain objects should be implemented, as a type in `models.ts` file in the domain directory. These objects must be defined with pure typescript, without relying on any libraries like zod or drizzle. Generally they should be just a type, not a class with constructors or methods, to avoid they mutate themselves, but sometimes it is not the case.
- For each domain object, a Factory class should be defined. This class ensures that the domain objects will be created with right type, right default value
- For each domain object, a Repository class, which fetch domain objects of a specific kind from and save them to storages, should be implemented. This class have no properties and only have static methods such as `get` and `save`. This class just pass objects as they are and must not have any business logic.
- All business logics should be implemented as Services, pure functions defined in `services.ts` in the domain directory. Services must not have states and must not mutate arguments. Generally Services accept a domain object as an argument and return updated version of it. When doing this, services have to return an updated copy of the accepted object instead of mutate it. Services never use Repositories that means that they don’t touch storage at all. Getting objects from storage and saving it is done outside Services. All services should be tested by unit tests.
- Route components can’t use Services and can’t include any other business logics. Instead, `loader, action, clientLoader` and `clientAction` use Repositories and Services to pass domain objects that Route components requested and mutate domain objects as Route components  requested. Route components can just render domain objects they get and send the request to run some services, often with user inputs.
- Each component used in Route components should have entire responsibility to the domain objects they render. Specifically, they accept a set of domain objects they render and send requests for mutating them directly to action functions.

Only the operator can add, update and delete Domain objects. You should not do that.
If you think you have to make some changes to domain objects, you have to ask the operator to do that.

## implementation rules

### UI component

- Please use the following three methods in order of priority from top to bottom.
  - use shadcn/ui components with their default style
  - use shadcn/ui components with custom style
  - implement components by yourself
- install shadcn/ui component by running `npx shadcn@latest add {component name}`. 
- use tailwind css only for styling shapes and colors of HTML elements and texts. Never use it for defining layouts and placements of elements
- Use css modules only for defining layouts and placements of elements. Never use it for styling shapes and colors
- Prefer grid layout over other methods such as flex and, if applicable, the best way is to use `grid-template-areas`.

### React Router's Route modules

Typical implementation of Route modules are like this:

```tsx
// sample-route.tsx
import { Link } from "react-router";
import type { Route } from './+types/sample-route';

export async function loader({ request }: Route.LoaderArgs) {
    // ...
    return { say: "hello" };
}

export async function action({ request }: Route.ActionArgs) {
    try {
        // do some mutations according to request
        return { error: null };
    } catch (e) {
        return { error: "some error" };
    }
}

export function meta({ request }: Route.MetaArgs) {
 return [
  { title: "pagename" },
  { name: "description", content: "blah blah" },
 ];
}

export default function Home({ loaderData, actionData }: Route.ComponentProps) {
 return (
        // page component
 );
}
```

Keep in mind that `loader` and `action` runs in server while other Route Modules (`meta, clientLoader, clientAction` etc and the default export component) runs in client. You can't include client-only codes (`window`, `localStorage` etc) in `loader` and `action` and can't include server-only codes (interacting with DB etc) in other Route Modules.

Also keep in mind that you should not seek any files from `+types` directory. The directory does not exist. it is an alias directory defined by react-router. 

## ADR

You must record your plannings on an ADR in `./decisions`. ADRs should mainly contain key decisions and why the decisions are made, not how.

When to write ADR is specified in "Development Process" section below.

## Development Process

The implementation task is separated in several stages.

At the beginning of your task, the operator will tell you which stage you should do. Focus on the stage.

Don't forget to update memory bank after a task finishes.

### Object creation stage

1. Operator creates and updates domain objects
2. Operator asks you to implement Factories and Repositories with a storage solution you should use
3. You Implement Factories and Repositories for all domain objects.
4. You ask the operator a review. If Operator approves, finish the task. Otherwise fix implementation and do this step again.

### Service implementation stage

1. You plan how to implement service functions to achieve the application use cases described in `.ai/memory-bank/projectbrief.md`. Don't change any files at this step.
2. You ask the operator a review. If Operator approves, go to the next step. Otherwise fix the plan and do this step again.
3. You write key decisions in your plan on an ADR.
4. You implement thorough tests for all the services in the plan.
5. You ask the operator a review. If Operator approves, go to the next step. Otherwise fix test cases and do this step again.
6. You implement all the services to pass all the tests.
7. You ask the operator a review. If Operator approves, finish the task. Otherwise fix implementation and do this step again.

### Application implementation stage

1. You plan how to implement pages and components to achieve the application use cases described in `.ai/memory-bank/projectbrief.md`. Don't change any files at this step.
2. You ask the operator a review. If Operator approves, go to the next step. Otherwise fix the plan and do this step again.
3. You write key decisions in your plan on an ADR.
4. You implement the pages and components you planned.
5. You ask the operator a review. If Operator approves, finish the task. Otherwise fix test cases and do this step again.

## Instructions

Re-consider your plan after you failed (test failed or rejected by the operator) editing a file twice in a row.

Ensure `pnpm run validate` command passes before you report completions of your tasks.

install packages by `pnpm add package-name` and `pnpm add -D package-name`

When you want to fix lint and format errors, first try fixing with `pnpm run check:write-unsafe` to reduce file read and write. If there's still some errors after the command, then fix them manually.=

Run tests with `pnpm run test:unit:run`. The `test:unit` command is for humans.

Dont read these files:

- .react-router/*
- ./+types/*
- .env
- .dev.vars
