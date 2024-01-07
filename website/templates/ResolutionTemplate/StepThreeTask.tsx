import StepContainer from "@templates/WomenTemplate/components/StepContainer";

const StepThreeTask = () => {
  return (
    <StepContainer heading="Step 3">
      <div className="text-white text-2xl lg:text-4xl font-popR text-center md:text-left">
        Try to achieve{" "}
        <span className="text-[#FF4266] font-baiSb">
          daily <br className="hidden md:block" />
          FitPoints target{" "}
        </span>
        on <br className="hidden md:block" /> the app by walking{" "}
        <br className="hidden md:block" /> or working out.
      </div>
    </StepContainer>
  );
};

export default StepThreeTask;
