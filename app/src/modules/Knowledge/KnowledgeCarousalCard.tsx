import { View, Text, ImageBackground } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

interface Props {
  imgUri?: string;
  btnText?: string;
  title?: string;
}
const KnowledgeCarousalCard: React.FC<Props> = ({
  btnText,

  imgUri,
  title,
}) => {
  return (
    <ImageBackground
      source={{
        uri: imgUri,
      }}
      resizeMethod="scale"
      className="flex-1 max-h-[197px] aspect-video rounded-2xl overflow-hidden  bg-black"
    >
      <View className="flex-1 flex justify-between ">
        <LinearGradient
          colors={["transparent", "#FFFFFF17"]}
          className=" rounded-full border-2 border-white w-fit m-2 roun self-end px-4 py-1"
        >
          <Text className=" w-fit text-center text-[#FFFFFFCC] text-xs font-normal  ">
            {btnText}
          </Text>
        </LinearGradient>
        <View className="w-full bg-[#343150]   px-5 py-3 ">
          <Text
            numberOfLines={1}
            className="text-xs text-[#FFFFFFCC] text-left  iphoneX:text-sm font-normal  "
          >
            {title}
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default KnowledgeCarousalCard;
