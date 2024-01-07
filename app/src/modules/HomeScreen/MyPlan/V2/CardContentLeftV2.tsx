import SvgIcons from "@components/SvgIcons";
import { skewedSquareDone, skewedSquarePending } from "@constants/imageKitURL";
import { View, Text, Image } from "react-native";

interface Props {
  color: string;
  title?: string;
  text?: string;
  subText?: string;
  iconType?: "loading";
  status: "pending" | "done";
}

const CardContentLeftV2: React.FC<Props> = ({
  color,
  title,
  text,
  subText,
  iconType,
  status,
}) => {
  const img =
    status && status === "pending" ? skewedSquarePending : skewedSquareDone;
  return (
    <View className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center">
      <View className="w-1/3 max-w-max aspect-square flex justify-center items-center relative z-0 pb-1.5">
        <Image
          source={{
            uri: img,
          }}
          className="absolute left-0 right-0 top-0 bottom-0"
          resizeMode="contain"
        />
        {iconType ? (
          <View className="w-4 aspect-square">
            <SvgIcons iconType={iconType} color={color} />
          </View>
        ) : (
          <Text
            numberOfLines={1}
            style={{ color, fontFamily: "BaiJamjuree-Bold" }}
            className="text-xs leading-5 text-center whitespace-nowrap"
          >
            {text}
          </Text>
        )}
        <Text
          numberOfLines={1}
          style={{ color, fontFamily: "BaiJamjuree-Bold" }}
          className="text-xs text-center whitespace-nowrap"
        >
          {subText}
        </Text>
      </View>

      {title ? (
        <Text
          numberOfLines={1}
          style={{ color, fontFamily: "BaiJamjuree-Medium" }}
          className="text-xs iphoneX:text-base text-center leading-4 whitespace-nowrap"
        >
          {title}
        </Text>
      ) : null}
    </View>
  );
};

export default CardContentLeftV2;
