# Gra-Pets-hQL

A fullstack GraphQL pets application (Apollo Server + React client), built while following the Frontend Masters course "Client-Side GraphQL in React".

## About The Project

The repository contains an API (Apollo Server, with a db.json data file) and a React client using Apollo Client. It was started from the course's materials; the original course README is replaced by this one (the course's completed reference remains available on the solution branch: `git checkout solution`).

## Built With

- Node.js / Apollo Server / GraphQL
- React / Apollo Client

## Getting Started

### Prerequisites

- Node.js and yarn (a yarn.lock is included)

### Installation

```bash
yarn install
```

### Running the app

See the scripts in package.json (`server` for the API, `app` for the client).

## License

No license file is present in this repository.

## Contact

Dylan J. Gerrits - [GitHub](https://github.com/Dyrits)

## Current toolchain and checks

Use Node.js 26.13.0 LTS (`.nvmrc`) and Yarn 1.22.22. Apollo Server 5 / GraphQL 16, Apollo Client 3, React 18, React Router 7 and Vite replace the old Apollo 2 / Parcel 1 stack. `yarn app` serves port 1234, `yarn server` serves GraphQL port 4000 and `yarn build` writes `client/dist/`.

Run `yarn install --frozen-lockfile`, `yarn test-server`, and `yarn test-integration`. The original three unit tests are placeholders; the integration check actually starts the API against a temporary database, queries seeded pets, creates a pet, resolves its owner and verifies persistence. It does not change the repository database. Optional `DB_FILE` and `PORT` settings allow isolated API runs.

Browser checks cover loading seeded pets, opening the new-pet form, submitting and refetching. External placeholder animal-image services were not verified; failed images show an explicit Photo unavailable fallback. Minimal responsive spacing prevents horizontal overflow on the checked 430px viewport. No hosted service, real account or production database was tested. Remaining dependency advisories concern Jest glob/minimatch and unfixed deepmerge.
