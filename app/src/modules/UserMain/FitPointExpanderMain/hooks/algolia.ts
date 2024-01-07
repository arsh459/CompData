import algoliasearch from "algoliasearch/lite";
import { createNullCache } from "@algolia/cache-common";
import { ALGOLIA_APPLICATION_ID, ALGOLIA_KEY } from "react-native-dotenv";

export const client = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_KEY, {
  responsesCache: createNullCache(),
});
// export const actIndex = client.initIndex("activities");
export const appSearchIndex = client.initIndex("appsearch");
export const dietSearchIndex = client.initIndex("dietsearch");
