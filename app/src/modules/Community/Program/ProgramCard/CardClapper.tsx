import UserImage from "@components/UserImage";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { Text, View } from "react-native";
import SvgIcons from "@components/SvgIcons";

interface Props {
  img?: CloudinaryMedia | AWSMedia;
  name?: string;
  numClaps?: number;
}

const CardClapper: React.FC<Props> = ({ img, name, numClaps }) => {
  return (
    <View className="flex flex-row items-center justify-between p-4">
      <View className="flex flex-row justify-between items-center">
        <UserImage image={img} name={name} width="w-8" height="h-8" />
        <Text className="text-lg text-white pl-3">
          {name ? name : "Unknown"}
        </Text>
      </View>
      <View className="flex flex-row items-center">
        <Text className="text-lg text-white pr-3">{numClaps}</Text>
        <View className="w-4 aspect-square">
          <SvgIcons iconType="clap" color="#B7B6C5" />
        </View>
      </View>
    </View>
  );
};

export default CardClapper;
