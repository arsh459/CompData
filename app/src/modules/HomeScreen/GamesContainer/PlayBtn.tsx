import { forwardIcon } from "@constants/imageKitURL";
import { LinearGradient } from "expo-linear-gradient";
import { Text, Image } from "react-native";

const PlayBtn = () => {
  return (
    <LinearGradient
      className="flex flex-row items-center px-2.5 py-1 rounded-lg"
      colors={["#FD6F6F", "#F19B38"]}
      start={[0, 0.5]}
      end={[1, 0.5]}
    >
      <Image
        source={{ uri: forwardIcon }}
        className="w-3 iphoneX:w-4 h-3 iphoneX:h-4"
        resizeMode="contain"
      />
      <Text className="text-white font-bold text-sm iphoneX:text-base mx-2">
        Play
      </Text>
      <Image
        source={{ uri: forwardIcon }}
        className="w-3 iphoneX:w-4 h-3 iphoneX:h-4"
        resizeMode="contain"
      />
    </LinearGradient>
  );
};

export default PlayBtn;
