import { Badge } from "@models/Prizes/Prizes";
import ShieldBadge from "@modules/HallOfFame/V2/ShieldBadge";
import NewBadge from "@modules/HomeScreen/NewHome/NewBadge";
import NewBadgeGolden from "@modules/HomeScreen/NewHome/NewBadgeGolden";
import { formatWithCommas } from "@utils/number";
import { Text, useWindowDimensions, View } from "react-native";

export const Badge_Item_Height = 260;

interface Props {
  badge: Badge;
}

const BadgeCard: React.FC<Props> = ({ badge }) => {
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        width: width / 2,
        height: Badge_Item_Height,
        padding: 10,
      }}
    >
      <View className="flex-1 bg-[#343150] rounded-lg overflow-hidden  flex justify-center items-center p-4">
        <View
          style={{ flex: 1, aspectRatio: 200 / 260 }}
          className="relative flex justify-center items-center"
        >
          {badge.badgeId === "independent" ? (
            <NewBadge
              colorOne="#0085E0"
              colorTwo="#2C46C5"
              athleteImage={badge.athleteImage}
              unLockedHeight={100}
              percentageHidden={true}
            />
          ) : badge.badgeId === "relative" ? (
            <NewBadgeGolden
              colorOne="#EADAA6"
              colorTwo="#9C874E"
              athleteImage={badge.athleteImage}
              unLockedHeight={100}
              percentageHidden={true}
            />
          ) : (
            <ShieldBadge
              badgeId={badge.badgeId}
              athleteImage={badge.athleteImage}
              brandImage={badge.brandImage}
            />
          )}
          {/* <View className="absolute right-0 bottom-0">
            <Text className="text-[#FFFFFFA6] font-bold text-sm">x3</Text>
          </View> */}
        </View>
        <View className="h-4" />
        <Text
          className="text-white  text-center text-xs"
          style={{ fontFamily: "BaiJamjuree-Regular" }}
          numberOfLines={1}
        >
          {badge.name}
        </Text>
        {badge.baseValue ? (
          <Text
            className="text-[#FF556C] text-center  text-sm"
            style={{ fontFamily: "BaiJamjuree-Regular" }}
            numberOfLines={1}
          >
            Value: ₹{formatWithCommas(badge.baseValue)}
          </Text>
        ) : badge.merchendiseValue ? (
          <Text
            className="text-[#FF556C]  font-medium text-sm"
            style={{ fontFamily: "BaiJamjuree-Medium" }}
            numberOfLines={1}
          >
            Value: ₹{formatWithCommas(badge.merchendiseValue)}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default BadgeCard;
