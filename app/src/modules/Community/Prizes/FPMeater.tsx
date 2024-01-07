import { Text, View } from "react-native";
import ProgressBar from "@components/ProgressBar";
import clsx from "clsx";

interface Props {
  description: string;
  canFinish: boolean;
  progress: number;
  total: number;
  pts: number;
  isGoalWidget?: boolean;
  percent?: boolean;
}

const FPMeater: React.FC<Props> = ({
  description,
  progress,
  pts,
  total,
  canFinish,
  isGoalWidget,
  percent,
}) => {
  const progressA = progress < 10 ? 10 : progress > 100 ? 100 : progress;
  const diffrence = total - pts;

  return (
    <View
      className={clsx(
        isGoalWidget ? "text-xs iphoneX:text-sm" : "text-sm iphoneX:text-base"
      )}
    >
      {progressA === 100 && canFinish ? (
        <Text className="text-white">
          Congratulations! You have <Text className="font-bold">unlocked</Text>{" "}
          this achievement.
        </Text>
      ) : progressA === 100 ? (
        <Text className="text-white">
          Wohoo! You are currently <Text className="font-bold">winning! </Text>
          Keep the rank up
        </Text>
      ) : percent ? (
        <Text className="text-white">{description}</Text>
      ) : total ? (
        <Text className="text-white">
          Earn <Text className="font-bold">{diffrence} FPs</Text> more to win
          and redeem rewards
        </Text>
      ) : (
        <Text className="text-white">{description}</Text>
      )}
      <View className="py-2">
        <ProgressBar
          height={6}
          progress={progressA}
          activeColor="#60ABC3"
          inActiveColor="#262626"
          showLable="below"
          lableText={
            progressA === 100 && canFinish
              ? "Done"
              : percent
              ? `${pts === 0 ? `< 1` : `${pts}`}%`
              : `${pts} FP`
          }
          textStyle={clsx("text-xs", progressA === 100 ? "font-bold" : "")}
          padding={1}
        />
      </View>
    </View>
  );
};

export default FPMeater;
