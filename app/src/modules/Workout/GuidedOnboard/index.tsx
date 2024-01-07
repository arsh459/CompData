import { useOnboardContext } from "./OnboardProvider";
import UseModal from "@components/UseModal";
import Welcome from "./Welcome";
import PopupForRef from "./PopupForRef";
import DemoMyPlanCard from "./DemoComps/DemoMyPlanCard";
import DemoDaySelector from "./DemoComps/DemoDaySelector";
import {
  onDaySelectorOnboardDone,
  onIntroReelsOnboardDone,
  onWorkoutCardOnboardDone,
  onWorkoutDoneOnboardDone,
  onWorkoutProgOnboardDone,
} from "@modules/HomeScreen/utills/guidedOnboardUtils";
import { useEffect } from "react";
import ReelsCard from "@modules/Knowledge/ReelsCard";
import { useWindowDimensions } from "react-native";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

const HomeGuidedOnboard = () => {
  const {
    taskCard,
    daySelector,
    reelCard,
    reelProp,
    taskCardProp,
    onboardState,
    setOnboardState,
    setReelProp,
    setTaskCardProp,
  } = useOnboardContext();

  const { width } = useWindowDimensions();
  const {
    uid,
    workoutCardOnboard,
    workoutProgOnboard,
    workoutDoneOnboard,
    daySelectorOnboard,
    introReelsOnboard,
  } = useUserStore((state) => {
    return {
      uid: state.user?.uid,
      workoutCardOnboard: state.user?.flags?.workoutCardOnboard,
      workoutProgOnboard: state.user?.flags?.workoutProgOnboard,
      workoutDoneOnboard: state.user?.flags?.workoutDoneOnboard,
      daySelectorOnboard: state.user?.flags?.daySelectorOnboard,
      introReelsOnboard: state.user?.flags?.introReelsOnboard,
    };
  }, shallow);

  useEffect(() => {
    if (workoutCardOnboard) {
      if (!daySelectorOnboard) {
        setOnboardState("daySelectorArrow");
      } else if (
        taskCardProp &&
        workoutProgOnboard &&
        workoutProgOnboard === "DONE"
      ) {
        if (workoutDoneOnboard && workoutDoneOnboard !== "DONE") {
          setOnboardState("taskCardDone");
        }
      } else if (workoutProgOnboard && taskCardProp) {
        setOnboardState("taskCardProgress");
      }
    } else {
      taskCardProp && setOnboardState("welcome");
    }
  }, [
    workoutCardOnboard,
    workoutProgOnboard,
    workoutDoneOnboard,
    daySelectorOnboard,
    taskCardProp,
  ]);

  useEffect(() => {
    if (!introReelsOnboard && reelProp) {
      setOnboardState("reelCard");
    }
  }, [introReelsOnboard, reelProp]);

  const onWorkoutCardDone = () => {
    onWorkoutCardOnboardDone(uid);
    setOnboardState("unknown");
    setTaskCardProp(undefined);
  };
  const onWorkoutProgDone = () => {
    onWorkoutProgOnboardDone(uid, "DONE");
    setOnboardState("unknown");
    setTaskCardProp(undefined);
  };
  const onWorkoutDoneDone = () => {
    onWorkoutDoneOnboardDone(uid, "DONE");
    setOnboardState("unknown");
    setTaskCardProp(undefined);
  };
  const onIntroReelDone = () => {
    onIntroReelsOnboardDone(uid);
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
        <Welcome type="Workout" onNext={() => setOnboardState("taskCard")} />
      ) : onboardState === "taskCard" && taskCardProp ? (
        <PopupForRef
          target={taskCard}
          onPressCta={onWorkoutCardDone}
          popupText="These are your workouts that you need to follow everyday."
        >
          <DemoMyPlanCard
            task={taskCardProp.task}
            width={taskCardProp.width}
            height={taskCardProp.height}
            imgHeight={taskCardProp.imgHeight}
          />
        </PopupForRef>
      ) : onboardState === "taskCardProgress" && taskCardProp ? (
        <PopupForRef
          target={taskCard}
          arrowTarget={{
            x: 0,
            y: taskCardProp.imgHeight - 10,
            width: taskCardProp.width,
            height: 4,
          }}
          onPressCta={onWorkoutProgDone}
          popupText="Workout done progress can be seen here"
        >
          <DemoMyPlanCard
            task={taskCardProp.task}
            width={taskCardProp.width}
            height={taskCardProp.height}
            imgHeight={taskCardProp.imgHeight}
            state="progress"
          />
        </PopupForRef>
      ) : onboardState === "taskCardDone" && taskCardProp ? (
        <PopupForRef
          target={taskCard}
          onPressCta={onWorkoutDoneDone}
          popupText="Great work! Keep up the streak & finish your daily targets"
        >
          <DemoMyPlanCard
            task={taskCardProp.task}
            width={taskCardProp.width}
            height={taskCardProp.height}
            imgHeight={taskCardProp.imgHeight}
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
          popupText="Tap the dropper to view the progress"
        >
          <DemoDaySelector type="workout" />
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
          onPressCta={() => setOnboardState("daySelectorRestDay")}
          popupText="Green star shows the date you started the program"
        >
          <DemoDaySelector type="workout" visible={true} />
        </PopupForRef>
      ) : onboardState === "daySelectorRestDay" ? (
        <PopupForRef
          target={daySelector}
          arrowTarget={{
            x: (width / 7) * 4.5,
            y: 100,
            width: width / 7,
            height: width / 7,
          }}
          onPressCta={() => setOnboardState("daySelectorExpander")}
          popupText="This icon will indicate the rest day"
        >
          <DemoDaySelector type="workout" visible={true} />
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
          popupText="Here you can view all the rings you have acheived"
        >
          <DemoDaySelector type="workout" />
        </PopupForRef>
      ) : onboardState === "reelCard" && reelProp ? (
        <PopupForRef
          target={reelCard}
          onPressCta={onIntroReelDone}
          popupText="Explore Short workout videos and tips from your coach!"
        >
          <ReelsCard item={reelProp} />
        </PopupForRef>
      ) : null}
    </UseModal>
  );
};

export default HomeGuidedOnboard;
