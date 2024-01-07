import { useMixpanelCohorts } from "@hooks/mixpanelCohorts/useMixpanelCohorts";
import { Button } from "@mui/material";
import { format } from "date-fns";
import Link from "next/link";

interface Props {}

const NotificationDashboard: React.FC<Props> = ({}) => {
  const { cohorts } = useMixpanelCohorts();
  return (
    <div className="p-4">
      <div className="pb-8">
        <Link href={`/admin/notifications/compose`}>
          <Button variant="contained">Notification templates</Button>
        </Link>
      </div>
      <p className="text-lg font-bold">Cohorts</p>
      <div className="flex flex-wrap">
        {cohorts.map((item) => {
          return (
            <div key={item.cohortId} className="p-4 border w-[300px]">
              <p className="font-bold pb-1 text-lg">ID: {item.cohortId}</p>
              <p className="font-bold pb-1 text-lg">Name: {item.cohortName}</p>
              <p>Description: {item.cohortDescription}</p>

              <p className="pt-2 text-red-500">members: {item.numMembers}</p>
              <p className="pt-2 text-red-500">
                sync: {format(new Date(item.lastSync), "dMMM h:mmaaa")}
              </p>
              <div className="flex pt-4">
                <Link href={`/admin/notifications/${item.cohortId}`}>
                  <Button variant="outlined">Members</Button>
                </Link>
                <div className="pl-4">
                  <Link href={`/admin/notifications/${item.cohortId}/push`}>
                    <Button variant="contained">Push</Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationDashboard;
