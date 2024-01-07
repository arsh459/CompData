import { View } from "react-native";
import { useState } from "react";
import TeamHeader from "./TeamHeader";
import { useTeamContext } from "@providers/team/TeamProvider";
import ViewSelector from "@components/ViewSelector";
import TeamList from "./TeamList";
import { useCoachRank } from "@hooks/rank/useCoachRank";
import { useGameContext } from "@providers/game/GameProvider";
import { getPointsToShow, getRank } from "@utils/rank/utils";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {
  headerHeight: number;
  setIsBlured: (val: boolean) => void;
}

const TeamHolder: React.FC<Props> = ({ headerHeight, setIsBlured }) => {
  const { teamLeader } = useTeamContext();
  const { game, params } = useGameContext();
  const [selectedView, setSelectedView] = useState<
    "Team Activites" | "Team Badges"
  >("Team Badges");
  const { myCoachRank } = useCoachRank(game?.id, teamLeader?.uid);
  const rank = getRank(myCoachRank, "overall", params?.currentSprint?.id);
  const pts = myCoachRank
    ? getPointsToShow(myCoachRank, "overall", params?.currentSprint?.id)
    : 0;

  const handleScroll = (yOffset: number) => {
    if (yOffset > 0) {
      setIsBlured(true);
    } else {
      setIsBlured(false);
    }
  };

  const handlePressView1 = () => {
    setSelectedView("Team Activites");
    weEventTrack("user_clickTeamActivites", {});
  };

  const handlePressView2 = () => {
    setSelectedView("Team Badges");
    weEventTrack("user_clickTeamBadges", {});
  };

  const ListHeaderComponent = () => {
    return (
      <>
        <View className="flex-1 bg-[#100F1A]">
          <TeamHeader
            fitPoint={pts}
            rank={rank}
            headerHeight={headerHeight}
            selectedView={selectedView}
          />
          {/* {selectedView === "Team Activites" ? (
              <GradientText
                text={`Team is Active ${5} Days`}
                colors={["#51FF8C", "#51FF8C"]}
                textStyle={{
                  fontFamily: "BaiJamjuree-SemiBold",
                  textAlign: "center",
                  fontSize: 18,
                  padding: 25,
                }}
              />
            ) : (
              <View className="p-6" />
            )} */}
        </View>
        <ViewSelector
          view1="Team Activites"
          view2="Team Badges"
          currView={selectedView}
          onView1={handlePressView1}
          onView2={handlePressView2}
        />
      </>
    );
  };
  return (
    <TeamList
      ListHeaderComponent={ListHeaderComponent}
      handleScroll={handleScroll}
      selectedView={selectedView}
    />
  );
};

export default TeamHolder;
