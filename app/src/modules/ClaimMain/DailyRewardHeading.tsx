import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import ImageWithURL from "@components/ImageWithURL";
import { startYellow } from "@constants/imageKitURL";
import CloseIcon from "@components/SvgIcons/CloseIcon";
import { useNavigation } from "@react-navigation/native";

const DailyRewardHeading = () => {
  const navigation = useNavigation();
  const goBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
  return (
    <View className="py-2 px-4 bg-[#ffbb35]   rounded-t-xl flex flex-row items-center justify-between">
      <View className="flex flex-row items-center">
        <ImageWithURL
          source={{ uri: startYellow }}
          className="w-8 aspect-square"
        />
        <Text
          className="text-lg text-[#232136]"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          Daily Reward
        </Text>
      </View>
      <TouchableOpacity onPress={goBack} className="w-4 aspect-square">
        <CloseIcon color="#232136" />
      </TouchableOpacity>
    </View>
  );
};

export default DailyRewardHeading;
