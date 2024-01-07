import {
  DietForm,
  UserInterface,
  doctorForm,
  pcosSymptoms,
} from "@models/User/User";
import { getGameNameReadable } from "@templates/TaskTemplate/utils";

const isTestUser = (phone?: string, role?: string | undefined) => {
  if (
    phone === "+911111111111" ||
    phone === "+912222222222" ||
    phone === "+913333333333" ||
    phone === "+914444444444" ||
    phone === "+915555555555" ||
    phone === "+916666666666" ||
    phone === "+917777777777" ||
    phone === "+918888888888" ||
    phone === "+919999999999" ||
    phone === "+911234567890"
  ) {
    return "YES";
  }

  if (role === "admin") {
    return "YES";
  }

  return "";
};

const createPCOSSymptomMap = (symptoms?: pcosSymptoms[]) => {
  if (symptoms && symptoms.length) {
    const map: { [symptom: string]: boolean } = {};
    for (const symptom of symptoms) {
      map[symptom] = true;
    }

    return {
      symptomFlags: map,
      symptomsPresent: true,
    };
  }

  return {
    symptomFlags: {},
    symptomsPresent: false,
  };
};

export const createUserToLog = (
  user: UserInterface
): { [key: string]: string | number | boolean } => {
  let participatingGames = "";
  if (user.participatingInGameWithTeam) {
    const participatingObj = Object.keys(user.participatingInGameWithTeam);
    const participatingObjNames = participatingObj.map((item) =>
      getGameNameReadable(item)
    );
    participatingGames = participatingObjNames.join(",");
  }

  let goalText = "";
  if (user.fitnessGoal) {
    goalText = user.fitnessGoal.join(",");
  }

  const { symptomFlags, symptomsPresent } = createPCOSSymptomMap(
    user.pcosSymptoms
  );

  const dietFormMap = createDietFormMixpanel(user.dietForm);
  const docFormMap = createDoctorFormMixpanel(user.doctorForm);
  const leadgenFormMap = createLeadFormMixpanel(user);

  return {
    onboarded: user.onboarded ? true : false,
    user_id: user.uid,
    symptomsPresent,
    ...(user.leadFormFlags?.seen ? { leadgenSeen: true } : {}),
    ...(user.leadFormFlags?.completed ? { leadgenCompleted: true } : {}),
    ...symptomFlags,
    ...dietFormMap,
    ...docFormMap,
    ...leadgenFormMap,
    ...(user.waMessageStatus ? user.waMessageStatus : {}),
    ...(user.cycleLength ? { approxCycleLength: user.cycleLength } : {}),
    ...(user.diagnosedPeriod ? { diagnosedPeriod: user.diagnosedPeriod } : {}),
    ...(user.periodTrackerObj
      ? {
          inputCycleLength: user.periodTrackerObj.inputCycleLength
            ? user.periodTrackerObj.inputCycleLength
            : -1,
        }
      : {}),
    ...(user.periodTrackerObj
      ? {
          inputPeriodLength: user.periodTrackerObj.inputPeriodLength
            ? user.periodTrackerObj.inputPeriodLength
            : -1,
        }
      : {}),
    ...(user.name ? { first_name: user.name } : {}),
    ...(user.email ? { email: user.email } : {}),
    ...(user.phone ? { phone: user.phone } : {}),
    ...(isTestUser(user.phone, user.role) ? { testUser: true } : {}),
    ...(user.unsubscribe
      ? {
          email_opt_in: false,
          sms_opt_in: false,
          whatsapp_opt_in: false,
        }
      : {
          email_opt_in: true,
          sms_opt_in: true,
          whatsapp_opt_in: true,
        }),
    ...(user.userLevelV2 ? { level: user.userLevelV2 } : { level: 0 }),
    ...(user.progressV2
      ? { level_progress: user.progressV2 }
      : { level_progress: 0 }),
    ...(user.fpCredit ? { fp_credit: user.fpCredit } : { fp_credit: 0 }),
    ...(user.fpDebit ? { fp_debit: user.fpDebit } : { fp_debit: 0 }),
    ...(user.height ? { height: user.height } : {}),
    ...(user.weight ? { weight: user.weight } : {}),
    ...(user.desiredWeight ? { desired_weight: user.desiredWeight } : {}),
    ...(user.gender ? { gender: user.gender } : {}),
    ...(user.dailyFPTarget ? { daily_fp_target: user.dailyFPTarget } : {}),
    ...(user.workoutFrequency
      ? { workoutFrequency: user.workoutFrequency }
      : {}),
    ...(user.repsCount ? { reps_test: user.repsCount } : {}),
    ...(user.paceOfAchievementInMonth
      ? { pace_in_months: user.paceOfAchievementInMonth }
      : {}),
    ...(user.sleepQuality ? { sleepQuality: user.sleepQuality } : {}),
    ...(user.difficulty ? { difficulty: user.difficulty } : {}),
    ...(participatingGames ? { games: participatingGames } : {}),
    ...(goalText ? { fitnessGoal: goalText } : {}),
    ...(user.onboardingCallStatus
      ? { onboarding_call_status: user.onboardingCallStatus }
      : {}),
  };
};

const createLeadFormMixpanel = (user?: UserInterface) => {
  const map: { [key: string]: string | boolean } = {};
  if (user?.dailyHealthIssues) {
    for (const issue of Object.keys(user.dailyHealthIssues)) {
      // @ts-ignore
      if (user.dailyHealthIssues[issue]) {
        map[`issue_${issue}`] = true;
      }
    }
  }

  if (user?.pastUsedMethod) {
    for (const issue of Object.keys(user.pastUsedMethod)) {
      // @ts-ignore
      if (user.pastUsedMethod[issue]) {
        map[`pastUsed_${issue}`] = true;
      }
    }
  }

  if (user?.howBusy) {
    for (const issue of Object.keys(user.howBusy)) {
      // @ts-ignore
      if (user.howBusy[issue]) {
        map[`busyState_${issue}`] = true;
      }
    }
  }

  if (user?.accurateGoal) {
    for (const issue of Object.keys(user.accurateGoal)) {
      // @ts-ignore
      if (user.accurateGoal[issue]) {
        map[`leadgenGoal_${issue}`] = true;
      }
    }
  }

  return {
    ...(typeof user?.isOkWithPaidPlan === "boolean"
      ? { isOkWithPaidPlan: user.isOkWithPaidPlan }
      : {}),
    ...map,
  };
};

const createDoctorFormMixpanel = (docForm?: doctorForm) => {
  const map: { [key: string]: string | boolean } = {};
  if (docForm) {
    if (docForm.pregnantHistory) {
      map["pregnantHistory"] = docForm.pregnantHistory;
    }

    if (docForm.sexuallyActive) {
      map["sexuallyActive"] = docForm.sexuallyActive;
    }

    if (docForm.surgicalHistory) {
      map["surgicalHistory"] = docForm.surgicalHistory;
    }

    return map;
  }

  return {};
};

const createDietFormMixpanel = (dietForm?: DietForm) => {
  const map: { [key: string]: number | boolean } = {};
  if (dietForm) {
    if (dietForm.familyHistory?.Diabetes) {
      map["Diabetes"] = true;
    }

    if (dietForm.familyHistory?.Cholesterol) {
      map["Cholesterol"] = true;
    }

    if (dietForm.familyHistory?.BloodPressure) {
      map["BloodPressure"] = true;
    }

    if (dietForm.workingHour) {
      map["workingHour"] = dietForm.workingHour;
    }

    if (dietForm.medication?.Vitamins) {
      map["medication_vitamins"] = dietForm.medication?.Vitamins;
    }
    if (dietForm.medication?.Minerals) {
      map["medication_minerals"] = dietForm.medication?.Minerals;
    }
    if (dietForm.medication?.Nutritional) {
      map["medication_nutritional"] = dietForm.medication?.Nutritional;
    }
    if (dietForm.medication?.Protein) {
      map["medication_proteins"] = dietForm.medication?.Protein;
    }

    if (dietForm.waterIntakeDaily) {
      map["waterIntakeDaily"] = dietForm.waterIntakeDaily;
    }

    if (dietForm.outsideFoodInWeek) {
      map["outsideFoodInWeek"] = dietForm.outsideFoodInWeek;
    }

    if (dietForm.exerciseDayInWeek) {
      map["exerciseDayInWeek"] = dietForm.exerciseDayInWeek;
    }

    if (dietForm.addiction?.Alcohol) {
      map["alcohol"] = dietForm.addiction?.Alcohol;
    }

    if (dietForm.addiction?.Smoking) {
      map["smoking"] = dietForm.addiction?.Smoking;
    }

    if (dietForm.dailyIssues?.Anxiety) {
      map["issues_anxiety"] = dietForm.dailyIssues?.Anxiety;
    }
    if (dietForm.dailyIssues?.Depression) {
      map["issues_depression"] = dietForm.dailyIssues?.Depression;
    }
    if (dietForm.dailyIssues?.Gastric) {
      map["issues_gastric"] = dietForm.dailyIssues?.Gastric;
    }
    if (dietForm.dailyIssues?.Insomnia) {
      map["issues_insomia"] = dietForm.dailyIssues?.Insomnia;
    }
    if (dietForm.dailyIssues?.Stress) {
      map["issues_stress"] = dietForm.dailyIssues?.Stress;
    }

    if (dietForm.dietPreference) {
      for (const dietKey of Object.keys(dietForm.dietPreference)) {
        // @ts-ignore
        if (dietForm.dietPreference[dietKey]) {
          map[`diet_${dietKey}`] = true;
        }
      }
    }

    if (dietForm.cuisinePreference) {
      for (const dietKey of Object.keys(dietForm.cuisinePreference)) {
        // @ts-ignore
        if (dietForm.cuisinePreference[dietKey]) {
          map[`cuisine_${dietKey}`] = true;
        }
      }
    }

    if (dietForm.allergies) {
      for (const dietKey of Object.keys(dietForm.allergies)) {
        // @ts-ignore
        if (dietForm.allergies[dietKey]) {
          map[`allergy_${dietKey}`] = true;
        }
      }
    }

    if (dietForm.uploadedReports?.length) {
      map[`uploadedReports`] = true;
    }

    return map;
  }

  return {};
};

export const createUserToLog_string = (user: UserInterface) => {
  let participatingGames = "";
  if (user.participatingInGameWithTeam) {
    const participatingObj = Object.keys(user.participatingInGameWithTeam);
    const participatingObjNames = participatingObj.map((item) =>
      getGameNameReadable(item)
    );
    participatingGames = participatingObjNames.join(",");
  }

  let goalText = "";
  if (user.fitnessGoal) {
    goalText = user.fitnessGoal.join(",");
  }

  return {
    onboarded: user.onboarded ? "YES" : "NO",
    user_id: user.uid,
    ...(user.name ? { first_name: user.name } : {}),
    ...(user.email ? { email: user.email } : {}),
    ...(user.phone ? { phone: user.phone } : {}),
    ...(isTestUser(user.phone, user.role) ? { testUser: "YES" } : {}),
    ...(user.unsubscribe
      ? {
          email_opt_in: "FALSE",
          sms_opt_in: "FALSE",
          whatsapp_opt_in: "FALSE",
        }
      : {
          email_opt_in: "TRUE",
          sms_opt_in: "TRUE",
          whatsapp_opt_in: "TRUE",
        }),
    ...(user.userLevelV2 ? { level: `${user.userLevelV2}` } : { level: "0" }),
    ...(user.progressV2
      ? { level_progress: `${user.progressV2}` }
      : { level_progress: "0" }),
    ...(user.fpCredit ? { fp_credit: `${user.fpCredit}` } : { fp_credit: "0" }),
    ...(user.fpDebit ? { fp_debit: `${user.fpDebit}` } : { fp_debit: "0" }),
    ...(user.height ? { height: `${user.height}` } : {}),
    ...(user.weight ? { weight: `${user.weight}` } : {}),
    ...(user.desiredWeight ? { desired_weight: `${user.desiredWeight}` } : {}),
    ...(user.gender ? { gender: `${user.gender}` } : {}),
    ...(user.dailyFPTarget ? { daily_fp_target: `${user.dailyFPTarget}` } : {}),
    ...(user.repsCount ? { reps_test: `${user.repsCount}` } : {}),
    ...(user.paceOfAchievementInMonth
      ? { pace_in_months: `${user.paceOfAchievementInMonth}` }
      : {}),
    ...(user.difficulty ? { difficulty: `${user.difficulty}` } : {}),
    ...(participatingGames ? { games: participatingGames } : {}),
    ...(goalText ? { fitnessGoal: goalText } : {}),
    ...(user.onboardingCallStatus
      ? { onboarding_call_status: user.onboardingCallStatus }
      : {}),
  };
};
