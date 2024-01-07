import { View, Text, TouchableOpacity } from "react-native";

import RankingButton from "./RankingButton";
import { useTeamProgressContext } from "@providers/teamProgress/TeamProgressProvider";
import { useGameContext } from "@providers/game/GameProvider";
import {
  getCurrentCoachRank,
  getFPsToDisplay,
  getRankToDisplay,
} from "./utils";
import { useNavigation } from "@react-navigation/native";
import { useExactCoachRank } from "@hooks/activity/useExactCoachRank";
import clsx from "clsx";

const TeamRanking = () => {
  const { params, game } = useGameContext();
  const { coachRank } = useTeamProgressContext();

  const { preRank, afterRank, afterRank2, myRank } = getCurrentCoachRank(
    coachRank,
    params?.currentSprint?.id
  );

  const comp1 = useExactCoachRank(game?.id, preRank, params?.currentSprint?.id);
  const comp2 = useExactCoachRank(
    game?.id,
    afterRank,
    params?.currentSprint?.id
  );
  const comp3 = useExactCoachRank(
    game?.id,
    afterRank2,
    params?.currentSprint?.id
  );

  const navigation = useNavigation();

  const onClick = () => navigation.navigate("Ranking");

  return (
    <>
      <View className="flex flex-row items-center justify-between px-4 py-6">
        <Text className="text-white text-lg iphoneX:text-xl font-semibold">
          Your Team Ranking
        </Text>
        <TouchableOpacity onPress={onClick}>
          <Text className="text-xs text-[#FF5F75] font-semibold">View All</Text>
        </TouchableOpacity>
      </View>
      {comp1?.competition ? (
        <View className={clsx(!myRank ? "px-4 pb-4" : "px-6")}>
          <RankingButton
            onClick={onClick}
            fpPoints={getFPsToDisplay(
              comp1.competition,
              params?.currentSprint?.id
            )}
            rank={getRankToDisplay(
              comp1.competition,
              params?.currentSprint?.id
            )}
            teamName={
              comp1.competition?.teamName
                ? comp1.competition?.teamName
                : "Game Team"
            }
            bgColor={myRank ? "#1F1E27" : "#413E5E"}
            paddingStyle={
              myRank
                ? "py-4 rounded-xl px-4 text-xs bg-gt"
                : "py-4 rounded-xl px-4 text-xs"
            }
          />
        </View>
      ) : null}

      {coachRank && myRank ? (
        <View className="px-4 py-2">
          <RankingButton
            onClick={onClick}
            fpPoints={getFPsToDisplay(coachRank, params?.currentSprint?.id)}
            rank={getRankToDisplay(coachRank, params?.currentSprint?.id)}
            teamName={
              coachRank.teamName
                ? coachRank.teamName
                : coachRank.authorName
                ? `${coachRank.authorName}'s Team`
                : "Your Team"
            }
            bgColor="#413E5E"
            paddingStyle="py-4 rounded-xl px-4 text-xs bg-gt"
          />
        </View>
      ) : null}

      {comp2?.competition ? (
        <View className="px-6 pb-2">
          <RankingButton
            onClick={onClick}
            fpPoints={getFPsToDisplay(
              comp2.competition,
              params?.currentSprint?.id
            )}
            rank={getRankToDisplay(
              comp2.competition,
              params?.currentSprint?.id
            )}
            teamName={
              comp2.competition?.teamName
                ? comp2.competition?.teamName
                : "Game team"
            }
            bgColor="#1F1E27"
            isUp={true}
            paddingStyle="py-4 rounded-xl px-4 text-xs"
          />
        </View>
      ) : null}

      {comp3?.competition ? (
        <View className="px-6 pb-0">
          <RankingButton
            onClick={onClick}
            fpPoints={getFPsToDisplay(
              comp3.competition,
              params?.currentSprint?.id
            )}
            rank={getRankToDisplay(
              comp3.competition,
              params?.currentSprint?.id
            )}
            teamName={comp3.competition?.teamName}
            bgColor="#1F1E27"
            isUp={true}
            paddingStyle="py-5 rounded-xl px-4 text-xs"
          />
        </View>
      ) : null}
    </>
  );
};

export default TeamRanking;
