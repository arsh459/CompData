import { onboardingCompData } from "@modules/AiScanOnboardingScreen/constants/constants";
import clsx from "clsx";
import { View } from "react-native";
interface Props {
  index: number;
}
const IndexDots: React.FC<Props> = ({ index }) => {
  return (
    <View className="flex h-fit pt-5 pb-8 flex-row items-center justify-center">
      {onboardingCompData.map((_, itemIndex) => {
        return (
          <View
            className={clsx(
              "h-2 mr-0.5",
              itemIndex === index
                ? "w-4 rounded-2xl bg-white"
                : "w-2 rounded-full bg-white/50"
            )}
            key={itemIndex}
          ></View>
        );
      })}
    </View>
  );
};
export default IndexDots;
