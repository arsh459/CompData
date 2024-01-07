import { View } from "react-native";
import React from "react";
import ClaimMain from "@modules/ClaimMain";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";
// export interface ClaimScreenParams {}
const ClaimScreen = () => {
  // const { todayUnix, state } = useAuthContext();
  // const { round } = useRound(todayUnix, TEAM_ALPHABET_GAME);
  useScreenTrack();

  return (
    <View className="flex-1 bg-[#232136] pt-20">
      {/* <Header back={false} tone="dark" headerColor="#232136" /> */}
      <ClaimMain />
    </View>
  );
};

export default ClaimScreen;
