import { View, Text, Image } from "react-native";

import { addImageLogo } from "@constants/imageKitURL";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";

const AddImageModalCard = () => {
  return (
    <View className="bg-[#FFFFFF36] rounded-2xl">
      <View className="p-7">
        <Image
          source={{ uri: addImageLogo }}
          className="w-full aspect-[275/100]"
        />
        <View className="flex items-center py-4">
          <Text
            className="text-[#FFFFFF] text-lg"
            style={{ fontFamily: "BaiJamjuree-Medium" }}
          >
            Let’s start your fitness journey . Add your current picure to see
            your transformation
          </Text>
        </View>
        <StartButton
          title="Let’s do it !"
          //   bgColor="bg-[#fff]"
          textColor="text-[#FFFFFF] "
          roundedStr="rounded-xl"
          textStyle="py-2.5 text-center text-xl  "
          //   onPress={onTeamCreate}
          fontFamily="BaiJamjuree-Bold"
          startColor="#F447F9"
          endColor="#9959FD"
        />
      </View>
    </View>
  );
};

export default AddImageModalCard;
