import CloseBtn from "@components/Buttons/CloseBtn";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import { Pressable, View } from "react-native";
import MediaTile from "./MediaTile";

interface Props {
  mediaElement: CloudinaryMedia | AWSMedia;
  onDelete?: (el: CloudinaryMedia | AWSMedia) => void;
}

const MediaFile: React.FC<Props> = ({ mediaElement, onDelete }) => {
  return (
    <View className="h-full aspect-square relative mt-2 mr-2">
      <View className="w-full h-full bg-slate-400 rounded-lg overflow-hidden">
        <MediaTile media={mediaElement} fluidResizeMode="cover" fluid={true} />
      </View>
      {onDelete ? (
        <Pressable
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-200 p-1"
          onPress={() => onDelete(mediaElement)}
        >
          <CloseBtn
            onClose={() => onDelete(mediaElement)}
            classStr="w-full h-full"
            color="#000000"
          />
        </Pressable>
      ) : null}
    </View>
  );
};

export default MediaFile;
