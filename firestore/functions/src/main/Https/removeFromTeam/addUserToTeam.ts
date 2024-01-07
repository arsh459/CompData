// import { UserRank } from "../../../models/Activity/Activity";
// import {
//   // getCoachRank,
//   //   getCoachRank,
//   getUserRankForUID,
// } from "../../../models/Activity/getUtils";
import { getSbEventById } from "../../../models/sbEvent/getUtils";
import { getUserById } from "../../../models/User/Methods";
import {
  //   copyChallengeForCreator,
  //   createBaseCoachRank,
  createBaseUserRank,
  //   saveCopiedChallenge,
} from "./copyChallenge";

import { createParticipatingWith } from "../../../models/User/createUtils";
import {
  getAllTeamRequests,
  updateRequest,
} from "../../../models/TeamRequest/getUtils";
import * as admin from "firebase-admin";
import { changeOwnerMain } from "./changeOwnerUtils";
import { getOldTeamId } from "./utils";

export const addUserToTeam = async (
  gameId: string,
  uid: string,
  teamId: string,
  // oldTeamId: string,
) => {
  try {
    const now = Date.now();

    const team = await getSbEventById(teamId);
    console.log(team?.name);

    const user = await getUserById(uid);
    console.log(user?.name);

    const oldTeamId = getOldTeamId(user, gameId);

    const oldTeam = await getSbEventById(oldTeamId);

    if (team && user && oldTeam) {
      const batch = admin.firestore().batch();

      // remove user from old team and add to team //
      const filteredEnrolledEvents = user.enrolledEventsWithTime?.filter(
        (item) => item.eventId !== oldTeamId,
      );

      batch.update(admin.firestore().collection("users").doc(uid), {
        enrolledCommunities: admin.firestore.FieldValue.arrayRemove(
          oldTeam.ownerUID,
        ),
        enrolledEvents: admin.firestore.FieldValue.arrayRemove(oldTeamId),
        enrolledEventsWithTime: [
          ...(filteredEnrolledEvents
            ? [
                ...filteredEnrolledEvents,
                {
                  eventId: teamId,
                  enrolledTime: now,
                },
              ]
            : []),
        ],
        [`participatingInGameWithTeam.${gameId}`]: createParticipatingWith(
          teamId,
          team?.ownerUID,
          now,
        ),
        [`participatingWithObj.${gameId}`]: team.ownerUID,
        welcomeMessagesForEvents: admin.firestore.FieldValue.arrayUnion(teamId),
      });

      // add new teamId
      batch.update(admin.firestore().collection("users").doc(uid), {
        enrolledCommunities: admin.firestore.FieldValue.arrayUnion(
          team?.ownerUID,
        ),
        enrolledEvents: admin.firestore.FieldValue.arrayUnion(teamId),
      });
      /// added to team

      const newRank = createBaseUserRank(
        uid,
        user.progressV2 ? user.progressV2 : 0,
        team.name,
        team.eventKey ? team.eventKey : "team",
        team.id,
        user.userLevelV2 ? user.userLevelV2 : 0,
        team.ownerUID,
        user.gender ? user.gender : "notSpecified",
        user.name,
        user.profileImage,
      );

      // if user leaving is owner
      if (user.uid === oldTeam.ownerUID) {
        await changeOwnerMain(gameId, oldTeam, uid);
      }

      // add to team
      batch.update(admin.firestore().collection("sbEvents").doc(teamId), {
        enrolledUserUIDs: admin.firestore.FieldValue.arrayUnion(uid),
        updatedOn: Date.now(),
      });

      // remove from team
      batch.update(admin.firestore().collection("sbEvents").doc(oldTeamId), {
        enrolledUserUIDs: admin.firestore.FieldValue.arrayRemove(uid),
        updatedOn: Date.now(),
      });

      batch.set(
        admin
          .firestore()
          .collection("sbEvents")
          .doc(gameId)
          .collection("userRanks")
          .doc(`rank-${newRank.uid}`),
        newRank,
      );

      // update user rank
      // const previousRank = await getUserRankForUID(gameId, uid);
      // let prevUserRankUpdated: UserRank | undefined;
      // if (previousRank) {
      //   batch.delete(
      //     admin
      //       .firestore()
      //       .collection("sbEvents")
      //       .doc(gameId)
      //       .collection("userRanks")
      //       .doc(`old-rank-${newRank.uid}`),
      //     prevUserRankUpdated,
      //   );
      // }

      // save previous data
      // if (prevUserRankUpdated) {
      //   batch.set(
      //     admin
      //       .firestore()
      //       .collection("sbEvents")
      //       .doc(gameId)
      //       .collection("userRanks")
      //       .doc(`old-rank-${newRank.uid}`),
      //     prevUserRankUpdated,
      //   );
      // }

      // close all pending invitations
      const requests = await getAllTeamRequests(gameId, uid);
      for (const request of requests) {
        if (request.requestedTo === team.ownerUID) {
          updateRequest(batch, gameId, request.id, "ACCEPTED");
        } else if (
          request.requestedTo !== team.ownerUID &&
          request.state === "PENDING"
        ) {
          updateRequest(batch, gameId, request.id, "EXPIRED");
        }
      }

      await batch.commit();

      return "success";
    }
    return "fail";
  } catch (error) {
    return "fail";
  }
};
