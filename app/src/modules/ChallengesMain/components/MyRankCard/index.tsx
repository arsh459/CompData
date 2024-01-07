import { View } from "react-native";

import RankCard from "../RankCard";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const MyRankCard: React.FC<{
  myRankVisible?: "up" | "down" | "sceen";
}> = ({ myRankVisible }) => {
  const { visibility, myRank } = useUserStore((state) => {
    const usrLevel = state.user?.userLevelV2 ? state.user?.userLevelV2 : 1;

    if (
      state.levelsCache[state.selectedLevelNumString].lvlNumber === usrLevel
    ) {
      return { visibility: true, myRank: state.myRank };
    }

    return { visibility: false, myRank: state.myRank };
  }, shallow);

  return (
    <>
      {myRank && myRankVisible === "down" && visibility ? (
        <View className="absolute left-0 right-0 bottom-0">
          <RankCard item={myRank} isMe={true} />
        </View>
      ) : null}
    </>
  );
};

export default MyRankCard;
