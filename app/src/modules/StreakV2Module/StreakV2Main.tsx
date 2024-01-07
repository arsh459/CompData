import Header from "@modules/Header";

import { View } from "react-native";
import StreakCalender from "./components/StreakCalender";
import { ScrollView } from "react-native";
import StreakHeader from "./components/StreakHeader";
import StreakPowerUp from "./components/StreakPowerUp";
import { TaskModal } from "./components/TaskModal";
import { useStreakStore } from "@providers/streakV2/store/useStreakStoreV2";
import { shallow } from "zustand/shallow";
import useUserPowerUp from "@providers/streakV2/hooks/useUserPowerUp";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const StreakV2Main = () => {
  const { setPowerUps, streakStatus } = useStreakStore(
    (state) => ({
      setPowerUps: state.setPowerUps,
      streakStatus: state.streak?.streakStatus,
    }),
    shallow
  );
  useUserPowerUp("freeze", setPowerUps);

  const { bottom } = useSafeAreaInsets();

  return (
    <>
      <Header
        back={true}
        tone="dark"
        headerColor={`${streakStatus === "inactive" ? "#7973B4" : "#FFBC00"}`}
      />
      <View className="flex-1 flex">
        <ScrollView className="flex-1 bg-[#232136]">
          <StreakHeader />

          <View className="p-6">
            <StreakCalender />
          </View>
          <View className=" w-full px-6">
            <StreakPowerUp />
          </View>
          <View style={{ paddingBottom: bottom || 20 }} className="w-full " />
        </ScrollView>
      </View>
      <TaskModal />
    </>
  );
};

export default StreakV2Main;
