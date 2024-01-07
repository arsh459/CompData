import { View, Text, TouchableOpacity } from "react-native";

import SvgIcons from "@components/SvgIcons";
import { useNavigation } from "@react-navigation/native";

import { useCurrentPeriodStore } from "@providers/period/periodStore";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

const TrackerHeading = () => {
  const navigation = useNavigation();
  // const currentDate = new Date();
  const month = useCurrentPeriodStore((state) => state.inViewMonth);

  return (
    <View className="flex flex-row items-center justify-between px-4 pt-4">
      {month ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PeriodCalenderLogScreen", {
              title: "",
              isEditable: false,
            });
            weEventTrack("period_clickMonth", {});
          }}
          className="flex flex-row items-center border border-red-400 py-2 px-3 rounded-xl"
        >
          <Text
            className="text-white text-sm  pr-2"
            style={{
              fontFamily: "Nunito-SemiBold",
            }}
          >
            {month}
          </Text>
          <View className="w-4 aspect-square">
            <SvgIcons color="#ff6069" iconType="calender" />
          </View>
        </TouchableOpacity>
      ) : (
        <View />
      )}
      {month ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("PeriodOnboardSettingScreen");
            weEventTrack("period_clickSettings", {});
          }}
          className="w-6 aspect-square"
        >
          <SvgIcons iconType="setting" />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

export default TrackerHeading;
