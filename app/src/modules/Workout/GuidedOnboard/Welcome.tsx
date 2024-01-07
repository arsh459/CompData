import ImageWithURL from "@components/ImageWithURL";
import SpreadColorBall from "@components/SpreadColorBall";
import { customMealIcon, sbLogo } from "@constants/imageKitURL";
import { customWorkoutIcon } from "@constants/imageKitURL";
import { useUserContext } from "@providers/user/UserProvider";
import { useEffect } from "react";
import { View, Text } from "react-native";

interface Props {
  type: "Workout" | "Nutrition";
  onNext: () => void;
}

const Welcome: React.FC<Props> = ({ type, onNext }) => {
  const { user } = useUserContext();
  const color =
    type === "Workout"
      ? "#3491FF"
      : type === "Nutrition"
      ? "#FF9B04"
      : "#FFFFFF";

  useEffect(() => {
    setTimeout(onNext, 3000);
  }, []);

  return (
    <View className="flex-1 flex justify-center items-center w-2/3 mx-auto">
      <View className="flex justify-center items-center">
        <View className="absolute w-[200%] aspect-square">
          <SpreadColorBall
            color1={color}
            color2="#13121E"
            opacity1={0.5}
            opacity2={0}
          />
        </View>
        <ImageWithURL
          source={{
            uri:
              type === "Workout"
                ? customWorkoutIcon
                : type === "Nutrition"
                ? customMealIcon
                : sbLogo,
          }}
          className="w-1/2 aspect-square rounded-full overflow-hidden"
        />
      </View>
      <View className="w-10 aspect-square" />
      <Text
        className="text-white text-3xl text-center"
        style={{ fontFamily: "Nunito-Bold" }}
      >
        Welcome {user?.name ? user.name : "User"} To{" "}
        <Text style={{ color }}>{type} plan</Text>
      </Text>
    </View>
  );
};

export default Welcome;
