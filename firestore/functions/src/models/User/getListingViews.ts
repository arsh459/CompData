import { ListingView } from "./User";
import { firestore } from "firebase-admin";
import * as moment from "moment";

export const listingsViewedThisDay = async (
  userId: string,
  currentTime: number,
): Promise<ListingView[]> => {
  const previousViews = await firestore()
    .collection("users")
    .doc(userId)
    .collection("listingViews")
    .where("viewTime", ">=", currentTime - 24 * 60 * 60 * 1000)
    .get();

  return previousViews.docs.map((remView) => remView.data() as ListingView);
};

export const getListingNamesAndTimes = (views: ListingView[]) => {
  let lNames = "";
  let times = "";

  for (const view of views) {
    lNames += `${view.listingName} `;
    times += `${moment.unix(view.viewTime / 1000).format("MM YYYY hh:mm")}`;
  }

  return {
    listing_names: lNames,
    times: times,
  };
};
