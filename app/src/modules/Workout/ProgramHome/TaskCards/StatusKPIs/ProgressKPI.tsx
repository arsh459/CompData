import ProgressBar from "@components/ProgressBar";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

interface Props {
  progress: number;
  earnedFP?: number;
  overlay?: boolean;
}

const ProgressKPIs: React.FC<Props> = ({ earnedFP, overlay, progress }) => {
  const progressA = progress ? progress * 100 : 10;

  return (
    <LinearGradient
      colors={
        overlay ? ["transparent", "#000"] : ["transparent", "transparent"]
      }
      className={clsx(
        "flex-1 flex flex-row items-end absolute h-1/5  left-0 right-0 bottom-0  z-50"
      )}
    >
      <View className="flex-1 relative z-0 ">
        <ProgressBar
          height={5}
          progress={progressA}
          activeColor="#FF556C"
          inActiveColor="#FFFFFF"
          showLable="above"
          textColor="#FF556C"
          fontBai={true}
          lableText={`${earnedFP ? earnedFP : 0} FP`}
        />
      </View>
    </LinearGradient>
  );
};

export default ProgressKPIs;
