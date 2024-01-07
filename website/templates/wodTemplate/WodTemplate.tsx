import Button from "@components/button";
import { useRewardReminders } from "@hooks/messages/useRewardReminders";

import { Link } from "@mui/material";
import { getGameNameReadable } from "@templates/TaskTemplate/utils";
import { format } from "date-fns";

interface Props {
  gameId: string;
}

const WodTemplate: React.FC<Props> = ({ gameId }) => {
  const { rewardList } = useRewardReminders(gameId, "task_of_day_v2");
  return (
    <div className="py-8 px-2">
      <div className="flex pb-4">
        <Link href={`/admin/games/${gameId}/wod/addWod`}>
          <Button appearance="contained">Add New Task message</Button>
        </Link>
      </div>

      <div className="flex flex-wrap">
        {rewardList.map((item) => {
          return (
            <div
              key={item.id}
              className="w-full md:w-1/2 lg:w-1/3 p-4 shadow-sm mb-4 border rounded-md"
            >
              <Link href={`/admin/games/${gameId}/wod/${item.id}`}>
                <div>
                  <p className="font-semibold text-lg">{item.taskId}</p>

                  <p className="font-medium text-red-500 capitalize pt-1">
                    {getGameNameReadable(item.parentId)}
                  </p>
                  <p className="font-medium">
                    {item.state === "PENDING" || item.state === "URGENT"
                      ? "PENDING"
                      : "DONE"}
                  </p>
                  <p className="font-medium">
                    {item.scheduledAt
                      ? format(
                          new Date(item.scheduledAt),
                          "dd-MM-yyyy hh:mm aaa"
                        )
                      : "No Date"}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WodTemplate;
