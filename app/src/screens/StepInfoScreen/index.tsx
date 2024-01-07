import StepInfoMain from "@modules/StepInfoMain";
// import { UserProvider } from "@providers/user/UserProvider";
import { StepsPermissionProvider } from "../../providers/steps/StepsPermissionProvider";
import StepsPermissionWrapper from "@modules/StepsHistoryMain/StepsPermissionWrapper";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
// import { Platform } from "react-native";

const StepInfoScreen = () => {
  useScreenTrack();
  return (
    // <UserProvider>
    <StepsPermissionProvider>
      <StepsPermissionWrapper>
        <StepInfoMain />
      </StepsPermissionWrapper>
    </StepsPermissionProvider>
    // </UserProvider>
  );
};

export default StepInfoScreen;
