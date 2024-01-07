import { LinearGradient } from "expo-linear-gradient";
import { getButtonStatus } from "@modules/CourseMain/utils";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WarningModal from "@modules/CourseMain/Components/WarningModal";
import { pinWorkout, startAndPinWorkout } from "@models/User/updateUtils";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const ListCta = () => {
  const navigation = useNavigation();
  const { badge } = useSignleBadgeContext();
  const { bottom } = useSafeAreaInsets();
  const [modalText, setModalText] = useState<string>();

  const { userId, start, nutritionStart, badgeConfig } = useUserStore(
    (state) => {
      return {
        userId: state.user?.uid,
        start: state.user?.recommendationConfig?.start,
        nutritionStart: state.user?.recommendationConfig?.nutritionStart,
        badgeConfig: state.user?.recommendationConfig?.badgeConfig,
      };
    },
    shallow
  );

  const { buttonText, action } = getButtonStatus(
    "workout",
    badge?.id,
    start,
    nutritionStart,
    badgeConfig
  );

  const onProceed = async () => {
    if (userId && badge?.id) {
      await startAndPinWorkout(userId, badge.id);
      setModalText("");

      setTimeout(() => {
        navigation.navigate("WorkoutStartScreen", {
          badgeId: badge.id,
          noModal: true,
        });
      }, 200);
    }
  };

  const onStartPlan = async () => {
    if (badge?.id && userId) {
      if (action === "GO_TO_PLAN") {
        userId && pinWorkout(userId, badge.id);
        navigation.navigate("Workout", { badgeId: badge.id });
      } else if (
        action === "START_PLAN_AND_PIN" ||
        action === "CHANGE_PLAN" ||
        action === "START_PLAN"
      ) {
        setModalText("Are you sure you want to change your plan?");
      }
    }
  };

  return (
    <>
      <LinearGradient
        colors={["#23213600", "#232136", "#232136"]}
        className="absolute left-0 right-0 bottom-0 p-4"
        style={{ paddingBottom: bottom || 16 }}
      >
        <StartButton
          title={buttonText}
          bgColor="bg-[#6D55D1]"
          textColor="text-white"
          roundedStr="rounded-xl"
          fontFamily="BaiJamjuree-Bold"
          textStyle="py-3 text-center text-base iphoneX:text-base font-bold rounded-md"
          onPress={onStartPlan}
        />
      </LinearGradient>

      {modalText ? (
        <WarningModal
          visible={modalText ? true : false}
          onClose={() => setModalText(undefined)}
          heading={modalText}
          subtitle="This plan will be added to your home screen"
          onNext={onProceed}
          loading={false}
        />
      ) : null}
    </>
  );
};

export default ListCta;
