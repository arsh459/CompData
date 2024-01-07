import { Badge } from "@models/Prizes/Prizes";
import { View } from "react-native";
import IconImageFlex from "@modules/ProgressState/IconImageFlex";
import ProgressBar from "@components/ProgressBar";
import TrophyNewCard from "@modules/ProgressState/TrophyNewCard";

interface Props {
  badge: Badge;
  rank?: number;
  earnFP?: number;
  nbWorkout?: number;
}

const ProgressBadgeCard: React.FC<Props> = ({
  badge,
  rank,
  earnFP,
  nbWorkout,
}) => {
  const percent =
    typeof earnFP === "number" && typeof badge.unlockFP === "number"
      ? Math.floor((earnFP / badge.unlockFP) * 100)
      : 0;

  return (
    <TrophyNewCard
      badgeImg={badge.badgeImage}
      text={badge.prizeName ? badge.prizeName : "Champion badge"}
      // text="hiii"
      subText={
        badge.prizeDescription
          ? badge.prizeDescription
          : "Finish 100 workouts from your Plan. Rank 1 gets this prize"
      }
      colorArr={
        badge.bgLinearColors?.length && badge.bgLinearColors.length >= 2
          ? badge.bgLinearColors
          : undefined
      }
      textColor={badge.textColor}
      subTextColor={badge.subTextColor}
      layoutStyleTw="w-full aspect-[340/160] flex flex-row rounded-3xl items-center justify-evenly p-4"
    >
      {badge.unlockFP ? (
        <View className="flex justify-between items-center py-2">
          <View className="self-end pb-2">
            <IconImageFlex
              text={`${earnFP}/${badge.unlockFP}`}
              iconColor={badge.textColor}
              textColor={badge.textColor}
              iconType="fitpoint"
            />
          </View>
          <View className="w-full">
            <ProgressBar
              height={1}
              progress={percent > 100 ? 100 : percent}
              activeColor={badge.textColor}
              inActiveColor={`${badge.textColor}20`}
            />
          </View>
        </View>
      ) : badge.nbWorkouts ? (
        <View className="flex justify-between items-center flex-row py-2">
          <IconImageFlex
            text={`Rank ${rank}`}
            iconColor={badge.textColor}
            textColor={badge.textColor}
            iconType="ranking"
          />
          <View className="pl-4">
            <IconImageFlex
              text={`${nbWorkout}/${badge.nbWorkouts}`}
              iconColor={badge.textColor}
              textColor={badge.textColor}
              iconType="exercise"
            />
          </View>
        </View>
      ) : null}
    </TrophyNewCard>
  );
};

export default ProgressBadgeCard;
