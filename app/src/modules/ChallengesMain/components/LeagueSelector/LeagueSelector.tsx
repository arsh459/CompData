import Swiper from "@components/Swiper";
import { useUserStore } from "@providers/user/store/useUserStore";
import { View, useWindowDimensions } from "react-native";
import { shallow } from "zustand/shallow";
import LeagueImageSelectorComp from "./LeagueImageSelectorComp";
import { useCallback } from "react";

import { controlsTypes } from "@components/Swiper/Controls";
interface Props {
  forceIndex?: number;
  forceIndexRefresh?: number;
}
const LeagueSelector: React.FC<Props> = ({ forceIndex, forceIndexRefresh }) => {
  const { levels, updateLevelNum, initialScrollIndex, updateIndex } =
    useUserStore((state) => {
      const usrLevel = state.user?.userLevelV2 ? state.user?.userLevelV2 : 1;

      return {
        levels: state.levelsArray,
        updateLevelNum: state.updateLevelNum,
        initialScrollIndex: usrLevel - 1,
        updateIndex: state.updateLevelIndex,
      };
    }, shallow);

  const { width } = useWindowDimensions();

  const onControlChange = useCallback((type: controlsTypes) => {
    updateLevelNum(type);
  }, []);

  const onIndexUpdate = useCallback((newIndex: number) => {
    updateIndex(newIndex);
  }, []);

  return (
    <View className="flex-1 flex bg-[#343150]">
      <View className="bg-[#343150]">
        <Swiper
          controls={true}
          initialScrollIndex={initialScrollIndex}
          leftIconUrl="https://ik.imagekit.io/socialboat/tr:w-40,c-maintain-ratio/Frame%201000001281_7aAXUmQb-.png?updatedAt=1697008001205"
          rightIconUrl="https://ik.imagekit.io/socialboat/Frame%201000001282_1GaFhEUW4.png?updatedAt=1697008499162"
          iconsYPositioning="-translate-y-3"
          iconStyle="w-6 h-6"
          iconMargin="mx-4"
          slideWidth={width}
          onControlChange={onControlChange}
          forceScrollIndex={forceIndex}
          forceIndexRefresh={forceIndexRefresh}
          onIndexChange={onIndexUpdate}
        >
          {levels.map((level, index) => {
            return (
              <View
                className="flex items-center justify-center px-14 py-7"
                key={index}
              >
                <LeagueImageSelectorComp level={level} />
              </View>
            );
          })}
        </Swiper>
        <View className="h-px bg-white/20" />
      </View>
    </View>
  );
};

export default LeagueSelector;
