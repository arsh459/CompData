import CirclePercent from "@components/CirclePercent";
import ImageWithURL from "@components/ImageWithURL";
import { stepsLogoNew } from "@constants/imageKitURL";
import { exerciseLogoNew, nutriLogoNew } from "@constants/imageKitURL";
import { Achiever } from "@models/Awards/interface";
import { View, Text, useWindowDimensions } from "react-native";

export interface Props {
  awardReport?: Achiever;
}

const ActivityRegularity: React.FC<Props> = ({ awardReport }) => {
  const { width } = useWindowDimensions();

  return (
    <View className="flex justify-center items-centers bg-[#434066] rounded-xl p-4">
      <Text
        className="text-white text-lg text-center"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        Activity Regularity
      </Text>

      <View className="flex flex-row">
        <View className="flex justify-center items-center w-1/3">
          <View className="py-4">
            <CirclePercent
              circleSize={width / 6}
              percent={0}
              strokeWidth={8}
              activeColor="#2ED5FF"
              inActiveColor="#2ED5FF40"
              showInactive={true}
            >
              <Text
                className="text-sm"
                style={{ color: "#2ED5FF", fontFamily: "Nunito-Bold" }}
              >
                {Math.round(0 * 100)}%
              </Text>
            </CirclePercent>
          </View>
          <View className="flex flex-row justify-center items-center">
            <ImageWithURL
              source={{ uri: exerciseLogoNew }}
              className="w-4 aspect-square"
              resizeMode="contain"
            />
            <Text
              className="text-sm ml-1"
              style={{ color: "#2ED5FF", fontFamily: "Nunito-Bold" }}
            >
              Workout
            </Text>
          </View>
        </View>

        <View className="flex justify-center items-center w-1/3">
          <View className="py-4">
            <CirclePercent
              circleSize={width / 6}
              percent={0}
              strokeWidth={8}
              activeColor="#FFC931"
              inActiveColor="#FFC93140"
              showInactive={true}
            >
              <Text
                className="text-sm"
                style={{ color: "#FFC931", fontFamily: "Nunito-Bold" }}
              >
                {Math.round(0 * 100)}%
              </Text>
            </CirclePercent>
          </View>
          <View className="flex flex-row justify-center items-center">
            <ImageWithURL
              source={{ uri: nutriLogoNew }}
              className="w-4 aspect-square"
              resizeMode="contain"
            />
            <Text
              className="text-sm ml-1"
              style={{ color: "#FFC931", fontFamily: "Nunito-Bold" }}
            >
              Nutrition
            </Text>
          </View>
        </View>

        <View className="flex justify-center items-center w-1/3">
          <View className="py-4">
            <CirclePercent
              circleSize={width / 6}
              percent={0}
              strokeWidth={8}
              activeColor="#ACF63C"
              inActiveColor="#ACF63C40"
              showInactive={true}
            >
              <Text
                className="text-sm"
                style={{ color: "#ACF63C", fontFamily: "Nunito-Bold" }}
              >
                {Math.round(0 * 100)}%
              </Text>
            </CirclePercent>
          </View>
          <View className="flex flex-row justify-center items-center">
            <ImageWithURL
              source={{ uri: stepsLogoNew }}
              className="w-4 aspect-square"
              resizeMode="contain"
            />
            <Text
              className="text-sm ml-1"
              style={{ color: "#ACF63C", fontFamily: "Nunito-Bold" }}
            >
              Steps
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ActivityRegularity;
