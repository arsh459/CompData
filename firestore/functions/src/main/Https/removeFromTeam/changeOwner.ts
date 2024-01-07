import * as admin from "firebase-admin";
import { getCoachRank } from "../../../models/Activity/getUtils";
import { getSbEventById } from "../../../models/sbEvent/getUtils";
import { getUserById } from "../../../models/User/Methods";

export const removeUserFromTeam = async (uid: string, eventId: string) => {
  const user = await getUserById(uid);
  const team = await getSbEventById(eventId);

  const gameId = team?.parentId;

  if (user && gameId) {
    const batch = admin.firestore().batch();

    const filteredEnrolledEvents = user.enrolledEventsWithTime?.filter(
      (item) => item.eventId !== eventId && item.eventId !== gameId,
    );

    // remove from team
    batch.update(admin.firestore().collection("users").doc(uid), {
      enrolledEvents: admin.firestore.FieldValue.arrayRemove(eventId),
      enrolledEventsWithTime: [
        ...(filteredEnrolledEvents ? filteredEnrolledEvents : []),
      ],
      [`participatingInGameWithTeam.${gameId}`]:
        admin.firestore.FieldValue.delete(),
    });

    // remove from game
    batch.update(admin.firestore().collection("users").doc(uid), {
      enrolledEvents: admin.firestore.FieldValue.arrayRemove(gameId),
    });

    // remove from team ref
    batch.update(admin.firestore().collection("sbEvents").doc(eventId), {
      enrolledUserUIDs: admin.firestore.FieldValue.arrayRemove(uid),
    });

    // if team owner
    if (team.ownerUID === uid && team.enrolledUserUIDs) {
      let nextOwner: string = "";
      if (team.enrolledUserUIDs?.length >= 1) {
        const uidsWithoutUser = team.enrolledUserUIDs.filter(
          (item) => item !== uid,
        );

        nextOwner = uidsWithoutUser[0];

        // change userRanks
        for (const teamMemberUID of team.enrolledUserUIDs) {
          if (teamMemberUID !== uid) {
            // change user rank
            batch.update(
              admin
                .firestore()
                .collection("sbEvents")
                .doc(gameId)
                .collection("userRanks")
                .doc(`rank-${teamMemberUID}`),
              {
                coachCommunityId: nextOwner,
              },
            );
          }
        }
      }

      // new owner
      batch.update(admin.firestore().collection("sbEvents").doc(eventId), {
        ownerUID: nextOwner,
      });

      // change coach
      const coachRank = await getCoachRank(gameId, uid);
      const newOwner = await getUserById(nextOwner);

      if (newOwner) {
        batch.set(
          admin
            .firestore()
            .collection("sbEvents")
            .doc(gameId)
            .collection("coachRanks")
            .doc(`rank-${newOwner.uid}`),
          {
            ...coachRank,
            authorName: newOwner.name ? newOwner.name : "",
            authorImg: newOwner.profileImage ? newOwner.profileImage : null,
            uid: newOwner.uid,
            updatedOn: Date.now(),
          },
        );

        // remove from team
        batch.update(admin.firestore().collection("users").doc(newOwner.uid), {
          teamCreateMessage: admin.firestore.FieldValue.arrayUnion(eventId), // team create message
          enrolledCommunities: admin.firestore.FieldValue.arrayUnion(
            newOwner.uid,
          ),
          enrolledEvents: admin.firestore.FieldValue.arrayUnion(gameId),
          [`participatingWithObj.${gameId}`]: newOwner.uid,
        });

        // delete previous user team rank
        batch.delete(
          admin
            .firestore()
            .collection("sbEvents")
            .doc(gameId)
            .collection("coachRanks")
            .doc(`rank-${uid}`),
        );
      } else {
        // delete previous user team rank
        batch.update(
          admin
            .firestore()
            .collection("sbEvents")
            .doc(gameId)
            .collection("coachRanks")
            .doc(`rank-${uid}`),
          {
            coachEventId: "",
          },
        );
      }
    }

    // change user rank
    batch.update(
      admin
        .firestore()
        .collection("sbEvents")
        .doc(gameId)
        .collection("userRanks")
        .doc(`rank-${uid}`),
      {
        coachEventId: "",
        coachCommunityId: "",
      },
    );

    // change user rank
    batch.update(
      admin
        .firestore()
        .collection("sbEvents")
        .doc(eventId)
        .collection("userRanks")
        .doc(`rank-${uid}`),
      {
        coachEventId: "",
        coachCommunityId: "",
      },
    );

    // if

    await batch.commit();

    return "success";
  }

  return "failed";
};
