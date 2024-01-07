import { View, Text } from "react-native";

import NewBadge from "@modules/HomeScreen/NewHome/NewBadge";
import NewBadgeGolden from "@modules/HomeScreen/NewHome/NewBadgeGolden";
import { useBadgeContext } from "@providers/badges/BadgeProvider";
import { Badge } from "@models/Prizes/Prizes";
import RewardBadgeStatic from "./RewardBadgeStatic";
import { useUserContext } from "@providers/user/UserProvider";
import BlurBG from "@components/BlurBG";
interface Props {
  symbol?: string;
}
const RewardBadge: React.FC<Props> = ({ symbol }) => {
  const { badges } = useBadgeContext();
  const { user } = useUserContext();

  const badge1 = badges[0] as Badge | undefined;
  const badge2 = badges[1] as Badge | undefined;

  const relativeBadges = user?.relativeBadgesWon?.length
    ? user?.relativeBadgesWon?.length
    : 0;
  const independentBadgesWon = user?.independentBadgesWon?.length
    ? user?.independentBadgesWon?.length
    : 0;

  return (
    <View className="flex justify-center items-center flex-1">
      <View className="flex flex-row justify-center items-center">
        <View className="w-1/4 relative">
          {badge2 ? (
            <RewardBadgeStatic badge={badge2} />
          ) : (
            <NewBadgeGolden colorOne={"#EADAA6"} colorTwo={"#9C874E"} />
          )}

          <Text
            className="absolute right-0 bottom-0 text-[#FFFFFF8C]"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {badge2?.badgeId === "independent"
              ? `x${independentBadgesWon}`
              : `x${relativeBadges}`}
          </Text>
        </View>
        <Text className="text-[#FFFFFF8C] text-lg font-extrabold  self-center px-4">
          {symbol}
        </Text>
        <View className="w-1/4 relative">
          {badge1 ? (
            <RewardBadgeStatic badge={badge1} />
          ) : (
            <NewBadge
              colorOne={"#859EFF"}
              colorTwo={"#2C46C5"}
              unLockedHeight={1}
            />
          )}
          <Text
            className="absolute right-0 bottom-0 text-[#FFFFFF8C]"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {badge1?.badgeId === "independent"
              ? `x${independentBadgesWon}`
              : `x${relativeBadges}`}
          </Text>
        </View>
      </View>
      <View className="relative">
        <BlurBG
          fallbackColor="#7485F175"
          blurAmount={20}
          blurType="light"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 6,
            marginVertical: 12,
          }}
        />
        <Text
          className="text-white text-base font-bold text-center p-4"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {`You have won Total ${independentBadgesWon + relativeBadges} cards`}
        </Text>
      </View>
    </View>
  );
};

export default RewardBadge;
