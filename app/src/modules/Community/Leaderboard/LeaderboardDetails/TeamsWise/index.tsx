import { useEventCoachesV2 } from "@hooks/event/useEventCoachesV2";
import { CoachRank } from "@models/Activity/Activity";
import { useGameContext } from "@providers/game/GameProvider";
// import { useCallback, useState } from "react";
import { View, FlatList, Pressable, Text } from "react-native";
import Teams from "./Teams";
import StickyItem, {
  BottomTabHandler,
  // getItemState,
  ListFooterComponent,
  // stickyItemStateTypes,
} from "../StickyItem";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { getRank } from "@utils/rank/utils";
import JoinTheChallenge from "../JoinTheChallenge";

const ITEM_Height = 80;

interface Props {
  myCoachRank?: CoachRank;
  parentId?: string;
  after?: number;
  setCoachRank: (val: CoachRank) => void;
  isTeam?: boolean;
  currentSprint?: string;
  heightFromBottom: number;
  isRankingScreen: boolean;
}

const TeamsWise: React.FC<Props> = ({
  myCoachRank,
  parentId,
  after,
  setCoachRank,
  isTeam,
  currentSprint,
  heightFromBottom,
  isRankingScreen,
}) => {
  const { params } = useGameContext();
  // const [stickyItemState, setStickyItemState] =
  //   useState<stickyItemStateTypes>("hidden");
  //parentId === gameId true
  const { rankCoaches, loading, onNext } = useEventCoachesV2(
    parentId,
    true,
    "overall",
    currentSprint,
    after,
    10,
    myCoachRank
  );

  const renderItem = ({ item, index }: { item: CoachRank; index: number }) => {
    const rank = getRank(item, "overall", currentSprint);
    return (
      <Pressable
        onPress={() => {
          setCoachRank(item);
          weEventTrack("ranking_clickTeam", {
            uid: item.uid,
            teamName: item?.teamName ? item.teamName : "no_teamName",
            teamRank: rank,
          });
        }}
      >
        <Teams
          rank={rank}
          each={item}
          isMe={item.uid === myCoachRank?.uid}
          currentSprint={currentSprint}
        />
      </Pressable>
    );
  };

  const getItemLayout = (
    _: ArrayLike<CoachRank> | null | undefined,
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
  //     setStickyItemState(getItemState(info.viewableItems, myCoachRank));
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
          <View className="flex-1 relative ">
            <FlatList
              data={rankCoaches}
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
            {myCoachRank ? (
              <StickyItem
                coachRank={myCoachRank}
                stickyItemState={"bottom-0"}
                onPress={() => myCoachRank && setCoachRank(myCoachRank)}
                currentSprint={currentSprint}
              />
            ) : isRankingScreen ? (
              <JoinTheChallenge />
            ) : null}
          </View>

          <BottomTabHandler
            heightFromBottom={heightFromBottom}
            color="#64435DDB"
          />
        </>
      )}
    </>
  );
};

export default TeamsWise;
