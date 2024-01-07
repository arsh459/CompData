import { UserRank } from "@models/Activity/Activity";
import {
  View,
  FlatList,
  Pressable,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useTeamContext } from "@providers/team/TeamProvider";
import { useGameContext } from "@providers/game/GameProvider";
// import { useCallback, useState } from "react";
// import {
//   getItemState,
//   stickyItemStateTypes,
// } from "@modules/Community/Leaderboard/LeaderboardDetails/StickyItem";
import TeamPlayer from "./TeamPlayer";

const ITEM_Height = 80;

interface Props {
  myUserRank?: UserRank;
  parentId?: string;
  isTeam?: boolean;
  ListHeaderComponent?: () => JSX.Element;
  handleScroll: (val: number) => void;
}

const TeamPlayersWise: React.FC<Props> = ({
  myUserRank,
  parentId,
  ListHeaderComponent,
  handleScroll,
}) => {
  const { team } = useTeamContext();
  const { params } = useGameContext();
  // const [stickyItemState, setStickyItemState] =
  //   useState<stickyItemStateTypes>("hidden");

  const renderItem = (item: string, index: number) => {
    return (
      <Pressable>
        <TeamPlayer each={item} />
      </Pressable>
    );
  };

  const getItemLayout = (
    _: ArrayLike<string> | null | undefined,
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
        <FlatList
          data={team?.enrolledUserUIDs}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item) => item}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 100 }}
          // onViewableItemsChanged={onViewableItemsChanged}
          getItemLayout={getItemLayout}
          onEndReachedThreshold={0.3}
          className="flex-1"
          bounces={false}
          ListHeaderComponent={ListHeaderComponent}
          onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) =>
            handleScroll(e.nativeEvent.contentOffset.y)
          }
        />
      )}
    </>
  );
};

export default TeamPlayersWise;
