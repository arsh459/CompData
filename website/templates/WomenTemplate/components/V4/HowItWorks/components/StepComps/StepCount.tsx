import { howItWorksDataV2Data } from "../../data/data";

interface Props {
  index: number;
}
const StepCount: React.FC<Props> = ({ index }) => {
  return (
    <div
      className="flex items-center justify-center rounded-lg mr-4"
      style={{
        backgroundColor: howItWorksDataV2Data[index].stepNumberbackground,
      }}
    >
      <div
        className="text-center font-semibold text-base font-pJSEL leading-[18.72px] tracking-tight p-4"
        style={{ color: howItWorksDataV2Data[index].stepHeadingColor }}
      >
        {howItWorksDataV2Data[index].stepNumber}
      </div>
    </div>
  );
};

export default StepCount;
