import CirclePercent from "@components/CirclePercent";
import SvgIcons from "@components/SvgIcons";
import { polygonIcon } from "@constants/imageKitURL";
import { dayRecommendation, dayRecommendationType } from "@models/User/User";
import { View, Text, TouchableOpacity, Image } from "react-native";

export type iconType = "exercise" | "nutrition";

interface Props {
  onPress?: () => void;
  color?: string;
  text?: string;
  type?: dayRecommendationType;
  recomendation?: dayRecommendation;
}

const Toggler: React.FC<Props> = ({
  onPress,
  color,
  text,
  type,
  recomendation,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-[#343150] flex flex-row items-center rounded-xl px-4 py-2"
    >
      {recomendation && !recomendation.tasks.length ? (
        <View className="w-6 aspect-square">
          <SvgIcons iconType="restDay" color={color} />
        </View>
      ) : (
        <CirclePercent
          circleSize={32}
          percent={(recomendation?.doneFP || 0) / (recomendation?.taskFP || 1)}
          activeColor={color}
          strokeWidth={3}
          inActiveColor={`${color}33`}
          showInactive={true}
        >
          <View className="w-full h-full flex justify-center items-center">
            {type ? (
              <View className="w-4 aspect-square">
                <SvgIcons
                  iconType={
                    type === "workout"
                      ? "exercise"
                      : type === "nutrition"
                      ? "nutrition"
                      : undefined
                  }
                  color={color}
                />
              </View>
            ) : null}
          </View>
        </CirclePercent>
      )}
      <Text className="text-white font-medium text-lg mx-3">{text}</Text>
      <View className="flex-1" />
      <Image
        source={{ uri: polygonIcon }}
        className="w-2.5 aspect-square"
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default Toggler;
