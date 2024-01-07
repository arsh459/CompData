import StepContainer from "@templates/WomenTemplate/components/StepContainer";

const StepOneTask = () => {
  return (
    <StepContainer heading="Step 1">
      <div className="text-white text-4xl lg:text-5xl font-popR text-center">
        Join the
        <span className="text-[#FF4266] font-baiSb"> GO-MMT Team </span>
        <br className="hidden lg:block" />& book a free Health Consultation Call
      </div>
    </StepContainer>
  );
};

export default StepOneTask;
