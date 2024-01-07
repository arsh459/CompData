import { LinearGradient } from "expo-linear-gradient";
import { View, Text } from "react-native";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import MediaTile from "@components/MediaCard/MediaTile";

interface Props {
  startColor: string;
  endColor: string;
  headingIcon?: CloudinaryMedia | AWSMedia;
  name?: string;
}

const ExplorePlanCardHeader: React.FC<Props> = ({
  startColor,
  endColor,
  headingIcon,
  name,
}) => {
  return (
    <LinearGradient
      colors={[startColor, endColor]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      className="absolute left-0 right-0 top-0 h-14 flex justify-center rounded-t-xl rounded-b overflow-hidden px-3 py-1.5"
    >
      <View className="flex flex-row items-center">
        {headingIcon ? (
          <View className="w-6 aspect-square">
            <MediaTile fluid={true} media={headingIcon} />
          </View>
        ) : null}
        <Text
          numberOfLines={1}
          className="w-full flex-1 pl-1.5 pr-10 text-[#F1F1F1] text-sm iphoneX:text-base"
          style={{ fontFamily: "Nunito-Bold" }}
        >
          {name}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default ExplorePlanCardHeader;
