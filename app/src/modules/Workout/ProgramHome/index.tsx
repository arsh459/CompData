import { Dimensions, View } from "react-native";
import { DayProvider } from "@modules/Nutrition/V2/DaySelector/provider/DayProvider";
import TaskList from "./TaskList";
import { getStartTime } from "@modules/Nutrition/V2/DaySelector/provider/utils";
import { useSignleBadgeContext } from "@providers/Badge/BadgeProvider";
import { PreviewProvider } from "./PreviewProvider/PreviewProvider";
import BottomPopup from "../BottomPopup";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

interface Props {
  accessDueToBootcamp: boolean;
}

const { width } = Dimensions.get("window");
const imgAspectRatio = 316 / 162;
const cardHeightToImage = 219 / 162;
export const renderTaskCardWidth = width - 32;
export const imgTaskCardHeight = renderTaskCardWidth / imgAspectRatio;
export const renderTaskCardHeight = imgTaskCardHeight * cardHeightToImage;

const ProgramHome: React.FC<Props> = ({ accessDueToBootcamp }) => {
  const { badge } = useSignleBadgeContext();
  const { st } = useUserStore((state) => {
    return {
      // start: state.user?.recommendationConfig?.start,
      // nutritionStart: state.user?.recommendationConfig?.nutritionStart,
      // badgeConfig: state.user?.recommendationConfig?.badgeConfig,
      st: getStartTime(
        state.user?.recommendationConfig?.badgeConfig,
        badge?.id,
        "workout",
        state.user?.recommendationConfig?.start,
        state.user?.recommendationConfig?.nutritionStart
      ),
    };
  }, shallow);

  // console.log("badge", badge?.id);

  return (
    <DayProvider startUnix={st}>
      <PreviewProvider>
        <View className="flex-1 bg-[#100F1A]">
          <TaskList accessDueToBootcamp={accessDueToBootcamp} />
        </View>
      </PreviewProvider>
      <BottomPopup />
    </DayProvider>
  );
};

export default ProgramHome;
