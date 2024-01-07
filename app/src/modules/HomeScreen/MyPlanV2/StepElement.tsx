import { stepsLogoNew } from "@constants/imageKitURL";
import ElementCard from "./ElementCard";
import { useSteps } from "@hooks/steps/useSteps";
import { getViewSteps } from "../MyProgress/utils";
import { useUserSteps } from "@hooks/steps/useUserSteps";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { useGoogleFitV2 } from "@providers/GoogleFit/hooks/useGoogleFitV2";
import { useStepsPermissionContext } from "@providers/steps/StepsPermissionProvider";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { useNavigation } from "@react-navigation/native";

export const defaultStepTarget = 3000;

const StepElement = () => {
  const { today } = useAuthContext();
  const { daySteps } = useUserSteps(today);
  const navigation = useNavigation();

  const dailyStepTarget = useUserStore(
    (state) => state.user?.dailyStepTarget,
    shallow
  );

  useSteps();
  useGoogleFitV2();

  const { permission, gFitAuth } = useStepsPermissionContext();
  const { title, subtitle, progress } = getViewSteps(
    permission,
    gFitAuth,
    dailyStepTarget || defaultStepTarget,
    daySteps
  );

  const onStepsPlanClick = () => {
    navigation.navigate("StepHistoryScreen");
    weEventTrack("home_clickTodaySteps", {});
  };

  return (
    <ElementCard
      colors={["#343150", "#343150"]}
      text={title}
      subText={subtitle}
      imgUrl={stepsLogoNew}
      progress={progress}
      onPress={onStepsPlanClick}
      activeColor="#ACF63C"
      inActiveColor="#9FE74833"
      textColors={["#91D93F", "#B8F04C"]}
    />
  );
};

export default StepElement;
