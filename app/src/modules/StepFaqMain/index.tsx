import { ScrollView, Text, View } from "react-native";
import { useState } from "react";
import { faqContentWalkToEarn } from "@modules/ProScreenMain/utils";
import Header from "@modules/Header";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import FAQCompStep from "./FAQCompStep";

const StepFaqMain = () => {
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <>
      <Header
        back={true}
        headerType="solid"
        tone="dark"
        headerColor="#232136"
        setHeaderHeight={setHeaderHeight}
      />
      <ScrollView
        className="flex-1 bg-[#232136]"
        style={{ marginTop: headerHeight }}
      >
        <View className="px-4">
          <Text className="text-lg iphoneX:text-xl  w-3/4 px-4 pb-9 font-bold   text-[#F3F3F3] ">
            Frequently Asked {"\n"}Questions
          </Text>
          {faqContentWalkToEarn.map((faq) => (
            <View key={faq.id}>
              <FAQCompStep faq={faq} borderColorTw="bg-[#232136]" />
            </View>
          ))}
        </View>
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

export default StepFaqMain;
