import useQuestCalendar from "@hooks/quest/useQuestCalendar";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { shallow } from "zustand/shallow";
import ToggleIcon from "./ToggleIcon";

const QuestCalendarHeading = () => {
  const { toggleIsVisible, active } = useQuestCalendar(
    (state) => ({
      toggleIsVisible: state.toggleIsVisible,
      active: state.active,
    }),
    shallow
  );

  return (
    <>
      <View className="px-4 pt-6 flex flex-row justify-between ">
        <Text
          className="text-white text-xl"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Daily Quest
        </Text>
        <TouchableOpacity
          className="flex flex-row items-center"
          onPress={toggleIsVisible}
        >
          <View className="mr-2">
            <Text
              className="text-white/70 text-xs iphoneX:text-sm"
              style={{ fontFamily: "Nunito-SemiBold" }}
            >
              {active?.visibleDate}
            </Text>
          </View>
          <ToggleIcon />
        </TouchableOpacity>
      </View>
    </>
  );
};
export default QuestCalendarHeading;
