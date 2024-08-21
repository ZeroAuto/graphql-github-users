# Github GraphQL User Search

Simple app for searching github users with the Github GraphQL endpoint.

## Prequisites

Make sure you have the following installed:

- Node.js
- Yarn

## Installation

You will need to create a `.env` file with the following environment variable:

### `REACT_APP_ACCESS_TOKEN=your-access-token`

You can create a personal access token using the following instructions
`https://www.howtogeek.com/devops/how-to-set-up-https-personal-access-tokens-for-github-authentication/`
the token will have to have access read-only access to users

In the project directory, you can run:

### `yarn`
### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Notes

### I left some comments explaining some design decisions but here is a broad overview:

I am aware that setting the access token as an environment variable poses a security risk. I am doing it here for simple convenience since there is no plan to deploy this code (as far as I know). I am happy to discuss more secure ways of setting this token during the interview process.

I used React.memo for the UserList component. I honestly think that it is overkill in the case of such a simple app, but it is a component that could potentially be re-rendered quite a bit so in a larger app I think it would be a good candidate for memoization.

I moved the SEARCH_USERS and interfaces from the UserList component into their own files in a `utils` folder. Again this is probably overkill for such a small app, but in production I where interfaces and queries might be shared between different components I think it would make sense.

I did run into an issue where users without a databaseId were returned, when searching `zero` for example (my username is ZeroAuto) several empty nodes were returned which results in a key error. I spent some time looking thru the documentation and couldn't find any way to skip users without a databaseId in the returned data. It might make sense to filter out these users on the client side.

I had planned to set up a test suite but ran into some errors mocking the graphql query so rather than spend an hour or more trying to debug things I just skipped the tests. I will put the tests into a separate branch and leave a comment above the one that is failing. I think I'm probably just missing something simple so if y'all want to take a look and see if you can spot the issue please let me know.
