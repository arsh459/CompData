import { View, TouchableOpacity, Image, Text } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

const HeaderContent = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("WhatIsFpScreen")}
      className="flex-1 mx-4 pb-6"
    >
      <LinearGradient
        colors={["#B897FF", "#7970CD", "#544AAE"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        className=" w-full aspect-[375/137] rounded-2xl flex flex-row relative z-0"
      >
        <View className="w-3/5 flex justify-around  px-4 pr-0">
          <Text className="text-xl iphoneX:text-2xl leading-7 font-extrabold text-[#FFFFFF] italic">
            Workout {"\n"}& Win!
          </Text>
          <Text className="text-xs  text-white font-normal">
            Use your FPs to redeem rewards from SocialBoat Shop
          </Text>
        </View>
        <View className="w-2/5   flex items-end">
          <Image
            source={{
              uri: "https://ik.imagekit.io/socialboat/Group_1209_Fo4o3BMjm.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676361498879",
            }}
            className="w-36 h-full "
            resizeMode="contain"
          />
        </View>
        <Image
          source={{
            uri: "https://ik.imagekit.io/socialboat/Vector__64__DYV5EatZQ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676276591751",
          }}
          className="absolute right-4 top-4 w-4 aspect-square"
          resizeMode="contain"
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default HeaderContent;
