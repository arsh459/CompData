import algoliasearch from "algoliasearch";
import { AlgoliaAppSearch } from "../../../models/AppSearch/interface";
import { AlgoliaActivity } from "../../../models/Activity/Activity";

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID ? process.env.ALGOLIA_APP_ID : "",
  process.env.ALGOLIA_KEY ? process.env.ALGOLIA_KEY : "",
);

const activities = client.initIndex("activities");
const appSearchIndex = client.initIndex("appsearch");
const dietSearchIndex = client.initIndex("dietsearch");

export const addActivityToSBAlgolia = async (activity: AlgoliaActivity) => {
  await activities.saveObject(activity);
};

export const pushRecordsToAlgolia = async (records: AlgoliaAppSearch[]) => {
  await appSearchIndex.saveObjects(records);
};

export const pushDietRecordsToAlgolia = async (records: AlgoliaAppSearch[]) => {
  await dietSearchIndex.saveObjects(records);
};
