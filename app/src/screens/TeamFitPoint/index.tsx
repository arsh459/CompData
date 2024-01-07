import { useState } from "react";
// import { UserProvider } from "@providers/user/UserProvider";
import TeamFitPointMain from "@modules/TeamFitPointMain";
import Header from "@modules/Header";
import { useAuthContext } from "@providers/auth/AuthProvider";
import { GameProvider } from "@providers/game/GameProvider";
import { TeamProvider } from "@providers/team/TeamProvider";
import { useRoute } from "@react-navigation/native";
import BlurBG from "@components/BlurBG";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";

export interface TeamFitPointParams {
  teamId: string;
}

const TeamFitPoint = () => {
  const route = useRoute();
  useScreenTrack();
  const params = route.params as TeamFitPointParams;
  const { state } = useAuthContext();
  const [headerHeight, setHeaderHeight] = useState<number>(0);
  const [isBlured, setIsBlured] = useState<boolean>(false);

  const handleScroll = (yOffset: number) => {
    if (yOffset > 0) {
      setIsBlured(true);
    } else {
      setIsBlured(false);
    }
  };

  return (
    <GameProvider selectedGameId={state.gameId}>
      {/* <UserProvider> */}
      <TeamProvider selectedTeamId={params.teamId} initTeamMembers={4}>
        <Header
          back={true}
          tone="dark"
          headerColor="#100F1A"
          title="Team progress"
          headerType="transparent"
          setHeaderHeight={setHeaderHeight}
        />
        <TeamFitPointMain
          headerHeight={headerHeight}
          handleScroll={handleScroll}
        />
        {isBlured ? (
          <BlurBG
            blurType="dark"
            blurAmount={20}
            fallbackColor="#100F1A"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: headerHeight,
            }}
          />
        ) : null}
      </TeamProvider>
      {/* </UserProvider> */}
    </GameProvider>
  );
};

export default TeamFitPoint;
