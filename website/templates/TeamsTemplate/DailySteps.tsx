import GenericStep from "@templates/WomenTemplate/components/GenericStep";
import StepSingleImg from "@templates/WomenTemplate/components/TaskSteps/WorkoutSteps/StepSingleImg";
import WorkoutSteps from "@templates/WomenTemplate/components/TaskSteps/WorkoutSteps/WorkoutSteps";
import { stepType } from "@constants/teams";
import StepContainer from "@templates/WomenTemplate/components/StepContainer";
import StepOneTask from "@templates/WomenTemplate/components/TaskSteps/StepOneTask";
import StepTwoTask from "@templates/WomenTemplate/components/TaskSteps/StepTwoTask";
import StepThreeTask from "@templates/WomenTemplate/components/TaskSteps/StepThreeTask";
import StepFourTask from "@templates/WomenTemplate/components/TaskSteps/StepFourTask";

interface Props {
  steps?: {
    step1?: stepType;
    step2?: stepType;
    step3?: stepType;
    step4?: stepType;
  };
}

const DailySteps: React.FC<Props> = ({ steps }) => {
  return (
    <>
      <GenericStep
        leftChild={
          steps?.step1?.text ? (
            <StepContainer heading="Step 1">{steps.step1.text}</StepContainer>
          ) : (
            <StepOneTask />
          )
        }
        rightChild={
          <StepSingleImg
            imgUrl={
              steps?.step1?.image
                ? steps.step1.image
                : "https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/Frame_38_4w6qffuAgi.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668868682369"
            }
          />
        }
      />

      <GenericStep
        leftChild={
          steps?.step2?.text ? (
            <StepContainer heading="Step 2">{steps.step2.text}</StepContainer>
          ) : (
            <StepTwoTask />
          )
        }
        rightChild={<WorkoutSteps />}
      />

      <GenericStep
        leftChild={
          steps?.step3?.text ? (
            <StepContainer heading="Step 3">{steps.step3.text}</StepContainer>
          ) : (
            <StepThreeTask />
          )
        }
        rightChild={
          <StepSingleImg
            imgUrl={
              steps?.step3?.image
                ? steps.step3.image
                : "https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/Frame_39_KvzkyKuE6.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668868685368"
            }
          />
        }
      />

      <GenericStep
        leftChild={
          steps?.step4?.text ? (
            <StepContainer heading="Step 4">{steps.step4.text}</StepContainer>
          ) : steps?.step1?.image ? (
            <StepSingleImg imgUrl={steps.step1.image} />
          ) : (
            <StepFourTask />
          )
        }
        rightChild={
          <StepSingleImg
            imgUrl={
              steps?.step4?.image
                ? steps.step4.image
                : "https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/Component_75__4__lest-1Ict.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671010794803"
            }
          />
        }
      />
    </>
  );
};

export default DailySteps;
