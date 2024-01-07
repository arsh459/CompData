import { useGameContext } from "@providers/game/GameProvider";
import { useTeamContext } from "@providers/team/TeamProvider";
import { useNavigation } from "@react-navigation/native";
import { Text, Pressable, View } from "react-native";

const PostProgram = () => {
  const navigation = useNavigation();
  const { game } = useGameContext();
  const { team } = useTeamContext();

  return (
    <View className="w-full flex flex-row justify-around p-4">
      <Pressable
        className="flex-1 flex flex-row items-center px-4 py-2.5 iphoneX:py-3 rounded-lg"
        onPress={() =>
          game &&
          team &&
          navigation.navigate("WritePost", {
            gameId: game.id,
            teamId: team.id,
          })
        }
        style={{ borderWidth: 0.5, borderColor: "#CECECE" }}
      >
        <View className="h-full w-px bg-[#B7B6C599] mr-3" />
        <Text
          className="text-[#B7B6C599] text-base iphoneX:text-xl whitespace-nowrap"
          style={{
            fontFamily: "BaiJamjuree-Bold",
          }}
        >
          Post something
        </Text>
      </Pressable>
    </View>
  );
};

export default PostProgram;
