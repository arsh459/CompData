import { useGameContext } from "@providers/game/GameProvider";
import { TeamProvider } from "@providers/team/TeamProvider";
import HeaderText from "@modules/Header/HeaderText";
import { getTeamId } from "@utils/utills";
import Header from "@modules/Header";
import { ReactNode } from "react";
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

const ProgramWrapper: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header
        titleNode={<HeaderText text="Community" />}
        defaultOption={true}
        headerColor="#100F1A"
        tone="dark"
      />
      <WrapperHelper>{children}</WrapperHelper>
    </>
  );
};

export default ProgramWrapper;
