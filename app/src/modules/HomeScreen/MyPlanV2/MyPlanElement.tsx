import { StepsPermissionProvider } from "@providers/steps/StepsPermissionProvider";
import { useNavigation } from "@react-navigation/native";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { Text, TouchableOpacity, View } from "react-native";
import NutritionElement from "./NutritionElement";
import StepElement from "./StepElement";
import TaskElement from "./TaskElement";
import { useOnboardContext } from "../GuidedOnboard/OnboardProvider";
import ImageWithURL from "@components/ImageWithURL";
import {
  proMemberPlusStar,
  proMemberStar,
  subsToPro,
} from "@constants/imageKitURL";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const MyPlanElement = () => {
  const navigation = useNavigation();
  const { workout, nutrition, steps } = useOnboardContext();
  const { subStatus, sbplan } = useSubscriptionContext();

  const name = useUserStore((state) => state.user?.name, shallow);

  const onProClick = async () => {
    // Need to toggle it back
    if (subStatus !== "SUBSCRIBED") {
      navigation.navigate("ProScreen", { planType: "pro" });
      weEventTrack("home_subscribeClick", {});
    } else {
      navigation.navigate("UpgradeScreen");
      weEventTrack("home_proClick", {});
    }
  };
  // const viewName = name?.split(" ").length >= 2

  return (
    <>
      <View className="flex flex-row items-center justify-between   px-4 pb-3">
        <View className="w-2/3">
          <Text
            className="text-[#F1F1F1] capitalize text-lg iphoneX:text-xl"
            style={{ fontFamily: "Nunito-Bold" }}
          >
            {name ? `${name}'s` : "Your"} Plans
          </Text>
        </View>
        <View className="flex flex-grow" />

        <View className="flex flex-row items-center w-1/3">
          <TouchableOpacity
            onPress={onProClick}
            className="flex-1 flex items-end "
          >
            {subStatus === "SUBSCRIBED" ? (
              <>
                {sbplan?.planType === "pro" ? (
                  <ImageWithURL
                    source={{ uri: proMemberStar }}
                    className="h-6 aspect-[114/22]"
                    resizeMode="contain"
                  />
                ) : (
                  <ImageWithURL
                    source={{ uri: proMemberPlusStar }}
                    className="h-6 aspect-[114/22]"
                    resizeMode="contain"
                  />
                )}
              </>
            ) : subStatus === "PENDING" ? (
              <View />
            ) : (
              <ImageWithURL
                source={{ uri: subsToPro }}
                className="h-6 aspect-[114/22]"
                resizeMode="contain"
              />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View ref={workout} collapsable={false}>
        <TaskElement />
      </View>

      <View className="py-2">
        <View ref={nutrition} collapsable={false}>
          <NutritionElement />
        </View>
      </View>

      <StepsPermissionProvider>
        <View ref={steps} collapsable={false}>
          <StepElement />
        </View>
      </StepsPermissionProvider>
    </>
  );
};

export default MyPlanElement;
