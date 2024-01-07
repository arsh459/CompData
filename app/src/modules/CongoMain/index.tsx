import { Image, ScrollView, Text, View } from "react-native";
import { useState } from "react";
import Header from "@modules/Header";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { congoIcon } from "@constants/imageKitURL";
import GradientText from "@components/GradientText";

const CongoMain = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <View className="flex-1 bg-[#232136] ">
      <Header
        back={true}
        headerType="solid"
        tone="dark"
        headerColor="#232136"
        setHeaderHeight={setHeaderHeight}
      />
      <ScrollView style={{ marginTop: headerHeight }}>
        <Image
          source={{ uri: congoIcon }}
          className="w-3/4 mx-auto aspect-square"
          resizeMode="contain"
        />
        <GradientText
          text={"Congratulations!"}
          colors={["#7B8DE3", "#5BFFFD"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          textStyle={{
            fontFamily: "BaiJamjuree-SemiBold",
            fontSize: 26,
            textAlign: "center",
          }}
        />
        <Text className="text-xs iphoneX:text-base text-white w-3/4 mx-auto">
          You Earned 1 Fitpoint redeem your first reward now!
        </Text>
      </ScrollView>
      <View className="p-4 bg-[#232136]">
        <StartButton
          title="Go to shop"
          bgColor="bg-[#fff]"
          textColor="text-[#100F1A]"
          roundedStr="rounded-full"
          fontFamily="BaiJamjuree-Bold"
          textStyle="py-3 text-center text-base  font-bold "
          //   onPress={() => navigation.navigate("Workout", { badgeId: badge.id })}
        />
      </View>
    </View>
  );
};

export default CongoMain;
