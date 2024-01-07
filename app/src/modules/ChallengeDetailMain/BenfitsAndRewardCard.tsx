import { View, Text } from "react-native";

import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import MediaTile from "@components/MediaCard/MediaTile";

interface Props {
  imgUrl?: CloudinaryMedia | AWSMedia;
  text: string;
}

const BenfitsAndRewardCard: React.FC<Props> = ({ imgUrl, text }) => {
  return (
    <View className=" flex items-center">
      <View className="w-full aspect-square bg-[#343150] rounded-2xl flex justify-center items-center">
        <View className="w-2/3 aspect-square">
          <MediaTile fluid={true} media={imgUrl} />
        </View>
      </View>
      <Text
        className="text-white/60 text-xs flex-1 px-1 text-center  pt-2"
        style={{ fontFamily: "Poppins-Regular" }}
      >
        {text}
      </Text>
    </View>
  );
};

export default BenfitsAndRewardCard;
