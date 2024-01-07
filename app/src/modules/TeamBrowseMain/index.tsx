import { FlatList, View, Text } from "react-native";

import { useGameContext } from "@providers/game/GameProvider";
import { getCurrentMonth } from "@utils/challange/challengeWeekUtils";
import { useEventCoachesV2 } from "@hooks/event/useEventCoachesV2";
import { CoachRank } from "@models/Activity/Activity";
import { TeamProvider } from "@providers/team/TeamProvider";
import Loading from "@components/loading/Loading";
import TeamBrowseCard from "@modules/TeamInvite/TeamBrowseCard";

const TeamBrowseMain = () => {
  const { game } = useGameContext();
  // const { teamLeader } = useTeamContext();
  const week = "overall";
  const month = getCurrentMonth(
    game?.configuration?.sprints,
    game?.configuration?.starts,
    game?.configuration?.challengeLength
  );
  // const { myCoachRank } = useCoachRank(game?.id, teamLeader?.uid);
  const { rankCoaches, onNext } = useEventCoachesV2(
    game?.id,
    true,
    week,
    month,
    undefined,
    undefined,
    undefined
  );

  // const { rankCoaches, loading, onNext } = useEventCoachesV2(
  //   game?.id,
  //   true,
  //   params?.currentRound?.id,
  //   params?.currentSprint?.id,
  //   after,
  //   10,
  //   undefined
  // );
  function renderItem({ item }: { item: CoachRank }) {
    return (
      <View className="bg-[#100F1A] flex-1">
        <TeamProvider selectedTeamId={item.coachEventId} initTeamMembers={4}>
          <TeamBrowseCard rankCoaches={item} />
        </TeamProvider>
      </View>
    );
  }
  const headerText = (
    <Text className="text-white text-center text-xl iphoneX:text-2xl font-bold ">
      {/* Hall of Fame */}
    </Text>
  );

  const keyExtractor = (item: CoachRank) => item.uid;

  return (
    <View className="px-4 bg-[#100F1A] flex-1">
      {true ? (
        <FlatList
          data={rankCoaches}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={onNext}
          bounces={false}
          className="bg-[#100F1A] flex-1 px-2"
          ListHeaderComponent={headerText}
        />
      ) : (
        <View className="flex-1 flex justify-center items-center">
          <Loading width="w-8" height="h-8" />
        </View>
      )}
    </View>
  );
};

export default TeamBrowseMain;
