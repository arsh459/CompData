import CirclePercent from "@components/CirclePercent";
import GradientText from "@components/GradientText";
import ArrowIcon from "@components/SvgIcons/ArrowIcon";
import { LinearGradient } from "expo-linear-gradient";
import { Text, TouchableOpacity, Image, View } from "react-native";

interface Props {
  onPress: () => void;
  colors?: string[];
  text?: string;
  subText?: string;
  imgUrl?: string;
  progress?: number;
  isLocked?: boolean;
  activeColor?: string;
  inActiveColor?: string;
  textColors?: string[];
}

const ElementCard: React.FC<Props> = ({
  onPress,
  colors,
  text,
  subText,
  imgUrl,
  progress,
  isLocked,
  activeColor,
  inActiveColor,
  textColors,
}) => {
  return (
    <TouchableOpacity onPress={onPress} className="px-4 ">
      <LinearGradient
        className="rounded-[20px] flex flex-row p-3.5"
        colors={colors ? colors : ["transparent", "transparent"]}
        start={{ x: 1, y: 0.5 }}
        end={{ x: 0, y: 0.5 }}
      >
        <View className="pt-1 ">
          <CirclePercent
            circleSize={35}
            percent={progress ? progress : 0}
            activeColor={activeColor ? activeColor : "#FFFFFF"}
            strokeWidth={3}
            inActiveColor={inActiveColor ? inActiveColor : "#FFFFFF33"}
            showInactive={true}
            // showActive={true}
          >
            <View className="w-full h-full flex justify-center items-center">
              {imgUrl ? (
                <Image
                  source={{ uri: imgUrl }}
                  className="w-4 aspect-square"
                  resizeMode="contain"
                />
              ) : null}
            </View>
          </CirclePercent>
        </View>
        <View className="ml-4 mr-3 flex-1 flex flex-row justify-between items-center">
          <View className="flex-1">
            {text ? (
              <GradientText
                text={text}
                textStyle={{
                  fontSize: 16,
                  fontFamily: "Nunito-SemiBold",
                  color: "white",
                }}
                colors={
                  textColors && textColors?.length > 1
                    ? textColors
                    : ["#58F5FF", "#10BFFF"]
                }
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                fallbackColor="white"
              />
            ) : null}

            <Text
              numberOfLines={1}
              className="text-white/60 text-xs"
              style={{ fontFamily: "Nunito-Light" }}
            >
              {subText}
            </Text>
          </View>
          {isLocked ? (
            <>
              <Image
                source={{
                  uri: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Component_110_qaNQF1UmM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1674138616283",
                }}
                className={"w-6 aspect-[22/30] ml-3"}
                resizeMode="contain"
              />
            </>
          ) : (
            <View className="w-1.5 aspect-[7/15] ml-3">
              <ArrowIcon
                color={activeColor ? activeColor : "#fff"}
                direction="right"
              />
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ElementCard;
