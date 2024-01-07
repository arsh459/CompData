import UserProfile from "@components/UserProfile";
import { useUserV2 } from "@hooks/auth/useUserV2";
import { useUserRank } from "@hooks/rank/useUserRank";
import { getBorderColor } from "@modules/Community/Leaderboard/utils";
import ArrowV2 from "@modules/Community/Leaderboard/V2/ArrowV2";
import { useGameContext } from "@providers/game/GameProvider";
import { useTeamContext } from "@providers/team/TeamProvider";
import { getDateStrings } from "@utils/leaderboard/utils";
import { getPointsToShow, getRank } from "@utils/rank/utils";
import { View, Text } from "react-native";

interface Props {
  each: string;
}

const TeamPlayer: React.FC<Props> = ({ each }) => {
  const { params, selectedGameId } = useGameContext();
  const { myUserRank } = useUserRank(selectedGameId, each);
  const rank = getRank(myUserRank, "overall", params?.currentSprint?.id);
  const pts =
    myUserRank &&
    getPointsToShow(myUserRank, "overall", params?.currentSprint?.id);

  const { yesterday, dayBefore } = getDateStrings();
  const { user } = useUserV2(each);
  const { team } = useTeamContext();

  return (
    <View
      className="flex flex-row items-center p-4 my-1 border rounded-xl bg-[#292832] mx-4"
      style={{ borderColor: getBorderColor(rank) }}
    >
      {myUserRank && (
        <View className="flex items-center mr-3">
          <ArrowV2
            isTop={true}
            each={myUserRank}
            yesterday={yesterday}
            dayBefore={dayBefore}
          />
          <Text
            className="text-white font-medium text-sm"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            {rank}
          </Text>
          <ArrowV2
            isTop={false}
            each={myUserRank}
            yesterday={yesterday}
            dayBefore={dayBefore}
          />
        </View>
      )}

      <UserProfile user={user} size={40} />
      <View className="px-3 flex-1 ">
        <View className="flex flex-row items-center">
          <Text
            style={{ fontFamily: "BaiJamjuree-Bold" }}
            numberOfLines={1}
            className="text-white font-medium text-base"
          >
            {user?.name}
          </Text>
        </View>
        <Text
          style={{ fontFamily: "BaiJamjuree-Bold" }}
          numberOfLines={1}
          className="text-xs text-white"
        >
          @{team?.name}
        </Text>
      </View>
      <View className="flex flex-row">
        <View className=" pl-1 flex flex-row justify-between items-center">
          <Text
            style={{ fontFamily: "BaiJamjuree-Bold" }}
            className="text-white text-center text-lg font-medium"
          >
            {pts} FP
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TeamPlayer;
