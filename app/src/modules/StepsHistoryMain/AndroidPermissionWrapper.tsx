// import { useMotionPermission } from "@hooks/steps/useMotionPermission";

// import { Pedometer } from "expo-sensors";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import {
  googleFitPermissionImg,
  trackingStepsPermissionImg,
} from "@constants/imageKitURL";
import { useStepsPermissionContext } from "@providers/steps/StepsPermissionProvider";
import RequestPermission from "@modules/Workout/ProgramDetails/TaskSubmitV2/RequestPermission";
import { ActivityIndicator, View } from "react-native";
import { openSettings, RESULTS } from "react-native-permissions";
import PermissionTaker from "./PermissionTaker";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {
  children: React.ReactNode;
}

const AndroidPermissionWrapper: React.FC<Props> = ({ children }) => {
  const {
    permission,
    requestPermission,
    requestSignIn,
    onIncompleteRequest,
    playServicesStatus,
    requestPlayServices,
    gFitAuth,
    appPresentStatus,
    sendToDownload,
  } = useStepsPermissionContext();
  const goToSettings = () => {
    openSettings();
    weEventTrack("steps_sendToSettings", {});
  };

  const requestMotionPermission = () => {
    requestPermission();
    weEventTrack("steps_requestMotionPermissions", {});
  };

  const getPlayServices = () => {
    requestPlayServices();
    weEventTrack("steps_getPlayServices", {});
  };

  const googleFitSignIn = () => {
    requestSignIn();
    weEventTrack("steps_requestGFitSignIn", {});
  };

  const googleFitCompleteSignIn = () => {
    onIncompleteRequest();
    weEventTrack("steps_requestGFitSignInWithInfo", {});
  };

  const sendToDownloadWithEvent = () => {
    sendToDownload();
    weEventTrack("steps_sendToDownloadGFit", {});
  };

  return permission === RESULTS.GRANTED &&
    gFitAuth === "SUCCESS" &&
    playServicesStatus === "PRESENT" &&
    appPresentStatus === "PRESENT" ? (
    <>{children}</>
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
  ) : playServicesStatus === "ABSENT" ? (
    <PermissionTaker
      imgUrl={googleFitPermissionImg}
      text="You need to have Play Services to count steps"
      // imgStyleTW="w-3/5 aspect-square"
      txtLayoutStyleTW="w-[85%]"
    >
      <View className="w-full mx-auto pb-10">
        <StartButton
          title="Get Play Services"
          bgColor="bg-[#fff]"
          textColor="text-[#100F1A] "
          roundedStr="rounded-lg"
          textStyle="py-2 text-center text-base  "
          onPress={getPlayServices}
          fontFamily="BaiJamjuree-Bold"
        />
      </View>
    </PermissionTaker>
  ) : permission === RESULTS.GRANTED &&
    (gFitAuth === "NOT_PRESENT" || gFitAuth === "ONGOING") ? (
    <PermissionTaker
      imgUrl={googleFitPermissionImg}
      text="Kindly give access to GoogleFit to monitor your steps"
      // imgStyleTW="w-3/5 aspect-square"
      txtLayoutStyleTW="w-[85%]"
    >
      <View className="w-full mx-auto pb-10">
        <StartButton
          title="Enable GoogleFit Access"
          bgColor="bg-[#fff]"
          textColor="text-[#100F1A] "
          roundedStr="rounded-lg"
          textStyle="py-2 text-center text-base  "
          onPress={googleFitSignIn}
          fontFamily="BaiJamjuree-Bold"
        />
      </View>
    </PermissionTaker>
  ) : permission === RESULTS.GRANTED &&
    (gFitAuth === "INCOMPLETE" || gFitAuth === "ONGOING") ? (
    <PermissionTaker
      imgUrl={googleFitPermissionImg}
      text="You need to give all requested permissions to track steps"
      // imgStyleTW="w-3/5 aspect-square"
      txtLayoutStyleTW="w-[85%]"
    >
      <View className="w-full mx-auto pb-10">
        <StartButton
          title="Give required Access"
          bgColor="bg-[#fff]"
          textColor="text-[#100F1A] "
          roundedStr="rounded-lg"
          textStyle="py-2 text-center text-base  "
          onPress={googleFitCompleteSignIn}
          fontFamily="BaiJamjuree-Bold"
        />
      </View>
    </PermissionTaker>
  ) : permission === RESULTS.GRANTED &&
    gFitAuth === "SUCCESS" &&
    appPresentStatus === "ABSENT" ? (
    <PermissionTaker
      imgUrl={googleFitPermissionImg}
      text="Seems Like You Don't have google fit installed"
      // imgStyleTW="w-3/5 aspect-square"
      txtLayoutStyleTW="w-[85%]"
    >
      <View className="w-full mx-auto pb-10">
        <StartButton
          title="Download GoogleFit"
          bgColor="bg-[#fff]"
          textColor="text-[#100F1A] "
          roundedStr="rounded-lg"
          textStyle="py-2 text-center text-base  "
          onPress={sendToDownloadWithEvent}
          fontFamily="BaiJamjuree-Bold"
        />
      </View>
    </PermissionTaker>
  ) : permission === RESULTS.BLOCKED || permission === RESULTS.LIMITED ? (
    <RequestPermission
      onPress={goToSettings}
      cta="Go To Settings"
      text={
        "You would have to go to settings in your phone to give access to motion data"
      }
    />
  ) : gFitAuth === "UNKNOWN" ||
    appPresentStatus === "UNKNOWN" ||
    playServicesStatus === "UNKNOWN" ? (
    <View className="flex flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#fff" />
    </View>
  ) : (
    <RequestPermission
      text={"The feature is unavailable in your phone"}
      onPress={requestPermission}
      cta=""
    />
  );
};

export default AndroidPermissionWrapper;
