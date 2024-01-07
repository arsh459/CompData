import WaveBtn from "@components/Buttons/WaveBtn";
import { eyeIcon, playIcon } from "@constants/imageKitURL";
import { useCompetition } from "@hooks/activity/useCompetition";
import { CoachRank, UserRank } from "@models/Activity/Activity";
import { GameKPITarget } from "@models/Event/Event";
import { Badge, BadgeAward } from "@models/Prizes/Prizes";
import { useGameContext } from "@providers/game/GameProvider";
// import { useTeamContext } from "@providers/team/TeamProvider";
import { useUserContext } from "@providers/user/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { getCompetitionParams, getPtsAndProgress } from "@utils/prizes/utils";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import AllPrizes from "./AllPrizes";
import BadgeSelector from "./Badges/BadgeSelector";
import FPMeater from "./FPMeater";
import WinningFP from "./WinningFP";

interface Props {
  badge: BadgeAward | Badge;
  roundId?: string;
  sprintId?: string;
  userRank?: UserRank;
  teamRank?: CoachRank;
  hidePrizes?: boolean;
  isGoalWidget?: boolean;
  hidePlayNow?: boolean;
  gameKPIs?: GameKPITarget[];
}

const PrizeCard: React.FC<Props> = ({
  badge,
  roundId,
  sprintId,
  userRank,
  teamRank,
  hidePrizes,
  isGoalWidget,
  hidePlayNow,
  gameKPIs,
}) => {
  const { user } = useUserContext();
  const { game } = useGameContext();
  // const { team } = useTeamContext();
  const navigation = useNavigation();

  // const isWoned: boolean = badge.hasOwnProperty("state") ? true : false;
  const isWoned: boolean = false;
  const [prizesHidden, setHidePrizes] = useState<boolean>(
    hidePrizes ? true : false
  );

  const { badgeTypes, rank, frequency } = getCompetitionParams(badge);

  const { competition } = useCompetition(
    game?.id,
    rank,
    rank,
    badgeTypes,
    roundId ? roundId : "overall",
    sprintId,
    frequency
  );

  const { progress, pts, total, percent } = getPtsAndProgress(
    user,
    userRank,
    teamRank,
    competition,
    badge.badgeId,
    roundId,
    sprintId,
    gameKPIs,
    frequency === "week" ? "weekly" : "monthly",
    game?.configuration?.gameType
  );

  return (
    <View className="bg-[#434343] rounded-xl my-1">
      <View className="flex-1 lex flex-row p-2 iphoneX:p-4">
        <View className="w-[28%] flex justify-between items-center">
          <View className="w-full aspect-square">
            <BadgeSelector badgeType={badge.badgeId} />
          </View>
          <Text
            className={clsx(
              isGoalWidget ? "text-sm" : "text-xs iphoneX:text-sm font-bold",
              "text-center text-white pt-2.5 iphoneX:pt-4"
            )}
          >
            {badge.name}
          </Text>
        </View>
        <View className="w-[72%] flex justify-between items-center pl-2.5 iphoneX:pl-4">
          <View className="w-full pb-2.5 iphoneX:pb-4">
            {isWoned ? (
              <Text
                className={clsx(
                  isGoalWidget
                    ? "text-xs iphoneX:text-sm"
                    : "text-sm iphoneX:text-lg",
                  "p-2, text-white"
                )}
              >
                Congatutions you have earned the{" "}
                <Text className="font-bold capitalize text-white">
                  {badge.name}
                </Text>{" "}
                Badge.
              </Text>
            ) : badge.winner ? (
              <WinningFP
                badgeType={badge.badgeId}
                image={badge.winner.image}
                name={badge.winner.winnerName}
                points={badge.winner.points}
                myPoints={pts}
                isMe={badge.winner.uid === user?.uid}
                isGoalWidget={isGoalWidget}
              />
            ) : (
              <FPMeater
                progress={progress < 10 ? 10 : progress > 100 ? 100 : progress}
                total={total}
                pts={pts}
                canFinish={competition ? false : true}
                percent={percent}
                description={badge.description}
                isGoalWidget={isGoalWidget}
              />
            )}
          </View>
          <View className="self-end flex flex-row items-center">
            {hidePrizes === true ? (
              <Pressable
                className={clsx(
                  "px-2 iphoneX:px-3 py-2 rounded-full bg-white flex flex-row justify-center items-center"
                )}
                onPress={() => setHidePrizes((p) => !p)}
              >
                <Image
                  source={{ uri: eyeIcon }}
                  className="w-2 iphoneX:w-3 h-2 iphoneX:h-3"
                  resizeMode="contain"
                />
                <Text
                  className={clsx(
                    isGoalWidget ? "text-xs" : "text-xs",
                    "pl-1 whitespace-nowrap"
                  )}
                >
                  {prizesHidden ? "Show Prizes" : "Hide Prizes"}
                </Text>
              </Pressable>
            ) : null}
            {progress === 100 && !competition && false ? (
              <View className="w-28 iphoneX:w-32">
                {
                  <WaveBtn
                    text="Claimed"
                    onPress={() => {}}
                    color1="#6AA0D1"
                    color2="#5FABC2"
                    fontsStyle={clsx(
                      isGoalWidget
                        ? "text-[8px] iphoneX:text-[9px] p-1 iphoneX:p-2"
                        : "text-[10px] iphoneX:text-xs p-2 iphoneX:p-4",
                      "whitespace-nowrap text-white"
                    )}
                    showWave={false}
                  />
                }
              </View>
            ) : hidePlayNow ? null : (
              <LinearGradient
                colors={["#6AA0D1", "#5FABC2"]}
                className="ml-1 iphoneX:ml-2 rounded-full"
              >
                <Pressable
                  className={clsx(
                    "px-4 py-2 flex flex-row justify-center items-center"
                  )}
                  onPress={() =>
                    navigation.navigate("Workout", {
                      badgeId: badge.id,
                      // gameId: game ? game.id : "",
                      // teamId: team ? team.id : "",
                    })
                  }
                >
                  <Image
                    source={{ uri: playIcon }}
                    className="w-2 iphoneX:w-2.5 h-2 iphoneX:h-2.5"
                    resizeMode="contain"
                  />
                  <Text
                    className={clsx(
                      isGoalWidget ? "text-sm" : "text-sm",
                      "pl-2 whitespace-nowrap text-white font-medium"
                    )}
                  >
                    Play Now
                  </Text>
                </Pressable>
              </LinearGradient>
            )}
          </View>
        </View>
      </View>
      {badge.prizes.length > 0 && !prizesHidden ? (
        <View className="p-2">
          <AllPrizes
            prizes={badge.prizes}
            badgeName={badge.name}
            isGoalWidget={isGoalWidget}
          />
        </View>
      ) : null}
    </View>
  );
};

export default PrizeCard;
