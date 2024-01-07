import ImageWithURL from "@components/ImageWithURL";
import { greenPlus,  redMinus } from "@constants/imageKitURL";
import { useStreakStore } from "@providers/streakV2/store/useStreakStoreV2";
import { Text, TouchableOpacity, View } from "react-native";

const FreezeCounter = () => {
  const { freezeCount, setFreezeCount } = useStreakStore((state) => ({
    freezeCount: state.freezeCount,
    setFreezeCount: state.setFreezCount,
  }));
  return (
    <View className=" w-full h-full flex items-center justify-center mt-2">
      <View className="flex flex-row gap-2">
        <TouchableOpacity onPress={() => setFreezeCount("dec")}>
          <View className="p-4 bg-[#343150] rounded-full">
            <ImageWithURL
              source={{ uri: redMinus }}
              resizeMode="contain"
              className="w-4 h-4"
            />
          </View>
        </TouchableOpacity>
        <View className="py-2 px-6 bg-[#343150] rounded-xl flex items-center justify-center ">
          <Text className=" text-lg  font-bold text-white">{freezeCount}</Text>
        </View>
        <TouchableOpacity onPress={() => setFreezeCount("inc")}>
          <View className="p-4 bg-[#343150] rounded-full">
            <ImageWithURL
              source={{ uri: greenPlus }}
              resizeMode="contain"
              className="w-4 h-4"
            />
          </View>
        </TouchableOpacity>
      </View>
      {/* <View> <ImageWithURL source={{uri: MinusIcon}} resizeMode="contain" className="w-4 h-4" /></View> */}
    </View>
  );
};

export default FreezeCounter;
