import Loading from "@components/loading/Loading";
import NestedScrollFlatList from "@components/NestedScrollFlatList";
import { useBadges } from "@hooks/badges/useBadges";
import { useCoachRank } from "@hooks/rank/useCoachRank";
import { UserRank } from "@models/Activity/Activity";
import { GameKPITarget } from "@models/Event/Event";
import PrizeCard from "@modules/Community/Prizes/PrizeCard";
import { useGameContext } from "@providers/game/GameProvider";
// import { useUserContext } from "@providers/user/UserProvider";
import { useState } from "react";
import { FlatList, View } from "react-native";
interface Props {
  sprintId?: string;
  roundId?: string;
  myUserRank?: UserRank;
  isGoalWidget?: boolean;
  hidePlayNow?: boolean;
  gameKPIs?: GameKPITarget[];
}

const PrizeList: React.FC<Props> = ({
  roundId,
  sprintId,
  myUserRank,
  isGoalWidget,
  hidePlayNow,
  gameKPIs,
}) => {
  // const { user } = useUserContext();
  const { game } = useGameContext();
  const { badges, fetched } = useBadges(game?.id);
  const { myCoachRank } = useCoachRank(game?.id, myUserRank?.coachCommunityId);
  const [viewWidth, setViewWidth] = useState(0);

  return (
    <>
      {fetched ? (
        <>
          <View
            className="h-60"
            onLayout={(e) => setViewWidth(e.nativeEvent.layout.width)}
          >
            <NestedScrollFlatList horizontal={true} width={viewWidth}>
              <FlatList
                data={badges}
                renderItem={({ item, index }) =>
                  item.badgeId !== "spotlight" ? (
                    <View key={`${item.id}-${index}`} className="pb-2 ">
                      <PrizeCard
                        badge={item}
                        sprintId={sprintId}
                        userRank={myUserRank}
                        teamRank={myCoachRank}
                        roundId={roundId}
                        hidePrizes={true}
                        isGoalWidget={isGoalWidget}
                        hidePlayNow={true}
                        gameKPIs={gameKPIs}
                      />
                    </View>
                  ) : null
                }
                keyExtractor={(item) => item.id}
                bounces={false}
                nestedScrollEnabled={true}
                style={{ width: viewWidth }}
                showsVerticalScrollIndicator={false}
              />
            </NestedScrollFlatList>
          </View>
        </>
      ) : (
        <View className="h-60 flex justify-center items-center">
          <Loading width="w-8" height="h-8" />
        </View>
      )}
    </>
  );
};

export default PrizeList;
