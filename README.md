# Advertising Data ETL-V

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

`yarn install` - to install dependencies\
`yarn run prepare` - to install git hooks using husky

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run format`

Formats the code using Prettier

### `yarn run lint`

Runs static code analysis using custom ESLint configuration

### `yarn run type-check`

Runs type checking of the code using TypeScript

### `yarn run validate`

Runs formatter, linter, type-checker and tests in a sequence. Especially useful as a pre-commit git hook.

## Request mocking

To save bandwidth and speed up the development experience, MSW mocking is enabled which fetches the CSV file from localhost instead of AWS.\
To disable this feature, simply go to `src/config.ts` and set `enableResponseMocking` to `false`.

*NOTE: request mocking with MSW does not work on Firefox when using XHR (https://github.com/mswjs/msw/issues/220)*
