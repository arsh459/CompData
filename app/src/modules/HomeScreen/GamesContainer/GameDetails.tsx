import { giftIcon, teamIcon } from "@constants/imageKitURL";
import { EventInterface } from "@models/Event/Event";
import { LeaderBoard } from "@models/Leader/LeaderBoard";
import { useNavigation } from "@react-navigation/native";
import { nFormatter } from "@utils/number";
import { View, Text, Image, TouchableHighlight } from "react-native";
import JoinBtn from "./JoinBtn";
import PlayBtn from "./PlayBtn";

interface Props {
  event?: EventInterface;
  parentEvent: EventInterface;
  leader?: LeaderBoard;
  isMember: boolean;
}

const GameDetais: React.FC<Props> = ({
  event,
  parentEvent,
  leader,
  isMember,
}) => {
  const navigation = useNavigation();
  const rewardsWorth: number | undefined = parentEvent?.awardsWorth
    ? parentEvent.awardsWorth
    : 100000;

  return (
    <View className="bg-[#575757]/50 backdrop-blur border border-[#D4D4D4] rounded-xl w-full flex flex-col p-2">
      <Text className="flex-1 italic text-white text-lg iphoneX:text-2xl font-extrabold">
        {parentEvent.name}
      </Text>
      <View className="flex-1 flex flex-row items-end mt-1 iphoneX:mt-2">
        <View className="flex-1 flex flex-row justify-evenly border border-[#D4D4D4] rounded-lg mr-2">
          {rewardsWorth ? (
            <>
              <View className="flex-1 flex flex-row justify-center items-center p-1.5">
                <Image
                  source={{ uri: giftIcon }}
                  className="w-4 iphoneX:w-5 h-4 iphoneX:h-5"
                  resizeMode="contain"
                />
                <Text className="italic text-white text-[10px] iphoneX:text-xs pl-2">
                  Upto {nFormatter(rewardsWorth)}
                </Text>
              </View>
              <View className="w-px bg-[#D4D4D4]" />
            </>
          ) : null}
          <View className="flex-1 flex flex-row justify-center items-center p-1.5">
            <Image
              source={{ uri: teamIcon }}
              className="w-5 iphoneX:w-6 h-5 iphoneX:h-6"
              resizeMode="contain"
            />
            <Text className="italic text-white text-[10px] iphoneX:text-xs pl-2">
              {parentEvent?.students} {"teams"}
            </Text>
          </View>
        </View>
        {isMember && leader?.userKey && event?.eventKey ? (
          <TouchableHighlight
            onPress={() =>
              navigation.navigate("Workout", {
                badgeId: "", // BUG HERE
                // gameId: parentEvent.id,
                // teamId: event.id,
              })
            }
          >
            <PlayBtn />
          </TouchableHighlight>
        ) : (
          <TouchableHighlight
            onPress={() =>
              navigation.navigate("GameLanding", { gameId: parentEvent.id })
            }
          >
            <JoinBtn />
          </TouchableHighlight>
        )}
      </View>
    </View>
  );
};

export default GameDetais;
