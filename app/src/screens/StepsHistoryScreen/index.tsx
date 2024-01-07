import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
import StepsGrantedHistoryFlow from "@modules/StepsHistoryMain";
import StepsPermissionWrapper from "@modules/StepsHistoryMain/StepsPermissionWrapper";
import { StepsPermissionProvider } from "@providers/steps/StepsPermissionProvider";

const StepsHistoryScreen = () => {
  // const { state } = useAuthContext();
  useScreenTrack();

  return (
    <StepsPermissionProvider>
      <StepsPermissionWrapper>
        <StepsGrantedHistoryFlow />
      </StepsPermissionWrapper>
    </StepsPermissionProvider>
  );
};

export default StepsHistoryScreen;
