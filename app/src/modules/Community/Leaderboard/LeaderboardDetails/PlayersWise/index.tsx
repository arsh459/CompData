import { UserRank } from "@models/Activity/Activity";
import { View, FlatList, Pressable, Text } from "react-native";
import { useTeamContext } from "@providers/team/TeamProvider";
import Player from "./Player";
import { useGameContext } from "@providers/game/GameProvider";
import { useEventRanksV2 } from "@hooks/event/useEventRanksV2";
// import { useCallback, useState } from "react";
import StickyItem, {
  BottomTabHandler,
  // getItemState,
  ListFooterComponent,
  // stickyItemStateTypes,
} from "../StickyItem";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { getRank } from "@utils/rank/utils";
import JoinTheChallenge from "../JoinTheChallenge";
// import { useNavigation } from "@react-navigation/native";

const ITEM_Height = 80;

interface Props {
  myUserRank?: UserRank;
  parentId?: string;
  setUserRank: (val: UserRank) => void;
  currentSprint?: string;
  heightFromBottom: number;
  isRankingScreen: boolean;
}

const PlayersWise: React.FC<Props> = ({
  myUserRank,
  parentId,
  setUserRank,
  currentSprint,
  heightFromBottom,
  isRankingScreen,
}) => {
  const { teamLeader } = useTeamContext();
  const { params } = useGameContext();
  // const [stickyItemState, setStickyItemState] =
  //   useState<stickyItemStateTypes>("hidden");

  const { rankMembers, loading, onNext } = useEventRanksV2(
    parentId,
    teamLeader?.uid,
    10,
    "overall",
    currentSprint,
    myUserRank
  );

  const renderItem = ({ item, index }: { item: UserRank; index: number }) => {
    const rank = getRank(item, "overall", currentSprint);
    return (
      <Pressable
        onPress={() => {
          setUserRank(item);
          weEventTrack("ranking_clickPlayer", {
            uid: item.uid,
            playerName: item?.authorName ? item.authorName : "no_playerName",
            playerRank: rank,
          });
        }}
      >
        <Player
          each={item}
          rank={rank}
          isMe={myUserRank?.uid === item.uid}
          currentSprint={currentSprint}
        />
      </Pressable>
    );
  };

  const getItemLayout = (
    _: ArrayLike<UserRank> | null | undefined,
    index: number
  ) => {
    return {
      length: ITEM_Height,
      offset: ITEM_Height * index,
      index,
    };
  };

  // const onViewableItemsChanged = useCallback(
  //   (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
  //     setStickyItemState(getItemState(info.viewableItems, myUserRank));
  //   },
  //   []
  // );

  return (
    <>
      {params?.daysElapsed && !params.currentRound ? (
        <View className="flex pt-4 justify-center items-center">
          <Text
            style={{ fontFamily: "BaiJamjuree-Bold" }}
            className="text-white text-2xl text-center"
          >
            Game has ended
          </Text>
        </View>
      ) : (
        <>
          <View className="flex-1 relative">
            <FlatList
              data={rankMembers}
              renderItem={renderItem}
              ListFooterComponent={ListFooterComponent(loading)}
              keyExtractor={(item) => item.uid}
              viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
              // onViewableItemsChanged={onViewableItemsChanged}
              getItemLayout={getItemLayout}
              onEndReachedThreshold={0.3}
              onEndReached={onNext}
              bounces={false}
              refreshing={loading}
              // ListHeaderComponent={<HallOfFameHeader />}
            />
            <StickyItem
              userRank={myUserRank}
              stickyItemState="bottom-0"
              onPress={() => myUserRank && setUserRank(myUserRank)}
              currentSprint={currentSprint}
            />
            {teamLeader && myUserRank ? (
              <StickyItem
                userRank={myUserRank}
                stickyItemState="bottom-0"
                onPress={() => myUserRank && setUserRank(myUserRank)}
                currentSprint={currentSprint}
              />
            ) : isRankingScreen ? (
              <JoinTheChallenge />
            ) : null}
          </View>
          <BottomTabHandler
            heightFromBottom={heightFromBottom}
            // heightFromBottom={200}
            color="#413E5EDB"
          />
        </>
      )}
    </>
  );
};

export default PlayersWise;
