// import ImageWithURL from "@components/ImageWithURL";
import useDietPlanStage from "@modules/Nutrition/store/useDietPlanStage";
import clsx from "clsx";
// import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { shallow } from "zustand/shallow";
// import LineIconV1 from "../PlanList/LineIconV1";
// import LineIconV2 from "../PlanList/LineIconV2";
import StageCardBackground from "./StageCardBackground";
import StageCardContent from "./StageCardContent";
interface Props {
  title: string;
  imageUri: string;
  onNext: () => void;
}
const StageCtaCard: React.FC<Props> = ({ title, imageUri, onNext }) => {
  const { planStage } = useDietPlanStage(
    (state) => ({
      planStage: state.planStage,
    }),
    shallow
  );
  return (
    <View
      className={clsx(" px-6", planStage === "notSubscribed" ? "mt-4" : "mt-8")}
    >
      <View className="w-full aspect-[332/132] min-h-[132px] rounded-xl overflow-hidden flex flex-row items-center justify-center ">
        <StageCardBackground />
        <StageCardContent title={title} imageUri={imageUri} onNext={onNext} />
      </View>
    </View>
  );
};

export default StageCtaCard;
