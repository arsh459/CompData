import { View, Text, TouchableOpacity } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useNavigation } from "@react-navigation/native";
import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import { exploreAllWorkoutsNew } from "@constants/imageKitURL";
import FastImage from "react-native-fast-image";

const ExploreAll = () => {
  const navigation = useNavigation();

  const clickExploreWorkouts = () => {
    navigation.navigate("AllWorkouts");
    weEventTrack("home_clickExploreWorkouts", {});
  };

  return (
    <TouchableOpacity onPress={clickExploreWorkouts}>
      <LinearGradient
        colors={["#2CD3F8", "#3172F6", "#7342FF"]}
        start={{ x: 1, y: 0.5 }}
        end={{ x: 0, y: 0.5 }}
        className="flex flex-row justify-between items-center px-4 m-4  rounded-xl overflow-hidden"
      >
        <Text
          className="w-1/3 text-white text-base iphoneX:text-lg"
          style={{ fontFamily: "Nunito-SemiBold" }}
        >
          Explore All Workouts
        </Text>
        <View className="flex flex-row justify-end items-center pt-1">
          <FastImage
            source={{ uri: exploreAllWorkoutsNew }}
            className="w-[45%] aspect-[223/154] mx-4"
            resizeMode="contain"
          />
          <View className="w-5 aspect-square">
            <ArrowIcon direction="right" color="#FFFFFF" />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ExploreAll;
