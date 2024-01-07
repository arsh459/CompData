import { View, Text, SafeAreaView, Image } from "react-native";

import { baseImageKit, fPointsWhite } from "@constants/imageKitURL";
import { LinearGradient } from "expo-linear-gradient";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import Header from "@modules/Header";

const SweatySelfieMain = () => {
  return (
    <>
      <Header back={true} headerType={"transparent"} tone="dark" />
      <SafeAreaView className="flex-1 relative bg-[#100F1A] ">
        <Image
          source={{
            uri: "https://ik.imagekit.io/socialboat/Screenshot_2022-07-27_at_6_6_kHiJvAnqv.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674646116084",
          }}
          style={{
            flex: 1,
            // maxHeight: "65%",
          }}
        />
        <LinearGradient
          // colors={["#13121E00", "#13121E66", "#13121EBF", "#13121EDE", "#171624"]}
          colors={[
            "#13121E00",
            "#13121E66",
            "#13121EBF",
            "#13121EDE",
            "#171624",
          ]}
          start={[0, 0]}
          end={[0, 1]}
          locations={[0, 0.1922, 0.4084, 0.6048, 0.8141]}
          className=" absolute bottom-0 right-0 left-0 p-4"
        >
          <View className="flex flex-col    min-h-[250px]">
            <View className="flex flex-row justify-between py-6">
              <Text
                className="text-white text-xl "
                style={{ fontFamily: "BaiJamjuree-SemiBold" }}
              >
                Sweaty Selfie
              </Text>
              <View className="flex flex-row items-center px-4 pl-6">
                <Image
                  source={{ uri: `${baseImageKit}/${fPointsWhite}` }}
                  className="w-3 aspect-square mr-2"
                  resizeMode="contain"
                />
                <Text
                  className="text-white text-sm"
                  style={{ fontFamily: "BaiJamjuree-SemiBold" }}
                >
                  9FP
                </Text>
              </View>
            </View>
            <Text className="text-[#A0A0A0] pb-6 text-xs">
              Step 1: Lorem ipsum dolor sit amet consectetur. Est facilisi nec
              neque quam amet.
            </Text>
            <Text className="text-[#A0A0A0] pb-6">
              Step 2: Lorem ipsum dolor sit amet consectetur. Est facilisi nec
              neque quam amet.
            </Text>
          </View>
        </LinearGradient>
        <View className="p-4 ">
          <StartButton
            title="Share on instagram"
            bgColor="bg-[#fff]"
            textColor="text-[#100F1A] "
            roundedStr="rounded-full"
            textStyle="py-2.5 text-center text-base font-bold rounded-md"
            // onPress={onWA}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default SweatySelfieMain;
