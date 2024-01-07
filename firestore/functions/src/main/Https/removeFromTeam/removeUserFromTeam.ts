import * as admin from "firebase-admin";
import { getCoachRank } from "../../../models/Activity/getUtils";
import { getSbEventById } from "../../../models/sbEvent/getUtils";
import {
  createParticipatingWith,
  createEnrolledWithTime,
} from "../../../models/User/createUtils";
import { getUserById } from "../../../models/User/Methods";
import { createNewUserTeam } from "./createNewUserTeam";

export const removeUserFromTeam = async (
  uid: string,
  eventId: string,
  switchUser?: boolean,
) => {
  const user = await getUserById(uid);
  const team = await getSbEventById(eventId);

  console.log("user", user?.uid);
  console.log("team", team?.id);

  const gameId = team?.parentId;

  console.log("gameId", gameId);

  if (user && gameId) {
    const batch = admin.firestore().batch();

    const filteredEnrolledEvents = user.enrolledEventsWithTime?.filter(
      (item) => item.eventId !== eventId && item.eventId !== gameId,
    );

    // console.log("filteredEnrolledEvents", filteredEnrolledEvents);

    console.log("path1", admin.firestore().collection("users").doc(uid).path);

    // remove from team
    batch.update(admin.firestore().collection("users").doc(uid), {
      enrolledEvents: admin.firestore.FieldValue.arrayRemove(eventId),
      enrolledEventsWithTime: [
        ...(filteredEnrolledEvents ? filteredEnrolledEvents : []),
      ],
      [`participatingInGameWithTeam.${gameId}`]:
        admin.firestore.FieldValue.delete(),
    });

    // console.log("uid", uid);

    console.log("path2", admin.firestore().collection("users").doc(uid).path);

    // remove from game
    batch.update(admin.firestore().collection("users").doc(uid), {
      enrolledEvents: admin.firestore.FieldValue.arrayRemove(gameId),
    });

    // console.log("eventId", eventId);

    console.log(
      "path3",
      admin.firestore().collection("sbEvents").doc(eventId).path,
    );

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

        nextOwner = uidsWithoutUser[0] ? uidsWithoutUser[0] : "";

        // console.log("nextOwner", nextOwner);

        // change userRanks
        for (const teamMemberUID of team.enrolledUserUIDs) {
          if (teamMemberUID !== uid) {
            // console.log("hi");

            console.log(
              "path3",
              admin
                .firestore()
                .collection("sbEvents")
                .doc(gameId)
                .collection("userRanks")
                .doc(`rank-${teamMemberUID}`).path,
            );
            // change user rank
            batch.update(
              admin
                .firestore()
                .collection("sbEvents")
                .doc(gameId)
                .collection("userRanks")
                .doc(`rank-${teamMemberUID}`),
              {
                coachCommunityId: nextOwner ? nextOwner : "",
              },
            );
          }
        }
      }

      // console.log("eventId", eventId);

      console.log(
        "path4",
        admin.firestore().collection("sbEvents").doc(eventId).path,
      );

      // new owner
      batch.update(admin.firestore().collection("sbEvents").doc(eventId), {
        ownerUID: nextOwner ? nextOwner : "",
      });

      // console.log("hhh iiii");

      // change coach
      const coachRank = await getCoachRank(gameId, uid);

      // console.log("hhh iiii  rffddfd");

      const newOwner = await getUserById(nextOwner ? nextOwner : "");
      // console.log("hi here", newOwner);

      if (newOwner) {
        // console.log(`rank-${newOwner.uid}`, `rank-${newOwner.uid}`);

        console.log(
          "path5",
          admin
            .firestore()
            .collection("sbEvents")
            .doc(gameId)
            .collection("coachRanks")
            .doc(`rank-${newOwner.uid}`).path,
        );

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

        const now = Date.now();

        console.log(
          "path6",
          admin.firestore().collection("users").doc(newOwner.uid).path,
        );

        // new tasks
        batch.update(admin.firestore().collection("users").doc(newOwner.uid), {
          // teamCreateMessage: admin.firestore.FieldValue.arrayUnion(eventId), // team create message
          enrolledCommunities: admin.firestore.FieldValue.arrayUnion(
            newOwner.uid,
          ),
          enrolledEventsWithTime: admin.firestore.FieldValue.arrayUnion(
            createEnrolledWithTime(eventId, now),
          ),
          enrolledEvents: admin.firestore.FieldValue.arrayUnion(gameId),
          [`participatingWithObj.${gameId}`]: newOwner.uid,
          [`participatingInGameWithTeam.${gameId}`]: createParticipatingWith(
            eventId,
            newOwner.uid,
            now,
          ),
        });

        console.log(
          "path7",
          admin
            .firestore()
            .collection("sbEvents")
            .doc(gameId)
            .collection("coachRanks")
            .doc(`rank-${uid}`).path,
        );

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
        // console.log("hhehe", gameId, uid);
        console.log(
          "path8",
          admin
            .firestore()
            .collection("sbEvents")
            .doc(gameId)
            .collection("coachRanks")
            .doc(`rank-${uid}`),
        );

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

    console.log(
      "path9",
      admin
        .firestore()
        .collection("sbEvents")
        .doc(gameId)
        .collection("userRanks")
        .doc(`rank-${uid}`).path,
    );

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

    await batch.commit();

    // create new user team
    if (switchUser) {
      await createNewUserTeam(gameId, uid);
    }

    // // change user rank
    // batch.update(
    //   admin
    //     .firestore()
    //     .collection("sbEvents")
    //     .doc(gameId)
    //     .collection("userRanks")
    //     .doc(`rank-${uid}`),
    //   {
    //     coachEventId: "",
    //     coachCommunityId: "",
    //   },
    // );

    // if

    return "success";
  }

  return "failed";
};
