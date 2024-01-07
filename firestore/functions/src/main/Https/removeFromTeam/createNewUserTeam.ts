import { CoachRank, UserRank } from "../../../models/Activity/Activity";
import {
  getCoachRank,
  getUserRankForUID,
} from "../../../models/Activity/getUtils";
import { getSbEventById } from "../../../models/sbEvent/getUtils";
import { getUserById } from "../../../models/User/Methods";
import {
  copyChallengeForCreator,
  createBaseCoachRank,
  createBaseUserRank,
  saveCopiedChallenge,
} from "./copyChallenge";

export const createNewUserTeam = async (gameId: string, uid: string) => {
  const game = await getSbEventById(gameId);
  const user = await getUserById(uid);

  if (game && user) {
    const teamName = `${
      user.name ? user.name : user.userKey ? user.userKey : "Athlete"
    }'s team`;
    const teamKey = uid;

    const newTeam = copyChallengeForCreator(game, uid, "", teamName);

    const previousRank = await getUserRankForUID(gameId, uid);
    let userRank: UserRank | undefined;
    if (previousRank) {
      userRank = {
        ...previousRank,
        coachEventId: newTeam.id,
        coachCommunityId: newTeam.ownerUID,
        teamName,
        teamKey,
      };
    } else {
      userRank = createBaseUserRank(
        uid,
        user.progressV2 ? user.progressV2 : 0,
        teamName,
        teamKey,
        newTeam.id,
        user.userLevelV2 ? user.userLevelV2 : 0,
        uid,
        user.gender ? user.gender : "notSpecified",
        user.name,
        user.profileImage,
      );
    }

    const previousCoachRank = await getCoachRank(gameId, uid);
    let coachRank: CoachRank | undefined;
    if (previousCoachRank) {
      coachRank = {
        ...previousCoachRank,
        coachEventId: newTeam.id,
        teamName,
        teamKey,
      };
    } else {
      coachRank = createBaseCoachRank(
        uid,
        teamName,
        teamKey,
        newTeam.id,
        user.name,
        user.profileImage,
      );
    }

    await saveCopiedChallenge(uid, newTeam, userRank, coachRank);
  }
};
