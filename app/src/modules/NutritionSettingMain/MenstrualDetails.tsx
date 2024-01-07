import { View } from "react-native";

import DietSettingListCard from "./DietSettingListCard";
import {
  cycleLengthIcon,
  lastPcosIcon,
  periodLengthIcon,
  symptomsIcon,
} from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";
import SettingCardWrapper from "./SettingCardWrapper";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const MenstrualDetails = () => {
  const navigation = useNavigation();
  const onCycleLength = () => {
    navigation.navigate("JoinBoat", {
      backOnDone: true,
      section: "cycleLengthAverage",
    });
    weEventTrack("dietSettings_clickCycleLength", {});
  };
  const onPeriodLength = () => {
    navigation.navigate("JoinBoat", {
      backOnDone: true,
      section: "lastPeriodLength",
    });
    weEventTrack("dietSettings_clickPeriodLength", {});
  };
  const onClickPCOSDiagnosis = () => {
    navigation.navigate("JoinBoat", {
      backOnDone: true,
      section: "pcos_pcod",
    });
    weEventTrack("dietSettings_clickPCOSDiagnosis", {});
  };
  const onClickPCOSSymptoms = () => {
    navigation.navigate("JoinBoat", {
      backOnDone: true,
      section: "pcosSymptoms",
    });
    weEventTrack("dietSettings_clickPCOSSymptoms", {});
  };

  return (
    <SettingCardWrapper primaryString="05" secondaryString="Menstrual History">
      <>
        <DietSettingListCard
          iconString={cycleLengthIcon}
          primaryString="Average Cycle Length"
          containerStyleTw="py-3"
          onPress={onCycleLength}
        />
        <View className="h-px  ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={periodLengthIcon}
          primaryString="Average Period Length"
          containerStyleTw="py-3"
          onPress={onPeriodLength}
        />
        <View className="h-px  ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={lastPcosIcon}
          primaryString="First PCOS diagnosis"
          containerStyleTw="py-3"
          onPress={onClickPCOSDiagnosis}
        />
        <View className="h-px  ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={symptomsIcon}
          primaryString="PCOS Symptoms"
          containerStyleTw="py-3"
          onPress={onClickPCOSSymptoms}
        />
        {/* <View className="h-px  ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={foodAllergiesIcon}
          primaryString="Symptoms before Period"
          containerStyleTw="py-3"
          onPress={onClickSexual}
        />
        <View className="h-px  ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={foodAllergiesIcon}
          primaryString="Symptoms during Period"
          containerStyleTw="py-3"
          onPress={onClickSexual}
        /> */}
      </>
    </SettingCardWrapper>
  );
};

export default MenstrualDetails;
