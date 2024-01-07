import { useGameContext } from "@providers/game/GameProvider";
import { TeamProvider } from "@providers/team/TeamProvider";
import Header from "@modules/Header";
import { getTeamId } from "@utils/utills";
import { ReactNode } from "react";
import PrizesMain from "./PrizesMain";
import HeaderText from "@modules/Header/HeaderText";
import { useUserStore } from "@providers/user/store/useUserStore";
import { shallow } from "zustand/shallow";

interface Props {
  children: ReactNode;
}

const WrapperHelper: React.FC<Props> = ({ children }) => {
  const { selectedGameId } = useGameContext();

  const participatingInGameWithTeam = useUserStore(
    ({ user }) => user?.participatingInGameWithTeam,
    shallow
  );

  const teamId = getTeamId(participatingInGameWithTeam, selectedGameId);

  return (
    <TeamProvider selectedTeamId={teamId} initTeamMembers={3}>
      {children}
    </TeamProvider>
  );
};

const Prizes = () => {
  return (
    <>
      <Header
        titleNode={<HeaderText text="Prizes" />}
        headerColor="#100F1A"
        tone="dark"
      />
      <WrapperHelper>
        <PrizesMain />
      </WrapperHelper>
    </>
  );
};

export default Prizes;
