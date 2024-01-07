import { View, Text } from "react-native";

import CycleListCard from "./CycleListCard";

import { useCurrentPeriodStore } from "@providers/period/periodStore";
import { useAuthContext } from "@providers/auth/AuthProvider";

const PreviousCycleList = () => {
  const { todayUnix } = useAuthContext();
  const cycles = useCurrentPeriodStore((state) => state.cyclesArray);

  return (
    <View className="pt-4">
      <Text
        className="text-base text-white pl-6 pb-2 "
        style={{
          fontFamily: "Nunito-Bold",
        }}
      >
        Previous Cycles
      </Text>
      <View className="bg-[#343150]  px-4 mx-4 rounded-2xl">
        {cycles.map((item, index) => {
          const predictedCycle = item.startUnix > todayUnix;
          const currentCycle =
            todayUnix >= item.startUnix && todayUnix <= item.endUnix;

          const cycle = item;
          const title = currentCycle ? `Current Cycle` : `Previous Cycle`;

          if (predictedCycle) {
            return null;
          }

          return (
            <View key={cycle.id}>
              <CycleListCard item={cycle} title={title} />
              {cycles.length - 1 !== index ? (
                <View className="h-px w-full bg-white/20 " />
              ) : null}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default PreviousCycleList;
