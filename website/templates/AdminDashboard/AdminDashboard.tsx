import { useAdminDashboard } from "@hooks/dashboard/useAdminDashboard";
import { UserInterface } from "@models/User/User";
// import Filter from "./Filter";
import FilterHolder from "./FilterHolder";
import Header from "./Header";
import TaskCardsHolder from "./TaskResults/TaskCardsHolder";

interface Props {
  user: UserInterface;
}

const AdminDashboard: React.FC<Props> = ({ user }) => {
  const { urlState, onPageChange, onClearFilter } = useAdminDashboard();

  return (
    <div className="py-4">
      <div>
        <Header name={user.name} img={user.profileImage} />
      </div>
      {urlState ? (
        <FilterHolder onClearFilter={onClearFilter} urlState={urlState} />
      ) : null}
      {urlState ? (
        <TaskCardsHolder urlState={urlState} onPageChange={onPageChange} />
      ) : null}
    </div>
  );
};

export default AdminDashboard;
