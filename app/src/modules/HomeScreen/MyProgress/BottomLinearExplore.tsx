import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import MediaTile from "@components/MediaCard/MediaTile";
import StartButton from "../NewHome/StartButton";

interface Props {
  colors: string[];
  textIcon?: CloudinaryMedia | AWSMedia;
  text?: string;
  ctaTitle?: string;
  onCtaPress?: () => void;
}

const BottomLinearExplore: React.FC<Props> = ({
  colors,
  textIcon,
  text,
  ctaTitle,
  onCtaPress,
}) => {
  return (
    <LinearGradient
      colors={colors}
      className="h-2/5 self-end w-full p-4 flex flex-row items-end"
    >
      <View className="flex-1 flex flex-row items-center">
        {textIcon ? (
          <View className="w-4 aspect-square">
            <MediaTile fluid={true} media={textIcon} />
          </View>
        ) : null}
        <Text
          className="flex-1 text-white text-[10px] iphoneX:text-xs pl-1.5"
          style={{ fontFamily: "Nunito-Bold" }}
          numberOfLines={2}
        >
          {text}
        </Text>
      </View>

      <View className="w-1/2 max-w-[100px] ml-4">
        <StartButton
          title={ctaTitle ? ctaTitle : "Select"}
          bgColor="bg-[#fff]"
          textColor="text-[#13121E]"
          roundedStr="rounded-lg"
          textStyle="px-3 py-1 text-center text-sm iphoneX:text-base whitespace-nowrap"
          onPress={onCtaPress}
          fontFamily="Nunito-Bold"
        />
      </View>
    </LinearGradient>
  );
};

export default BottomLinearExplore;
