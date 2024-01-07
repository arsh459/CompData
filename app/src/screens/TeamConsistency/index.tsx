// import { UserProvider } from "@providers/user/UserProvider";

import TeamConsistencyMain from "@modules/TeamConsistencyMain";
import Header from "@modules/Header";
import { useScreenTrack } from "@hooks/screenTrack/useScreenTrack";

const TeamConsistency = () => {
  useScreenTrack();
  return (
    // <UserProvider>
    <>
      <Header back={true} tone="dark" title="Team Consistency" />

      <TeamConsistencyMain />
    </>
    // </UserProvider>
  );
};

export default TeamConsistency;
