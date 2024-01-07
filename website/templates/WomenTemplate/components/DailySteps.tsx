import GenericStep from "./GenericStep";
import StepFourTask from "./TaskSteps/StepFourTask";
import StepOneTask from "./TaskSteps/StepOneTask";
import StepThreeTask from "./TaskSteps/StepThreeTask";
import StepTwoTask from "./TaskSteps/StepTwoTask";
import StepSingleImg from "./TaskSteps/WorkoutSteps/StepSingleImg";
import WorkoutSteps from "./TaskSteps/WorkoutSteps/WorkoutSteps";

const DailySteps = () => {
  return (
    <>
      <GenericStep
        leftChild={<StepOneTask />}
        rightChild={
          <StepSingleImg imgUrl="https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/Frame_38_4w6qffuAgi.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668868682369" />
        }
      />

      <GenericStep leftChild={<StepTwoTask />} rightChild={<WorkoutSteps />} />

      <GenericStep
        leftChild={<StepThreeTask />}
        rightChild={
          <StepSingleImg imgUrl="https://ik.imagekit.io/socialboat/tr:h-800,c-maintain_ratio,fo-auto/Frame_39_KvzkyKuE6.png?ik-sdk-version=javascript-1.4.3&updatedAt=1668868685368" />
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
