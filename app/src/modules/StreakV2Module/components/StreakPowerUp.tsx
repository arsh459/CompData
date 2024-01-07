import ImageWithURL from "@components/ImageWithURL";
import { streakIce } from "@constants/imageKitURL";
import { useStreakStore } from "@providers/streakV2/store/useStreakStoreV2";
import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";

const StreakPowerUp = () => {
  const { powerUpCount } = useStreakStore((state) => ({
    powerUpCount: state.powerUps?.length,
  }));

  // console.log("powerUpCount", powerUpCount);

  const navigation = useNavigation();

  return (
    <View className=" w-full h-full">
      <Text className=" text-white font-medium text-xl mb-4">Power-Up</Text>
      <View
        className={` w-full rounded-3xl ${
          powerUpCount === 0 ? "border border-[#77CBFF]" : "bg-[#004D7C]"
        } p-4 relative`}
      >
        <View className=" flex flex-row mb-4 items-center">
          <ImageWithURL
            className=" w-14 h-14"
            source={{ uri: streakIce }}
            resizeMode="contain"
          />
          <View className=" flex-1 px-2">
            <Text className=" text-[#77CBFF] text-lg font-medium">
              Streak Freeze
            </Text>
            <Text className=" text-[#77CBFF] font-medium">
              A freeze gives one extra day to your streak. It automatically gets
              activated if you haven't completed your target by 12 am
            </Text>
          </View>
        </View>

        {powerUpCount === 0 ? (
          <TouchableOpacity
            className="w-full"
            onPress={() => navigation.navigate("StreakFreezeScreen")}
          >
            <View className="w-full rounded-lg bg-[#004D7C] flex items-center py-2">
              <Text className="text-[#77CBFF] font-bold">
                Buy Streak Freeze
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View className="bg-[#FF5970] w-8 h-8 rounded-full flex items-center justify-center absolute right-0 -top-2">
            <Text className="text-white font-bold">{powerUpCount}</Text>
          </View>
        )}
      </View>
    </View>
  );
};
export default StreakPowerUp;
