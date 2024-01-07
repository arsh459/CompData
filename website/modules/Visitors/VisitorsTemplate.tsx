import Header from "@templates/AdminGames/Header";
import { UserInterface } from "@models/User/User";
import { useInvitedUsers } from "@hooks/invites/useInvitedUsers";
import VisitorCard from "./VisitorCard";
// import { useAdminGames } from "./useAdminGames";

// import GameBadges from "./GameBadges";

interface Props {
  user: UserInterface;
  pageId?: string;
  origin?: boolean;
}

const VisitorsTemplate: React.FC<Props> = ({ user, pageId, origin }) => {
  // const { urlState, onQueryChange, onGoBack } = useAdminGames();
  const { users } = useInvitedUsers(pageId, origin);

  return (
    <div className="py-4">
      <Header name={user.name} img={user.profileImage} />
      <div className="flex flex-wrap">
        {users.map((item) => {
          return (
            <div key={item.uid} className="p-2 flex">
              <VisitorCard user={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VisitorsTemplate;
