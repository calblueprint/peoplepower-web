# People Power Web App

_Last updated: Feb 23, 2020 (by Fang)_

See the live app (master): https://peoplepower.netlify.com
For the peoplepower-node repo, go to: https://github.com/calblueprint/peoplepower-node

## Quickstart

**STEP ONE: Clone this project**

1. Click on 'Clone or Download' (green button near the top right) and copy the URL.
2. Then in you desired directory, do `git clone {COPIED URL HERE}`

**STEP TWO: Set up the `.env` files**

*NOTE: Any code in the that is enclosed in `{` `}` is meant to be replaced. Hence, if your API Key is "abcd", `REACT_APP_AIRTABLE_API_KEY={YOUR API KEY HERE} yarn start` is supposed to become `REACT_APP_AIRTABLE_API_KEY=abcd yarn start`. Note that the `{` `}` is replaced as well*

The project uses a number of secrets that are passed via a `.env` file (for security reasons). We need to set this `.env` file now.

1. In your top level directory (`/peoplepower-web`, the same directory containing the src folder, `package.json` and a couple of other files), create a file called `.env`.
2. Copy and paste the following into `.env`:

```
REACT_APP_AIRTABLE_API_KEY={YOUR AIRTABLE API KEY HERE}

REACT_APP_PAYPAL_CLIENT_ID={PAYPAL CLIENT ID}

REACT_APP_GOOGLE_API_KEY={REACT APP GOOGLE API KEY}

```

You can get the `PAYPAL CLIENT ID` and `REACT APP GOOGLE API KEY` from Notion in 'Credentials Reference'. Follow the instructions in this [Airtable support page](https://support.airtable.com/hc/en-us/articles/219046777-How-do-I-get-my-API-key-) to get your Airtable API Key.

3. Create a file called `.airtable-schema-generator.env` and paste the following:

```
AIRTABLE_BASE_ID={THE AIRTABLE BASE ID}
AIRTABLE_EMAIL={YOUR AIRTABLE EMAIL}
AIRTABLE_PASSWORD={YOUR AIRTABLE PASSWORD}
```

The airtable email and password are what you log into airtable with. This info is used for our automatic airtable API scraper.

(More info about the schema generator found [here](https://github.com/aivantg/airtable-schema-generator))

4. Run `yarn install`. This might take a little bit of time.
5. Run `yarn start`. This starts the development server, and should open a tab with the url `localhost:3000` where you can find the People Power web app. If the tab doesn't open up normally, you can type `localhost:3000` in your browser manually to open it.
6. To verify that you've done step two correctly, run `REACT_APP_AIRTABLE_API_KEY={YOUR AIRTABLE API KEY HERE} yarn test`. This command passes in an environment variable acccessible by `REACT_APP_AIRTABLE_API_KEY`, and runs tests locally. This should take about 30s to a minute, and if you've done everything so correctly so far, all tests shoulld pass.

Congrats! You now have a working version of the People power on your local machine ✨

### Airtable Schema Generation

Whenever you update the airtable schema, you'll need to run the script `yarn generate-schema` in order to re-generate some helper files!

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts (redacted from Create React App)

In the project directory, you can run:

`npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

`npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

Code Splitting: https://facebook.github.io/create-react-app/docs/code-splitting

Analyzing the Bundle Size: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

Making a Progressive Web App: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

Advanced Configuration: https://facebook.github.io/create-react-app/docs/advanced-configuration

Deployment: https://facebook.github.io/create-react-app/docs/deployment

`npm run build` fails to minify: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
