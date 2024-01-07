import { View, Text, ScrollView } from "react-native";
import { useState } from "react";
import Background from "@modules/ChatBot/Background";
import Header from "@modules/Header";
import ImageWithURL from "@components/ImageWithURL";
import { filledSakhiIcon } from "@constants/imageKitURL";
import HealthQuestionButton from "./HealthQuestionButton";

const HealthQuestionsMain = () => {
  const [headerHeight, setHeaderHeight] = useState(0);
  return (
    <Background>
      <ScrollView className="flex-1 relative z-0">
        <Header
          back={true}
          tone="dark"
          headerType="transparent"
          setHeaderHeight={setHeaderHeight}
        />
        <View className="flex-1">
          <View
            className="flex flex-row justify-center items-center w-3/4 mx-auto "
            style={{ marginTop: headerHeight }}
          >
            <ImageWithURL
              source={{ uri: filledSakhiIcon }}
              className="w-1/3 max-w-xs aspect-[108/56] "
              resizeMode="contain"
            />

            <View className="flex-1 pl-4 ">
              <Text
                className="text-xl text-white"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                You are at the peak of fertilty
              </Text>
            </View>
          </View>
          <View className=" w-3/4 mx-auto py-10 ">
            <Text
              className="text-sm text-white pb-2"
              style={{ fontFamily: "Nunito-Bold", lineHeight: 18 }}
            >
              Lorem ipsum dolor sit amet consectetur. Nunc eget mi feugiat id id
              vel. Risus duis iaculis volutpat faucibus. Nec urna iaculis nisi
              nisl sit laoreet pulvinar amet. Quis pharetra volutpat amet
              dignissim dictum.
            </Text>
            <Text
              className="text-sm text-white pb-2"
              style={{ fontFamily: "Nunito-Bold", lineHeight: 18 }}
            >
              Lorem ipsum dolor sit amet consectetur. Nunc eget mi feugiat id id
              vel. Risus duis iaculis volutpat faucibus.
            </Text>
            <Text
              className="text-sm text-white pb-2"
              style={{ fontFamily: "Nunito-Bold", lineHeight: 18 }}
            >
              Lorem ipsum dolor sit amet consectetur. Nunc eget mi feugiat id id
              vel. Risus duis iaculis volutpat faucibus.
            </Text>
          </View>
        </View>
        <View className="bg-[#C1B7FF] py-4">
          <View className="bg-[#C1B7FF] p-4">
            <Text className="text-xs font-medium text-center font-sans pb-5 text-[#232136]">
              Some questions you can ask Sakhi
            </Text>
            {[1, 23, 12, 12, 22].map((i, index) => (
              <HealthQuestionButton
                key={`${i}_${index}`}
                text="I want to know about my Period cramps"
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </Background>
  );
};

export default HealthQuestionsMain;
