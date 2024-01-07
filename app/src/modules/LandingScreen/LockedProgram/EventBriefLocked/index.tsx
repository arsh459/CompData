import ShowMore from "@components/ShowMore";
import UserImage from "@components/UserImage";
import { useUserV2 } from "@hooks/auth/useUserV2";
import { useGameContext } from "@providers/game/GameProvider";
import { useTeamContext } from "@providers/team/TeamProvider";
import clsx from "clsx";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Autolink from "react-native-autolink";
import EventMedia from "./EventMedia";
import EventSubBrief from "./EventSubBrief";

interface Props {}

const EventBriefLocked: React.FC<Props> = ({}) => {
  const { game } = useGameContext();
  const { team, teamLeader } = useTeamContext();
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const leader = teamLeader ? teamLeader : useUserV2(game?.ownerUID).user;

  return (
    <>
      <EventMedia />
      <View className="bg-[#1F1F1F]/50 border border-[#373737] mx-4 my-2 iphoneX:my-4 p-2 iphoneX:p-4 rounded-xl">
        <View className="relative z-0">
          <Text
            className={clsx(
              "text-[#CECECE]/80 text-lg iphoneX:text-2xl font-bold",
              showDescription && "pb-2 iphoneX:pb-4"
            )}
          >
            {game?.courseGoal}
            <Text className="text-[#D74559] whitespace-nowrap">
              {game?.courseGoalPrimary}
            </Text>
            <Text
              className={clsx(
                "rounded-full px-2 iphoneX:px-4 py-0.5 iphoneX:py-1",
                "text-[10px] iphoneX:text-xs whitespace-nowrap opacity-0"
              )}
            >
              Show {showDescription ? "Less" : "More"}
            </Text>
          </Text>
          <Pressable
            className={clsx(
              "rounded-full px-2 iphoneX:px-4 py-0.5 iphoneX:py-1 absolute right-2",
              showDescription
                ? "bg-white bottom-3 iphoneX:bottom-5"
                : "bg-[#484848] bottom-1"
            )}
            onPress={() => {
              setShowDescription(!showDescription);
            }}
          >
            <Text
              className={clsx(
                "text-[10px] iphoneX:text-xs whitespace-nowrap",
                showDescription ? "text-[#404040]" : "text-white"
              )}
            >
              Show {showDescription ? "Less" : "More"}
            </Text>
          </Pressable>
        </View>
        {showDescription && game?.description ? (
          <Autolink
            text={game.description}
            renderText={(text) => (
              <Text className="text-[#EBEBEB] text-xs iphoneX:text-base prose whitespace-pre-wrap">
                {text}
              </Text>
            )}
            linkStyle={{ color: "blue" }}
          />
        ) : null}
      </View>
      <EventSubBrief
        weight={
          game?.equipmentNeed
            ? `Need ${game?.equipmentNeed}`
            : "No Equipment needed"
        }
        workout={
          game?.nbWorkouts
            ? `You get ${game?.nbWorkouts} workouts`
            : "You get 45+ workouts"
        }
        teams={
          team && team.students
            ? `${team.students} players in team`
            : game && game.students
            ? `${game?.students} teams in game`
            : ""
        }
        worth={game?.awardsWorth}
      />
      <View className="bg-[#1F1F1F]/25 border border-[#373737] mx-4 my-2 iphoneX:my-4 p-2 iphoneX:p-4 rounded-xl relative z-0">
        <View className="flex flex-row items-center mb-2 iphoneX:mb-4">
          <View className="flex-none">
            <UserImage
              image={leader?.profileImage}
              name={leader?.name}
              width="w-12 iphoneX:w-14"
              height="h-12 iphoneX:h-14"
            />
          </View>
          <Text className="text-white pl-2 iphoneX:text-xl font-semibold">
            Created by {leader?.name}
          </Text>
        </View>
        <ShowMore
          text={leader?.bio}
          textSize="text-xs iphoneX:text-base"
          buttonColor="text-[#D74559]"
          textColor="text-[#EBEBEB]"
        />
      </View>
    </>
  );
};

export default EventBriefLocked;
