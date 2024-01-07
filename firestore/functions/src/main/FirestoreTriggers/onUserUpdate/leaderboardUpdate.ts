import { UserInterface } from "../../../models/User/User";
import { setOne } from "../../../utils/firestore/fetchOne";

export const updateUserLedgerEntry = async (
  userNow: UserInterface,
  inviteURL: string | undefined,
) => {
  if (userNow.uid) {
    const updatedUser = await createUpdatedLeaderUser(userNow, inviteURL);

    // there is something to update
    if (Object.keys(updatedUser).length > 1) {
      await setOne("leaderBoard", `leader-${userNow.uid}`, updatedUser, true);
    }
  }
};

export const createUpdatedLeaderUser = async (
  userNow: UserInterface,
  inviteURL: string | undefined,
) => {
  return {
    uid: userNow.uid,
    ...(userNow.imageURI ? { imageURI: userNow.imageURI } : {}),
    ...(userNow.name ? { name: userNow.name } : {}),
    ...(userNow.tagline ? { tagline: userNow.tagline } : {}),
    ...(typeof userNow.verified === "boolean"
      ? { verified: userNow.verified }
      : {}),
    ...(userNow.bio ? { bio: userNow.bio } : {}),
    ...(userNow.knownFor ? { knownFor: userNow.knownFor } : {}),
    ...(userNow.expertIn ? { expertIn: userNow.expertIn } : {}),
    ...(typeof userNow.allFollowers === "number"
      ? { allFollowers: userNow.allFollowers }
      : {}),
    ...(inviteURL ? { inviteURL: inviteURL } : {}),
    ...(userNow.coverImages ? { coverImages: userNow.coverImages } : {}),
    ...(userNow.instagramHandle
      ? { instagramHandle: userNow.instagramHandle }
      : {}),
    ...(userNow.coverMedia ? { coverMedia: userNow.coverMedia } : {}),
    ...(userNow.coverCloudinary
      ? { coverCloudinary: userNow.coverCloudinary }
      : {}),
    ...(typeof userNow.userKey === "string"
      ? { userKey: userNow.userKey }
      : {}),
    ...(userNow.profileImage
      ? { profileImage: userNow.profileImage }
      : { profileImage: null }),
    ...(typeof userNow.facebookProfile === "string"
      ? { facebookProfile: userNow.facebookProfile }
      : {}),
    ...(typeof userNow.youtubeLink === "string"
      ? { youtubeLink: userNow.youtubeLink }
      : {}),
    ...(typeof userNow.externalLink === "string"
      ? { externalLink: userNow.externalLink }
      : {}),
    ...(typeof userNow.instagramLink === "string"
      ? { instagramLink: userNow.instagramLink }
      : {}),
    ...(typeof userNow.linkedInLink === "string"
      ? { linkedInLink: userNow.linkedInLink }
      : {}),
    ...(userNow.socialBoat ? { socialBoat: true } : {}),
    ...(userNow.sbStudents ? { sbStudents: userNow.sbStudents } : {}),
    ...(userNow.sbEvents ? { sbEvents: userNow.sbEvents } : {}),
    ...(userNow.favIcon ? { favIcon: userNow.favIcon } : { favIcon: "" }),
    ...(userNow.favIconImg
      ? { favIconImg: userNow.favIconImg }
      : { favIconImg: null }),

    ...(userNow.enrolledCohorts
      ? { enrolledCohorts: userNow.enrolledCohorts }
      : { enrolledCohorts: [] }),
    ...(userNow.enrolledCommunities
      ? { enrolledCommunities: userNow.enrolledCommunities }
      : { enrolledCommunities: [] }),
    ...(userNow.enrolledEvents
      ? { enrolledEvents: userNow.enrolledEvents }
      : { enrolledEvents: [] }),

    ...(userNow.height ? { height: userNow.height } : { height: 0 }),
    ...(userNow.weight ? { weight: userNow.weight } : { weight: 0 }),
    ...(userNow.gender
      ? { gender: userNow.gender }
      : { gender: "notSpecified" }),
    ...(userNow.age ? { age: userNow.age } : { age: 0 }),
    ...(userNow.fitnessGoals
      ? { fitnessGoals: userNow.fitnessGoals }
      : { fitnessGoals: {} }),
    ...(userNow.fitnessGoalText
      ? { fitnessGoalText: userNow.fitnessGoalText }
      : { fitnessGoalText: "" }),
    ...(userNow.terraUser
      ? { terraUser: userNow.terraUser }
      : { terraUser: "" }),
    ...(userNow.phone ? { phone: userNow.phone } : { phone: "" }),

    ...(userNow.totalCalories
      ? { totalCalories: userNow.totalCalories }
      : { totalCalories: 0 }),
    ...(userNow.numActivities
      ? { numActivities: userNow.numActivities }
      : { numActivities: 0 }),
    ...(userNow.regularityScore
      ? { regularityScore: userNow.regularityScore }
      : { regularityScore: 0 }),
    ...(userNow.userLevel
      ? { userLevel: userNow.userLevel }
      : { userLevel: "rookie" }),
    ...(userNow.progress ? { progress: userNow.progress } : { progress: -1 }),

    ...(userNow.userLevelV2
      ? { userLevelV2: userNow.userLevelV2 }
      : { userLevelV2: 0 }),
    ...(userNow.progressV2
      ? { progressV2: userNow.progressV2 }
      : { progressV2: 0 }),
    ...(userNow.totalFitPointsV2
      ? { totalFitPointsV2: userNow.totalFitPointsV2 }
      : { totalFitPointsV2: 0 }),
    ...(typeof userNow.testimonial === "string"
      ? { testimonial: userNow.testimonial }
      : { testimonial: "" }),
    ...(userNow.wins ? { wins: userNow.wins } : { wins: 0 }),
    ...(userNow.teamWins ? { teamWins: userNow.teamWins } : { teamWins: 0 }),
  };
};
