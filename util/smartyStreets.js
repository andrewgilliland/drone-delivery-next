const SmartyStreetsSDK = require("smartystreets-javascript-sdk");

export default function smartyStreets() {
  const SmartyStreetsCore = SmartyStreetsSDK.core;
  const Lookup = SmartyStreetsSDK.usStreet.Lookup;

  // for client-side requests (browser/mobile), use this code:
  let key = process.env.NEXT_PUBLIC_SMARTY_WEBSITE_KEY;
  const credentials = new SmartyStreetsCore.SharedCredentials(key);

  // The appropriate license values to be used for your subscriptions
  // can be found on the Subscription page of the account dashboard.
  // https://www.smartystreets.com/docs/cloud/licensing
  let clientBuilder = new SmartyStreetsCore.ClientBuilder(credentials)
    .withBaseUrl("/")
    .withLicenses(["us-core-cloud"]);
  let client = clientBuilder.buildUsStreetApiClient();

  // Documentation for input fields can be found at:
  // https://smartystreets.com/docs/us-street-api#input-fields

  let lookup1 = new Lookup();
  lookup1.inputId = "24601"; // Optional ID from your system
  lookup1.addressee = "John Doe";
  lookup1.street = "330 N 100 W";
  lookup1.street2 = "closet under the stairs";
  lookup1.secondary = "APT 2";
  lookup1.urbanization = ""; // Only applies to Puerto Rico addresses
  lookup1.city = "Provo";
  lookup1.state = "Utah";
  lookup1.zipCode = "84601";
  lookup1.maxCandidates = 3;
  lookup1.match = "invalid"; // "invalid" is the most permissive match,
  // this will always return at least one result even if the address is invalid.
  // Refer to the documentation for additional MatchStrategy options.

  client.send(lookup1).then(handleSuccess).catch(handleError);

  function handleSuccess(response) {
    console.log(lookup1.result);
  }

  function handleError(response) {
    console.log(response);
  }
}