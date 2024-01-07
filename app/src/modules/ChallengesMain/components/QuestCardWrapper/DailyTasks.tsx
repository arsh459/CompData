import { useUserStore } from "@providers/user/store/useUserStore";
import { View } from "react-native";
import { shallow } from "zustand/shallow";
import BadgeProgressQuest from "./BadgeProgressQuest";

interface Props {}

const DailyTasks: React.FC<Props> = ({}) => {
  const { additionalBadgeIds } = useUserStore((state) => {
    return {
      additionalBadgeIds: state.currentRound?.additionalBadgeIds,
      //   dietProgress: state.user?.nutritionBadgeId
      //     ? state.progress[`${state.user.nutritionBadgeId}-${today}`]
      //     : 0,
    };
  }, shallow);

  if (!additionalBadgeIds) {
    return null;
  }

  return (
    <View className="">
      {additionalBadgeIds.map((item) => {
        return (
          <View key={item}>
            <BadgeProgressQuest badgeId={item} />
          </View>
        );
      })}
    </View>
  );
};

export default DailyTasks;
