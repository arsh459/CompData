import React from "react";
import StepContainer from "../StepContainer";
interface Props {
  headingText?: string;
  textBeforeBreak?: string;
  textAfterBreak?: string;
  textInRed?: string;
}
const StepThreeTask: React.FC<Props> = ({
  headingText,
  textBeforeBreak,
  textAfterBreak,
  textInRed,
}) => {
  return (
    <StepContainer heading={headingText ? headingText : "Step 3"}>
      <div className="text-white text-4xl lg:text-5xl  font-popR text-center">
        <span className="text-[#FF4266] font-baiSb">
          {" "}
          {textInRed ? textInRed : "300 FitPoints"}{" "}
        </span>
        {textBeforeBreak ? textBeforeBreak : "makes you"}{" "}
        <br className="hidden lg:block" />{" "}
        {textAfterBreak ? textAfterBreak : "a SB Athlete"}
      </div>
    </StepContainer>
  );
};

export default StepThreeTask;
