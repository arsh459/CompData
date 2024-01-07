import GenericStep from "@templates/WomenTemplate/components/GenericStep";
import StepSingleImg from "@templates/WomenTemplate/components/TaskSteps/WorkoutSteps/StepSingleImg";
import StepOneTask from "./StepOneTask";
import StepTwoTask from "./StepTwoTask";
import StepThreeTask from "./StepThreeTask";
import StepFourTask from "./StepFourTask";

const DailySteps = () => {
  return (
    <>
      <GenericStep
        leftChild={<StepOneTask />}
        rightChild={
          <StepSingleImg imgUrl="https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/Group_694_1_Q78Z8nhrY.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672759436484" />
        }
      />

      <GenericStep
        leftChild={<StepTwoTask />}
        rightChild={
          <StepSingleImg imgUrl="https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/Frame_38_4w6qffuAgi.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668868682369" />
        }
      />

      <GenericStep
        leftChild={<StepThreeTask />}
        rightChild={
          <StepSingleImg imgUrl="https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/Component_75_pXOmUBuS5.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672759673318" />
        }
      />

      <GenericStep
        leftChild={<StepFourTask />}
        rightChild={
          <StepSingleImg imgUrl="https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/Component_75__4__lest-1Ict.png?ik-sdk-version=javascript-1.4.3&updatedAt=1671010794803" />
        }
      />
    </>
  );
};

export default DailySteps;
