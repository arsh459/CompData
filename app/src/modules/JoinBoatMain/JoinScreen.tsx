import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native";

interface Props {
  onPress: () => void;
}

const JoinScreen: React.FC<Props> = ({ onPress }) => {
  return (
    <View className="fixed left-0 right-0 top-0 bottom-0 z-10 overflow-y-scroll scrollbar-hide flex flex-col justify-center items-center p-4">
      <Text className="text-white text-2xl iphoneX:text-3xl font-bold pt-2 text-center">
        You are all set!
      </Text>
      <View className="flex flex-row justify-center pt-1">
        <Text className="text-white text-base text-center">
          Click below to join the game. Let the games begin!
        </Text>
      </View>

      <View className="flex flex-row justify-center ">
        <View className="py-4">
          <TouchableOpacity onPress={onPress}>
            <View className="px-6 py-2 bg-[#F98258] rounded-3xl flex justify-center items-center">
              <Text className="text-white text-lg font-bold">Join Game</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default JoinScreen;
