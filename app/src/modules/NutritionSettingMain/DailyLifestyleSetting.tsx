import { View } from "react-native";

import DietSettingListCard from "./DietSettingListCard";
import {
  addictionIcon,
  exerciseFreqIcon,
  issuesIcon,
  junkFoodIcon,
  sexualActivityIcon,
  sleepQualityIcon,
  waterGlassIcon,
  workHoursIcon,
} from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";
import SettingCardWrapper from "./SettingCardWrapper";
import {
  getExerciseFrequencyString,
  getJunkFoodString,
  getWaterIntakeDaily,
} from "./utils";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const DailyLifestyleSetting = () => {
  const navigation = useNavigation();

  const {
    sleepQuality,
    workingHour,
    waterIntake,
    junkFoodIntake,
    frequencyExercise,
  } = useUserStore(({ user }) => {
    return {
      sleepQuality: user?.sleepQuality,
      workingHour: user?.dietForm?.workingHour,
      waterIntake: getWaterIntakeDaily(user?.dietForm?.waterIntakeDaily),
      junkFoodIntake: getJunkFoodString(user?.dietForm?.outsideFoodInWeek),
      frequencyExercise: getExerciseFrequencyString(
        user?.dietForm?.exerciseDayInWeek
      ),
    };
  }, shallow);

  const onClickWaterIntake = () => {
    weEventTrack("dietSettings_clickWaterIntake", {});
    navigation.navigate("DailyWaterIntakeScreen", { isGoback: true });
  };
  const onClickJunkFood = () => {
    navigation.navigate("OutsideFoodIntake", { isGoback: true });
    weEventTrack("dietSettings_clickJunkFoodIntake", {});
  };
  const onClickWorkingHours = () => {
    navigation.navigate("DailyWorkHours", { isGoback: true });
    weEventTrack("dietSettings_clickDailyWork", {});
  };
  const onClickExerciseFrequency = () => {
    navigation.navigate("DailyExercise", { isGoback: true });
    weEventTrack("dietSettings_clickDailyExercise", {});
  };
  const onClickSleep = () => {
    navigation.navigate("JoinBoat", {
      backOnDone: true,
      section: "sleepQuality",
    });
    weEventTrack("dietSettings_clickSleep", {});
  };
  const onClickAddiction = () => {
    navigation.navigate("DailyAddiction", { isGoback: true });
    weEventTrack("dietSettings_clickAddictions", {});
  };
  const onClickMedicalReports = () => {
    navigation.navigate("DailyIssues", { isGoback: true });
    weEventTrack("dietSettings_clicIssues", {});
  };
  const onClickSexual = () => {
    navigation.navigate("SexualActivityStatusScreen", {
      isGoback: true,
      reinit: false,
    });
    weEventTrack("dietSettings_clickAllergies", {});
  };

  return (
    <SettingCardWrapper primaryString="02" secondaryString="Daily Lifestyle">
      <>
        <DietSettingListCard
          iconString={waterGlassIcon}
          primaryString="Water Intake"
          secondaryString={waterIntake}
          containerStyleTw="py-3"
          onPress={onClickWaterIntake}
        />
        <View className="h-px  ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={junkFoodIcon}
          primaryString="Junk food frequency"
          secondaryString={junkFoodIntake}
          containerStyleTw="py-3"
          onPress={onClickJunkFood}
        />
        <View className="h-px  ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={workHoursIcon}
          primaryString="Working Hours"
          containerStyleTw="py-3"
          secondaryString={workingHour ? `${workingHour} Hrs` : ""}
          onPress={onClickWorkingHours}
        />
        <View className="h-px  ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={exerciseFreqIcon}
          primaryString="Exercise frequency"
          secondaryString={frequencyExercise}
          containerStyleTw="py-3"
          onPress={onClickExerciseFrequency}
        />
        <View className="h-px  ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={sleepQualityIcon}
          primaryString="Sleep Quality"
          secondaryString={sleepQuality ? `${sleepQuality} hr / day` : ""}
          containerStyleTw="py-3"
          onPress={onClickSleep}
        />
        <View className="  h-px ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={addictionIcon}
          primaryString="Smoking & Drinking"
          containerStyleTw="py-3"
          onPress={onClickAddiction}
        />
        <View className="h-px  ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={sexualActivityIcon}
          primaryString="Sexual Activity"
          containerStyleTw="py-3"
          onPress={onClickSexual}
        />
        <View className="h-px  ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={issuesIcon}
          primaryString="Stress & Anxiety"
          containerStyleTw="py-3"
          onPress={onClickMedicalReports}
        />
      </>
    </SettingCardWrapper>
  );
};

export default DailyLifestyleSetting;
