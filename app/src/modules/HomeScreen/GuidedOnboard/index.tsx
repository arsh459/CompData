import UseModal from "@components/UseModal";
import { StepsPermissionProvider } from "@providers/steps/StepsPermissionProvider";
import { View } from "react-native";
import NutritionElement from "../MyPlanV2/NutritionElement";
import StepElement from "../MyPlanV2/StepElement";
import TaskElement from "../MyPlanV2/TaskElement";
import TodayFp from "../MyProgress/TodayFp";
import {
  onAppointmentOnboardedDone,
  onBootcampOnboardedDone,
  onGuidedOnbordDone,
} from "../utills/guidedOnboardUtils";
import PopupForRef from "./PopupForRef";
import HomeWelcome from "./HomeWelcome";
import GradientText from "@components/GradientText";
import { fitnessGoalTypes, slotInterventionTypes } from "@models/User/User";
import { useOnboardContext } from "./OnboardProvider";
import { useEffect, useState } from "react";
import WelcomeBootcamp from "./WelcomeBootcamp";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";
import { useAppointmentCheck } from "@hooks/appointment/useScheduledAppointment";
import SlotIntervention from "@modules/SlotIntervention";
import { getSltoInterventionType } from "@modules/SlotIntervention/utils";
// import { useGameContext } from "@providers/game/GameProvider";
import { useConfigContext } from "@providers/Config/ConfigProvider";
import { useFutureAppointmentCount } from "@hooks/appointment/useFutureAppointmentCount";
import { useSubscriptionContext } from "@providers/subscription/SubscriptionProvider";

const getFitnessGoal = (fitnessGoal?: fitnessGoalTypes[]) => {
  if (fitnessGoal?.length) {
    if (fitnessGoal[0] === "pcos_pcod") {
      return "to manage PCOS";
    } else if (fitnessGoal[0] === "lose_weight") {
      return "to lose weight";
    } else if (fitnessGoal[0] === "gain_muscle") {
      return "to gain muscle";
    }
  }

  return "for healthy living";
};

const HomeGuidedOnboard = () => {
  const navigation = useNavigation();
  // useGameContext();
  const [isBootCamp, _] = useState<boolean>(false);
  const [isAppointment, setIsAppointment] = useState<boolean>(false);
  const [slotInterventionType, setSlotInterventionType] =
    useState<slotInterventionTypes>();
  const { todayFp, nutrition, workout, steps, onboardState, setOnboardState } =
    useOnboardContext();
  const { appointment } = useAppointmentCheck();
  const { subStatus } = useSubscriptionContext();

  const { numberOfFutureScheduledAppointments } = useFutureAppointmentCount();
  const { config } = useConfigContext();
  const isFocus = useIsFocused();

  // const appointmentExistsInFuture = doesAppointmentExist(appointment?.status, appointment?.startSlot);

  const {
    uid,
    name,
    fitnessGoal,
    guidedOnboardDone,
    bootcampOnboarded,
    // bootcampDetails,
    wonId,
    fpString,
    appointmentFlag,
    slotIntervention,
  } = useUserStore(({ user }) => {
    return {
      uid: user?.uid,
      name: user?.name,
      fitnessGoal: user?.fitnessGoal,
      guidedOnboardDone: user?.guidedOnboardDone,
      bootcampOnboarded: user?.flags?.bootcampOnboarded,
      // bootcampDetails: user?.bootcampDetails,
      wonId: user?.unseenAwards?.length ? user?.unseenAwards[0] : "",
      fpString: user?.dailyFPTarget || 20,
      appointmentFlag: user?.flags?.appointmentFlag,
      slotIntervention: user?.slotIntervention,
    };
  }, shallow);

  // console.log("appointmentFlag", appointmentFlag);
  // console.log(
  //   "numberOfFutureScheduledAppointments",
  //   numberOfFutureScheduledAppointments
  // );
  // console.log("slotIntervention", slotIntervention);

  useEffect(() => {
    if (uid && isFocus)
      if (!guidedOnboardDone) {
        setOnboardState("welcome");
      } else if (!appointmentFlag && appointment?.id) {
        setOnboardState("appointment");
        setIsAppointment(true);
      } else if (
        subStatus === "EXPIRED" &&
        !numberOfFutureScheduledAppointments &&
        slotIntervention &&
        slotIntervention !== "none"
      ) {
        const type = getSltoInterventionType(
          slotIntervention,
          config?.slotInterventionDelay
        );

        if (type) {
          setOnboardState("slotIntervention");
          setSlotInterventionType(type);
        } else {
          setOnboardState("unknown");
        }
      }

      // else if (
      //   !bootcampOnboarded &&
      //   bootcampDetails?.bootcampId &&
      //   bootcampDetails?.started
      // ) {
      //   setOnboardState("welcomeBootcamp");
      //   setIsBootCamp(true);
      // }
      else if (wonId) {
        setTimeout(() => {
          navigation.navigate("AwardWon", { achivementId: wonId });
        }, 3000);
      }
  }, [
    uid,
    guidedOnboardDone,
    bootcampOnboarded,
    subStatus,
    // bootcampDetails?.bootcampId,
    // bootcampDetails?.started,
    wonId,
    appointment?.id,
    appointmentFlag,
    slotIntervention,
    config?.slotInterventionDelay,
    numberOfFutureScheduledAppointments,
  ]);

  const onDone = () => {
    setOnboardState("unknown");
    if (isBootCamp) {
      onBootcampOnboardedDone(uid);
    } else if (isAppointment) {
      onAppointmentOnboardedDone(uid);
    } else {
      onGuidedOnbordDone(uid);
    }
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
        <HomeWelcome
          onClose={() => setOnboardState("todayFp")}
          headText={`Welcome ${name}!`}
          subText={`Your program ${getFitnessGoal(
            fitnessGoal
          )} is ready. Work with us to finish your daily target of ${fpString}FPs!`}
        />
      ) : onboardState === "todayFp" ? (
        <PopupForRef
          target={todayFp}
          onPressCta={isBootCamp ? onDone : () => setOnboardState("workout")}
          popupText={
            isBootCamp
              ? "This will access your bootcamp session date"
              : `Everyday you have to win ${fpString}FP to achieve your goal`
          }
        >
          <View className="relative z-0">
            {isBootCamp ? null : (
              <View className="absolute bottom-full left-0 p-4">
                <GradientText
                  text={`Welcome ${name}!`}
                  textStyle={{
                    fontSize: 22,
                    fontFamily: "Quicksand-Bold",
                    color: "white",
                  }}
                  colors={["#75E0DF", "#7B8DE3"]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  fallbackColor="white"
                />
              </View>
            )}
            <TodayFp hideAppointment={true} />
          </View>
        </PopupForRef>
      ) : onboardState === "whatIsFp" ? (
        <PopupForRef
          target={todayFp}
          onPressCta={() => setOnboardState("workout")}
          popupTitle="What is a Fitpoint?"
          popupText="FitPoints are reward points you get for healthy living. You can earn them in many ways."
        >
          <TodayFp showOnlyFitpoint={true} hideAppointment={true} />
        </PopupForRef>
      ) : onboardState === "appointment" ? (
        <PopupForRef
          target={todayFp}
          onPressCta={onDone}
          popupText="Check your Appointments from here."
        >
          <TodayFp showOnlyFitpoint={true} />
        </PopupForRef>
      ) : onboardState === "workout" ? (
        <PopupForRef
          target={workout}
          onPressCta={() => setOnboardState("nutrition")}
          popupText={
            isBootCamp
              ? "This will access your workout sessions and yoga session"
              : "1st Way - You can earn FP by following your Workout Plan"
          }
        >
          <TaskElement />
        </PopupForRef>
      ) : onboardState === "nutrition" ? (
        <PopupForRef
          target={nutrition}
          onPressCta={() => setOnboardState(isBootCamp ? "todayFp" : "steps")}
          popupText={
            isBootCamp
              ? "This will access your Detox snacks and drinks"
              : "We create a diet plan for you. You can earn FP by eating healthy"
          }
        >
          <NutritionElement />
        </PopupForRef>
      ) : onboardState === "steps" ? (
        <PopupForRef
          target={steps}
          onPressCta={onDone}
          popupText="Even walking can get you FP. Connect your steps to earn 1FP for 1k Steps"
        >
          <StepsPermissionProvider>
            <StepElement />
          </StepsPermissionProvider>
        </PopupForRef>
      ) : onboardState === "welcomeBootcamp" ? (
        <WelcomeBootcamp onClose={() => setOnboardState("workout")} />
      ) : onboardState === "slotIntervention" && slotInterventionType ? (
        <SlotIntervention
          type={slotInterventionType}
          onBack={() => setOnboardState("unknown")}
          nextScreenNav="HOME"
        />
      ) : null}
    </UseModal>
  );
};

export default HomeGuidedOnboard;
