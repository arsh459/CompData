import { Button, Link } from "@mui/material";
import { UserInterface } from "@models/User/User";
import Header from "../Header";
import BadgesList from "./BadgesList";
// import { useAdminGames } from "./useAdminGames";

// import GameBadges from "./GameBadges";

interface Props {
  user: UserInterface;
  gameId: string;
}

const SingleGameTemplate: React.FC<Props> = ({ user, gameId }) => {
  // const { urlState, onQueryChange, onGoBack } = useAdminGames();

  return (
    <div className="py-4">
      <Header name={user.name} img={user.profileImage} />

      <div className="p-4">
        <Link href={`/admin/games/${gameId}/addNew`}>
          <Button variant="contained">Add new</Button>
        </Link>
      </div>

      <BadgesList gameId={gameId} />
    </div>
  );
};

export default SingleGameTemplate;
