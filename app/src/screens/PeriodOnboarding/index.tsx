import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import PeriodOnboardingModule from "@modules/PeriodOnboardingModule";
import { periodSectionTypes } from "@modules/PeriodOnboardingModule/hooks/usePeriodSection";
import { useRoute } from "@react-navigation/native";

export interface PeriodOnboardingProps {
  sec: periodSectionTypes;
}

const PeriodOnboarding = () => {
  const route = useRoute();
  const { sec } = route.params as PeriodOnboardingProps;

  useScreenTrack(`periodOnboarding-${sec}`);
  return <PeriodOnboardingModule sec={sec} />;
};

export default PeriodOnboarding;
