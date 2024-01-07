import StepContainer from "@templates/WomenTemplate/components/StepContainer";

const StepOneTask = () => {
  return (
    <StepContainer heading="Step 1">
      <div className="text-white text-2xl lg:text-4xl font-popR text-center md:text-left px-4">
        Generate your <br className="hidden md:block" />
        fitness resolution <br className="hidden md:block" />
        with SocialBoat&apos;s <br className="hidden md:block" />
        <span className="text-[#FF4266] font-baiSb">
          Artificial Intelligence
        </span>
      </div>
    </StepContainer>
  );
};

export default StepOneTask;
