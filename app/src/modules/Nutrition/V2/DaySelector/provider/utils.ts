import { BadgeConfig } from "@models/User/User";

// export const getStartTime = (
//   start?: number,
//   nutritionStart?: number,
//   badgeConfig?: { [badgeId: string]: BadgeConfig },
//   badgeId?: string,
//   type?: "workout" | "nutrition"
// ) => {
//   if (badgeConfig && badgeId) {
//     if (badgeConfig[badgeId] && badgeConfig[badgeId].start) {
//       return badgeConfig[badgeId].start;
//     }

//     if (type === "nutrition" && nutritionStart) {
//       return nutritionStart;
//     }

//     if (start) {
//       return start;
//     }
//   }

//   return undefined;
// };

export const getStartTime = (
  badgeConfig?: { [badgeId: string]: BadgeConfig },
  badgeId?: string,
  type?: "workout" | "nutrition",
  workoutStart?: number,
  nutritionStart?: number
) => {
  if (
    badgeConfig &&
    badgeId &&
    badgeConfig[badgeId] &&
    badgeConfig[badgeId].start
  ) {
    return badgeConfig[badgeId].start;
  }

  if (type === "nutrition" && nutritionStart) {
    return nutritionStart;
  }

  if (type === "workout" && workoutStart) {
    return workoutStart;
  }

  return undefined;

  // if (user && badgeId) {
  //   if (
  //     user.recommendationConfig?.badgeConfig &&
  //     user.recommendationConfig.badgeConfig[badgeId] &&
  //     user.recommendationConfig.badgeConfig[badgeId].start
  //   ) {
  //     return user.recommendationConfig.badgeConfig[badgeId].start;
  //   }

  //   if (
  //     type === "nutrition" &&
  //     user.recommendationConfig &&
  //     user.recommendationConfig.nutritionStart
  //   ) {
  //     return user.recommendationConfig.nutritionStart;
  //   }

  //   if (
  //     user.recommendationConfig &&
  //     user.recommendationConfig.start &&
  //     user.badgeId === badgeId
  //   ) {
  //     return user.recommendationConfig.start;
  //   }
  // }

  // return undefined;
};
