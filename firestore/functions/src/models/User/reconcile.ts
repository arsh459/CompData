import { getAllDiscoveries } from "../UGCListing/Methods";
import { getUserById } from "./Methods";
import { UGCListing } from "../UGCListing/UGCListing";
import { setOne } from "../../utils/firestore/fetchOne";

export const reconcileAllUGCListings = async () => {
  const allDiscoveries = await getAllDiscoveries();
  const creatorMap: { [uid: string]: UGCListing[] } = {};
  const uniqueCreatorListings = allDiscoveries.reduce((acc, disc) => {
    if (acc[disc.uid]) {
      acc[disc.uid].push(disc);
    } else {
      acc[disc.uid] = [disc];
    }

    return acc;
  }, creatorMap);

  Object.keys(uniqueCreatorListings).map(async (creatorID) => {
    const user = await getUserById(creatorID);

    const promises = uniqueCreatorListings[creatorID].map((listing) => {
      if (user) {
        return setOne(
          "ugcListings",
          listing.ugcListingId,
          {
            uid: user.uid,
            ...(user.name ? { name: user.name } : {}),
            ...(user.imageURI ? { imageURI: user.imageURI } : {}),
            ...(user.tagline ? { tagline: user.tagline } : {}),
            ...(user.verified ? { verified: user.verified } : {}),
            ...(user.allFollowers ? { allFollowers: user.allFollowers } : {}),
          },
          true,
        );
      }

      return;
    });

    await Promise.all(promises);
  });
};
