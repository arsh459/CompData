import { getUserCollections } from "../../../../models/Collection/Methods/getUtils";
// import { getLeaderboardEntry } from "../../../../models/LeaderBoard/Methods";
import { getUserTrips } from "../../../../models/Trip/Methods/getUtils";
// import { UserInterface } from "../../../../models/User/User";
import { UserInterface } from "../../../../models/User/User";
import { reconcileCollectionView } from "../../../../models/Collection/Methods/viewUtils";

export const reconcileViews = async (user: UserInterface) => {
  const allCollections = await getUserCollections(user.uid);
  const allTrips = await getUserTrips(user.uid);

  for (const collection of allCollections) {
    await reconcileCollectionView(collection.collectionId, "collection");
  }

  for (const trip of allTrips) {
    await reconcileCollectionView(trip.collectionId, "trip");
  }

  return;
};
