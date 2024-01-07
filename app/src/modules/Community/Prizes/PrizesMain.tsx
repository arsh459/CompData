import { useBadges } from "@hooks/badges/useBadges";
import { useCoachRank } from "@hooks/rank/useCoachRank";
import { useUserRank } from "@hooks/rank/useUserRank";
import { frequencyTypes } from "@models/Prizes/Prizes";
import { useGameContext } from "@providers/game/GameProvider";
import { useTeamContext } from "@providers/team/TeamProvider";
import { useUserContext } from "@providers/user/UserProvider";
import {
  getCurrentMonth,
  getCurrentWeekV3,
} from "@utils/challange/challengeWeekUtils";
import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { FlatList } from "react-native";
import BackgroundWrapper from "./BackgroundWrapper";
import PrizeCard from "./PrizeCard";

const PrizesMain = () => {
  const { user: signedInUser } = useUserContext();
  const { game } = useGameContext();
  const { teamLeader } = useTeamContext();
  const [prizesFor, setPrizesFor] = useState<frequencyTypes>("monthly");
  const { badges } = useBadges(game?.id, prizesFor);

  const sprintId = getCurrentMonth(
    game?.configuration?.sprints,
    game?.configuration?.starts,
    game?.configuration?.challengeLength
  );
  const { roundId } = getCurrentWeekV3(
    game?.configuration?.rounds,
    game?.configuration?.starts,
    game?.configuration?.challengeLength
  );

  const { myUserRank } = useUserRank(game?.id, signedInUser?.uid);
  const { myCoachRank } = useCoachRank(game?.id, teamLeader?.uid);

  return (
    <BackgroundWrapper prizesFor={prizesFor} setPrizesFor={setPrizesFor}>
      {game && signedInUser ? (
        <LinearGradient colors={["#2D2D2D", "#131313"]} className="rounded-xl">
          <FlatList
            data={badges}
            renderItem={({ item }) => (
              <PrizeCard
                badge={item}
                roundId={roundId}
                sprintId={sprintId}
                userRank={myUserRank}
                teamRank={myCoachRank}
                gameKPIs={game.configuration?.kpis}
              />
            )}
            keyExtractor={(item) => item.id}
            bounces={false}
            className={clsx(badges.length && "px-2 py-1")}
          />
        </LinearGradient>
      ) : null}
    </BackgroundWrapper>
  );
};

export default PrizesMain;
