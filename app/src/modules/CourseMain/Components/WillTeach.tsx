import { View, Text } from "react-native";

import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import MediaTile from "@components/MediaCard/MediaTile";

interface Props {
  imgUrl?: CloudinaryMedia | AWSMedia;
  text: string;
}

const WillTeach: React.FC<Props> = ({ imgUrl, text }) => {
  return (
    <View className="w-1/3 flex items-center p-2">
      <View className="w-full aspect-square bg-[#262630] rounded-2xl flex justify-center items-center">
        <View className="w-2/3 aspect-square">
          <MediaTile fluid={true} media={imgUrl} />
        </View>
      </View>
      <Text className="text-[#A0A0A0] text-xs w-3/5 text-center font-sans pt-2">
        {text}
      </Text>
    </View>
  );
};

export default WillTeach;
