import {
  createInstance,
  enums as OptimizelyEnums
} from "@optimizely/optimizely-sdk/dist/optimizely.lite.min.js";
import { getDatafile, dispatchEvent } from "./optimizely_helper";
import { v4 as uuidv4 } from 'uuid';

const CLOUDFLARE_CLIENT_ENGINE = "javascript-sdk/cloudflare";
const flagId = "car_finder";



const QuerySingleDecisionValue = (user, init) => { 

  // Query a single feature and get dynamic data
  const decision = user.decide(flagId);
  const component_version = decision.variables.component_verion;
  init.headers.component_version = component_version;
}


async function gatherResponse(init) {

  const userId = uuidv4();  // Create this yourself
  
  const datafile = await getDatafile(DATA_FILE_KEY, 600);
  const optimizelyClient = createInstance({
    datafile,
    logLevel: OptimizelyEnums.LOG_LEVEL.ERROR,
    clientEngine: CLOUDFLARE_CLIENT_ENGINE
  });

  const optimizelyUserContext = optimizelyClient.createUserContext(
    userId,
    // Example of passing attributes
    {
      request_type: init.headers.attributeExample,
      DeviceType: "Android"
    }
  );

  const data = {}

  const allDecisions = optimizelyUserContext.decideAll();
  Object.entries(allDecisions).map(([flagKey, decision], index) => {
    data[`${flagKey}-RuleKey`] = decision.ruleKey;
    data[`${flagKey}-User`] = decision.userContext.getUserId();
    data[decision.flagKey] = decision.enabled;

    init.headers[`x-flags-header-${index}`] = decision.ruleKey;

    // Track an event
    optimizelyUserContext.trackEvent('cache_hit');
  });


  QuerySingleDecisionValue(optimizelyUserContext, init);
    


  return JSON.stringify(data, null, 2)
}


async function handleRequest(request) {

  const getDataFromClientExample = request.headers.get("cookie");
  const url = request.url;

  let init = {
    headers: {
      "content-type": "application/json;charset=UTF-8",
      "url": url,
      "attributeExample": request.method
    },
  }

  const results = await gatherResponse(init)
  return new Response(results, init)
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event.request))
})
