import Header from "@templates/AdminGames/Header";
import { UserInterface } from "@models/User/User";
// import { useAdminGames } from "./useAdminGames";
import AllGames from "./AllGames";
// import GameBadges from "./GameBadges";

interface Props {
  user: UserInterface;
}

const AdminGamesTemplate: React.FC<Props> = ({ user }) => {
  // const { urlState, onQueryChange, onGoBack } = useAdminGames();

  return (
    <div className="py-4">
      <Header name={user.name} img={user.profileImage} />
      <AllGames
      // urlState={urlState} onGameChange={onQueryChange}
      />
      {/* {urlState?.gameId ? (
        <GameBadges gameId={urlState.gameId} uid={user.uid} />
      ) : null} */}
    </div>
  );
};

export default AdminGamesTemplate;
