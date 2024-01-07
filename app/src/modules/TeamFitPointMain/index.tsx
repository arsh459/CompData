import { View } from "react-native";
import { useState } from "react";
import TeamStatsHeader from "@modules/TeamConsistencyMain/TeamStatsHeader";
import { teamTotalFpGrid } from "@constants/imageKitURL";
import { useGameContext } from "@providers/game/GameProvider";
import { useTeamContext } from "@providers/team/TeamProvider";
import ShowDayFitPoint from "./ShowDayFitPoint";
import ViewSelector from "@components/ViewSelector";
import { getPointsToShow } from "@utils/rank/utils";
import { useCoachRank } from "@hooks/rank/useCoachRank";
import { weEventTrack } from "@utils/analytics/webengage/userLog";

interface Props {
  headerHeight: number;
  handleScroll: (val: number) => void;
}

const TeamFitPointMain: React.FC<Props> = ({ headerHeight, handleScroll }) => {
  const { params, game } = useGameContext();
  const [selectedView, setSelectedView] = useState<
    "Days Fitpoints" | "Total Fitpoints"
  >("Total Fitpoints");

  const { team, teamLeader } = useTeamContext();
  const { myCoachRank } = useCoachRank(game?.id, teamLeader?.uid);
  const pts = myCoachRank
    ? getPointsToShow(myCoachRank, "overall", params?.currentSprint?.id)
    : 0;

  const handlePressView1 = () => {
    setSelectedView("Days Fitpoints");
    weEventTrack("user_clickDaysFitpoints", {});
  };

  const handlePressView2 = () => {
    setSelectedView("Total Fitpoints");
    weEventTrack("user_clickTotalFitpoints", {});
  };

  const ListHeaderComponent = () => {
    return (
      <>
        <TeamStatsHeader
          text={`Total Fitpoints Earned By Team ${team?.name}`}
          iconType="fitpoint"
          iconRightText={`${pts} FP`}
          iconColor="#fff"
          iconStyle={{ width: 30 }}
          gridImg={teamTotalFpGrid}
          gradientTextColor1="#fff"
          gradientTextColor2="#fff"
          headerHeight={headerHeight}
        />
        <ViewSelector
          view1={"Days Fitpoints"}
          view2={"Total Fitpoints"}
          currView={selectedView}
          onView1={handlePressView1}
          onView2={handlePressView2}
        />
      </>
    );
  };
  return (
    <View className="flex-1">
      {/* <TeamStatsHeader
        text="Highest Fitpoint was earned by Rahul Jain on 13th July"
        iconType="fitpoint"
        iconRightText="39 FP"
        iconColor="#FF8797"
        iconStyle={{ width: 30 }}
        gridImg={teamFpGrid}
        gradientTextColor1="#FF8797"
        gradientTextColor2="#FF8797"
      /> */}

      <ShowDayFitPoint
        selectedView={selectedView}
        ListHeaderComponent={ListHeaderComponent}
        handleScroll={handleScroll}
      />
    </View>
  );
};

export default TeamFitPointMain;
