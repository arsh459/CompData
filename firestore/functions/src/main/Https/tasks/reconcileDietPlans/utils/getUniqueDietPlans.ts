import { getUsersWithDietPlan } from "../../../export/paidUsers";

export const getUniqueDietPlanIds = async () => {
  const usersWithDiet = await getUsersWithDietPlan();

  const uniqueBadgeIds: { [id: string]: boolean } = {};

  let i: number = 0;
  for (const userWithDiet of usersWithDiet) {
    console.log(
      i,
      " | ",
      userWithDiet.uid,
      " | ",
      userWithDiet.nutritionBadgeId,
      " | ",
      userWithDiet.name,
    );

    const badgeId = userWithDiet?.nutritionBadgeId;
    if (badgeId && !uniqueBadgeIds[badgeId]) {
      uniqueBadgeIds[badgeId] = true;
    }

    i++;
  }

  return Object.keys(uniqueBadgeIds).sort((a, b) => a.localeCompare(b));
};
