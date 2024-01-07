import ImageWithURL from "@components/ImageWithURL";
import { meetSakhiBg } from "@constants/imageKitURL";
import { View, Text, useWindowDimensions } from "react-native";

const Section1 = () => {
  const { height } = useWindowDimensions();

  return (
    <View className="flex justify-center items-center p-5" style={{ height }}>
      <ImageWithURL
        source={{ uri: meetSakhiBg }}
        className="w-11/12 iphoneX:w-full aspect-square"
        resizeMode="contain"
      />
      <Text
        className="text-white text-4xl iphoneX:text-[40px] leading-10"
        style={{ fontFamily: "Canela-Light" }}
      >
        Harness The
        <Text style={{ fontFamily: "BaiJamjuree-Bold" }}> Power </Text>of your
        <Text style={{ fontFamily: "BaiJamjuree-Bold" }}> Menstrual </Text>cycle
        using AI
        <Text style={{ fontFamily: "Nunito-Bold", color: "#53A2FF" }}>
          {" "}
          Sakhi
        </Text>
      </Text>
    </View>
  );
};

export default Section1;
