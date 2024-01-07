import ViewSelectorV3 from "@components/ViewSelector/V3";
import { useState } from "react";
import { View } from "react-native";
import ProgramHome from "./ProgramHome";
import IntroReels from "./ProgramHome/IntroReels";
import WorkoutHeader from "./WorkoutHeader";
import HomeGuidedOnboard from "@modules/Workout/GuidedOnboard";
import { PreviewProvider } from "./ProgramHome/PreviewProvider/PreviewProvider";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import DefaultNutrition from "@modules/Nutrition/DefaultNutrition";
import { hasAccess, isBootcampBadge } from "./UnlockedProgram/utils";
import { useBootcampContext } from "@providers/bootcamp/BootcampProvider";

interface Props {}

const WorkoutMain: React.FC<Props> = ({}) => {
  const [selectedView, setSelectedView] = useState<
    "Workout Plan" | "Intro Reels"
  >("Workout Plan");

  const { badge } = useSignleBadgeContext();
  // const { state } = useAuthContext();

  // if exired handle
  const { bootcampStatus, bootcamp } = useBootcampContext();
  const bootcampBadge = isBootcampBadge(badge, bootcamp?.badgeId);
  const accessDueToBootcamp = hasAccess(bootcampStatus, bootcampBadge);

  return (
    <>
      <WorkoutHeader />
      <View className="flex-1 bg-[#232136]">
        <ViewSelectorV3
          view1="Workout Plan"
          view2="Intro Reels"
          currView={selectedView}
          onView1={() => setSelectedView("Workout Plan")}
          onView2={() => setSelectedView("Intro Reels")}
          selectedViewHighlightColors={["#57F4FF", "#19C8FF"]}
          bgColor="bg-[#343150]"
        />

        {selectedView === "Workout Plan" && badge ? (
          <>
            {bootcampBadge && !accessDueToBootcamp ? (
              <DefaultNutrition isBooCamp={true} />
            ) : (
              <ProgramHome accessDueToBootcamp={accessDueToBootcamp} />
            )}
          </>
        ) : selectedView === "Intro Reels" ? (
          <IntroReels />
        ) : null}
      </View>
      <PreviewProvider>
        <HomeGuidedOnboard />
      </PreviewProvider>
    </>
  );
};

export default WorkoutMain;
