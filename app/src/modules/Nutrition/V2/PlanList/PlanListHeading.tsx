import SvgIcons from "@components/SvgIcons";
import clsx from "clsx";
import { View, Text, TouchableOpacity } from "react-native";
interface Props {
  // navigationOnAddPress: () => void;
  tasksLength: number;
  onAddPress: () => void;
}
const PlanListHeading: React.FC<Props> = ({
  // navigationOnAddPress,
  tasksLength,
  onAddPress,
}) => {
  return (
    <View
      className={clsx(
        "px-6 flex flex-row items-center justify-between ",
        tasksLength === 0 ? "" : "pb-5"
      )}
    >
      <View>
        <Text
          className="text-white/90 text-base"
          style={{ fontFamily: "Poppins-Medium" }}
        >
          My Meals
        </Text>
      </View>

      {tasksLength > 0 && (
        <View className="flex flex-row items-center justify-center">
          <TouchableOpacity
            onPress={onAddPress}
            className="flex flex-row items-center justify-between px-4 py-2 bg-[#2F2C4D] rounded-lg"
          >
            <View className="w-2 aspect-square mr-2">
              <SvgIcons iconType="plus" color="#fff" />
            </View>
            <View>
              <Text
                className="text-center text-white text-xs"
                style={{ fontFamily: "Nunito-SemiBold" }}
              >
                New Meal
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PlanListHeading;
