import { View } from "react-native";

import TeamStatsHeader from "./TeamStatsHeader";

const TeamConsistencyMain = () => {
  return (
    <View className="">
      <TeamStatsHeader
        text="This month you were active 13 days straight. Great!"
        iconType="fire"
        iconRightText="3 Days"
        iconColor="#6BF2D4"
        iconStyle={{ width: 30 }}
      />
    </View>
  );
};

export default TeamConsistencyMain;
