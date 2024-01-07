import { getPaidUsers } from "../../export/paidUsers";

export const paidUserFactMain = async () => {
  const { paidUsers } = await getPaidUsers();

  let i: number = 0;
  for (const paidUser of paidUsers) {
    console.log(
      `${i} | ${paidUser.uid} | ${paidUser.name} | ${paidUser.phone} | ${
        paidUser.email
      } | ${paidUser.weight} | ${paidUser.age} | ${paidUser.height} | ${
        paidUser.desiredWeight
      } | ${paidUser.workoutFrequency} | ${paidUser.workoutStyle} | ${
        paidUser.sleepQuality
      } | ${paidUser.diagnosedPeriod} | ${paidUser.pcosSymptoms?.join(",")} | ${
        paidUser.badgeId
      } | ${paidUser.recommendationConfig?.workoutDays?.join(",")} | ${
        paidUser.recommendationConfig?.workoutDays?.length
      } | ${paidUser.nutritionBadgeId}`,
    );

    i++;
  }

  return {
    users: paidUsers,
  };
};
