import GenericStep from "@templates/WomenTemplate/components/GenericStep";
import StepSingleImg from "@templates/WomenTemplate/components/TaskSteps/WorkoutSteps/StepSingleImg";
import StepFourTask from "./StepFourTask";
import StepOneTask from "./StepOneTask";
import StepThreeTask from "./StepThreeTask";
import StepTwoTask from "./StepTwoTask";

const DailySteps = () => {
  return (
    <>
      <GenericStep
        leftChild={<StepOneTask />}
        rightChild={
          <StepSingleImg imgUrl="https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/Group_1081_laqfVUzqj.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675424556402" />
        }
      />

      <GenericStep
        leftChild={<StepTwoTask />}
        rightChild={
          <StepSingleImg imgUrl="https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/Group_1046_4SFipqRi0.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675424557423" />
        }
      />

      <GenericStep
        leftChild={<StepThreeTask />}
        rightChild={
          <StepSingleImg imgUrl="https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/Group_1080_0ZFdMbVAf.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675424556154" />
        }
      />

      <GenericStep
        leftChild={<StepFourTask />}
        rightChild={
          <StepSingleImg imgUrl="https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/Group_1079_RJBr80cTb.png?ik-sdk-version=javascript-1.4.3&updatedAt=1675424559897" />
        }
      />
    </>
  );
};

export default DailySteps;
