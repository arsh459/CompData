import Header from "@templates/AdminGames/Header";
import { UserInterface } from "@models/User/User";
// import { useAdminGames } from "./useAdminGames";
import MyPurchaseLists from "@modules/MyPurchases";
// import GameBadges from "./GameBadges";

interface Props {
  user: UserInterface;
}

const MyPurchaseTemplate: React.FC<Props> = ({ user }) => {
  // const { urlState, onQueryChange, onGoBack } = useAdminGames();
  // console.log(user.name);

  return (
    <div className="py-4">
      <Header name={user.name} img={user.profileImage} />
      <MyPurchaseLists uid={user.uid} />

      {/* {urlState?.gameId ? (
        <GameBadges gameId={urlState.gameId} uid={user.uid} />
      ) : null} */}
    </div>
  );
};

export default MyPurchaseTemplate;
