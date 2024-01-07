import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import Header from "@modules/Header";
import GradientText from "@components/GradientText";
import { arrowRightWhite } from "@constants/imageKitURL";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { useNavigation } from "@react-navigation/native";

const WalkToEarn = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const navigation = useNavigation();
  return (
    <>
      <Header
        back={true}
        headerType="solid"
        tone="dark"
        headerColor="#232136"
        setHeaderHeight={setHeaderHeight}
      />
      <ScrollView className="flex-1 bg-[#232136]">
        <View className="flex items-center" style={{ marginTop: headerHeight }}>
          <Image
            source={{
              uri: "https://ik.imagekit.io/socialboat/stepper_5P6UURJ9P.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676272553237",
            }}
            className="w-1/2 aspect-square mb-10"
          />
          <GradientText
            text={"Walk to Earn"}
            colors={["#07E9BA", "#20BED9"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
            textStyle={{
              fontFamily: "BaiJamjuree-SemiBold",
              fontSize: 26,
              textAlign: "center",
            }}
          />
          <Text className="text-xs text-white ">1000 steps = 1 Fitpoints</Text>
        </View>
        <View className="flex items-center">
          <Text className="text-xs iphoneX:text-sm leading-8 text-[#FFFFFFB2] pt-10 ">
            Connect your steps with SocialBoat {"\n"} You earn 1FP for every
            1000 steps {"\n"} Walk with your phone and earn FPs
          </Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("StepFaqScreen")}
          className="flex items-center pt-10"
        >
          <View className="flex flex-row items-center justify-center  gap-3 ">
            <Text className="text-sm iphoneX:text-base  w-1/2  font-bold   text-white ">
              Frequently Asked Questions
            </Text>
            <View className="  flex items-end">
              <Image
                source={{ uri: arrowRightWhite }}
                className="w-4 aspect-square"
                resizeMode="contain"
              />
            </View>
          </View>
        </Pressable>
      </ScrollView>
      <View className="p-4 bg-[#232136]">
        <StartButton
          title="Connect Steps"
          bgColor="bg-[#fff]"
          textColor="text-[#100F1A]"
          roundedStr="rounded-full"
          fontFamily="BaiJamjuree-Bold"
          textStyle="py-3 text-center text-base  font-bold "
          //   onPress={() => navigation.navigate("Workout", { badgeId: badge.id })}
        />
      </View>
    </>
  );
};

export default WalkToEarn;
