# People Power Web App

_Last updated: Mar 3, 2020 (by Fang)_

- live app (master): https://peoplepower.netlify.com
- peoplepower-node repo, go to: https://github.com/calblueprint/peoplepower-node

## 1. Quickstart

**SECTION 1️⃣: CLONE THIS PROJECT**

1. Click on 'Clone or Download' (green button near the top right) and copy the URL.
2. Then in you desired directory, do `git clone {COPIED URL HERE}`

**SECTION 2️⃣: SET UP ENVIRONMENT**

The project uses a number of secrets that are passed via a `.env` file (for security reasons). We need to set this `.env` file now.

1. In your top level directory (`/peoplepower-web`, the same directory containing the src folder, `package.json` and a couple of other files), create a file called `.env`.
2. Copy and paste the following into `.env`:

```
REACT_APP_PAYPAL_CLIENT_ID={PAYPAL CLIENT ID}
REACT_APP_GOOGLE_API_KEY={REACT APP GOOGLE API KEY}

REACT_APP_AIRTABLE_API_KEY={YOUR AIRTABLE API KEY HERE}
AIRTABLE_BASE_ID=appFaOwKhMXrRIQIp
AIRTABLE_EMAIL={AIRTABLE EMAIL}
AIRTABLE_PASSWORD={AIRTABLE PASSWORD}
```

_❗️Any code in the that is enclosed in `{` `}` is meant to be replaced. Hence, if your API Key is "abcd", `AIRTABLE_API_KEY={YOUR API KEY HERE} yarn start` is supposed to become `AIRTABLE_API_KEY=abcd yarn start`. Note that the `{` `}` is replaced as well_

- `PAYPAL CLIENT ID`: Get it from the People Power Notion ('Credentials Reference')
- `GOOGLE API KEY`: Get it from the People Power Notion ('Credentials Reference')
- Airtable API Key: follow the instructions in this [Airtable support page](https://support.airtable.com/hc/en-us/articles/219046777-How-do-I-get-my-API-key-)
- The airtable email and password are what you log into airtable with. This info is used for our automatic airtable API scraper.

```

4. Run `yarn install`. This might take a little bit of time.
5. Run `yarn start`. This starts the development server, and should open a tab with the url `localhost:3000` where you can find the People Power web app. If the tab doesn't open up normally, you can type `localhost:3000` in your browser manually to open it.
6. To verify that you've done step two correctly, run `AIRTABLE_API_KEY={YOUR AIRTABLE API KEY HERE} yarn test`. This command passes in an environment variable acccessible by `AIRTABLE_API_KEY`, and runs tests locally. This should take about 30s to a minute, and if you've done everything so correctly so far, all tests shoulld pass.

Congrats! You now have a working version of the People power on your local machine ✨

## 2. Airtable Schema Generation

Whenever you update the airtable schema, you'll need to run the script `yarn generate-schema` in order to re-generate some helper files!

(More info about the schema generator found [here](https://github.com/aivantg/airtable-schema-generator))


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
```
