import { View } from "react-native";
import { useUserRanks } from "@hooks/challenge/useUserRanks";
import { FlashList, ViewToken } from "@shopify/flash-list";
import { UserRankV2 } from "@models/Rounds/interface";
import RankCard from "./components/RankCard";
import Loading from "@components/loading/Loading";
// import { useAuthContext } from "@providers/auth/AuthProvider";
// import { useUserRank } from "@hooks/challenge/useUserRank";
import { useState } from "react";
import LeagueSelector from "./components/LeagueSelector/LeagueSelector";
import LeaguePlaceholder from "./components/LeagueSelector/LeaguePlaceholder";
import { getChallengeTimingString } from "./utils";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import ChallengeNotStarted from "./ChallengeNotStarted";
import MyRankCard from "./components/MyRankCard";

const LeaderboardSectionHelper: React.FC<{
  // levelsObj: LevelsObjInterface;
  // myRank?: UserRankV2;
}> = ({}) => {
  const { uid, rank } = useUserStore(
    (state) => ({
      uid: state.user?.uid,
      rank: state.myRank?.rank ? state.myRank?.rank : -1,
    }),
    shallow
  );

  const { myRankIndex, intialFetch, userRanks, onNext } = useUserRanks(uid);
  const [myRankVisible, setMyRankVisible] = useState<"up" | "down" | "sceen">();

  const [forceIndexUpdate, setForceIndexUpdate] = useState<
    number | undefined
  >();
  const [forceIndexRefresh, setForceIndexRefresh] = useState<number>(0);

  const { goToMyLeague } = useUserStore((state) => {
    return {
      goToMyLeague: state.goToMyLeague,
    };
  }, shallow);

  const onForceIndexUpdate = () => {
    const newIndex = goToMyLeague();

    setForceIndexUpdate(newIndex);
    setForceIndexRefresh((p) => p + 1);
  };

  const renderItem = ({ item }: { item: UserRankV2 }) => (
    <RankCard
      item={item}
      // lvlBreakUp={item.lvlBreakUp ? levelsObj[item.lvlBreakUp] : undefined}
      isMe={item.uid === uid}
    />
  );

  const keyExtractor = (item: UserRankV2) =>
    `${item.uid}${item.lvlBreakUp ? "-" + item.lvlBreakUp : ""}`;

  const onViewChangedFunction = (info: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => {
    if (info && rank > 0 && info.viewableItems[info.viewableItems.length - 1]) {
      const myIndex = info.viewableItems.findIndex(
        (each) => each.item.uid === uid
      );
      const nonScreen =
        info.viewableItems[info.viewableItems.length - 1].item.rank > rank
          ? "up"
          : "down";
      setMyRankVisible(myIndex !== -1 ? "sceen" : nonScreen);
    }
  };

  return (
    <View className="flex-1 relative z-0 bg-[#343150]">
      <FlashList
        data={userRanks}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        bounces={false}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.4}
        onEndReached={onNext}
        estimatedItemSize={100}
        ItemSeparatorComponent={() => <View className="h-px bg-white/20" />}
        ListFooterComponent={
          intialFetch ? (
            <View className="flex-1 flex items-center justify-center py-8">
              <Loading width="w-12" height="h-12" />
            </View>
          ) : !userRanks.length ? null : null // </Text> //   No data to show // <Text className="text-3xl text-white text-center font-bold my-8">
        }
        ListHeaderComponent={
          <LeagueSelector
            forceIndexRefresh={forceIndexRefresh}
            forceIndex={forceIndexUpdate}
          />
        }
        stickyHeaderIndices={myRankIndex}
        onViewableItemsChanged={onViewChangedFunction}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
      <LeaguePlaceholder onCTA={onForceIndexUpdate} />
      <MyRankCard myRankVisible={myRankVisible} />
      {/* {myRank && myRankVisible === "down" ? (
        <View className="absolute left-0 right-0 bottom-0">
          <RankCard item={myRank} isMe={true} />
        </View>
      ) : null} */}
    </View>
  );
};

const LeaderboardSection = () => {
  // const { state } = useAuthContext();
  // const { rank } = useUserRank(state.uid || "");
  // const { loading } = useLevels();
  const { start, end, levelsExist } = useUserStore((state) => {
    return {
      start: state.currentRound?.start,
      end: state.currentRound?.end,
      levelsExist: state.levelsArray.length ? true : false,
    };
  }, shallow);
  const startIn = getChallengeTimingString(start, end);

  return !levelsExist ? (
    <View className="flex-1 flex items-center justify-center py-8">
      <Loading width="w-12" height="h-12" />
    </View>
  ) : startIn ? (
    <>
      <ChallengeNotStarted startIn={startIn} />
    </>
  ) : (
    <LeaderboardSectionHelper />
  );
};

export default LeaderboardSection;
