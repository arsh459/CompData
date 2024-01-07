import { useAdminDashboard } from "@hooks/dashboard/useAdminDashboard";
import { UserInterface } from "@models/User/User";
import LeaderboardRefreshButton from "@templates/AdminGames/LeaderboardRefreshButton";
// import Filter from "./Filter";
import FilterHolder from "./FilterHolder";
import Header from "./Header";
import LiveView from "./TaskResults/LiveView";

interface Props {
  user: UserInterface;
}

const ScoreboardView: React.FC<Props> = ({ user }) => {
  const { urlState, onPageChange, onClearFilter } = useAdminDashboard();
  // console.log(urlState);
  return (
    <div className="py-4">
      <div>
        <Header name={user.name} img={user.profileImage} />
      </div>
      {urlState ? (
        <FilterHolder onClearFilter={onClearFilter} urlState={urlState} />
      ) : null}
      {urlState?.game ? (
        <div className="flex p-8 pb-2">
          <LeaderboardRefreshButton gameId={urlState.game} />
        </div>
      ) : null}
      {urlState ? (
        <LiveView urlState={urlState} onPageChange={onPageChange} />
      ) : null}
    </div>
  );
};

export default ScoreboardView;
