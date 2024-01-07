import Button from "@components/button";
import { useSprintDetails } from "@hooks/sprintDetails/useSprintDetails";
// import { useRewardReminders } from "@hooks/messages/useRewardReminders";
import { Link } from "@mui/material";
// import { format } from "date-fns";

interface Props {
  gameId: string;
}

const SprintsTemplate: React.FC<Props> = ({ gameId }) => {
  const { spDetails } = useSprintDetails(gameId);

  return (
    <div className="py-8 px-2">
      <div className="flex pb-4">
        <Link href={`/admin/games/${gameId}/sprintdetails/add`}>
          <Button appearance="contained">Add New sprint details</Button>
        </Link>
      </div>

      <p>list of sprints</p>
      <div className="flex flex-wrap">
        <div className="flex flex-wrap">
          {spDetails.map((item) => {
            return (
              <div key={item.id} className="border p-4">
                <Link href={`/admin/games/${gameId}/sprintdetails/${item.id}`}>
                  <p>{item.sprintId}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SprintsTemplate;
