import useDietCalendar from "@hooks/dietPlan/useDietCalendar";
import ToggleIcon from "@modules/ChallengesMain/components/QuestCalendar/ToggleIcon";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { shallow } from "zustand/shallow";

const HorizontalDayHeading = () => {
  const { toggleIsVisible, active } = useDietCalendar(
    (state) => ({
      toggleIsVisible: state.toggleIsVisible,
      active: state.active,
    }),
    shallow
  );

  return (
    <>
      <TouchableOpacity
        className="px-6 pt-6 flex flex-row justify-between "
        onPress={() => {
          toggleIsVisible();
        }}
      >
        <Text
          className="text-white/80 text-lg"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {active?.day}, {active?.visibleDate}{" "}
          {active?.currentDate.split("-")[0]}
        </Text>
        <View className="flex flex-row items-center">
          <ToggleIcon />
        </View>
      </TouchableOpacity>
    </>
  );
};
export default HorizontalDayHeading;
