import GradientText from "@components/GradientText";
import ImageWithURL from "@components/ImageWithURL";
import { chatAiIcon } from "@constants/imageKitURL";
import { View, useWindowDimensions, Text } from "react-native";
import { ArcSlider } from "./ArcSlider";

interface DataType {
  phase: string;
  phaseDur: string;
  text: string;
  highlightedText: string;
  image: string;
  color: string;
}

export const section3Data: DataType[] = [
  {
    phase: "Period Phase",
    phaseDur: "Day 1-5",
    text: `“You are likely to have a heavier than usual flow, the following practice might help you.”`,
    highlightedText: "heavier than usual flow,",
    image:
      "https://ik.imagekit.io/socialboat/Group_1650_vBkoVJWjNT.png?updatedAt=1684331844979",
    color: "#FF4D78",
  },
  {
    phase: "Follicular Phase",
    phaseDur: "Day 8-14",
    text: `“Your estrogen is on the rise, you will feel high in energy today. I added this SMOOTHIE in your diet plan.”`,
    highlightedText: "Your estrogen is on the rise,",
    image:
      "https://ik.imagekit.io/socialboat/Group_1651_NKzb5KTpY.png?updatedAt=1684331844850",
    color: "#9B4DFF",
  },
  {
    phase: "Luteal Phase",
    phaseDur: "Day 15-21",
    text: `“Why am I seeing spotting today? Sometimes you can get spotting on the 20th day of your cycle, nothing to worry about.”`,
    highlightedText: "Why am I seeing spotting today?",
    image:
      "https://ik.imagekit.io/socialboat/Group_1652__1__waw-HVGoD.png?updatedAt=1684332865875",
    color: "#14B2DD",
  },
  {
    phase: "PMS Phase",
    phaseDur: "Day 27-28",
    text: `“You are likely to get a period in the next 3 days. This time your period cycle is longer than usual, are you feeling stressed? Here is a short breathing session that might help.”`,
    highlightedText: "period in the next 3 days.",
    image:
      "https://ik.imagekit.io/socialboat/Group_1653_wMwWBRaEmp.png?updatedAt=1684331844882",
    color: "#07C762",
  },
];

export const Section3StickyHeader: React.FC<{ currIndex: number }> = ({
  currIndex,
}) => {
  return (
    <>
      <ImageWithURL
        source={{
          uri: "https://ik.imagekit.io/socialboat/Frame_1379_aSxCC4ZyO.png?updatedAt=1684398496331",
        }}
        className="w-full aspect-[375/70]"
        resizeMode="cover"
      />
      <View className="w-full relative z-0">
        <ArcSlider
          currIndex={currIndex}
          breckPoint={section3Data.length}
          thumbColor={section3Data[currIndex].color}
        />
        <View className="absolute left-0 right-0 top-0 bottom-0 flex justify-center items-center pb-16">
          <Text
            className="text-2xl text-center"
            style={{
              fontFamily: "Canela-Bold",
              color: section3Data[currIndex].color,
            }}
          >
            {section3Data[currIndex].phase}
          </Text>
          <Text
            className="text-xl text-center"
            style={{
              fontFamily: "Nunito-Bold",
              color: section3Data[currIndex].color,
            }}
          >
            {section3Data[currIndex].phaseDur}
          </Text>
        </View>
      </View>
    </>
  );
};

export const Section3Item: React.FC<DataType> = ({
  text,
  highlightedText,
  image,
}) => {
  const { width, height } = useWindowDimensions();

  const splitedText = text.split(highlightedText);

  return (
    <View style={{ width, height }}>
      <View className="opacity-0">
        <Section3StickyHeader currIndex={0} />
      </View>
      <View className="flex-1 bg-white rounded-3xl p-4 m-4 mb-16 iphoneX:mb-24 flex justify-between items-center">
        <View className="w-full flex flex-row">
          <ImageWithURL
            source={{ uri: chatAiIcon }}
            className="w-11 aspect-[1.5] mr-2"
            resizeMode="contain"
          />
          <GradientText
            text="Sakhi"
            colors={["#1FE9FF", "#53A2FF", "#E753FF"]}
            textStyle={{ fontFamily: "Nunito-Bold", fontSize: 22 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          />
        </View>
        <Text
          className="w-full text-sm iphoneX:text-base text-[#756E96] leading-4 iphoneX:leading-5 py-4"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {splitedText[0]}
          <Text className="text-[#7B5BFF]">{highlightedText}</Text>
          {splitedText[1]}
        </Text>
        <ImageWithURL
          source={{ uri: image }}
          className="flex-1 max-w-full aspect-[300/212] mx-auto"
          resizeMode="contain"
        />
      </View>
    </View>
  );
};
