import UseModal from "@components/UseModal";
import {
  onDaySelectorOnboardDone,
  onDietCardOnboardDone,
  onDietDoneOnbordDone,
  onRecipesOnboardDone,
} from "@modules/HomeScreen/utills/guidedOnboardUtils";
import { useEffect } from "react";
import ReelsCard from "@modules/Knowledge/ReelsCard";
import DemoDaySelector from "@modules/Workout/GuidedOnboard/DemoComps/DemoDaySelector";
import Welcome from "@modules/Workout/GuidedOnboard/Welcome";
import { useOnboardContext } from "@modules/Workout/GuidedOnboard/OnboardProvider";
import PopupForRef from "@modules/Workout/GuidedOnboard/PopupForRef";
import DemoMyPlanCard from "./DemoComps/DemoDietCard";
import { useWindowDimensions } from "react-native";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const HomeGuidedOnboard = () => {
  const {
    dietCard,
    daySelector,
    reelCard,
    reelProp,
    dietCardProp,
    onboardState,
    setOnboardState,
    setDietCardProp,
    setReelProp,
  } = useOnboardContext();

  const { width } = useWindowDimensions();
  const {
    uid,
    dietCardOnboard,
    // dietDoneOnboard,
    daySelectorOnboard,
    recipesOnboard,
  } = useUserStore((state) => {
    return {
      uid: state.user?.uid,
      dietCardOnboard: state.user?.flags?.dietCardOnboard,
      // dietDoneOnboard: state.user?.flags?.dietDoneOnboard,
      daySelectorOnboard: state.user?.flags?.daySelectorOnboard,
      recipesOnboard: state.user?.flags?.recipesOnboard,
    };
  }, shallow);

  useEffect(() => {
    if (dietCardOnboard) {
      if (!daySelectorOnboard) {
        setOnboardState("daySelectorArrow");
      }
      // else if (!dietDoneOnboard && dietCardProp) {
      //   setOnboardState("dietCardDone");
      // }
    } else {
      dietCardProp && setOnboardState("welcome");
    }
  }, [
    dietCardOnboard,
    // dietDoneOnboard,
    daySelectorOnboard,
    dietCardProp,
  ]);

  useEffect(() => {
    if (!recipesOnboard && reelProp) {
      setOnboardState("reelCard");
    }
  }, [recipesOnboard, reelProp]);

  const onDietCardDone = () => {
    onDietCardOnboardDone(uid);
    setOnboardState("unknown");
    setDietCardProp(undefined);
  };
  const onWorkoutDoneDone = () => {
    onDietDoneOnbordDone(uid);
    setOnboardState("unknown");
    setDietCardProp(undefined);
  };
  const onIntroReelnDone = () => {
    onRecipesOnboardDone(uid);
    setOnboardState("unknown");
    setReelProp(undefined);
  };
  const onDaySelectorDone = () => {
    onDaySelectorOnboardDone(uid);
    setOnboardState("unknown");
  };

  return (
    <UseModal
      visible={onboardState !== "unknown"}
      onClose={() => setOnboardState("unknown")}
      width="w-full"
      height="h-full"
      tone="dark"
      blurAmount={20}
      fallbackColor="#13121EE5"
    >
      {onboardState === "welcome" ? (
        <Welcome type="Nutrition" onNext={() => setOnboardState("dietCard")} />
      ) : onboardState === "dietCard" && dietCardProp ? (
        <PopupForRef
          target={dietCard}
          onPressCta={() => setOnboardState("dietCardSwap")}
          popupText="This is your daily diet plan. When you eat a meal, mark it complete."
        >
          <DemoMyPlanCard
            task={dietCardProp.task}
            dayRecommendationId={dietCardProp.dayRecommendationId}
            showWave={dietCardProp.showWave}
          />
        </PopupForRef>
      ) : onboardState === "dietCardSwap" && dietCardProp ? (
        <PopupForRef
          target={dietCard}
          arrowTarget={{
            x: width - 200,
            y: 12,
            width: 100,
            height: 16,
          }}
          onPressCta={onDietCardDone}
          popupText="You can swap an item, if you don't feel like having it."
        >
          <DemoMyPlanCard
            task={dietCardProp.task}
            dayRecommendationId={dietCardProp.dayRecommendationId}
            showWave={dietCardProp.showWave}
            state="swap"
          />
        </PopupForRef>
      ) : onboardState === "dietCardDone" && dietCardProp ? (
        <PopupForRef
          target={dietCard}
          onPressCta={onWorkoutDoneDone}
          popupText="Great work! Keep this up and you will achieve your goal"
        >
          <DemoMyPlanCard
            task={dietCardProp.task}
            dayRecommendationId={dietCardProp.dayRecommendationId}
            showWave={dietCardProp.showWave}
          />
        </PopupForRef>
      ) : onboardState === "daySelectorArrow" ? (
        <PopupForRef
          target={daySelector}
          arrowTarget={{
            x: width - 3 * 16,
            y: 24,
            width: 16,
            height: 16,
          }}
          onPressCta={() => setOnboardState("daySelectorStart")}
          popupText="Tap the dropper to change dates"
        >
          <DemoDaySelector type="nutrition" />
        </PopupForRef>
      ) : onboardState === "daySelectorStart" ? (
        <PopupForRef
          target={daySelector}
          arrowTarget={{
            x: (width / 7) * 1.4,
            y: 160,
            width: 12,
            height: 12,
          }}
          onPressCta={() => setOnboardState("daySelectorExpander")}
          popupText="Green star shows the date you started the plan"
        >
          <DemoDaySelector type="nutrition" visible={true} />
        </PopupForRef>
      ) : onboardState === "daySelectorExpander" ? (
        <PopupForRef
          target={daySelector}
          arrowTarget={{
            x: 2 * 16,
            y: 32,
            width: 16,
            height: 16,
          }}
          onPressCta={onDaySelectorDone}
          popupText="Here you can view all the rings you acheived"
        >
          <DemoDaySelector type="nutrition" />
        </PopupForRef>
      ) : onboardState === "reelCard" && reelProp ? (
        <PopupForRef
          target={reelCard}
          onPressCta={onIntroReelnDone}
          popupText="Explore Diet tips and video recipes from top dieticians!"
        >
          <ReelsCard item={reelProp} />
        </PopupForRef>
      ) : null}
    </UseModal>
  );
};

export default HomeGuidedOnboard;
