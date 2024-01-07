import { useGameContext } from "@providers/game/GameProvider";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Image } from "react-native";

const ReOnBoardMain = () => {
  const { params } = useGameContext();
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("JoinBoat", { section: "welcome" });
  };

  return (
    <View className="flex-1 bg-[#100F1A]">
      <View className="flex-1 flex justify-center items-center">
        <Text
          className="text-white text-center text-2xl"
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          {`${params?.currentSprint?.name} Challenge`}
        </Text>
        <Text
          className="text-white text-center text-base"
          style={{ fontFamily: "BaiJamjuree-Regular" }}
        >
          This challenge is only for women.
        </Text>
      </View>
      <View className="flex justify-center items-center p-4">
        <Text
          className="text-white/75 text-center pb-4 text-sm"
          style={{ fontFamily: "BaiJamjuree-Light" }}
        >
          Tap on the button below to change the gender.Incase you are a female
          and you filled up your gender male by mistake.
        </Text>
        <TouchableOpacity
          onPress={onPress}
          className="w-full flex flex-row justify-center items-center p-4 bg-white rounded-full"
        >
          <Text
            className="text-[#100F1A] mr-4 text-base"
            style={{ fontFamily: "BaiJamjuree-Bold" }}
          >
            Re-onboard
          </Text>
          <Image
            source={{
              uri: "https://ik.imagekit.io/socialboat/tr:w-50,c-maintain_ratio,fo-auto/Vector_ktSjrt1O4.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670320164630",
            }}
            className="w-5 aspect-square"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ReOnBoardMain;
