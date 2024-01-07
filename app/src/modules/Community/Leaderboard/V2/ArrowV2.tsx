import { downRedArrow, upGreenArrow } from "@constants/imageKitURL";
import { CoachRank, UserRank } from "@models/Activity/Activity";
import { Image, View } from "react-native";

interface Props {
  each: UserRank | CoachRank;
  yesterday: string;
  dayBefore: string;
  size?: "small";
  isTop?: boolean;
}

// previousRanks: {[id: string]: rank}

const ArrowV2: React.FC<Props> = ({
  each,
  yesterday,
  dayBefore,
  size,
  isTop,
}) => {
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
      {isTop && nowPts >= nowPts_1 ? (
        <Image
          source={{ uri: upGreenArrow }}
          className="w-3 h-2"
          resizeMode="contain"
        />
      ) : !isTop && nowPts >= nowPts_1 ? null : !isTop && nowPts_1 > nowPts ? (
        <Image
          source={{ uri: downRedArrow }}
          className="w-3 h-2"
          resizeMode="contain"
        />
      ) : null}
    </View>
  );
};

export default ArrowV2;
