const SmartyStreetsSDK = require("smartystreets-javascript-sdk");

import abbrState from "@/util/stateToAbbr";

export async function isAddressValid(user) {
  const SmartyStreetsCore = SmartyStreetsSDK.core;
  const Lookup = SmartyStreetsSDK.usStreet.Lookup;

  // for client-side requests (browser/mobile), use this code:
  let key = process.env.NEXT_PUBLIC_SMARTY_WEBSITE_KEY;
  const credentials = new SmartyStreetsCore.SharedCredentials(key);

  // The appropriate license values to be used for your subscriptions
  // can be found on the Subscription page of the account dashboard.
  // https://www.smartystreets.com/docs/cloud/licensing
  let clientBuilder = new SmartyStreetsCore.ClientBuilder(credentials)
    // .withBaseUrl("/")
    .withLicenses(["us-core-cloud"]);
  let client = clientBuilder.buildUsStreetApiClient();

  let lookup = new Lookup();
  lookup.street = user.street;
  lookup.city = user.city;
  lookup.state = user.state;
  lookup.zipCode = user.zipcode;
  lookup.maxCandidates = 3;
  lookup.match = "invalid";

  const val1 = await client.send(lookup).then(handleSuccess).catch(handleError);
  return val1;

  function handleSuccess(response) {
    // analysis.dpvMatchCode = "N"
    const validAddress = lookup.result[0].analysis.dpvMatchCode;
    // const cityName = lookup.result[0].components.cityName;
    const { cityName, state, zipCode } = lookup.result[0].components;

    if (cityName.toUpperCase() !== user.city.toUpperCase()) {
      return false;
    }

    let abbreviatedState = user.state;
    // If state name is not abbreviated, run this function
    if (user.state.length > 2) {
      abbreviatedState = abbrState(user.state, "abbr");
    }

    if (state !== abbreviatedState) {
      return false;
    }

    if (zipCode !== user.zipcode) {
      return false;
    }

    if (validAddress === "N") {
      return false;
    } else {
      return true;
    }
  }

  function handleError(response) {
    console.log(response);
  }
}
