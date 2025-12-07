# Initial Setup

Run this once to set up the project.

```shell
npm i
cp .env.example .env # Adjust your DB connection!
npm run server:build
npm run server:migrate
npm run server:seed
npm run server:dev
```

# Checklist for New Project

- [ ] Replace `templateNodeUser` at the custom type `RequestAuth` at `./src/types/index.d.ts` with your user type.
