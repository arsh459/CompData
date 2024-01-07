import ImageWithURL from "@components/ImageWithURL";
import { streakIceBig } from "@constants/imageKitURL";
import Header from "@modules/Header";
import { Text, View } from "react-native";
import FreezeCounter from "./components/FreezeCounter";
import FreezeFooter from "./components/FreezeFooter";

const StreakFreezeMain = () => {
  return (
    <>
      <Header back={true} tone="dark" headerColor="#232136" />
      <View className="bg-[#232136] flex-1">
        <View className="flex-1 flex w-full items-center justify-center">
          <ImageWithURL
            resizeMode="contain"
            source={{ uri: streakIceBig }}
            className="w-1/2 h-1/2"
          />
          <Text className=" text-white font-bold text-2xl my-4">
            Streak Freeze
          </Text>
          <View className="w-full h-10">
            <FreezeCounter />
          </View>
          <Text className=" text-white/50 font-bold text-base my-4">
            Number of Freezes
          </Text>
        </View>
        <View className=" p-4">
          <FreezeFooter />
        </View>
      </View>
    </>
  );
};

export default StreakFreezeMain;
