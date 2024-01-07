import { View, Text, TouchableOpacity } from "react-native";

import { useUserContext } from "@providers/user/UserProvider";
// import { PeriodGoalTextIcon } from "@modules/PeriodStartJourney/utils";
import SettingPeriodCard from "./SettingPeriodCard";
import { useNavigation } from "@react-navigation/native";

const PeriodOnboardSettingMain = () => {
  const { user } = useUserContext();
  const navigation = useNavigation();
  // const goal = user?.periodTrackerObj?.goal
  //   ? PeriodGoalTextIcon[user?.periodTrackerObj?.goal]
  //   : null;
  const cycleLength = user?.periodTrackerObj?.inputCycleLength;
  const periodLength = user?.periodTrackerObj?.inputPeriodLength;
  return (
    <View className="flex-1 bg-[#232136]">
      <View className="p-4">
        <Text
          className="text-white text-3xl"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          Settings
        </Text>
      </View>
      {/* {goal ? (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PeriodGoalScreen", { isGoback: true })
          }
          className="pb-4"
        >
          <SettingPeriodCard
            iconStr={goal.icon}
            mainText="Goal for tracking"
            subText={goal.text}
          />
        </TouchableOpacity>
      ) : null} */}
      {typeof cycleLength === "number" ? (
        <>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AddCurrentCycleLength", { isGoback: true })
            }
          >
            <SettingPeriodCard
              mainText="Cycle Length"
              subText={cycleLength ? `${cycleLength} Days` : "Add Cycle Length"}
            />
          </TouchableOpacity>
          <Text
            className="text-white/80  px-4 pt-2 pb-4 text-xs text-left "
            style={{ fontFamily: "Nunito-Regular" }}
          >
            Note: This is the starting value we use to predict
          </Text>
        </>
      ) : null}
      {typeof periodLength === "number" ? (
        <>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("AddCurrentPeriodLength", { isGoback: true })
            }
          >
            <SettingPeriodCard
              mainText="Period Length"
              subText={
                periodLength ? `${periodLength} Days` : "Add Period Length"
              }
            />
          </TouchableOpacity>
          <Text
            className="text-white/80 px-4 py-2  text-xs text-left "
            style={{ fontFamily: "Nunito-Regular" }}
          >
            Note: This is the starting value we use to predict your period
          </Text>
        </>
      ) : null}
    </View>
  );
};

export default PeriodOnboardSettingMain;
