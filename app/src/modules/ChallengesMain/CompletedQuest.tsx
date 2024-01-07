import { View, Text } from "react-native";
import React from "react";
import ImageWithURL from "@components/ImageWithURL";
import { goalCompleteBg } from "@constants/imageKitURL";
interface Props {
  startIn?: string;
}
const CompletedQuest: React.FC<Props> = ({ startIn }) => {
  return (
    <View className="flex-1 items-center justify-center bg-[#6D55D1]">
      <View className="p-4 pt-12">
        <View className="bg-[#232136] p-4 rounded-2xl">
          {startIn ? (
            <>
              <View className="p-2 py-4">
                <Text
                  className="text-white/60 text-2xl leading-7"
                  style={{ fontFamily: "Nunito-Light" }}
                >
                  The challenge will start{" "}
                  <Text
                    className="text-[#FF8B59] text-2xl leading-7"
                    style={{ fontFamily: "Nunito-Bold" }}
                  >
                    {startIn}
                  </Text>
                </Text>
              </View>
            </>
          ) : (
            <>
              <Text
                className="text-lg text-white pb-2"
                style={{ fontFamily: "Nunito-Bold" }}
              >
                Challenge Finished
              </Text>
              <Text
                className="text-xs text-white/60 leading-5 tracking-wide"
                style={{ fontFamily: "Poppins-Regular" }}
              >
                Thank you for completing the challenge. You did really well.
                Allow us some time to get you another challenge that will keep
                you motivated and help you build healthy habits.
              </Text>
            </>
          )}
        </View>
      </View>
      <View className="flex-1  items-center justify-end">
        <ImageWithURL
          source={{ uri: goalCompleteBg }}
          className="w-full aspect-[385/456]"
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default CompletedQuest;
