// import { useCommunityEvent } from "@hooks/community/useCommunityEvent";
import { adminGamesQuery } from "./useAdminGames";

interface Props {
  urlState: adminGamesQuery;
  onPageChange: (id: string) => void;
}

const AllActivities: React.FC<Props> = ({ urlState, onPageChange }) => {
  // const { selectedEvent } = useCommunityEvent(urlState.game);

  return <div>AllActivities</div>;
};

export default AllActivities;
