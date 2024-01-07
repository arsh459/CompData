import { mediaIcon, privateIcon } from "@constants/imageKitURL";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import PrivateMediaSwiper from "./PrivateMediaSwiper";

interface Props {
  isOwner?: boolean;
  media?: (CloudinaryMedia | AWSMedia)[];
  heightStr?: string;
  imgSizeStr?: string;
  textSizeStr?: string;
}

const PrivateMedia: React.FC<Props> = ({
  isOwner,
  media,
  heightStr,
  imgSizeStr,
  textSizeStr,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <View
      className={clsx(heightStr ? heightStr : "h-48 iphoneX:h-60", "bg-black")}
    >
      <LinearGradient
        colors={["#00000000", "#46276F72", "#9E388872", "#F8576DB2"]}
        className="w-full h-full p-4 flex flex-col justify-center items-center relative z-0"
        start={{ x: 0.48, y: 0 }}
        end={{ x: 0.52, y: 1 }}
      >
        <Image
          source={{ uri: privateIcon }}
          className={clsx(
            imgSizeStr ? imgSizeStr : "w-6 iphoneX:w-8 h-6 iphoneX:h-8"
          )}
          resizeMode="contain"
        />
        <Text
          className={clsx(
            textSizeStr ? textSizeStr : "w-2/3 text-xl iphoneX:text-2xl",
            "text-white font-bold text-center my-2"
          )}
          style={{ fontFamily: "BaiJamjuree-Bold" }}
        >
          This Media is posted privately.
        </Text>
        {isOwner && media ? (
          <Pressable
            className="flex flex-row justify-center items-center p-2 bg-[#261C3D] rounded-lg border"
            onPress={() => setIsOpen(true)}
          >
            <Image
              source={{ uri: mediaIcon }}
              className="w-3 iphoneX:w-4 h-3 iphoneX:h-4"
              resizeMode="contain"
            />
            <Text className="text-xs iphoneX:text-sm text-white ml-2">
              View Media
            </Text>
          </Pressable>
        ) : null}
      </LinearGradient>
      {media ? (
        <PrivateMediaSwiper
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          media={media}
        />
      ) : null}
    </View>
  );
};

export default PrivateMedia;
