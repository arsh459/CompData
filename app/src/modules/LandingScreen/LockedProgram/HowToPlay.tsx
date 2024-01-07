import clsx from "clsx";
import { Image, Text, View } from "react-native";

interface Props {
  heading?: string;
  imgUrl?: string;
  title?: string;
  description?: string;
  textColor?: string;
}

const HowToPlay: React.FC<Props> = ({
  heading,
  imgUrl,
  title,
  description,
  textColor,
}) => {
  return (
    <View className="flex-1 flex flex-col p-4 pt-20">
      {heading ? (
        <Text
          className={clsx(
            textColor,
            "text-xl iphoneX:text-3xl font-bold text-center iphoneX:py-2"
          )}
        >
          {heading}
        </Text>
      ) : null}
      {imgUrl ? (
        <View className="flex justify-center items-center">
          <Image
            source={{ uri: imgUrl }}
            resizeMode="contain"
            className="w-4/5 h-80"
          />
        </View>
      ) : null}
      {title ? (
        <Text
          className={clsx(
            textColor,
            "iphoneX:text-xl text-center font-bold py-2 iphoneX:py-4"
          )}
        >
          {title}
        </Text>
      ) : null}
      {description ? (
        <Text
          className={clsx(textColor, "text-xs iphoneX:text-base text-center")}
        >
          {description}
        </Text>
      ) : null}
    </View>
  );
};

export default HowToPlay;
