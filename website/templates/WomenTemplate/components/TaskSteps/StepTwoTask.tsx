import React from "react";
import StepContainer from "../StepContainer";
interface Props {
  headingText?: string;
  textBeforeBreak?: string;
  textAfterBreak?: string;
  textInRed?: string;
}
const StepTwoTask: React.FC<Props> = ({
  headingText,
  textBeforeBreak,
  textAfterBreak,
  textInRed,
}) => {
  return (
    <StepContainer heading={headingText ? headingText : "Step 2"}>
      <div className="text-white text-3xl lg:text-5xl font-popR text-center ">
        {textBeforeBreak ? textBeforeBreak : "Walk, Workout Or Run"} <br />{" "}
        {textAfterBreak ? textAfterBreak : "to"}
        <span className="text-[#FF4266] font-baiSb">
          {" "}
          {textInRed ? textInRed : "Earn FitPoints"}{" "}
        </span>
      </div>
    </StepContainer>
  );
};

export default StepTwoTask;
