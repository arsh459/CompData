import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image, TouchableOpacity, ColorValue } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Props {
  onPress1?: () => void;
  onPress2?: () => void;
  primaryHeading: string;
  secondayHeading?: string;
  subText?: string;
  arrow?: boolean;
  btnText1?: string;
  btnText2?: string;
  img: string;
  primaryHeadingColor?: ColorValue;
  solidCta2?: boolean;
}

const DefaultNutritionV2: React.FC<Props> = ({
  onPress1,
  onPress2,
  primaryHeading,
  secondayHeading,
  subText,
  arrow,
  btnText1,
  btnText2,
  img,
  primaryHeadingColor,
  solidCta2,
}) => {
  const { bottom } = useSafeAreaInsets();

  //
  return (
    <View className="flex-1 flex items-center">
      <Image
        source={{
          uri: img,
        }}
        className="flex-[4] aspect-square mt-4"
        resizeMode="contain"
      />
      <View className="p-4">
        <Text
          className="text-white text-3xl leading-8"
          style={{ fontFamily: "Canela-Regular" }}
        >
          <Text
            style={{
              fontFamily: "Nunito-Bold",
              color: primaryHeadingColor || "#FFE381",
            }}
          >
            {primaryHeading}
          </Text>{" "}
          {secondayHeading}
        </Text>
        {subText ? (
          <Text
            className="text-sm text-white/80 pt-4"
            style={{ fontFamily: "Nunito-Regular" }}
          >
            {subText}
          </Text>
        ) : null}
      </View>
      {arrow ? (
        <Image
          source={{
            uri: "https://ik.imagekit.io/socialboat/tr:w-200,c-maintain_ratio,fo-auto/Mask_group_TiFhUWI6t.png?ik-sdk-version=javascript-1.4.3&updatedAt=1676106587061",
          }}
          style={{ transform: [{ rotateX: "180deg" }, { rotateZ: "30deg" }] }}
          className="flex-[1] aspect-[0.6] mr-[15%]"
          resizeMode="contain"
        />
      ) : null}

      {btnText1 && onPress1 ? (
        <TouchableOpacity onPress={onPress1} className="w-full p-4">
          <LinearGradient
            colors={["#E4C668", "#F5D161", "#FCEAB9", "#F3D062"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            className="w-full rounded-xl flex flex-row justify-center items-center py-3"
          >
            <Image
              source={{
                uri: "https://ik.imagekit.io/socialboat/Subtract_HSSp5WkIO.png?updatedAt=1686810466837",
              }}
              className="w-5 aspect-square mr-2"
              resizeMode="contain"
            />
            <Text
              className="text-[#232136] text-base text-center"
              style={{ fontFamily: "Nunito-Bold" }}
            >
              {btnText1}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : null}
      {onPress2 && btnText2 ? (
        <View className="w-full px-4" style={{ paddingBottom: bottom || 16 }}>
          <TouchableOpacity
            onPress={onPress2}
            className={clsx(
              "rounded-xl p-3",
              solidCta2 ? "bg-[#6D55D1]" : "border-2 border-[#6D55D1]"
            )}
          >
            <Text
              className="text-base text-center"
              style={{
                fontFamily: "Nunito-Bold",
                color: solidCta2 ? "#FFFFFF" : "#6D55D1",
              }}
            >
              {btnText2}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

export default DefaultNutritionV2;
