import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import { Text, View } from "react-native";

const Splash = () => {
  useScreenTrack();
  return (
    <View className="w-full h-full bg-gray-50">
      <Text>Loading</Text>
    </View>
  );
};

export default Splash;
