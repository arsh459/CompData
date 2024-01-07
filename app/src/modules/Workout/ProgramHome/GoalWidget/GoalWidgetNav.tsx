import clsx from "clsx";
import { View, Text } from "react-native";

export type navItemsType = "goal" | "Track Goal" | "prizes" | "team";
// const navItems: navItemsType[] = ["goal", "prizes", "team"];

interface Props {
  selectedNav: navItemsType;
  navItems: navItemsType[];
  setSelectedNav: (val: navItemsType) => void;
}
const GoalWidgetNav: React.FC<Props> = ({
  selectedNav,
  navItems,
  setSelectedNav,
}) => {
  return (
    <View className="flex flex-row bg-[#333333] rounded-3xl overflow-hidden">
      {navItems.map((item, index) => (
        <View
          key={`${item}-${index}`}
          className={clsx(
            "py-2 flex-1 w-1/3 rounded-full transition-all",
            selectedNav === item ? "bg-[#4F4F4F]" : ""
          )}
        >
          <Text
            className={clsx(
              "iphoneX:text-lg capitalize text-center transition-all",
              selectedNav === item ? "text-white font-medium" : "text-white/50"
            )}
            onPress={() => {
              setSelectedNav(item);
            }}
          >
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default GoalWidgetNav;
