import { View, Text, Pressable } from "react-native";

import ImageWithURL from "@components/ImageWithURL";
import clsx from "clsx";
interface Props {
  textLeft?: string;
  textRight?: string;
  imgStr?: string;
  textLeftStyle?: string;
  textRightStyle?: string;
  imgStyle?: {
    ViewStyle?: string;
    imgStyle?: string;
  };
  containerStyle?: string;
  onPressIcon?: () => void;
  fontFamily?: string;
}
const TextBetween: React.FC<Props> = ({
  textLeft,
  textRight,
  imgStr,
  imgStyle,
  textLeftStyle,
  textRightStyle,
  containerStyle,
  onPressIcon,
  fontFamily,
}) => (
  <View
    className={clsx(
      "flex flex-row justify-between items-center px-4 py-2",
      containerStyle
    )}
  >
    {textLeft ? (
      <Text
        className={clsx(
          "text-white/70 text-sm iphoneX:text-base",
          textLeftStyle
        )}
        style={{ fontFamily: fontFamily ? fontFamily : "Nunito-SemiBold" }}
      >
        {textLeft}
      </Text>
    ) : null}
    {textRight ? (
      <Text
        className={clsx(
          "text-white/70 text-sm iphoneX:text-base",
          textRightStyle
        )}
        style={{ fontFamily: fontFamily ? fontFamily : "Nunito-SemiBold" }}
      >
        {textRight}
      </Text>
    ) : null}
    {imgStr ? (
      <Pressable
        onPress={onPressIcon}
        disabled={!onPressIcon}
        className={clsx("", imgStyle?.ViewStyle)}
      >
        <ImageWithURL
          className={clsx("w-4 iphoneX:w-5 aspect-square", imgStyle?.imgStyle)}
          source={{ uri: imgStr }}
          resizeMode="contain"
        />
      </Pressable>
    ) : null}
  </View>
);

export default TextBetween;
