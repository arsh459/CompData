import { onMealTrackOnboardingDone } from "@modules/HomeScreen/utills/guidedOnboardUtils";
import { useUserStore } from "@providers/user/store/useUserStore";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { AiScanOnboardinScreenParams } from "@screens/AiScanOnboardingScreen";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { onboardingCompData } from "./constants/constants";
import Header from "@modules/Header";
import AiMain from "./components";
import { shallow } from "zustand/shallow";

const AiScanOnboardingModule: React.FC<AiScanOnboardinScreenParams> = ({
  index,
  mealType,
  taskId,
  dayRecommendationId,
}) => {
  const navigation = useNavigation();

  const { uid } = useUserStore(
    (state) => ({
      uid: state.user?.uid,
    }),
    shallow
  );

  const onNext = () => {
    const key = onboardingCompData[index].key;
    weEventTrack(`aiScanOnboarding${key ? `_${key}` : ""}`, {});
    if (index === onboardingCompData.length - 1) {
      onMealTrackOnboardingDone(true, uid);
      navigation.dispatch((state) => {
        const routes = state.routes.filter(
          (r) =>
            r.name !== "AiScanOnboardingScreen" &&
            r.name !== "AiScanMealTypeScreen"
        );
        routes.push({
          key: `AiScanMealType-${Math.round(Math.random() * 1000)}`,
          name: "AiScanMealTypeScreen",
          params: {
            mealType: mealType,
            taskId: taskId,
            dayRecommendationId: dayRecommendationId,
          },
        });

        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      });
      weEventTrack("AiScanOnboardingScreen_success", {});
    } else {
      navigation.dispatch((state) => {
        const routes = state.routes;
        routes.push({
          key: `AiScanOnboardingScreen-${Math.round(Math.random() * 1000)}`,
          name: "AiScanOnboardingScreen",
          params: {
            index: index + 1,
            mealType: mealType,
            taskId: taskId,
            dayRecommendationId: dayRecommendationId,
          },
        });

        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      });
      weEventTrack("AiScanOnboardingScreen_success", { index: index });
    }
  };

  return (
    <>
      <Header
        centerTitle={true}
        back={true}
        headerColor="#232136"
        tone="dark"
        title=""
        headerType="solid"
      />
      <AiMain index={index} onNext={onNext} />
    </>
  );
};

export default AiScanOnboardingModule;
