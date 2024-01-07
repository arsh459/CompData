import { getUserCollections } from "../../../../models/Collection/Methods/getUtils";
// import { getLeaderboardEntry } from "../../../../models/LeaderBoard/Methods";
import { getUserTrips } from "../../../../models/Trip/Methods/getUtils";
import { UserInterface } from "../../../../models/User/User";
import * as admin from "firebase-admin";
import {
  //   getAllUserCollectionViews,
  getAllUserCollectionViewsInObj,
} from "../../../PubSub/ViewUpdate/viewUtils";
import { View } from "../../../../models/Collection/Collection";
import { getUserLeads } from "../../../../models/Lead/Methods/getUtils";
import { getUserBookings } from "../../../../models/BookingRequestISO/Methods/getUtils";
import {
  createEarning,
  getAllEarningByUserId,
  getEarningSum,
} from "../../../../models/Earning/Methods";
import { Earning } from "../../../../models/Earning/Earning";
import { BookingRequestISO } from "../../../../models/BookingRequestISO/BookingRequestISO";

export const reconcileSingleLeaderUser = async (user: UserInterface) => {
  const currDate = new Date().getTime();
  const twoWeekAgoDate = currDate - 24 * 60 * 60 * 14 * 1000;
  const oneMonthAgoDate = currDate - 24 * 60 * 60 * 30 * 1000;

  const allCollections = await getUserCollections(user.uid);
  const allTrips = await getUserTrips(user.uid);

  const allCollectionViews = await getAllUserCollectionViewsInObj(
    allCollections,
    0,
    currDate,
    "collection"
  );

  //   console.log("allCollectionViews", Object.keys(allCollectionViews).length);
  const allTripViews = await getAllUserCollectionViewsInObj(
    allTrips,
    0,
    currDate,
    "trip"
  );
  //   console.log("allTripViews", Object.keys(allTripViews).length);

  const allViews: View[] = [];
  allViews.push(...Object.values(allCollectionViews));
  allViews.push(...Object.values(allTripViews));

  const allLeads = await getUserLeads(user.uid, 0, currDate);
  const allBookings = await getUserBookings(user.uid, 0, currDate);

  //   console.log("allLeads", allLeads);
  //   console.log("allBookings", allBookings);

  const allEarnings = await getAllEarningByUserId(user.uid);
  const allNeededEarnings = getNeededEarnings(
    // allEarnings,
    { ...allCollectionViews, ...allTripViews },
    allBookings
  );

  //   console.log("missingEarnings", allNeededEarnings);

  //   const toDelete = getEarningsToDelete(allEarnings, allNeededEarnings);
  //   console.log("toDelete", toDelete);

  //   const finalEarnings = [...allEarnings, ...missingEarnings];

  // delete all previous

  for (const toDel of allEarnings) {
    await admin
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("earnings")
      .doc(toDel.earningId)
      .delete();
  }

  const batch = admin.firestore().batch();

  batch.set(
    admin.firestore().collection("leaderBoard").doc(`leader-${user.uid}`),
    {
      uid: user.uid,
      // views
      numViews: allViews.length,
      numViews2Weeks: allViews.filter(
        (item) => item.visitedOn >= twoWeekAgoDate
      ).length,
      numViews1Month: allViews.filter(
        (item) => item.visitedOn >= oneMonthAgoDate
      ).length,

      // leads
      numLeads: allLeads.length + allBookings.length,
      numLeads2Weeks:
        allLeads.filter((lead) => lead.createdOn >= twoWeekAgoDate).length +
        allBookings.filter(
          (booking) => booking.unixCreationTime >= twoWeekAgoDate
        ).length,
      numLeads1Month:
        allLeads.filter((lead) => lead.createdOn >= oneMonthAgoDate).length +
        allBookings.filter(
          (booking) => booking.unixCreationTime >= oneMonthAgoDate
        ).length,

      // all earnings
      earnings2Weeks: getEarningSum(
        allNeededEarnings.filter(
          (item) => item.createdOn > currDate - 24 * 60 * 60 * 14 * 1000
        )
      ),
      earnings1Month: getEarningSum(
        allNeededEarnings.filter(
          (item) => item.createdOn > currDate - 24 * 60 * 60 * 30 * 1000
        )
      ),
      allEarnings: getEarningSum(allNeededEarnings),
    },
    { merge: true }
  );

  for (const newEarning of allNeededEarnings) {
    // console.log("newEarning", newEarning);
    batch.set(
      admin
        .firestore()
        .collection("users")
        .doc(user.uid)
        .collection("earnings")
        .doc(newEarning.earningId),
      newEarning
    );
  }

  //   console.log("done for user ", user.uid);

  await batch.commit();

  return;
};

const getNeededEarnings = (
  views: { [docId: string]: View },
  bookings: BookingRequestISO[]
) => {
  const missingEarnings: Earning[] = [];
  //   for (const booking of bookings) {
  //     if (booking.bookingStatus === "CONFIRMED") {
  //       missingEarnings.push(
  //         createEarning(
  //           "LISTING_BOOKING",
  //           booking.amount * 0.05,
  //           booking.requestId,
  //           "New booking",
  //           `Booking for ${booking.listingName} made`,
  //           "CREDIT",
  //           0.05,
  //           booking.image
  //         )
  //       );
  //     } else if (booking.bookingStatus === "CANCELLED") {
  //       missingEarnings.push(
  //         createEarning(
  //           "LISTING_BOOKING",
  //           booking.amount * 0.05,
  //           booking.requestId,
  //           "Cancellation request",
  //           `The booking for ${booking.listingName} has been cancelled`,
  //           "DEBIT",
  //           0.05,
  //           booking.image
  //         )
  //       );
  //     }
  //   }

  for (const viewId of Object.keys(views)) {
    missingEarnings.push(
      createEarning(
        "VIEW",
        2,
        viewId,
        "New View",
        `New view on your creation`,
        "CREDIT",
        1
      )
    );
  }

  return missingEarnings;
};

// const previousEarningExists = (
//   previousEarnings: Earning[],
//   id: string
// ): Earning | undefined => {
//   return previousEarnings.filter((earning) => earning.bookingId === id).length >
//     0
//     ? previousEarnings[0]
//     : undefined;
// };
