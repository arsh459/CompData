// import { useMotionPermission } from "@hooks/steps/useMotionPermission";

// import { Pedometer } from "expo-sensors";
import StartButton from "@modules/HomeScreen/NewHome/StartButton";
import { trackingStepsPermissionImg } from "@constants/imageKitURL";
import { PermissionStatus } from "expo-location";
import RequestPermission from "@modules/Workout/ProgramDetails/TaskSubmitV2/RequestPermission";
import { View } from "react-native";
import { openSettings } from "react-native-permissions";
import { useLocationContext } from "@providers/location/LocationProvider";
import PermissionTaker from "@modules/StepsHistoryMain/PermissionTaker";
// import PermissionTaker from "./PermissionTaker";

interface Props {
  children: React.ReactNode;
}

const IOSLocPermissionWrapper: React.FC<Props> = ({ children }) => {
  const { requestPermission, status } = useLocationContext();

  const goToSettings = () => {
    openSettings();
  };

  return (
    <View className="bg-black flex-1">
      {status?.granted ? (
        children
      ) : !status?.canAskAgain ? (
        <RequestPermission
          onPress={goToSettings}
          cta="Go To Settings"
          text={
            "You would have to go to settings in your phone to give access to location data"
          }
        />
      ) : status?.status === PermissionStatus.DENIED ||
        status?.status === PermissionStatus.UNDETERMINED ? (
        <PermissionTaker
          imgUrl={trackingStepsPermissionImg}
          text="Kindly give location access to use this feature"
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
              onPress={requestPermission}
              fontFamily="BaiJamjuree-Bold"
            />
          </View>
        </PermissionTaker>
      ) : null}
    </View>
  );
};

export default IOSLocPermissionWrapper;
