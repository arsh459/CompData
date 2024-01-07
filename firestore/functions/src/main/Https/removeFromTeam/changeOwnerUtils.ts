import { sbEventInterface } from "../../../models/sbEvent/sbEvent";
import * as admin from "firebase-admin";
import { getCoachRank } from "../../../models/Activity/getUtils";
import { getUserById } from "../../../models/User/Methods";
import { createParticipatingWith } from "../../../models/User/createUtils";

export const changeOwnerMain = async (
  gameId: string,
  oldTeam: sbEventInterface,
  uid: string,
) => {
  const batch = admin.firestore().batch();
  const newOwner = getNextOwner(oldTeam, uid);
  if (newOwner) {
    await updateCurrentMembersCommunity(
      batch,
      oldTeam,
      gameId,
      newOwner,
      oldTeam.ownerUID,
    );
    updateTeamOwner(batch, oldTeam.id, newOwner, oldTeam.ownerUID);
    await changeCoachRank(batch, gameId, newOwner, uid, oldTeam.id);
  } else {
    orphanPerviousTeam(batch, gameId, uid);
  }

  await batch.commit();
};

const getNextOwner = (team: sbEventInterface, uid: string) => {
  if (team.enrolledUserUIDs) {
    const uidsWithoutUser = team.enrolledUserUIDs.filter(
      (item) => item !== uid,
    );

    if (uidsWithoutUser.length) {
      return uidsWithoutUser[0];
    }
  }

  return "";
};

const updateCurrentMembersCommunity = async (
  batch: FirebaseFirestore.WriteBatch,
  team: sbEventInterface,
  gameId: string,
  newOwner: string,
  oldOwner: string,
) => {
  if (team.enrolledUserUIDs)
    for (const teamMemberUID of team.enrolledUserUIDs) {
      if (teamMemberUID !== oldOwner) {
        batch.update(
          admin
            .firestore()
            .collection("sbEvents")
            .doc(gameId)
            .collection("userRanks")
            .doc(`rank-${teamMemberUID}`),
          {
            coachCommunityId: newOwner,
          },
        );

        const teamUser = await getUserById(teamMemberUID);
        const prevPartWith =
          teamUser?.participatingInGameWithTeam &&
          teamUser?.participatingInGameWithTeam[gameId];

        // update other members owners
        batch.update(admin.firestore().collection("users").doc(teamMemberUID), {
          enrolledCommunities: admin.firestore.FieldValue.arrayUnion(newOwner),
          [`participatingWithObj.${gameId}`]: newOwner,
          [`participatingInGameWithTeam.${gameId}`]: createParticipatingWith(
            team.id,
            newOwner,
            prevPartWith?.enrolledTime ? prevPartWith.enrolledTime : Date.now(),
          ),
          // if owner add 2 extra fields
          ...(teamMemberUID === newOwner
            ? {
                teamCreateMessage: admin.firestore.FieldValue.arrayUnion(
                  team.id,
                ),
                enrolledEvents: admin.firestore.FieldValue.arrayUnion(gameId),
              }
            : {}),
        });
      }
    }
};

const updateTeamOwner = (
  batch: FirebaseFirestore.WriteBatch,
  teamId: string,
  newOwner: string,
  oldOnwer: string,
) => {
  // new owner
  batch.update(admin.firestore().collection("sbEvents").doc(teamId), {
    ownerUID: newOwner,
    enrolledUserUIDs: admin.firestore.FieldValue.arrayRemove(oldOnwer),
  });
};

const changeCoachRank = async (
  batch: FirebaseFirestore.WriteBatch,
  gameId: string,
  newOwner: string,
  oldOwner: string,
  teamId: string,
) => {
  const oldCoach = await getCoachRank(gameId, oldOwner);
  const newOwnerObj = await getUserById(newOwner);
  if (newOwnerObj) {
    batch.set(
      admin
        .firestore()
        .collection("sbEvents")
        .doc(gameId)
        .collection("coachRanks")
        .doc(`rank-${newOwnerObj.uid}`),
      {
        ...oldCoach,
        authorName: newOwnerObj.name ? newOwnerObj.name : "",
        authorImg: newOwnerObj.profileImage ? newOwnerObj.profileImage : null,
        uid: newOwnerObj.uid,
        updatedOn: Date.now(),
      },
    );

    // delete previous user team rank
    batch.delete(
      admin
        .firestore()
        .collection("sbEvents")
        .doc(gameId)
        .collection("coachRanks")
        .doc(`rank-${oldOwner}`),
    );
  }
};

const orphanPerviousTeam = (
  batch: FirebaseFirestore.WriteBatch,
  gameId: string,
  oldOwner: string,
) => {
  // delete coach
  batch.delete(
    admin
      .firestore()
      .collection("sbEvents")
      .doc(gameId)
      .collection("coachRanks")
      .doc(`rank-${oldOwner}`),
  );

  // delete user
  batch.delete(
    admin
      .firestore()
      .collection("sbEvents")
      .doc(gameId)
      .collection("userRanks")
      .doc(`rank-${oldOwner}`),
  );
};
