import StepContainer from "@templates/WomenTemplate/components/StepContainer";

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
      <div className="text-white text-2xl lg:text-4xl font-popR text-center md:text-left">
        Download the <br className="hidden md:block" />
        SocialBoat app and <br className="hidden md:block" />
        get your{" "}
        <span className="text-[#FF4266] font-baiSb">
          Personalised <br className="hidden md:block" /> Workout and Diet plans
        </span>
      </div>
    </StepContainer>
  );
};

export default StepTwoTask;
