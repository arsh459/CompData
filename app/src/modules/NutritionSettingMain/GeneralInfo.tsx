import { View } from "react-native";

import DietSettingListCard from "./DietSettingListCard";
import {
  ageIcon,
  heightIcon,
  mainGoalIcon,
  targetWeightIcon,
} from "@constants/imageKitURL";
import { useNavigation } from "@react-navigation/native";
import SettingCardWrapper from "./SettingCardWrapper";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { getHeightInFtInch } from "./utils";
import { getMainGoal } from "@modules/ProScreenMain/V3/utils";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const GeneralInfo = () => {
  const navigation = useNavigation();

  const { age, weight, desiredWeight, height, fitnessGoal } = useUserStore(
    ({ user }) => {
      return {
        age: user?.age,
        weight: user?.weight,
        desiredWeight: user?.desiredWeight,
        height: user?.height,
        fitnessGoal: user?.fitnessGoal,
      };
    },
    shallow
  );

  const onClickTarget = () => {
    navigation.navigate("JoinBoat", {
      backOnDone: true,
      section: "desiredWeight",
    });
    weEventTrack("dietSettings_clickTargetWeight", {});
  };
  const onClickAge = () => {
    navigation.navigate("JoinBoat", { backOnDone: true, section: "age" });
    weEventTrack("dietSettings_clickAge", {});
  };
  const onClickWeight = () => {
    navigation.navigate("JoinBoat", {
      backOnDone: true,
      section: "weight",
    });
    weEventTrack("dietSettings_clickWeight", {});
  };
  const onClickHeight = () => {
    navigation.navigate("JoinBoat", { backOnDone: true, section: "height" });
    weEventTrack("dietSettings_clickHeight", {});
  };
  const onClickGoal = () => {
    navigation.navigate("JoinBoat", {
      backOnDone: true,
      section: "fitnessGoal",
    });
    weEventTrack("dietSettings_clickGoal", {});
  };

  return (
    <SettingCardWrapper primaryString="01" secondaryString="Basic Info">
      <>
        <DietSettingListCard
          iconString={ageIcon}
          primaryString="Age"
          secondaryString={age ? `${age} Y` : ""}
          containerStyleTw="py-3"
          onPress={onClickAge}
        />
        <View className="h-px ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={targetWeightIcon}
          primaryString="Current Weight"
          containerStyleTw="py-3"
          secondaryString={weight ? `${weight} Kg` : ""}
          onPress={onClickWeight}
        />

        <View className="h-px ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={targetWeightIcon}
          primaryString="Target Weight"
          secondaryString={desiredWeight ? `${desiredWeight || ""} Kg` : ""}
          containerStyleTw="py-3"
          onPress={onClickTarget}
        />
        <View className="h-px ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={heightIcon}
          containerStyleTw="py-3"
          primaryString="Height"
          secondaryString={getHeightInFtInch(height)}
          onPress={onClickHeight}
        />
        <View className="h-px ml-4 bg-[#FFFFFF33]" />
        <DietSettingListCard
          iconString={mainGoalIcon}
          primaryString="Main Goal"
          secondaryString={getMainGoal(fitnessGoal)}
          containerStyleTw="py-3"
          onPress={onClickGoal}
        />
      </>
    </SettingCardWrapper>
  );
};

export default GeneralInfo;
