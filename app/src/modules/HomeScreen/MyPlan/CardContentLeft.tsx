import SvgIcons from "@components/SvgIcons";
import { View, Text, Image } from "react-native";

interface Props {
  color: string;
  title?: string;
  text?: string;
  subText?: string;
  iconType?: "loading";
}

const CardContentLeft: React.FC<Props> = ({
  color,
  title,
  text,
  subText,
  iconType,
}) => {
  return (
    <View className="w-1/3 h-full p-4 flex">
      <View className="w-full flex-1 flex justify-center items-center">
        <View className="w-full aspect-square flex justify-center items-center relative z-0 pb-1.5">
          <Image
            source={{
              uri: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Polygon_212_AopzZ_ieQ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670848709468",
            }}
            className="absolute -left-1 -right-1 -top-1 -bottom-1"
            resizeMode="contain"
          />
          {iconType ? (
            <View className="w-4 aspect-square">
              <SvgIcons iconType={iconType} color={color} />
            </View>
          ) : (
            <Text
              style={{ color, fontFamily: "BaiJamjuree-Bold" }}
              className="w-2/3 text-lg iphoneX:text-xl leading-5 text-center"
            >
              {text}
            </Text>
          )}
          <Text
            style={{ color, fontFamily: "BaiJamjuree-Bold" }}
            className="text-xs iphoneX:text-sm text-center"
          >
            {subText}
          </Text>
        </View>
      </View>

      <Text
        style={{ color, fontFamily: "BaiJamjuree-Medium" }}
        className="text-xs iphoneX:text-base text-center leading-4"
      >
        {title}
      </Text>
    </View>
  );
};

export default CardContentLeft;
