import { View, Text } from "react-native";
import YouGet from "./YouGet";
import ImageWithURL from "@components/ImageWithURL";
import LinearGradient from "react-native-linear-gradient";

const PearsnolTeam = () => {
  return (
    <View className="flex-1 flex justify-center items-center">
      <View className="h-16" />

      <Text className="text-[#FEFDFF] text-3xl iphoneX:text-4xl font-medium px-8">
        Get a personal health team to{" "}
        <Text className="text-[#C7FF26]">reverse your PCOS</Text>
      </Text>

      <View className="w-full aspect-video my-8 relative z-0">
        <ImageWithURL
          className="w-full h-full"
          source={{
            uri: "https://ik.imagekit.io/socialboat/Group%201000001227_rhb9RB-Xw.png?updatedAt=1694771242423",
          }}
          resizeMode="cover"
        />

        <LinearGradient
          colors={["#894FD300", "#5F46C9"]}
          className="absolute left-0 right-0 bottom-0 h-1/2"
          pointerEvents="none"
        />
      </View>

      <View className="px-4">
        <YouGet />
      </View>
    </View>
  );
};

export default PearsnolTeam;
