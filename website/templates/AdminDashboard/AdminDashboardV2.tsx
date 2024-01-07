import { useChallengeUsers } from "@hooks/challenges/useChallengeUsers";
import { UserInterface } from "@models/User/User";

// import Filter from "./Filter";
import Header from "./Header";
import ChallengeUserCard from "./ChallengeUserCard";

interface Props {
  user: UserInterface;
}

const AdminDashboardV2: React.FC<Props> = ({ user }) => {
  // const { urlState, onPageChange, onClearFilter } = useAdminDashboard();
  const { users } = useChallengeUsers();

  return (
    <div className="py-4">
      <div>
        <Header
          name={user.name}
          img={user.profileImage}
          headingText="Admin UserList of Challenge Joined"
        />
      </div>

      {/* {urlState ? (
        <FilterHolder onClearFilter={onClearFilter} urlState={urlState} />
      ) : null}
      {urlState ? (
        <TaskCardsHolder urlState={urlState} onPageChange={onPageChange} />
      ) : null} */}
      <div className="p-4">
        <p>List of Users On Challenge </p>
        <p className="text-sm pb-4">Total: {users.length}</p>
        <div className="flex flex-col">
          {users?.map((item, index) => {
            return (
              <div key={item.uid} className="w-full border p-1 px-2">
                <ChallengeUserCard index={index} item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardV2;
