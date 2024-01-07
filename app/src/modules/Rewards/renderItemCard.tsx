import { View, Text } from "react-native";

import NewBadge from "@modules/HomeScreen/NewHome/NewBadge";
import { Badge } from "@models/Prizes/Prizes";
import NewBadgeGolden from "@modules/HomeScreen/NewHome/NewBadgeGolden";
// import { useBadgeWinner } from "@hooks/badges/useBadgeWinner";
// import { useAuthContext } from "@providers/auth/AuthProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { hasWon } from "./utils";

interface Props {
  item: Badge;
  width: number;
}

const RenderItemCard: React.FC<Props> = ({ item, width }) => {
  //   const { state } = useAuthContext();

  //   const { badgeWinner } = useBadgeWinner(state.gameId, item.id, state.uid);
  const { user } = useUserContext();

  const badgeWinner = hasWon(
    item.id,
    user?.independentBadgesWon,
    user?.relativeBadgesWon
  );

  return (
    <View className="flex flex-1  py-6 items-center">
      <View className="m-2" style={{ width: width ? width / 3 : "40%" }}>
        {item.badgeId === "independent" ? (
          <NewBadge
            percentageHidden={true}
            unLockedHeight={100}
            disabled={!badgeWinner}
            athleteImage={item.athleteImage}
          />
        ) : (
          <NewBadgeGolden
            percentageHidden={true}
            unLockedHeight={100}
            colorOne="#EADAA6"
            colorTwo="#9C874E"
            disabled={!badgeWinner}
            athleteImage={item.athleteImage}
          />
        )}
        <Text
          style={{ fontFamily: "BaiJamjuree-Bold" }}
          className="text-[#fff] font-semibold  pt-2 text-center text-sm"
        >
          {item.name}
        </Text>
      </View>
    </View>
  );
};

export default RenderItemCard;
