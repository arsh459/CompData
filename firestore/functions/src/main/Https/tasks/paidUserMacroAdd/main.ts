import { getPaidUsers } from "../../export/paidUsers";

export const paidUserMainAdd = async () => {
  const { paidUsers } = await getPaidUsers();

  for (const paidUser of paidUsers) {
    console.log("paid user", paidUser);
    // getCurrentWeight
    // calculate initialTDDE
    // calculate workout
    //
    // add field for dob
    // get age
    //
    // add MET value for badge
    // add MET value for workouts
    //
    //
    // INPUT: stepDays && steps target
    // INPUT: Week Weight
    // INPUT: DOB
    // calculate bmr - basis current weight
    // calculate assigned workout KCals -> get workout badgeDays for duration
    // calculate step KCal
    // Expenditure = BMR + KCal
    //
    // INPUT: Weight loss target for week
    // calculate Deficit needed for week
    //
    // calculate weekly KCal target
    //
    // DAILY CALCULATION
    // for each day of week
    // basis day - get expenditure (Workout + Steps)
    //
    // x1 + e1 = T1
    // x2 + e2 = T2
    // x1 + e1 = T1
    // x2 +
    // x3
    //
    //
  }

  return { users: [] };
};
