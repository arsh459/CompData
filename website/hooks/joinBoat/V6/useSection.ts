import { weEventTrack } from "@analytics/webengage/user/userLog";
import { db } from "@config/firebase";
import { getQueryParamsForJoinBoatV6 } from "@hooks/drawer/utils";
import {
  cycleLengthTyps,
  CycleRegularityTypes,
  diagnosedPeriodType,
  fitnessGoalTypes,
  genderType,
  pcosSymptoms,
  UserInterface,
  workoutFrequencyTypes,
  workoutStyleTypes,
} from "@models/User/User";
import {
  getEstimatedDesiredWeight,
  getIntialHeight,
  getWeightForHeight,
} from "@templates/joinBoatTemplate/V5/Components/utils";
import { deleteField, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LocalUser } from "./interface";
import {
  createDailyEnergyObj,
  createDailyMoodObj,
  createDailySleepObj,
  createDailyWeightObj,
} from "@models/User/dailyUtils";
import { symptomId } from "@models/User/symptom";
import { saveDailyProgress } from "@modules/ProgressModule/utils/progressUtils";
import { OnSaveBodyTypeProps } from "@templates/joinBoatTemplate/V6/SetBodyType/SelectBodyTypeWithJoinBoatWrapper";

export type sectionTypes =
  | "loading"
  | "welcome"
  | "name"
  | "email"
  | "gender"
  | "fitnessGoal"
  | "pcos_pcod"
  | "age"
  | "height"
  | "weight"
  | "desiredWeight"
  | "cycleRegularity"
  | "markLastPeriod"
  | "markBeforeLastPeriod"
  | "cycleLengthAverage"
  | "irregulerCycle"
  | "lastPeriodLength"
  | "sleepQuality"
  | "mood"
  | "energy"
  | "workoutFrequency"
  | "workoutStyle"
  | "pcosSymptoms"
  | "symptomsDuringPeriod"
  | "symptomsBeforePeriod"
  | "currentBodyType"
  | "desiredBodyType"
  | "scanning"
  | "transformation"
  | "achievementPath"
  | "auth"
  | "paySuccess"
  | "consultationtime"
  | "slotConfirmation"
  | "download";

export interface boatParamQueryV6 {
  section?: sectionTypes;
  coach?: string; // to attribute to coach
  teamId?: string; // to add a user to team
  origin?: string; // origin which user comming from
  planType?: "pro" | "proPlus";
  challenge?: "true";
  // id?: string;
}

export type boatParamQueryKeysV6 = "section" | "coach" | "teamId" | "origin";

export const useStartSection = (
  localUser?: LocalUser,
  user?: UserInterface
) => {
  const router = useRouter();
  const q = router.query as boatParamQueryV6;
  const [section, setSection] = useState<sectionTypes>("loading");
  const [durationInDays, setDurationInDays] = useState<number>();

  // useEffect(() => {

  // }, [q, router]);
  // console.log("hi");

  // const [initCheck, setInitCheck] = useState<boolean>(false);

  useEffect(() => {
    if (router.isReady && !q.section) {
      if (q.challenge && !user?.uid) {
        return;
      }

      if (user?.onboarded && q.challenge) {
        q.section = "download";
      } else {
        q.section = "welcome";
      }

      router.replace(getQueryParamsForJoinBoatV6(q), undefined, {
        shallow: true,
      });
      // setInitCheck(true);
    } else if (router.isReady && q.section) {
      setSection(q.section);
      // setInitCheck(true);
    }
  }, [q, router, user?.onboarded, user?.uid]);

  const gotoSection = (sec: sectionTypes, replace?: boolean) => {
    if (sec === "download" && q.origin === "myProgram") {
      router.push("myProgram");
      return;
    }
    q.section = sec;
    if (replace) {
      router.replace(getQueryParamsForJoinBoatV6(q), undefined, {
        shallow: true,
      });
    } else {
      router.push(getQueryParamsForJoinBoatV6(q), undefined, { shallow: true });
    }
  };

  const gotoPlans = () => {
    router.push(
      `/plans?type=${q.planType ? q.planType : "pro"}&source=joinboat`
    );
  };

  const onNameSave = async (name?: string) => {
    if (user?.uid && name) {
      weEventTrack("fScanName_clickNext", {});
      await updateDoc(doc(db, "users", user.uid), {
        name: name,
        gender: "female",
      });

      gotoSection("email");
    }
  };

  const onEmailSave = async (email?: string) => {
    if (user?.uid && email) {
      weEventTrack("fScanEmail_clickNext", {});
      await updateDoc(doc(db, "users", user.uid), {
        email: email,
      });

      gotoSection("fitnessGoal");
    }
  };

  // gender update
  const onGenderSave = async (gender?: genderType) => {
    if (user?.uid && gender) {
      weEventTrack("fScanGender_clickNext", {});
      // gender basis height update.
      const height = user?.height
        ? user.height
        : getIntialHeight(user.height, gender);

      await updateDoc(doc(db, "users", user.uid), {
        gender,
        height,
      });

      gotoSection("fitnessGoal");
    }
  };

  // goal update
  const onFitnessGoalSave = async (goals?: fitnessGoalTypes[]) => {
    if (user?.uid && goals && goals.length) {
      weEventTrack("fScanGoal_clickNext", {});

      await updateDoc(doc(db, "users", user.uid), {
        fitnessGoal: goals,
        age: user.age || 25,
      });

      gotoSection(goals[0] === "pcos_pcod" ? "pcos_pcod" : "age");
    }
  };

  // goal update
  const onDiagnosedPeriodSave = async (newVal?: diagnosedPeriodType) => {
    if (user?.uid && newVal) {
      weEventTrack("fScanDiagnosedPeriod_clickNext", {});

      await updateDoc(doc(db, "users", user.uid), {
        diagnosedPeriod: newVal,
      });

      gotoSection("age");
    }
  };

  // age update
  const onAgeSave = async (newVal?: number) => {
    if (user?.uid && newVal) {
      weEventTrack("fScanAge_clickNext", {});
      // gender basis height update.
      const height = user?.height
        ? user.height
        : getIntialHeight(user.height, user.gender);

      await updateDoc(doc(db, "users", user.uid), {
        age: newVal,
        height,
      });

      gotoSection("height");
    }
  };

  // height update
  const onHeightSave = async (height?: number) => {
    if (user?.uid && height) {
      weEventTrack("fScanHeight_clickNext", {});
      // height, goal basis weight estimation
      const weight = getWeightForHeight(
        height,
        user.gender ? user.gender : "female",
        user.fitnessGoal
      );

      await updateDoc(doc(db, "users", user.uid), {
        height,
        weight,
      });

      gotoSection("weight");
    }
  };

  // weight update
  const onWeightSave = async (newWeight?: number) => {
    if (user?.uid && newWeight) {
      weEventTrack("fScanCurrentWeight_clickNext", {});
      // set Desired weight
      const newDesiredWeight = getEstimatedDesiredWeight(
        newWeight,
        user.height,
        user.gender
      );
      const cycleLength = user.periodTrackerObj?.inputCycleLength || 28;

      await updateDoc(doc(db, "users", user.uid), {
        weight: newWeight,
        desiredWeight: newDesiredWeight,
        [`periodTrackerObj.inputCycleLength`]: cycleLength,
      });

      // dailyWeight
      const dailyWeight = createDailyWeightObj(newWeight);
      await saveDailyProgress(user.uid, "dailyWeight", dailyWeight);

      const goals = user.fitnessGoal;
      gotoSection(
        goals && goals.length
          ? goals[0] === "keep_fit"
            ? "cycleRegularity"
            : "desiredWeight"
          : "fitnessGoal"
      );
    }
  };

  // desired weight update
  const onDesiredWeightSave = async (desiredWeight?: number) => {
    if (user?.uid && desiredWeight) {
      weEventTrack("fScanDesiredWeight_clickNext", {});

      await updateDoc(doc(db, "users", user.uid), {
        desiredWeight,
      });

      const goals = user.fitnessGoal;
      gotoSection(goals && goals.length ? "cycleRegularity" : "fitnessGoal");
    }
  };

  // Cycle Length update
  const onCycleLengthSave = async (newVal?: cycleLengthTyps) => {
    if (user?.uid && newVal) {
      weEventTrack("fScanCycleLength_clickNext", {});

      await updateDoc(doc(db, "users", user.uid), {
        cycleLength: newVal,
      });

      gotoSection("pcosSymptoms");
    }
  };

  // Pcos Symptoms update
  const onPcosSymptomsSave = async (newVal?: pcosSymptoms[]) => {
    if (user?.uid && newVal && newVal.length) {
      weEventTrack("fScanPcosSymptoms_clickNext", {});

      await updateDoc(doc(db, "users", user.uid), {
        pcosSymptoms: newVal,
      });

      gotoSection("workoutFrequency");
    }
  };

  // Workout Frequency update
  const onWorkoutFrequencySave = async (newVal?: workoutFrequencyTypes) => {
    if (user?.uid && newVal) {
      weEventTrack("fScanWorkoutFrequency_clickNext", {});

      await updateDoc(doc(db, "users", user.uid), {
        workoutFrequency: newVal,
      });

      gotoSection("workoutStyle");
    }
  };

  // user body type update
  const onCurrentBodyTypeSave = async (props: OnSaveBodyTypeProps) => {
    const { newBodyType } = props;
    if (user?.uid && newBodyType) {
      weEventTrack("fScanCurrentBodyType_clickNext", {});
      const isSame = newBodyType === user.currentBodyType;

      !isSame &&
        (await updateDoc(doc(db, "users", user.uid), {
          currentBodyType: newBodyType,
          desiredBodyType: deleteField(),
        }));

      gotoSection("desiredBodyType");
    }
  };

  const onDesiredBodyTypeSave = async (props: OnSaveBodyTypeProps) => {
    const { newBodyType, level, pace } = props;
    if (user?.uid && newBodyType && level && pace) {
      weEventTrack("fScanDesiredBodyType_clickNext", {});

      await updateDoc(doc(db, "users", user.uid), {
        desiredBodyType: newBodyType,
        difficulty: level,
        paceOfAchievementInMonth: pace,
      });

      gotoSection("workoutFrequency");
    }
  };

  const onScanningNext = () => {
    weEventTrack(`fScanFinal_clickNext`, {});
    gotoSection("transformation", true);
  };

  const onAuthSuccess = async (phoneNumber?: string) => {
    weEventTrack(`fScanAuth_onAuthSccess`, {});

    // if phone number -> updatePhone number
    if (user?.uid && phoneNumber) {
      await updateDoc(doc(db, "users", user.uid), {
        phone: phoneNumber,
      });
    }

    // navigate to next screen
    gotoPlans();
  };

  const onSlotBookingSkip = () => {
    weEventTrack("fScanBookConsultation_skipForNow", {});
    gotoSection("download");
  };

  const onSlotBookingNext = () => {
    weEventTrack("fScanConsultationSlot_clickNext", {});
    gotoSection("slotConfirmation");
  };

  const onSlotConfirmationNext = () => {
    weEventTrack("conv_bookSlot", {});
    weEventTrack("fScanSlotBooked_clickNext", {});
    gotoSection("download");
  };

  // last 6 month cycle length average save
  const onCycleLengthAverageSave = async (newVal?: number) => {
    if (user?.uid && newVal) {
      weEventTrack("fScanCycleLengthAverage_clickNext", {});
      const lastPeriodLength = user?.periodTrackerObj?.inputPeriodLength || 5;

      await updateDoc(doc(db, "users", user.uid), {
        ["periodTrackerObj.inputCycleLength"]: newVal,
        ["periodTrackerObj.inputPeriodLength"]: lastPeriodLength,
      });

      gotoSection("lastPeriodLength");
    }
  };

  // last month cycle length save
  const onLastPeriodLengthSave = async (newVal?: number) => {
    if (user?.uid && newVal) {
      weEventTrack("fScanLastPeriodLength_clickNext", {});
      const sleepQuality = user?.sleepQuality || 8;

      await updateDoc(doc(db, "users", user.uid), {
        ["periodTrackerObj.inputPeriodLength"]: newVal,
        sleepQuality,
      });

      gotoSection("sleepQuality");
    }
  };

  // sleep quality save
  const onSleepQulitySave = async (newVal?: number) => {
    if (user?.uid && newVal) {
      weEventTrack("fScanSleepQuality_clickNext", {});

      await updateDoc(doc(db, "users", user.uid), {
        sleepQulity: newVal,
      });

      gotoSection("mood");

      // update sleep in daily values
      const sleepObj = createDailySleepObj(newVal);
      await saveDailyProgress(user.uid, "dailySleep", sleepObj);
    }
  };

  // Cycle Regularity
  const onCycleRegularitySave = async (
    cycleRegularity?: CycleRegularityTypes
  ) => {
    if (user?.uid && cycleRegularity) {
      weEventTrack("fScanCycleRegularity_clickNext", {});

      await updateDoc(doc(db, "users", user.uid), {
        [`periodTrackerObj.cycleRegularity`]: cycleRegularity,
        ["periodTrackerObj.inputPeriodLength"]:
          user.periodTrackerObj?.inputPeriodLength || 5,
      });

      gotoSection(
        cycleRegularity === "CAN_PREDICT" ? "markLastPeriod" : "irregulerCycle"
      );
    }
  };

  // Mark Last Period
  const onMarkLastPeriodSave = async (
    sec: sectionTypes,
    periodLength?: number,
    cycleLength?: number
  ) => {
    if (user?.uid) {
      weEventTrack("fScanMarkLastPeriod_clickNext", {});

      await updateDoc(doc(db, "users", user.uid), {
        ...{
          ["periodTrackerObj.inputPeriodLength"]:
            periodLength || user.periodTrackerObj?.inputPeriodLength || 5,
        },
        ...{
          ["periodTrackerObj.inputCycleLength"]:
            cycleLength || user.periodTrackerObj?.inputCycleLength || 28,
        },
        ...{ sleepQuality: user.sleepQuality || 7 },
      });

      gotoSection(sec);
    }
  };

  // mood save
  const onMoodSave = async (mood?: number) => {
    if (user?.uid && mood) {
      weEventTrack("fScanMood_clickNext", {});

      // update mood in daily values
      const moodObj = createDailyMoodObj(mood);
      await saveDailyProgress(user.uid, "dailyMood", moodObj);

      gotoSection("energy");
    }
  };

  // energy save
  const onEnergySave = async (energy?: number) => {
    if (user?.uid && energy) {
      weEventTrack("fScanEnergy_clickNext", {});

      // update Energy in daily values
      const energyObj = createDailyEnergyObj(energy);
      await saveDailyProgress(user.uid, "dailyEnergy", energyObj);

      const goals = user.fitnessGoal;
      gotoSection(
        goals && goals.length
          ? goals[0] === "keep_fit"
            ? "workoutFrequency"
            : goals[0] === "lose_weight"
            ? "currentBodyType"
            : "symptomsDuringPeriod"
          : "fitnessGoal"
      );
    }
  };

  const onSymptomsDuringPeriodSave = async (symptoms?: symptomId[]) => {
    if (user?.uid && symptoms) {
      weEventTrack("fScanSymptomsDuringPeriod_clickNext", {});

      await updateDoc(doc(db, "users", user.uid), {
        ["periodTrackerObj.symptomsDuringPeriod"]: symptoms,
      });

      gotoSection("symptomsBeforePeriod");
    }
  };

  const onSymptomsBeforePeriodSave = async (symptoms?: symptomId[]) => {
    if (user?.uid && symptoms) {
      weEventTrack("fScanSymptomsBeforePeriod_clickNext", {});

      await updateDoc(doc(db, "users", user.uid), {
        ["periodTrackerObj.symptomsBeforePeriod"]: symptoms,
      });

      gotoSection("workoutFrequency");
    }
  };

  // Workout Style update
  const onWorkoutStyleSave = async (workoutStyle?: workoutStyleTypes) => {
    if (user?.uid && workoutStyle) {
      weEventTrack("fScanWorkoutStyle_clickNext", {});

      await updateDoc(doc(db, "users", user.uid), {
        workoutStyle,
      });

      gotoSection("scanning");
    }
  };

  return {
    challenge: q.challenge,
    section,
    gotoSection,
    onNameSave,
    onEmailSave,
    onGenderSave,
    onFitnessGoalSave,
    onDiagnosedPeriodSave,
    onAgeSave,
    onHeightSave,
    onWeightSave,
    onDesiredWeightSave,
    onCycleLengthSave,
    onPcosSymptomsSave,
    onWorkoutFrequencySave,
    onCurrentBodyTypeSave,
    onDesiredBodyTypeSave,
    onScanningNext,
    onAuthSuccess,
    onSlotBookingSkip,
    onSlotBookingNext,
    onSlotConfirmationNext,
    durationInDays,
    setDurationInDays,
    onCycleLengthAverageSave,
    onLastPeriodLengthSave,
    onSleepQulitySave,
    gotoPlans,
    onCycleRegularitySave,
    onMarkLastPeriodSave,
    onMoodSave,
    onEnergySave,
    onSymptomsDuringPeriodSave,
    onSymptomsBeforePeriodSave,
    onWorkoutStyleSave,
  };
};
