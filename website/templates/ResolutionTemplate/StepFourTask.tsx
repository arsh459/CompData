import StepContainer from "@templates/WomenTemplate/components/StepContainer";

const StepFourTask = () => {
  return (
    <StepContainer heading="Step 4">
      <div className="text-white text-2xl lg:text-4xl font-popR text-center md:text-left">
        Get rewards for being <br className="hidden md:block" />
        consistent & achieving <br className="hidden md:block" />
        your goals.{" "}
        <span className="text-[#FF4266] font-baiSb">
          Redeem your <br className="hidden md:block" />
          Points{" "}
        </span>
        on the SB shop.
      </div>
    </StepContainer>
  );
};

export default StepFourTask;
