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
      <div className="text-white text-3xl lg:text-5xl font-popR text-center ">
        10k Steps of 20 mins of daily workout to achieve
        <span className="text-[#FF4266] font-baiSb">
          {" "}
          Earn Daily FitPoints{" "}
        </span>
      </div>
    </StepContainer>
  );
};

export default StepTwoTask;
