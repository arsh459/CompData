import { View } from "react-native";
import { useBadgeContext } from "@providers/badges/BadgeProvider";
import { Badge } from "@models/Prizes/Prizes";
import TeamStats from "../NewHome/TeamStats";
import TeamRanking from "../NewHome/TeamRanking";
import TeamContribution from "../NewHome/TeamContribution";

const StatsSection = () => {
  const {
    badges,
    //  swipedBadge
  } = useBadgeContext();
  const currentBadge = badges[0] as Badge | undefined;

  return (
    <View className="px-4 bg-[#100F1A]">
      {currentBadge?.badgeId === "independent" ? (
        <View className="pt-4">
          <TeamStats />
          <View className="py-4">
            <TeamContribution />
          </View>
        </View>
      ) : currentBadge?.badgeId === "relative" ? (
        <View className="pb-4">
          <TeamRanking />
        </View>
      ) : null}
    </View>
  );
};

export default StatsSection;
