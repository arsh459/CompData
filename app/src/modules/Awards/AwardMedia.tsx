import MediaTile from "@components/MediaCard/MediaTile";
import SpreadColorBall from "@components/SpreadColorBall";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import clsx from "clsx";
import { View } from "react-native";

interface Props {
  media?: CloudinaryMedia | AWSMedia;
  themeColor?: string;
  size?: "fit" | "large";
}

const AwardMedia: React.FC<Props> = ({ media, size, themeColor }) => {
  return (
    <View
      className={clsx(
        size === "fit" ? "h-full" : size === "large" ? "h-2/5" : "h-1/3",
        "w-full flex justify-center items-center relative z-0"
      )}
    >
      {themeColor ? (
        <View className="absolute -left-[10%] -right-[10%] -top-[10%] -bottom-[10%] z-0">
          <SpreadColorBall
            color1={themeColor}
            color2={themeColor}
            opacity2={0}
          />
        </View>
      ) : null}

      <View
        className={
          size === "fit" ? "w-full" : size === "large" ? "w-4/5" : "w-3/5"
        }
      >
        <MediaTile media={media} fluid={true} />
      </View>
    </View>
  );
};

export default AwardMedia;
