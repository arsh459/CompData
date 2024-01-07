import StepsPermissionWrapper from "@modules/StepsHistoryMain/StepsPermissionWrapper";
import { StepsPermissionProvider } from "@providers/steps/StepsPermissionProvider";
// import { useSteps } from "@hooks/steps/useSteps";
import StepsGrantedFlow from "./StepsGrantedFlow";

interface Props {
  taskId: string;
  selectedDay: number;
}

const StepsTask: React.FC<Props> = ({ taskId, selectedDay }) => {
  return (
    <StepsPermissionProvider>
      <StepsPermissionWrapper>
        <StepsGrantedFlow taskId={taskId} selectedDay={selectedDay} />
      </StepsPermissionWrapper>
    </StepsPermissionProvider>
  );
};

export default StepsTask;
