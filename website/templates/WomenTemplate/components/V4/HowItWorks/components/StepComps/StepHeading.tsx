import { howItWorksDataV2Data } from "../../data/data";

interface Props {
  index: number;
}
const StepHeading: React.FC<Props> = ({ index }) => {
  return (
    <div>
    <h1
      style={{ color: howItWorksDataV2Data[index].stepHeadingColor }}
      className={` font-pJSEL md:text-3xl sm:text-3xl text-2xl font-semibold mb-4`}
    >
      {howItWorksDataV2Data[index].stepHeading}
    </h1>
    <h1 className="lg:block  hidden text-xl text-white/50 font-pJSEL font-medium">{howItWorksDataV2Data[index].stepContent}</h1>
    </div>
  );
};

export default StepHeading;
