// import { useMotionPermission } from "@hooks/steps/useMotionPermission";

// import { Pedometer } from "expo-sensors";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { trackingStepsPermissionImg } from "@constants/imageKitURL";
import { useStepsPermissionContext } from "@providers/steps/StepsPermissionProvider";
import RequestPermission from "@modules/Workout/ProgramDetails/TaskSubmitV2/RequestPermission";
import { View } from "react-native";
import { openSettings, RESULTS } from "react-native-permissions";
import PermissionTaker from "./PermissionTaker";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {
  children: React.ReactNode;
}

const IOSPermissionHandler: React.FC<Props> = ({ children }) => {
  const { permission, requestPermission } = useStepsPermissionContext();
  const goToSettings = () => {
    weEventTrack("steps_sendToSettings", {});
    openSettings();
  };

  const requestMotionPermission = () => {
    requestPermission();
    weEventTrack("steps_requestMotionPermissions", {});
  };

  return permission === RESULTS.GRANTED ? (
    <>{children}</>
  ) : permission === RESULTS.BLOCKED || permission === RESULTS.LIMITED ? (
    <RequestPermission
      onPress={goToSettings}
      cta="Go To Settings"
      text={
        "You would have to go to settings in your phone to give access to motion data"
      }
    />
  ) : permission === RESULTS.DENIED ? (
    <PermissionTaker
      imgUrl={trackingStepsPermissionImg}
      text="Kindly give access to motion permissions for tracking your steps"
      imgStyleTW="w-3/5 aspect-square"
      txtLayoutStyleTW="w-[85%]"
    >
      <View className="w-full mx-auto pb-10">
        <StartButton
          title="Enable Permissions"
          bgColor="bg-[#fff]"
          textColor="text-[#100F1A] "
          roundedStr="rounded-lg"
          textStyle="py-2 text-center text-base  "
          onPress={requestMotionPermission}
          fontFamily="BaiJamjuree-Bold"
        />
      </View>
    </PermissionTaker>
  ) : (
    <RequestPermission
      text={"The feature is unavailable in your phone"}
      onPress={requestPermission}
      cta=""
    />
  );
};

export default IOSPermissionHandler;
