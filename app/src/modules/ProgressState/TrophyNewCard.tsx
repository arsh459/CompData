import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AWSMedia, CloudinaryMedia } from "@models/Media/MediaTypeInterface";
import MediaTile from "@components/MediaCard/MediaTile";
import clsx from "clsx";

interface Props {
  imgUrl?: string;
  badgeImg?: CloudinaryMedia | AWSMedia;
  text?: string;
  subText?: string;
  colorArr?: string[];
  textColor?: string;
  subTextColor?: string;
  children?: React.ReactNode;
  layoutStyleTw?: string;
  textBoxStyleTw?: string;
  imageWidth?: number;
}

const TrophyNewCard: React.FC<Props> = ({
  imgUrl,
  badgeImg,
  subText,
  text,
  colorArr,
  textColor,
  subTextColor,
  children,
  layoutStyleTw,
  textBoxStyleTw,
  imageWidth,
}) => {
  return (
    <LinearGradient
      colors={colorArr ? colorArr : ["transparent", "transparent"]}
      className={clsx(
        layoutStyleTw
          ? layoutStyleTw
          : "w-full flex flex-row rounded-3xl items-center justify-between p-4 border border-white/10"
      )}
    >
      {badgeImg ? (
        <View className="w-1/3 aspect-square mr-4">
          <MediaTile media={badgeImg} fluid={true} />
        </View>
      ) : imgUrl ? (
        <Image
          className="w-1/3 aspect-square mr-4"
          source={{ uri: imgUrl }}
          resizeMode="contain"
        />
      ) : null}

      <View
        className={clsx(
          "flex-1 flex",
          children ? "h-full justify-between" : "justify-center"
        )}
      >
        <View className={textBoxStyleTw}>
          <Text
            className="text-base iphoneX:text-lg"
            style={{
              color: textColor ? textColor : "#fff",
              fontFamily: "BaiJamjuree-SemiBold",
            }}
          >
            {text}
          </Text>
          <Text
            className="text-xs iphoneX:text-sm"
            style={{
              color: subTextColor ? subTextColor : "#fff",
              fontFamily: "BaiJamjuree-Regular",
            }}
          >
            {subText}
          </Text>
        </View>
        {children}
      </View>
    </LinearGradient>
  );
};

export default TrophyNewCard;
