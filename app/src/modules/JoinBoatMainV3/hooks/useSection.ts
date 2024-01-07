import firestore from "@react-native-firebase/firestore";
import {
  CycleRegularityTypes,
  diagnosedPeriodType,
  fitnessGoalTypes,
  genderType,
  pcosSymptoms,
  UserInterface,
  workoutFrequencyTypes,
  workoutStyleTypes,
} from "@models/User/User";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@routes/MainStack";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { getTeam } from "@utils/post/createUtils";
import {
  addUserToTeam,
  createDailyEnergyObj,
  createDailyMoodObj,
  createDailySleepObj,
  createDailyWeightObj,
} from "@models/User/createUtils";
import { useUserStore } from "@providers/user/store/useUserStore";
import { DNParseResult } from "@providers/dnLinks/hooks/handleLink";
import { subscriptionStatus } from "@hooks/subscription/useSubscription";
import { getIntialHeight } from "../components/utils2";
import { WeightSaveInterface } from "../components/SetWeightWithJoinBoatWrapper";
import { OnSaveBodyTypeProps } from "../components/SelectBodyTypeWithJoinBoatWrapper";
import { shallow } from "zustand/shallow";
import { saveDailyProgress } from "@modules/JourneyLogHome/utils";
import { symptomId } from "@models/User/symptoms";
import {
  getNextSlotInterventionTypes,
  setSltoInterventionObj,
} from "@modules/SlotIntervention/utils";

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
  | "plans";

export interface boatParamQueryV6 {
  section?: sectionTypes;
}

export type boatParamQueryKeysV6 = "section";

export const useStartSection = (
  toJoinGameId?: string,
  toJoinTeamId?: string,
  backOnDone?: boolean
) => {
  const userId = useUserStore((state) => state.user?.uid, shallow);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { onChangeGameId } = useAuthContext();

  // add user to team
  const addUser = async (user?: UserInterface) => {
    if (toJoinGameId && toJoinTeamId && user) {
      const remoteTeam = await getTeam(toJoinTeamId);

      if (remoteTeam) {
        await addUserToTeam(
          user.uid,
          remoteTeam.ownerUID,
          toJoinGameId,
          toJoinTeamId,
          user,
          remoteTeam
        );

        onChangeGameId(toJoinGameId);
      }
    }
  };

  const gotoHome = async (user?: UserInterface) => {
    await addUser(user);

    navigation.dispatch((state) => {
      const routes = state.routes.filter(
        (r) => r.name !== "JoinBoat" && r.name !== "Loading"
      );
      routes.push({
        key: `Home-${Math.round(Math.random() * 1000)}`,
        name: "Home",
      });

      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    });
  };

  const gotoSection = (sec: sectionTypes, replace?: boolean) => {
    backOnDone
      ? navigation.goBack()
      : replace
      ? navigation.replace("JoinBoat", {
          section: sec,
        })
      : navigation.push("JoinBoat", {
          section: sec,
        });
  };

  const onNameSave = async (name?: string) => {
    if (userId && name) {
      weEventTrack("fScanName_clickNext", {});

      await firestore().collection("users").doc(userId).update({
        name,
        gender: "female",
      });

      gotoSection("email");
    }
  };

  // email update
  const onEmailSave = async (email?: string) => {
    if (userId && email) {
      weEventTrack("fScanEmail_clickNext", {});

      await firestore().collection("users").doc(userId).update({
        email,
      });

      gotoSection("fitnessGoal");
    }
  };

  const onEmailSkip = () => {
    weEventTrack("fScanEmail_clickSkip", {});
    gotoSection("fitnessGoal");
  };

  // gender update
  const onGenderSave = async (gender?: genderType, heightDB?: number) => {
    if (userId && gender) {
      weEventTrack("fScanGender_clickNext", {});
      // gender basis height update.
      const height = getIntialHeight(heightDB, gender);

      await firestore().collection("users").doc(userId).update({
        gender,
        height,
      });

      gotoSection("fitnessGoal");
    }
  };

  // goal update
  const onFitnessGoalSave = async (goal?: fitnessGoalTypes, age?: number) => {
    if (userId && goal) {
      weEventTrack("fScanGoal_clickNext", {});

      await firestore()
        .collection("users")
        .doc(userId)
        .update({
          fitnessGoal: [goal],
          age: age || 25,
        });

      gotoSection(goal === "pcos_pcod" ? "pcos_pcod" : "age");
    }
  };

  // goal update
  const onDiagnosedPeriodSave = async (
    diagnosedPeriod?: diagnosedPeriodType
  ) => {
    if (userId && diagnosedPeriod) {
      weEventTrack("fScanDiagnosedPeriod_clickNext", {});

      await firestore().collection("users").doc(userId).update({
        diagnosedPeriod,
      });

      gotoSection("age");
    }
  };

  // age update
  const onAgeSave = async (age?: number, heightDB?: number) => {
    if (userId && age) {
      weEventTrack("fScanAge_clickNext", {});
      // gender basis height update.
      const height = getIntialHeight(heightDB, "female");

      await firestore().collection("users").doc(userId).update({
        age,
        height,
      });

      gotoSection("height");
    }
  };

  // height update
  const onHeightSave = async (height?: number, weight?: number) => {
    if (userId && height) {
      weEventTrack("fScanHeight_clickNext", {});
      // set weight
      await firestore().collection("users").doc(userId).update({
        height,
        weight,
      });

      gotoSection("weight");
    }
  };

  // weight update
  const onWeightSave = async (props: WeightSaveInterface) => {
    const { weight, desiredWeight, cycleLength, goals } = props;
    if (userId && weight) {
      weEventTrack("fScanCurrentWeight_clickNext", {});
      // set Desired weight and cycleLength
      await firestore()
        .collection("users")
        .doc(userId)
        .update({
          weight,
          desiredWeight,
          [`periodTrackerObj.inputCycleLength`]: cycleLength,
        });

      gotoSection(
        goals && goals.length
          ? goals[0] === "keep_fit"
            ? "cycleRegularity"
            : "desiredWeight"
          : "fitnessGoal"
      );

      // dailyWeight
      const dailyWeight = createDailyWeightObj(weight);
      await saveDailyProgress(userId, "dailyWeight", dailyWeight);
    }
  };

  // desired weight update
  const onDesiredWeightSave = async (props: WeightSaveInterface) => {
    const { weight: desiredWeight, goals } = props;
    if (userId && desiredWeight) {
      weEventTrack("fScanDesiredWeight_clickNext", {});

      await firestore().collection("users").doc(userId).update({
        desiredWeight,
      });

      // gotoSection(goals && goals.length ? "irregulerCycle" : "fitnessGoal");
      gotoSection(goals && goals.length ? "cycleRegularity" : "fitnessGoal");
    }
  };

  // Pcos Symptoms update
  const onPcosSymptomsSave = async (pcosSymptoms?: pcosSymptoms[]) => {
    if (userId && pcosSymptoms) {
      weEventTrack("fScanPcosSymptoms_clickNext", {});

      await firestore().collection("users").doc(userId).update({
        pcosSymptoms,
      });

      gotoSection("workoutFrequency");

      // handle symptom update
      if (pcosSymptoms.includes("bad_mood")) {
        const mood = createDailyMoodObj(1);
        await saveDailyProgress(userId, "dailyMood", mood);
      }

      if (pcosSymptoms.includes("fatigue")) {
        const energy = createDailyEnergyObj(1);
        await saveDailyProgress(userId, "dailyEnergy", energy);
      }
    }
  };

  // Workout Frequency update
  const onWorkoutFrequencySave = async (
    workoutFrequency?: workoutFrequencyTypes
  ) => {
    if (userId && workoutFrequency) {
      weEventTrack("fScanWorkoutFrequency_clickNext", {});

      await firestore().collection("users").doc(userId).update({
        workoutFrequency,
      });

      gotoSection("workoutStyle");
    }
  };

  // user body type update
  const onCurrentBodyTypeSave = async (props: OnSaveBodyTypeProps) => {
    const { prevBodyType, currBodyType } = props;
    // console.log("prevBodyType", prevBodyType);
    // console.log("currBodyType", currBodyType);
    if (userId && currBodyType) {
      weEventTrack("fScanCurrentBodyType_clickNext", {});
      const isSame = prevBodyType === currBodyType;

      !isSame &&
        (await firestore().collection("users").doc(userId).update({
          currentBodyType: currBodyType,
        }));

      gotoSection("desiredBodyType");
    }
  };

  const onDesiredBodyTypeSave = async (props: OnSaveBodyTypeProps) => {
    const { currBodyType, level, pace } = props;
    if (userId && currBodyType && level && pace) {
      weEventTrack("fScanDesiredBodyType_clickNext", {});

      await firestore().collection("users").doc(userId).update({
        desiredBodyType: currBodyType,
        difficulty: level,
        paceOfAchievementInMonth: pace,
      });

      gotoSection("workoutFrequency");
    }
  };

  const onScanningNext = async () => {
    weEventTrack(`fScanFinal_clickNext`, {});
    gotoSection("transformation", true);
  };

  const onSlotBookingSkip = (user?: UserInterface) => {
    weEventTrack("fScanBookConsultation_skipForNow", {});
    setSltoInterventionObj(getNextSlotInterventionTypes(), user?.uid);
    // gotoHome(user);
    addUser(user);
    navigation.navigate("SkipSlotBookScreen");
  };

  const onSlotBookingNext = () => {
    // console.log("Hi I am here", id);
    weEventTrack("fScanConsultationSlot_clickNext", {});
    weEventTrack("slot_request", { source: "onboarding" });

    // setAppId(id);
    navigation.navigate("BookZohoSlot", {
      category: "sales",
      nextScreen: "SlotConfirmation",
      nextScreenDoneNav: "HOME",
    });
  };

  // last 6 month cycle length average save
  const onCycleLengthAverageSave = async (
    cycleLength?: number,
    periodLength?: number
  ) => {
    if (userId && cycleLength) {
      weEventTrack("fScanCycleLengthAverage_clickNext", {});

      await firestore()
        .collection("users")
        .doc(userId)
        .update({
          ["periodTrackerObj.inputCycleLength"]: cycleLength,
          ["periodTrackerObj.inputPeriodLength"]: periodLength,
        });

      gotoSection("lastPeriodLength");
    }
  };

  // last month cycle length save
  const onLastPeriodLengthSave = async (
    periodLength?: number,
    sleepQuality?: number
  ) => {
    if (userId && periodLength) {
      weEventTrack("fScanLastPeriodLength_clickNext", {});

      await firestore()
        .collection("users")
        .doc(userId)
        .update({
          ["periodTrackerObj.inputPeriodLength"]: periodLength,
          sleepQuality,
        });

      gotoSection("sleepQuality");
    }
  };

  // sleep quality save
  const onSleepQualitySave = async (sleepQuality?: number) => {
    if (userId && sleepQuality) {
      weEventTrack("fScanSleepQuality_clickNext", {});

      await firestore().collection("users").doc(userId).update({
        sleepQuality,
      });

      gotoSection("mood");

      // update sleep in daily values
      const sleepObj = createDailySleepObj(sleepQuality);
      await saveDailyProgress(userId, "dailySleep", sleepObj);
    }
  };

  // mood save
  const onMoodSave = async (mood?: number) => {
    if (userId && mood) {
      weEventTrack("fScanMood_clickNext", {});

      // update mood in daily values
      const moodObj = createDailyMoodObj(mood);
      await saveDailyProgress(userId, "dailyMood", moodObj);

      gotoSection("energy");
    }
  };

  // energy save
  const onEnergySave = async (energy?: number, goals?: fitnessGoalTypes[]) => {
    if (userId && energy) {
      weEventTrack("fScanEnergy_clickNext", {});

      // update Energy in daily values
      const energyObj = createDailyEnergyObj(energy);
      await saveDailyProgress(userId, "dailyEnergy", energyObj);

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
    if (userId && symptoms) {
      weEventTrack("fScanSymptomsDuringPeriod_clickNext", {});

      await firestore()
        .collection("users")
        .doc(userId)
        .update({
          ["periodTrackerObj.symptomsDuringPeriod"]: symptoms,
        });

      gotoSection("symptomsBeforePeriod");
    }
  };

  const onSymptomsBeforePeriodSave = async (symptoms?: symptomId[]) => {
    if (userId && symptoms) {
      weEventTrack("fScanSymptomsBeforePeriod_clickNext", {});

      await firestore()
        .collection("users")
        .doc(userId)
        .update({
          ["periodTrackerObj.symptomsBeforePeriod"]: symptoms,
        });

      gotoSection("workoutFrequency");
    }
  };

  // Workout Style update
  const onWorkoutStyleSave = async (workoutStyle?: workoutStyleTypes) => {
    if (userId && workoutStyle) {
      weEventTrack("fScanWorkoutStyle_clickNext", {});

      await firestore().collection("users").doc(userId).update({
        workoutStyle,
      });

      gotoSection("scanning");
    }
  };

  const onCycleRegularitySave = async (
    cycleRegularity?: CycleRegularityTypes,
    periodLength?: number
  ) => {
    if (userId && cycleRegularity) {
      weEventTrack("fScanCycleRegularity_clickNext", {});

      await firestore()
        .collection("users")
        .doc(userId)
        .update({
          [`periodTrackerObj.cycleRegularity`]: cycleRegularity,
          ["periodTrackerObj.inputPeriodLength"]: periodLength,
        });

      gotoSection(
        cycleRegularity === "CAN_PREDICT" ? "markLastPeriod" : "irregulerCycle"
      );
    }
  };

  const onMarkPeriodSave = async (
    sec: sectionTypes,
    periodLength?: number,
    cycleLength?: number,
    sleepQuality?: number
  ) => {
    if (userId) {
      if (sec === "markBeforeLastPeriod") {
        weEventTrack("fScanMarkLastPeriod_clickNext", {});
      } else {
        weEventTrack("fScanMarkLastToLastPeriod_clickNext", {});
      }

      await firestore()
        .collection("users")
        .doc(userId)
        .update({
          ...(periodLength
            ? { ["periodTrackerObj.inputPeriodLength"]: periodLength }
            : {}),
          ...(cycleLength
            ? { ["periodTrackerObj.inputCycleLength"]: cycleLength }
            : {}),
          ...(typeof sleepQuality === "number" ? { sleepQuality } : {}),
        });

      gotoSection(sec);
    }
  };

  const onAchievementPathCtaClick = (
    subStatus: subscriptionStatus,
    dnResult?: DNParseResult,
    user?: UserInterface
  ) => {
    weEventTrack(`fScanRoadmap_clickNext`, {});

    if (subStatus === "SUBSCRIBED") {
      gotoHome(user);
    } else if (dnResult && dnResult.route !== "Home") {
      gotoHome(user);
    } else {
      gotoSection("plans");
    }
  };

  const onWelcomeNext = async () => {
    gotoSection("name");
    weEventTrack("fScanIntro_clickNext", {});
  };

  return {
    onEmailSkip,
    gotoHome,
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
    onPcosSymptomsSave,
    onWorkoutFrequencySave,
    onCurrentBodyTypeSave,
    onDesiredBodyTypeSave,
    onScanningNext,
    onSlotBookingSkip,
    onCycleLengthAverageSave,
    onLastPeriodLengthSave,
    onSleepQualitySave,
    onCycleRegularitySave,
    onMarkPeriodSave,
    onAchievementPathCtaClick,
    onWelcomeNext,
    onMoodSave,
    onEnergySave,
    onSymptomsDuringPeriodSave,
    onSymptomsBeforePeriodSave,
    onWorkoutStyleSave,
    onSlotBookingNext,
  };
};
