import StepsSvgIcon from "@components/StepsSvg/StepsSvgIcon";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import ProgressKPIs from "./ProgressKPI";

interface Props {
  progress: number;
  earnedFP?: number;
  overlay?: boolean;
}

const StepsActiveKPI: React.FC<Props> = ({ earnedFP, overlay, progress }) => {
  //   const progressA = progress ? progress * 100 : 10;

  return (
    <>
      <LinearGradient
        colors={["#000000", "#00000000"]}
        className="absolute top-0 left-0 right-0  flex flex-row justify-center py-2 items-center"
      >
        <View className="w-2 h-2.5">
          <StepsSvgIcon startColor="#51FFD5" endColor="#51FFD5" />
        </View>
        <Text
          className="text-[#51FFD5] opacity-80 text-xs  pl-2 "
          style={{ fontFamily: "BaiJamjuree-SemiBold" }}
        >
          Currently Active
        </Text>
      </LinearGradient>
      <ProgressKPIs
        progress={progress ? progress : 0}
        earnedFP={earnedFP}
        overlay={true}
      />
    </>
  );
};

export default StepsActiveKPI;
