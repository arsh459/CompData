import { View } from "react-native";

import PeriodTrackerMain from "@modules/PeriodTrackerMain";
// import Header from "@modules/Header";
import { InteractionProvider } from "@providers/InteractionProvider/InteractionProvider";

import PeriodStartJourney from "@modules/PeriodStartJourney";
import { useCycleExists } from "@modules/PeriodStartJourney/hooks/useCycleExists";
import Loading from "@components/loading/Loading";
import { OnboardProvider } from "@modules/PeriodTrackerMain/PeriodGuidedOnboard/OnboardProvider";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
// import { useNavigation } from "@react-navigation/native";
// import ImageWithURL from "@components/ImageWithURL";
// import { hamBurgerIcon } from "@constants/imageKitURL";
const PeriodTrackerScreen = () => {
  // const { navigate } = useNavigation();

  useScreenTrack();
  const { periodState } = useCycleExists();

  if (periodState === "LOADING") {
    return (
      <View className="flex-1 justify-center items-center bg-[#232136]">
        <Loading width="w-8" />
      </View>
    );
  } else if (periodState === "NEEDS_INIT") {
    return <PeriodStartJourney />;
  }

  return (
    <>
      <InteractionProvider>
        <View className="flex-1 bg-[#232136]">
          <OnboardProvider>
            <PeriodTrackerMain />
          </OnboardProvider>
        </View>
      </InteractionProvider>
    </>
  );
};

export default PeriodTrackerScreen;
