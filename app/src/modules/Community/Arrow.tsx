import { downArrow, upArrow } from "@constants/imageKitURL";
import { CoachRank, UserRank } from "@models/Activity/Activity";
import { Image, View } from "react-native";

interface Props {
  each: UserRank | CoachRank;
  yesterday: string;
  dayBefore: string;
  size?: "small";
}

// previousRanks: {[id: string]: rank}

const Arrow: React.FC<Props> = ({ each, yesterday, dayBefore, size }) => {
  const nowPts =
    each?.dayPointObj && each?.dayPointObj[yesterday]
      ? each?.dayPointObj[yesterday]
      : 0;
  const nowPts_1 =
    each?.dayPointObj && each?.dayPointObj[dayBefore]
      ? each?.dayPointObj[dayBefore]
      : 0;

  return (
    <View className="flex-none">
      {nowPts >= nowPts_1 ? (
        <Image
          source={{ uri: upArrow }}
          className="w-4 h-4"
          resizeMode="contain"
        />
      ) : (
        <Image
          source={{ uri: downArrow }}
          className="w-4 h-4"
          resizeMode="contain"
        />
      )}
    </View>
  );
};

export default Arrow;
