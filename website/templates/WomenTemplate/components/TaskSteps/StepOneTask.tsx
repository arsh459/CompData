import React from "react";
import StepContainer from "../StepContainer";
interface Props {
  headingText?: string;
}
const StepOneTask: React.FC<Props> = ({ headingText }) => {
  return (
    <StepContainer heading={headingText ? headingText : "Step 1"}>
      <div className="text-white text-3xl lg:text-5xl font-popR text-center ">
        Get
        <span className="text-[#FF4266] font-baiSb"> 5 minute </span>daily tasks
        <br />
        from a Health coach
      </div>
    </StepContainer>
  );
};

export default StepOneTask;
