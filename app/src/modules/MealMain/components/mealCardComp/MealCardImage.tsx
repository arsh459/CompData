import ImageWithURL from "@components/ImageWithURL";
import MediaTile from "@components/MediaCard/MediaTile";
import { mealImage } from "@constants/imageKitURL";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { View } from "react-native";
interface Props {
  subTaskMedia?: AWSMedia | CloudinaryMedia;
}

const MealCardImage: React.FC<Props> = ({ subTaskMedia }) => {
  return (
    <View className="w-[32%] aspect-square rounded-2xl ">
      {subTaskMedia ? (
        <MediaTile
          media={subTaskMedia}
          fluid={true}
          fluidResizeMode="cover"
          roundedStr="rounded-2xl"
        />
      ) : (
        <View className="rounded-xl overflow-hidden">
          <ImageWithURL
            source={{
              uri: mealImage,
            }}
            className="object-cover"
          />
        </View>
      )}
    </View>
  );
};

export default MealCardImage;
