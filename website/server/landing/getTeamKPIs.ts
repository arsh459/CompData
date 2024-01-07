import { CoachRank } from "@models/Activities/Activity";
import { EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/LeaderBoard/Leaderboard";
import { AWSMedia, CloudinaryMedia } from "@models/Media/cloudinaryUpload";

export interface TeamKPI {
  wins: number;
  teamWins: number;
  totalCalories: number;
  totalFitPoints: number;
  level: number;
  progress: number;
  media: (CloudinaryMedia | AWSMedia)[];
}

export const getTeamKPI = async (
  db: FirebaseFirestore.Firestore,
  event: EventInterface
): Promise<TeamKPI> => {
  const FAT_BURNER_GAME = "637e269f-9fee-4590-8489-23efcb81fb8c";
  const CHALLENGE_ONE = "f220bbb1-a8a1-4c29-83ef-21bc0b1b123a";
  const WFH_CHALLENGE = "00ec36a1-6eac-4924-a0eb-c40bbe7c409b";
  const FAT_BURNER_CHALLENGE = "c0897a45-bf7f-4a93-99df-ae3dd612924d";

  const owner = event.ownerUID;

  const ownerLeaderFirestore = await db
    .collection("leaderBoard")
    .doc(`leader-${owner}`)
    .get();

  const remoteOwner = ownerLeaderFirestore.data() as LeaderBoard;

  const [coachRank1, coachRank2, coachRank3, coachRank4] = await Promise.all([
    db
      .collection("sbEvents")
      .doc(CHALLENGE_ONE)
      .collection("coachRanks")
      .doc(`rank-${owner}`)
      .get(),
    db
      .collection("sbEvents")
      .doc(WFH_CHALLENGE)
      .collection("coachRanks")
      .doc(`rank-${owner}`)
      .get(),
    db
      .collection("sbEvents")
      .doc(FAT_BURNER_CHALLENGE)
      .collection("coachRanks")
      .doc(`rank-${owner}`)
      .get(),
    db
      .collection("sbEvents")
      .doc(FAT_BURNER_GAME)
      .collection("coachRanks")
      .doc(`rank-${owner}`)
      .get(),
  ]);

  const cr1 = coachRank1.data() as CoachRank | undefined;
  const cr2 = coachRank2.data() as CoachRank | undefined;
  const cr3 = coachRank3.data() as CoachRank | undefined;
  const cr4 = coachRank4.data() as CoachRank | undefined;

  const totalCalories =
    (cr1?.totalCalories ? cr1.totalCalories : 0) +
    (cr2?.totalCalories ? cr2.totalCalories : 0) +
    (cr3?.totalCalories ? cr3.totalCalories : 0) +
    (cr4?.totalCalories ? cr4.totalCalories : 0);

  return {
    wins: remoteOwner.wins ? remoteOwner.wins : 0,
    teamWins: remoteOwner.teamWins ? remoteOwner.teamWins : 0,
    totalCalories: totalCalories,
    totalFitPoints: Math.round(totalCalories / 300),
    level: remoteOwner.userLevelV2 ? remoteOwner.userLevelV2 : 0,
    progress: remoteOwner.progressV2 ? remoteOwner.progressV2 : 0,
    media: remoteOwner.profileImage ? [remoteOwner.profileImage] : [],
  };
};
