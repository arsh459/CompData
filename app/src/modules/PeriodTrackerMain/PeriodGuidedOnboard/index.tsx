import UseModal from "@components/UseModal";
import { useUserContext } from "@providers/user/UserProvider";
import { useEffect } from "react";
import { useOnboardContext } from "./OnboardProvider";
import {
  onPeriodTarckerCalenderOnboardDone,
  onPeriodTarckerInsightOnboardDone,
} from "@modules/HomeScreen/utills/guidedOnboardUtils";
import PopupForRef from "./PopupForRef";
import DemoPeriodTrackerCalender from "./DemoComps/DemoPeriodTrackerCalender";
import {
  calendatItemWidth,
  horizontalItemHeight,
} from "@modules/Nutrition/V2/DaySelector/V3/HorizontalDayComponentV2";
import InsightText from "../MiddleCircleComponents/InsightText";
import { useCurrentPeriodStore } from "@providers/period/periodStore";
import { useInteractionContext } from "@providers/InteractionProvider/InteractionProvider";
import { shallow } from "zustand/shallow";
import ImageWithURL from "@components/ImageWithURL";
import { infoBtnRing } from "@constants/imageKitURL";

const PeriodMainGuidedOnboard = () => {
  const { user } = useUserContext();
  const { interactionStatus } = useInteractionContext();

  const {
    periodTrackerCalender,
    periodTrackerInsight,
    infoBtn,
    onboardState,
    setOnboardState,
  } = useOnboardContext();

  const { insight, prompt } = useCurrentPeriodStore((state) => {
    const mainInsights = state.mainInsights[state.currentlySelected];

    return {
      insight: mainInsights?.insight ? mainInsights.insight : "",
      prompt: mainInsights?.prompt ? mainInsights.prompt : "",
    };
  }, shallow);

  useEffect(() => {
    if (interactionStatus && insight && prompt) {
      if (
        !user?.flags?.periodTrackerCalender &&
        periodTrackerCalender.current
      ) {
        setTimeout(() => setOnboardState("markPeriod"), 1000);
      } else if (
        !user?.flags?.periodTrackerInsight &&
        periodTrackerInsight.current &&
        insight &&
        prompt
      ) {
        setOnboardState("insight");
      }
    }
  }, [
    user?.flags?.periodTrackerCalender,
    periodTrackerCalender.current,
    user?.flags?.periodTrackerInsight,
    periodTrackerInsight.current,
    interactionStatus,
    insight,
    prompt,
  ]);

  const handleCalenderOnboardDone = () => {
    onPeriodTarckerCalenderOnboardDone(user?.uid);
    setOnboardState("unknown");
  };

  const handleInsightOnboardDone = () => {
    onPeriodTarckerInsightOnboardDone(user?.uid);
    setOnboardState("unknown");
  };

  const substratForCenter = calendatItemWidth / 2 + 5;

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
      {onboardState === "markPeriod" ? (
        <PopupForRef
          target={periodTrackerCalender}
          arrowTarget={{
            x: calendatItemWidth * 1 - substratForCenter,
            y: horizontalItemHeight / 2 - 5,
            width: 16,
            height: 16,
          }}
          onPressCta={() => setOnboardState("expectedPeriod")}
          popupText="Red filled circles are your periods"
        >
          <DemoPeriodTrackerCalender />
        </PopupForRef>
      ) : onboardState === "expectedPeriod" ? (
        <PopupForRef
          target={periodTrackerCalender}
          arrowTarget={{
            x: calendatItemWidth * 2 - substratForCenter,
            y: horizontalItemHeight / 2 - 5,
            width: 16,
            height: 16,
          }}
          onPressCta={() => setOnboardState("ovulation")}
          popupText="Red dotted outlined circles are your expected periods"
        >
          <DemoPeriodTrackerCalender />
        </PopupForRef>
      ) : onboardState === "ovulation" ? (
        <PopupForRef
          target={periodTrackerCalender}
          arrowTarget={{
            x: calendatItemWidth * 6 - substratForCenter,
            y: horizontalItemHeight / 2 - 5,
            width: 16,
            height: 16,
          }}
          onPressCta={handleCalenderOnboardDone}
          popupText="The Green dot depicts your are at your ovulation stage"
        >
          <DemoPeriodTrackerCalender />
        </PopupForRef>
      ) : onboardState === "insight" ? (
        <PopupForRef
          target={periodTrackerInsight}
          onPressCta={() => setOnboardState("legend")}
          popupText="You will get insights from sakhi every day"
        >
          <InsightText insight={insight} prompt={prompt} />
        </PopupForRef>
      ) : onboardState === "legend" ? (
        <PopupForRef
          target={infoBtn}
          onPressCta={handleInsightOnboardDone}
          popupText="You can view of all the dots from here"
        >
          <ImageWithURL
            source={{ uri: infoBtnRing }}
            className="w-5 aspect-square"
            resizeMode="contain"
          />
        </PopupForRef>
      ) : null}
    </UseModal>
  );
};

export default PeriodMainGuidedOnboard;
