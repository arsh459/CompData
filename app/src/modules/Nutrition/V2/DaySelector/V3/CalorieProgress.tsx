import CirclePercent from "@components/CirclePercent";
import GradientText from "@components/GradientText";
import ImageWithURL from "@components/ImageWithURL";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { LinearGradient } from "expo-linear-gradient";
import { Text, Image, View, TouchableOpacity } from "react-native";

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

const CalorieProgress: React.FC<Props> = ({
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
  const navigation = useNavigation();
  const { badgeId } = useSignleBadgeContext();

  const onPressInsights = () => {
    weEventTrack("TopContributionScreen_insights", {
      badgeId: badgeId,
    });
    navigation.navigate("TopContributionScreen", {
      badgeId: badgeId,
    });
  };

  return (
    <View
      //onPress={onPress}
      className="flex relative items-center justify-center"
    >
      <LinearGradient
        className=" flex flex-row border-b border-[#ffffff26]"
        colors={colors ? colors : ["transparent", "transparent"]}
        start={{ x: 1, y: 0.5 }}
        end={{ x: 0, y: 0.5 }}
      >
        <View className="py-6">
          <CirclePercent
            circleSize={53}
            percent={progress ? progress : 0}
            activeColor={activeColor ? activeColor : "#FFFFFF"}
            strokeWidth={5}
            inActiveColor={inActiveColor ? inActiveColor : "#FFFFFF33"}
            showInactive={true}
            showActive={true}
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
        <View className="ml-4 flex-1 flex flex-row justify-between items-center">
          <View className="flex-1">
            {text ? (
              <>
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
              </>
            ) : null}

            <Text
              numberOfLines={1}
              className="text-[#FFD33E99] text-xs"
              style={{ fontFamily: "Nunito-Light" }}
            >
              {subText}
            </Text>
          </View>

          {/* <Image
            source={{
              uri: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Component%20143%20(2)_cIompVZTN.png?updatedAt=1693489343328",
            }}
            className={"w-6 aspect-[22/30] ml-3"}
            resizeMode="contain"
          /> */}
        </View>
      </LinearGradient>

      <TouchableOpacity
        onPress={onPressInsights}
        className="absolute right-0 flex flex-row items-center py-1 px-3 bg-white rounded-2xl"
      >
        <View className="mr-[5px]">
          <ImageWithURL
            source={{
              uri: "https://ik.imagekit.io/socialboat/tr:w-100,c-maintain_ratio,fo-auto/Frame%201000001349__nt0i2Fs2.png?updatedAt=1699280960078",
            }}
            className={"w-2.5 aspect-square"}
            resizeMode="contain"
          />
        </View>
        <View className="flex items-center justify-center">
          <Text
            className="text-[#6D55D1] text-[11px]"
            style={{ fontFamily: "Poppins-Regular" }}
          >
            Insights
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CalorieProgress;
