import {
  Activity,
  //   engineChoice,
  UserRank,
} from "../../../../models/Activity/Activity";
import { UserInterface } from "../../../../models/User/User";
import { calorieBasedEngine } from "./calorieBased";

export const handleEngineChoice = async (
  activity: Activity,
  author: UserInterface,
  userRankObj: UserRank | undefined,
  userRanks: UserRank[],
  //   engine: engineChoice,
  after: number,
  before: number,
  th: number,
  challengeLength: number,
  streakLength: number,
  eventId: string,
  coachEventId: string,
  communityId: string,
  coachCohortId: string,
) => {
  return await calorieBasedEngine(
    activity,
    author,
    userRankObj,
    userRanks,
    after,
    before,
    th,
    challengeLength,
    streakLength,
    eventId,
    coachEventId,
    communityId,
    coachCohortId,
  );
};
