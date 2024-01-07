import { UserInterface } from "@models/User/User";
import Header from "@templates/AdminGames/Header";
import AllGoals from "./AllGoals";
// import AllGames from "./AllGames";
// import GameBadges from "./GameBadges";

interface Props {
  user: UserInterface;
}

const AdminGoalsTemplate: React.FC<Props> = ({ user }) => {
  // const { urlState, onQueryChange, onGoBack } = useAdminGames();

  return (
    <div className="py-4">
      <Header name={user.name} img={user.profileImage} />
      <AllGoals />
    </div>
  );
};

export default AdminGoalsTemplate;
