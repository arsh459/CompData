import { getUserById, getAllUsers } from "../User/Methods";
import { getAllSavedTripsForUser } from "../TripObj/Methods";
import { getAllUserDiscoveries } from "../UGCListing/Methods";
import { getAllUserReferrals } from "../../userLedger/reconcileUtils";
import { setOne } from "../../utils/firestore/fetchOne";

export const reconcileUser = async (uid: string) => {
  if (uid) {
    const user = await getUserById(uid);
    const userTrips = await getAllSavedTripsForUser(uid);
    const userDiscoveries = await getAllUserDiscoveries(uid);
    const activeCustomers = await getAllUserReferrals(uid);

    if (user) {
      await setOne(
        "leaderBoard",
        `leader-${uid}`,
        {
          uid: uid,
          activeCustomers: activeCustomers.length,
          discoveries: userDiscoveries.length,
          tripsPlanned: userTrips.length,
          ...(user.name ? { name: user.name } : {}),
          ...(user.imageURI ? { imageURI: user.imageURI } : {}),
          ...(user.tagline ? { tagline: user.tagline } : {}),
          ...(user.verified ? { verified: user.verified } : {}),
          ...(user.allFollowers ? { allFollowers: user.allFollowers } : {}),
          ...(user.bio ? { bio: user.bio } : {}),
          ...(user.knownFor ? { knownFor: user.knownFor } : {}),
          ...(user.expertIn ? { expertIn: user.expertIn } : {}),
          ...(user.inviteURL ? { inviteURL: user.inviteURL } : {}),
        },
        true
      );
    } else {
      console.log("uid not present", uid);
    }
  }
};

export const reconcileAllUsers = async () => {
  const allUsers = await getAllUsers();

  const userPromises = allUsers.users.map((user) => {
    // console.log("user.uid", user.uid);
    return reconcileUser(user.uid);
  });

  await Promise.all(userPromises);
};
