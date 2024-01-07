import { View, Text, Image, TouchableOpacity } from "react-native";

import { doubleArrowIconFrame28 } from "@constants/imageKitURL";
import { IconAndTextInterface, navigateFromFpDetail } from "./utils";
import { useUserContext } from "@providers/user/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";

interface Props {
  data: IconAndTextInterface[];
  heading?: string;
}
const IconTextArrow: React.FC<Props> = ({ data, heading }) => {
  const { user } = useUserContext();
  const navigation = useNavigation();

  const { res } = useSubscriptionContext();
  const onWorkoutPlanClick = () => {
    if (user?.badgeId) {
      navigation.navigate("Workout", {
        badgeId: user.badgeId,
      });
    }
  };

  const onNutritionPlanClick = () => {
    if (res.currentStatus === "SUBSCRIBED" && user?.nutritionBadgeId) {
      navigation.navigate("NutritionScreen", {
        badgeId: user.nutritionBadgeId,
      });
    } else if (res.currentStatus !== "SUBSCRIBED") {
      navigation.navigate("Upgrade");
    } else {
      navigation.navigate("Upgrade");
    }
  };

  const onPressSteps = () => {
    navigation.navigate("StepHistoryScreen");
  };
  const onPressRewards = () => {
    navigation.navigate("Shop");
  };

  const pressMe = (navigateTo: navigateFromFpDetail) => {
    switch (navigateTo) {
      case "workouts":
        onWorkoutPlanClick();
        break;
      case "meals":
        onNutritionPlanClick();
        break;
      case "steps":
        onPressSteps();
        break;
      case "rewards":
        onPressRewards();
        break;

      default:
        break;
    }
  };
  return (
    <>
      <Text className="text-base iphoneX:text-lg pb-4 text-[#FFFFFF]">
        {heading}
      </Text>
      {data?.map((item) => {
        // {item.navigateTo}
        return (
          <TouchableOpacity
            onPress={() => pressMe(item.navigateTo)}
            className="flex flex-row items-center mb-4 "
            key={item.iconUri}
          >
            <View className="flex flex-row flex-[.25] gap-2 items-center">
              <Image
                source={{ uri: item.iconUri }}
                className="w-11 aspect-square"
                resizeMode="contain"
              />
              <Text className="text-xs flex-1  text-[#FFFFFFB2]">
                {item.text}
              </Text>
            </View>
            <Image
              source={{ uri: doubleArrowIconFrame28 }}
              className="flex-[.05] w-7 aspect-square"
              resizeMode="contain"
            />
          </TouchableOpacity>
        );
      })}
    </>
  );
};

export default IconTextArrow;
