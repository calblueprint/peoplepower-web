# People Power Web App

_Last updated: May 3, 2020 (by Fang)_

The web client for People Power Solar Cooperative

- For the live app (master), visit https://peoplepower.netlify.com
- For peoplepower-node (server) repo, go to https://github.com/calblueprint/peoplepower-node
- For complete documentation, go to https://github.com/calblueprint/peoplepower-web/wiki

## 1. Quickstart

**SECTION 1️⃣: CLONE THIS PROJECT**

1. Click on 'Clone or Download' (green button near the top right) and copy the URL.
2. Then in you desired directory, do `git clone {COPIED URL HERE}`

**SECTION 2️⃣: SET UP ENVIRONMENT**

The project uses a number of secrets that are passed via a `.env` file (for security reasons). We need to set this `.env` file now.

1. In your top level directory (`/peoplepower-web`, the same directory containing the src folder, `package.json` and a couple of other files), create a file called `.env`.

_❗️NOTE: Any code in the that is enclosed in `{` `}` is meant to be replaced. Hence, if your API Key is "abcd", `REACT_APP_AIRTABLE_API_KEY={YOUR API KEY HERE} yarn start` is supposed to become `REACT_APP_AIRTABLE_API_KEY=abcd yarn start`. Note that the `{` `}` is replaced as well_

2. Copy and paste the following into `.env`:

```
REACT_APP_AIRTABLE_ENDPOINT_URL=https://peoplepower-node.herokuapp.com
REACT_APP_SERVER_URL=https://peoplepower-node.herokuapp.com

REACT_APP_PAYPAL_CLIENT_ID={YOUR PAYPAL CLIENT ID}

REACT_APP_GOOGLE_API_KEY={YOUR GOOGLE API KEY}
REACT_APP_AIRTABLE_BASE_ID={AIRTABLE BASE ID}

REACT_APP_BUG_REPORT_URL={YOUR BUG REPORTURL}
```

Equivalently, duplicate the `.env.example` file and rename it to `.env`. Then fill out the credentials appropriately

- `PAYPAL CLIENT ID`: Get it from the People Power Notion ('Credentials Reference') if you are from Blueprint
- `GOOGLE API KEY`: Get it from the People Power Notion ('Credentials Reference') if you are from Blueprint

4. Run `yarn install`. This might take a little bit of time.
5. Run `yarn start`. This starts the development server, and should open a tab with the url `localhost:3000` where you can find the People Power web app. If the tab doesn't open up normally, you can type `localhost:3000` in your browser manually to open it.
6. If you did not do step two correctly, you will see an error message on the screen saying: 
```
Required configuration variable ${param} is ${SOME WRONG  VALUE}. Do you have a .env file and is it setup correctly?
```
Verify that you used a `.env` file with all the correct values from step two.

Congrats! You now have a working version of the People Power web app on your local machine ✨

## 2. Airtable Schema Generation

Whenever you update the airtable schema, you'll need to run the script `yarn generate-schema` in order to re-generate some helper files!

(More info about the schema generator found [here](https://github.com/aivantg/airtable-schema-generator))


## Misc.
- This project was first worked on by @aivantg, @ashleynguyen27, @cindyzhang12, @dfangshuo, @iris-hou, @niwong, @arpanpal, @ethanlee16 of @calblueprint. For questions, see [Acknowledgements/Knowledge Owners](https://github.com/calblueprint/peoplepower-web/wiki/Acknowledgements)

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

