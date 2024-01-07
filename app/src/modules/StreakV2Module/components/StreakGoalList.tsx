import { streakLevelsTypes } from "@providers/streakV2/interface";
import { View } from "react-native";
import StreakGoalListItem from "./StreakGoalListItem";

interface Props {
  levelList: streakLevelsTypes[];
  targerDays: number;
}

const StreakGoalList: React.FC<Props> = ({ levelList, targerDays }) => {
  return (
    <View className="w-full h-fit flex items-center">
      {levelList.map((item, index) => {
        return (
          <View key={`streak_${item}_${index}`} className={`${targerDays !== item && "px-2"} w-full`}>
            <StreakGoalListItem
              lastItem={levelList.length - 1 === index}
              firstItem={index === 0}
              itemText={`${item} days streak`}
              itemStatus={targerDays < item ? "Locked" : targerDays === item ? "Current" : "Unlocked"}
            />
          </View>
        );
      })}
    </View>
  );
};

export default StreakGoalList;
