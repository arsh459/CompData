import GradientBgPopup from "@components/Popups/GradientBgPopup";
import { weEventTrack } from "@utils/analytics/webengage/userLog";
import { useNavigation } from "@react-navigation/native";
import BodtTypeShocase from "@modules/SubscribedMain/BodtTypeShocase";
import NonBodyTypeShowcase from "@modules/SubscribedMain/NonBodyTypeShowcase";
import { getFitnessGoal } from "@modules/SubscribedMain/utils";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

interface Props {
  visible: boolean;
  hidePopup: () => void;
}

const StartWorkoutPopup: React.FC<Props> = ({ visible, hidePopup }) => {
  const { fitnessGoal, badgeId } = useUserStore((state) => {
    return {
      fitnessGoal: state.user?.fitnessGoal,
      badgeId: state.user?.badgeId,
    };
  }, shallow);

  const navigation = useNavigation();
  const goal = getFitnessGoal(fitnessGoal);

  const onPressCTA = (badgeId: string) => {
    hidePopup();
    weEventTrack("home_clickMyWorkoutPopup", {});
    navigation.navigate("Workout", { badgeId });
  };

  return (
    <GradientBgPopup
      visible={visible}
      onClose={hidePopup}
      text="Your fitness program to achieve your losing 5kgs in 1 month is ready!"
      ctaText="Start My Journey"
      onPressCTA={() => onPressCTA(badgeId || "")}
    >
      {goal !== "lose_weight" ? (
        <NonBodyTypeShowcase />
      ) : (
        <BodtTypeShocase
          aspectRatio={1.75}
          horizontal={true}
          textPosition={{ x: 12, y: 0 }}
        />
      )}
    </GradientBgPopup>
  );
};

export default StartWorkoutPopup;
