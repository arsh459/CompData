import { stepType } from "@constants/inviteV2/steps";
import GenericStep from "@templates/WomenTemplate/components/GenericStep";
import StepSingleImg from "@templates/WomenTemplate/components/TaskSteps/WorkoutSteps/StepSingleImg";
import StepContainer from "./StepContainer";

interface Props {
  steps: stepType[];
}

const DailySteps: React.FC<Props> = ({ steps }) => {
  return (
    <>
      {steps.map((step, index) => (
        <GenericStep
          key={`Step-${index}`}
          leftChild={
            <StepContainer heading={`Step ${index + 1}`} text={step.text} />
          }
          rightChild={
            <StepSingleImg
              imgUrl={
                step.image
                  ? step.image
                  : "https://ik.imagekit.io/socialboat/tr:h-500,c-maintain_ratio,fo-auto/Frame_38_4w6qffuAgi.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668868682369"
              }
            />
          }
        />
      ))}
    </>
  );
};

export default DailySteps;
