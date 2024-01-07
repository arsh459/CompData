import { howItWorksDataV2Data } from "../../data/data";

interface Props {
  index: number;
}
const StepImage: React.FC<Props> = ({ index }) => {
  return <img className=" object-contain" src={howItWorksDataV2Data[index].imageUrl} />;
};

export default StepImage;
