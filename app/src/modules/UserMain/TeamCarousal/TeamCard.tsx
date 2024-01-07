import MembersImage from "@components/MembersImage";
import { useSelectedEvent } from "@hooks/event/useSelectedEvent";
import { EventInterface } from "@models/Event/Event";
import { useTeamMembers } from "@providers/team/hooks/useTeamMembers";
import { getPrefixAndSuffix } from "@utils/challange/PrefixAndSuffix";
import { nFormatter } from "@utils/number";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TouchableOpacity, Image } from "react-native";

interface Props {
  team: EventInterface;
}

const TeamCard: React.FC<Props> = ({ team }) => {
  const { selectedEvent } = useSelectedEvent(team?.parentId);
  const { members } = useTeamMembers(team.id, true, 4);

  const { prefix, suffix } = getPrefixAndSuffix(
    selectedEvent?.eventStarts,
    selectedEvent?.challengeLength,
    selectedEvent?.sprintLength,
    selectedEvent?.roundLength
  );

  return (
    <LinearGradient
      colors={["#ffffff", "#f5f5f4"]}
      start={[0, 0]}
      end={[1, 0]}
      className="border border-[#C2C2C2] rounded-2xl p-4 my-4"
    >
      <Text className="text-2xl font-bold italic text-[#C2C2C2] line-clamp-1">
        {team?.name}
      </Text>
      <View className="my-4 -mx-4 border-b border-[#C2C2C2]" />
      <View className="flex flex-row justify-center items-center text-center">
        <View className="flex-1 flex flex-col justify-center items-center">
          <MembersImage members={members} size="small" hidePlusOthers={true} />
          <Text className="pt-2 text-[#C2C2C2]">
            {`${team.students ? team.students : 0} Players`}
          </Text>
        </View>
        <View className="flex-1 flex flex-col justify-center items-center">
          <Text className="text-[#ED7760] max-w-[100px]">{prefix}</Text>
          <Text className="text-xl text-[#C2C2C2]">{suffix}</Text>
        </View>
      </View>
      <View className="my-4 -mx-4 border-b border-[#C2C2C2]" />
      <View className="flex flex-row justify-between items-center text-lg font-bold">
        <Text
          className={clsx(
            "flex flex-row items-center bg-clip-text text-lg font-bold text-[#F19B38]",
            "bg-gradient-to-b from-[#F19B38] to-[#F15454]"
          )}
        >
          <Image
            className="pr-1 w-3 h-3"
            resizeMode="contain"
            source={{
              uri: "https://img.icons8.com/ios-glyphs/20/F19B38/fire-element--v1.png",
            }}
          />{" "}
          {selectedEvent?.calThForStreak} cals
        </Text>
        <Text
          className={clsx(
            "flex items-center bg-clip-text text-[#9BCF2D]",
            "bg-gradient-to-b from-[#9BCF2D] to-[#48B536]"
          )}
        >
          <Image
            className="pr-1 w-3 h-3"
            resizeMode="contain"
            source={{
              uri: "https://img.icons8.com/ios-filled/20/9BCF2D/running.png",
            }}
          />
          {selectedEvent?.sprintLength} days
        </Text>
        <Text
          className={clsx(
            "flex flex-row items-center bg-clip-text text-[#09B3D9]",
            "bg-gradient-to-b from-[#09B3D9] to-[#039CDD]"
          )}
        >
          <Image
            className="pr-1 w-3 h-3"
            resizeMode="contain"
            source={{
              uri: "https://img.icons8.com/ios-glyphs/20/09B3D9/trophy.png",
            }}
          />
          <Text>
            {" "}
            {nFormatter(
              selectedEvent?.awardsWorth ? selectedEvent.awardsWorth : 0
            )}
          </Text>
        </Text>
      </View>
      <View className="my-4 -mx-4 border-b border-[#C2C2C2]" />
      <View className="flex flex-row justify-between items-center">
        <Text
          numberOfLines={1}
          className="text-[#C2C2C2] flex-1 text-xl font-bold italic mr-4"
        >
          {selectedEvent?.name}
        </Text>
        <LinearGradient
          colors={["#EB7963", "#F6A064"]}
          start={[0, 0.5]}
          end={[0, 0.5]}
          className={clsx("text-white px-6 iphoneX:px-8 py-1 rounded-full")}
        >
          <TouchableOpacity>
            <Text className="text-white">Join</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};
export default TeamCard;
